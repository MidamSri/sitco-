'use client';

import { motion } from 'framer-motion';
import TextReveal, { SlideReveal } from '@/components/TextReveal';
import RequestQuoteForm from '@/components/RequestQuoteForm';

const trustBadges = [
    { icon: '⏱', title: '24-Hour Response', description: 'Guaranteed reply within one business day' },
    { icon: '🔒', title: 'Secure Data', description: 'Your information is encrypted and protected' },
    { icon: '📋', title: 'No Obligation', description: 'Free, no-obligation quote with full details' },
];

export default function RequestQuotePage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-40 pb-20 bg-charcoal relative overflow-hidden noise-overlay">
                <div className="absolute inset-0 hero-grid opacity-30" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <SlideReveal>
                        <span className="text-accent font-medium text-xs uppercase tracking-[0.3em]">Request a Quote</span>
                    </SlideReveal>
                    <TextReveal
                        text="Let's Work Together"
                        as="h1"
                        className="mt-4 text-5xl md:text-6xl lg:text-8xl font-bold text-white tracking-tighter"
                    />
                    <SlideReveal delay={0.3}>
                        <p className="mt-6 text-lg text-white/40 max-w-2xl font-light">
                            Tell us about your requirements and our engineering team will prepare a detailed, no-obligation quote.
                        </p>
                    </SlideReveal>
                </div>
            </section>

            <section className="bg-charcoal py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Trust indicators */}
                        <div className="space-y-4">
                            {trustBadges.map((badge, i) => (
                                <motion.div
                                    key={badge.title}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                                    className="glow-card rounded-xl p-5 flex items-start gap-4 group"
                                >
                                    <span className="text-2xl shrink-0">{badge.icon}</span>
                                    <div>
                                        <p className="text-sm font-semibold text-white group-hover:text-accent transition-colors duration-500">
                                            {badge.title}
                                        </p>
                                        <p className="text-xs text-white/30 mt-1 group-hover:text-white/50 transition-colors duration-500">
                                            {badge.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Contact fallback */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                                className="pt-6 border-t border-white/5"
                            >
                                <p className="text-xs text-white/20">
                                    Prefer to reach out directly? Contact <span className="text-white/40">Shatrughan Vishwakarma</span>.
                                </p>
                            </motion.div>
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                className="glow-card rounded-2xl p-8 lg:p-10"
                            >
                                <RequestQuoteForm />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
