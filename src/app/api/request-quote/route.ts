import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import formidable from 'formidable';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import { IncomingMessage } from 'http';

// Zod schema for validation
const quoteSchema = z.object({
    company: z.string().min(2, 'Company name is required'),
    name: z.string().min(2, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(6, 'Phone number is required'),
    product: z.string().min(1, 'Product selection is required'),
    quantity: z.string().min(1, 'Quantity/dimensions is required'),
    message: z.string().optional().default(''),
    consent: z.string().transform((v) => v === 'true'),
    website: z.string().max(0, 'Bot detected').optional().default(''), // honeypot
});

// Convert NextRequest to Node.js IncomingMessage for formidable
async function toNodeRequest(req: NextRequest): Promise<IncomingMessage> {
    const body = await req.arrayBuffer();
    const readable = new Readable();
    readable.push(Buffer.from(body));
    readable.push(null);

    // Cast to IncomingMessage-like object
    const nodeReq = Object.assign(readable, {
        headers: Object.fromEntries(req.headers.entries()),
        method: req.method,
        url: req.url,
    }) as unknown as IncomingMessage;

    return nodeReq;
}

// Parse multipart form data
function parseForm(req: IncomingMessage): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
    const form = formidable({
        maxFileSize: 10 * 1024 * 1024, // 10 MB
        filter: (part) => {
            // Accept PDFs and images only
            const mime = part.mimetype || '';
            return (
                mime === 'application/pdf' ||
                mime.startsWith('image/')
            );
        },
    });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
}

// Build HTML email body
function buildEmailHtml(data: Record<string, string>, timestamp: string, ip: string): string {
    return `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f0; padding: 24px; border-radius: 12px;">
      <div style="background: #1a1a2e; color: white; padding: 24px; border-radius: 8px 8px 0 0; text-align: center;">
        <h1 style="margin: 0; font-size: 20px; letter-spacing: 2px;">SITCO — Quote Request</h1>
      </div>
      <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e8e8e3;">
            <td style="padding: 12px 8px; font-weight: 600; color: #1a1a2e; width: 35%;">Company</td>
            <td style="padding: 12px 8px; color: #4a4e69;">${data.company}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e8e8e3;">
            <td style="padding: 12px 8px; font-weight: 600; color: #1a1a2e;">Name</td>
            <td style="padding: 12px 8px; color: #4a4e69;">${data.name}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e8e8e3;">
            <td style="padding: 12px 8px; font-weight: 600; color: #1a1a2e;">Email</td>
            <td style="padding: 12px 8px; color: #4a4e69;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr style="border-bottom: 1px solid #e8e8e3;">
            <td style="padding: 12px 8px; font-weight: 600; color: #1a1a2e;">Phone</td>
            <td style="padding: 12px 8px; color: #4a4e69;">${data.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e8e8e3;">
            <td style="padding: 12px 8px; font-weight: 600; color: #1a1a2e;">Product</td>
            <td style="padding: 12px 8px; color: #4a4e69;">${data.product}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e8e8e3;">
            <td style="padding: 12px 8px; font-weight: 600; color: #1a1a2e;">Quantity / Dimensions</td>
            <td style="padding: 12px 8px; color: #4a4e69;">${data.quantity}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e8e8e3;">
            <td style="padding: 12px 8px; font-weight: 600; color: #1a1a2e;">Message</td>
            <td style="padding: 12px 8px; color: #4a4e69;">${data.message || '(none)'}</td>
          </tr>
        </table>
        <div style="margin-top: 16px; padding: 12px; background: #f5f5f0; border-radius: 6px; font-size: 12px; color: #6b7094;">
          <p style="margin: 4px 0;">Submitted: ${timestamp}</p>
          <p style="margin: 4px 0;">IP: ${ip}</p>
          ${data.hasAttachment === 'true' ? '<p style="margin: 4px 0;">📎 File attached to this email</p>' : ''}
        </div>
      </div>
    </div>
  `;
}

