'use client';

import { motion } from 'framer-motion';
import TextReveal, { SlideReveal } from '@/components/TextReveal';
import RequestQuoteForm from '@/components/RequestQuoteForm';

const contactInfo = [
    {
        label: 'Contact Person',
        value: 'Shatrughan Vishwakarma',
        icon: '👤',
    },
    {
        label: 'Location',
        value: 'Block No:- 490, Plot No. 2, Manjusar, Vadodara, Gujarat',
        icon: '📍',
    },
    {
        label: 'Region',
        value: 'Gujarat, India',
        icon: '🌏',
    },
];

export default function ContactPage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-40 pb-20 bg-charcoal relative overflow-hidden noise-overlay">
                <div className="absolute inset-0 hero-grid opacity-30" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <SlideReveal>
                        <span className="text-accent font-medium text-xs uppercase tracking-[0.3em]">Get in Touch</span>
                    </SlideReveal>
                    <TextReveal
                        text="Contact Us"
                        as="h1"
                        className="mt-4 text-5xl md:text-6xl lg:text-8xl font-bold text-white tracking-tighter"
                    />
                    <SlideReveal delay={0.3}>
                        <p className="mt-6 text-lg text-white/40 max-w-2xl font-light">
                            We&apos;d love to hear from you. Get in touch with our team for project enquiries, technical discussions, or custom configurations.
                        </p>
                    </SlideReveal>
                </div>
            </section>

            <section className="bg-charcoal py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <SlideReveal>
                                <h2 className="text-2xl font-bold text-white tracking-tight mb-8">
                                    Contact Information
                                </h2>
                            </SlideReveal>

                            {contactInfo.map((info, i) => (
                                <motion.div
                                    key={info.label}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                                    className="glow-card rounded-xl p-5 flex items-start gap-4 group"
                                >
                                    <span className="text-2xl shrink-0">{info.icon}</span>
                                    <div>
                                        <p className="text-xs text-white/30 uppercase tracking-wider mb-1">{info.label}</p>
                                        <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors duration-500">{info.value}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Map */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                className="mt-8 rounded-2xl overflow-hidden border border-white/10"
                            >
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.0!2d73.3!3d22.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDE4JzAwLjAiTiA3M8KwMTgnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="250"
                                    style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(0.8)' }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="SITCO Location"
                                />
                            </motion.div>
                        </div>

                        {/* Quote Form */}
                        <div className="lg:col-span-3">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                                className="glow-card rounded-2xl p-8 lg:p-10"
                            >
                                <h2 className="text-xl font-bold text-white mb-6">Send us a message</h2>
                                <RequestQuoteForm compact />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
