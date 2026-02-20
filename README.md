# SITCO — Transformer Radiators Website

A production-ready, responsive website for **SITCO — Transformer Radiators** built with Next.js, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Next.js 15** (App Router, SSR/SSG)
- **React 19** + TypeScript
- **Tailwind CSS** (utility-first styling)
- **Framer Motion** (animations & transitions)
- **react-hook-form** + **zod** (form handling & validation)
- **Nodemailer** (SMTP email sending)
- **formidable** (multipart file upload parsing)

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero, products preview, capabilities, about, why SITCO |
| Products | `/products` | Detailed product cards with specs |
| Capabilities | `/capabilities` | Engineering capabilities + spec table |
| Contact | `/contact` | Contact info, map, contact form |
| Request Quote | `/request-quote` | Full quote request form with file upload |

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm

### Installation

```bash
cd sitco-v2
npm install
```

### Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description | Required |
|----------|-------------|----------|
| `SMTP_HOST` | SMTP server host | Yes (for email) |
| `SMTP_PORT` | SMTP server port | Yes (for email) |
| `SMTP_SECURE` | Use TLS (`true`/`false`) | Yes (for email) |
| `SMTP_USER` | SMTP username/email | Yes (for email) |
| `SMTP_PASS` | SMTP password/app password | Yes (for email) |
| `ADMIN_EMAIL` | Email to receive quote requests | Yes |
| `SENDGRID_API_KEY` | SendGrid API key (overrides SMTP if set) | No |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA v2/v3 site key | No |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA secret key | No |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## API — Request Quote

### `POST /api/request-quote`

Accepts `multipart/form-data` with the following fields:

| Field | Type | Required |
|-------|------|----------|
| `company` | string | Yes |
| `name` | string | Yes |
| `email` | string (email) | Yes |
| `phone` | string | Yes |
| `product` | string | Yes |
| `quantity` | string | Yes |
| `message` | string | No |
| `consent` | string ("true") | Yes |
| `website` | string (honeypot, must be empty) | No |
| `file` | file (PDF/image, max 10 MB) | No |

**Response codes:**
- `200` — Success
- `400` — Validation error
- `405` — Method not allowed
- `500` — Server error

**On success:** Sends HTML email to `ADMIN_EMAIL` with all details + file attachment. Logs to `data/quotes.json`.

## Deployment (Vercel)

1. Push to a Git repository (GitHub/GitLab/Bitbucket)
2. Import the project in [vercel.com](https://vercel.com)
3. Set **Root Directory** to `sitco-v2` (if in a monorepo)
4. Add all environment variables from `.env.example` in Project Settings → Environment Variables
5. Deploy

> **Note:** On Vercel's serverless environment, the JSON file logging (`data/quotes.json`) will not persist between deployments. For production, consider using a database (e.g., Vercel Postgres, Supabase) or external storage (S3/GCS) for persistent logging.

## Project Structure

```
sitco-v2/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (Header + Footer)
│   │   ├── page.tsx            # Home page
│   │   ├── products/page.tsx   # Products page
│   │   ├── capabilities/page.tsx # Capabilities page
│   │   ├── contact/page.tsx    # Contact page
│   │   ├── request-quote/page.tsx # Request Quote page
│   │   └── api/request-quote/route.ts # API endpoint
│   └── components/
│       ├── Header.tsx           # Sticky nav with scroll effect
│       ├── Footer.tsx           # Site footer
│       ├── SectionWrapper.tsx   # Animated section container
│       ├── HeroSection.tsx      # Full-bleed hero
│       ├── ProductsPreview.tsx  # Product cards
│       ├── CapabilitiesPreview.tsx # Capabilities grid
│       ├── AboutSection.tsx     # About SITCO
│       ├── WhySitco.tsx         # Benefits + CTA
│       └── RequestQuoteForm.tsx # Quote request form
├── data/
│   └── quotes.json             # Local quote submissions log
├── .env.example                # Environment variables template
└── README.md
```

## Features

- ✅ Responsive design (mobile-first)
- ✅ Framer Motion animations (entrance, hover, scroll)
- ✅ Sticky header with scroll-based background transition
- ✅ Accessible (high contrast, focus states, semantic HTML)
- ✅ Honeypot anti-spam on forms
- ✅ reCAPTCHA support (env-toggleable)
- ✅ File upload with validation (PDF/images, 10 MB limit)
- ✅ SMTP + SendGrid email support
- ✅ JSON log fallback for quote submissions
- ✅ SEO metadata + Open Graph tags