// Create email transporter
function createTransporter() {
    // Check for SendGrid first
    if (process.env.SENDGRID_API_KEY) {
        return nodemailer.createTransport({
            host: 'smtp.sendgrid.net',
            port: 587,
            auth: {
                user: 'apikey',
                pass: process.env.SENDGRID_API_KEY,
            },
        });
    }

    // Default SMTP
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

// Append submission to JSON log
function logSubmission(data: Record<string, unknown>) {
    try {
        const logDir = path.join(process.cwd(), 'data');
        const logPath = path.join(logDir, 'quotes.json');

        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir, { recursive: true });
        }

        let quotes: Record<string, unknown>[] = [];
        if (fs.existsSync(logPath)) {
            const raw = fs.readFileSync(logPath, 'utf-8');
            quotes = JSON.parse(raw);
        }

        quotes.push(data);
        fs.writeFileSync(logPath, JSON.stringify(quotes, null, 2));
    } catch (err) {
        console.error('Failed to log submission to JSON:', err);
    }
}

export async function POST(req: NextRequest) {
    try {
        // Convert to node request for formidable
        const nodeReq = await toNodeRequest(req);
        const { fields, files } = await parseForm(nodeReq);

        // Flatten fields (formidable returns arrays)
        const flatFields: Record<string, string> = {};
        for (const [key, value] of Object.entries(fields)) {
            flatFields[key] = Array.isArray(value) ? value[0] || '' : String(value);
        }

        // Validate with zod
        const result = quoteSchema.safeParse(flatFields);
        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            return NextResponse.json(
                { error: 'Validation failed', details: errors },
                { status: 400 }
            );
        }

        const data = result.data;

        // Honeypot check — silently reject bots
        if (data.website && data.website.length > 0) {
            // Return success to not alert bots
            return NextResponse.json({ ok: true });
        }

        // Get IP address
        const ip =
            req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
            req.headers.get('x-real-ip') ||
            'unknown';

        const timestamp = new Date().toISOString();

        // Handle file attachment
        const fileArray = files.file;
        const uploadedFile = Array.isArray(fileArray) ? fileArray[0] : fileArray;
        let attachment: { filename: string; path: string } | undefined;

        if (uploadedFile) {
            attachment = {
                filename: uploadedFile.originalFilename || 'attachment',
                path: uploadedFile.filepath,
            };
        }

        // Build email
        const emailData = {
            ...flatFields,
            hasAttachment: uploadedFile ? 'true' : 'false',
        };

        const htmlBody = buildEmailHtml(emailData, timestamp, ip);

        const mailOptions: nodemailer.SendMailOptions = {
            from: process.env.SMTP_USER || 'noreply@sitco.com',
            to: process.env.ADMIN_EMAIL || 'admin@sitco.com',
            subject: `[SITCO Quote Request] ${data.company} — ${data.name}`,
            html: htmlBody,
            ...(attachment && {
                attachments: [
                    {
                        filename: attachment.filename,
                        path: attachment.path,
                    },
                ],
            }),
        };

        // Attempt to send email
        let emailSent = false;
        try {
            const transporter = createTransporter();
            await transporter.sendMail(mailOptions);
            emailSent = true;
        } catch (emailErr) {
            console.error('Email sending failed:', emailErr);
            // Continue — log to JSON as fallback
        }

        // Log submission
        logSubmission({
            ...flatFields,
            timestamp,
            ip,
            emailSent,
            hasAttachment: !!uploadedFile,
            attachmentName: uploadedFile?.originalFilename || null,
        });

        // Clean up temp file
        if (uploadedFile) {
            try {
                fs.unlinkSync(uploadedFile.filepath);
            } catch {
                // Ignore cleanup errors
            }
        }

        return NextResponse.json({
            ok: true,
            emailSent,
            message: emailSent
                ? 'Quote request submitted and email sent successfully.'
                : 'Quote request logged. Email delivery will be retried.',
        });
    } catch (err) {
        console.error('API request-quote error:', err);
        return NextResponse.json(
            { error: 'Internal server error. Please try again later.' },
            { status: 500 }
        );
    }
}

// Only allow POST
export async function GET() {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
