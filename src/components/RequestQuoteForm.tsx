'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';

const quoteSchema = z.object({
    company: z.string().min(2, 'Company name is required'),
    name: z.string().min(2, 'Full name is required'),
    email: z.string().email('Please enter a valid email address'),
    phone: z.string().min(6, 'Phone number is required'),
    product: z.string().min(1, 'Please select a product'),
    quantity: z.string().min(1, 'Please specify quantity or dimensions'),
    message: z.string().optional(),
    consent: z.literal(true, { message: 'You must consent to data processing' }),
    website: z.string().max(0).optional(), // honeypot
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface RequestQuoteFormProps {
    compact?: boolean;
}

export default function RequestQuoteForm({ compact = false }: RequestQuoteFormProps) {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState('');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<QuoteFormData>({
        resolver: zodResolver(quoteSchema),
        defaultValues: {
            website: '',
        },
    });

    const onSubmit = async (data: QuoteFormData) => {
        setStatus('loading');
        setErrorMessage('');

        try {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });

            const fileInput = fileInputRef.current;
            if (fileInput?.files?.[0]) {
                const file = fileInput.files[0];
                if (file.size > 10 * 1024 * 1024) {
                    setStatus('error');
                    setErrorMessage('File size must be under 10 MB.');
                    return;
                }
                formData.append('file', file);
            }

            const res = await fetch('/api/request-quote', {
                method: 'POST',
                body: formData,
            });

            const result = await res.json();

            if (res.ok) {
                setStatus('success');
                reset();
                setFileName('');
                if (fileInputRef.current) fileInputRef.current.value = '';
            } else {
                setStatus('error');
                setErrorMessage(result.error || 'Something went wrong. Please try again.');
            }
        } catch {
            setStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        }
    };

    const inputClasses =
        'w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/30 transition-all duration-300 text-sm';
    const labelClasses = 'block text-xs font-semibold text-white/50 mb-2 uppercase tracking-wider';
    const errorClasses = 'text-red-400 text-xs mt-1.5';

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-accent/20 bg-accent/5 rounded-2xl p-10 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-5"
                >
                    <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">Quote Request Submitted!</h3>
                <p className="text-white/40 text-sm">Our team will review your request and respond within 24 hours.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-6 py-2.5 bg-white/5 border border-white/10 text-white/60 rounded-xl text-sm font-medium hover:bg-white/10 hover:text-white transition-all duration-300"
                >
                    Submit Another Request
                </button>
            </motion.div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Honeypot */}
            <div className="hidden" aria-hidden="true">
                <input {...register('website')} tabIndex={-1} autoComplete="off" />
            </div>

            <div className={`grid grid-cols-1 ${compact ? '' : 'md:grid-cols-2'} gap-5`}>
                <div>
                    <label className={labelClasses}>Company *</label>
                    <input {...register('company')} placeholder="Your company name" className={inputClasses} />
                    {errors.company && <p className={errorClasses}>{errors.company.message}</p>}
                </div>
                <div>
                    <label className={labelClasses}>Full Name *</label>
                    <input {...register('name')} placeholder="Your full name" className={inputClasses} />
                    {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
                </div>
            </div>

            <div className={`grid grid-cols-1 ${compact ? '' : 'md:grid-cols-2'} gap-5`}>
                <div>
                    <label className={labelClasses}>Email *</label>
                    <input {...register('email')} type="email" placeholder="your@email.com" className={inputClasses} />
                    {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
                </div>
                <div>
                    <label className={labelClasses}>Phone *</label>
                    <input {...register('phone')} type="tel" placeholder="+91 XXXXX XXXXX" className={inputClasses} />
                    {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
                </div>
            </div>

            <div>
                <label className={labelClasses}>Product of Interest *</label>
                <select {...register('product')} className={inputClasses} defaultValue="">
                    <option value="" disabled>Select a product</option>
                    <option value="standard-radiators">Standard Radiators</option>
                    <option value="finned-radiators">Finned Radiators</option>
                    <option value="custom-solutions">Customised Solutions</option>
                    <option value="surface-treatments">Surface Treatments</option>
                    <option value="other">Other</option>
                </select>
                {errors.product && <p className={errorClasses}>{errors.product.message}</p>}
            </div>

            <div>
                <label className={labelClasses}>Quantity / Dimensions *</label>
                <input {...register('quantity')} placeholder="e.g., 50 units, 1200mm centre distance" className={inputClasses} />
                {errors.quantity && <p className={errorClasses}>{errors.quantity.message}</p>}
            </div>

            <div>
                <label className={labelClasses}>Message</label>
                <textarea
                    {...register('message')}
                    placeholder="Any additional details or requirements..."
                    rows={compact ? 3 : 4}
                    className={inputClasses + ' resize-none'}
                />
            </div>

            {/* File Upload */}
            {!compact && (
                <div>
                    <label className={labelClasses}>Attachment (optional)</label>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full px-4 py-8 rounded-xl border border-dashed border-white/10 hover:border-accent/30 transition-all duration-300 cursor-pointer text-center group"
                    >
                        <svg className="w-8 h-8 mx-auto text-white/15 group-hover:text-accent/40 transition-colors duration-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg>
                        <p className="text-sm text-white/25">
                            {fileName ? (
                                <span className="text-accent font-medium">{fileName}</span>
                            ) : (
                                <>Click to upload PDF or image <span className="text-white/15">(max 10 MB)</span></>
                            )}
                        </p>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.gif,.webp"
                        className="hidden"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                    />
                </div>
            )}

            {/* Consent */}
            <div className="flex items-start gap-3">
                <input
                    {...register('consent')}
                    type="checkbox"
                    id="consent"
                    className="mt-1 w-4 h-4 rounded border-white/20 bg-white/5 text-accent focus:ring-accent"
                />
                <label htmlFor="consent" className="text-sm text-white/30 leading-relaxed">
                    I consent to SITCO processing my data for the purpose of this quote request. *
                </label>
            </div>
            {errors.consent && <p className={errorClasses}>{errors.consent.message}</p>}

            {/* Error */}
            <AnimatePresence>
                {status === 'error' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400"
                    >
                        {errorMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 ${status === 'loading'
                    ? 'bg-white/5 text-white/20 cursor-not-allowed'
                    : 'bg-accent text-charcoal hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/20 hover:-translate-y-0.5 active:scale-[0.98]'
                    }`}
                whileHover={status !== 'loading' ? { scale: 1.01 } : {}}
                whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
            >
                {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-3">
                        <motion.svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </motion.svg>
                        Submitting...
                    </span>
                ) : (
                    'Submit Quote Request'
                )}
            </motion.button>
        </form>
    );
}
