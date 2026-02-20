'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TextReveal, { SlideReveal } from '@/components/TextReveal';

const capabilities = [
    {
        title: 'Precision Manufacturing',
        description: 'State-of-the-art CNC machinery and automated production lines ensure exact specifications on every unit.',
        icon: '⚙️',
    },
    {
        title: 'Quality Control',
        description: 'Multi-point inspection at every production stage with ISO-standard testing protocols.',
        icon: '🛡️',
    },
    {
        title: 'Custom Design',
        description: 'Full CAD/CAM design capabilities for bespoke radiator configurations tailored to your specs.',
        icon: '✏️',
    },
    {
        title: 'Technical Support',
        description: 'Dedicated engineering team providing consultation from design through commissioning.',
        icon: '🤝',
    },
];

const specs = [
    { parameter: 'Centre Distance', value: '700 mm to 4000 mm' },
    { parameter: 'Width', value: '520 mm' },
    { parameter: 'Fins Configuration', value: 'Up to 40 fins (90mm / 100mm OD)' },
    { parameter: 'Customization', value: 'Swan Neck, Off-side, Custom designs' },
    { parameter: 'Surface Treatment', value: 'Galvanised & other finishes available' },
];

export default function CapabilitiesPage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-40 pb-20 bg-charcoal relative overflow-hidden noise-overlay">
                <div className="absolute inset-0 hero-grid opacity-30" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <SlideReveal>
                        <span className="text-accent font-medium text-xs uppercase tracking-[0.3em]">Our Capabilities</span>
                    </SlideReveal>
                    <TextReveal
                        text="Engineering Excellence"
                        as="h1"
                        className="mt-4 text-5xl md:text-6xl lg:text-8xl font-bold text-white tracking-tighter"
                    />
                    <SlideReveal delay={0.3}>
                        <p className="mt-6 text-lg text-white/40 max-w-2xl font-light">
                            Advanced manufacturing capabilities, rigorous quality control, and a dedicated engineering team.
                        </p>
                    </SlideReveal>
                </div>
            </section>

            {/* Capabilities Grid */}
            <section className="bg-charcoal py-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        {capabilities.map((cap, i) => (
                            <motion.div
                                key={cap.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                            >
                                <motion.div
                                    className="glow-card rounded-2xl p-8 lg:p-12 h-full group"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                >
                                    <motion.div
                                        className="text-5xl mb-6"
                                        whileHover={{ scale: 1.3, rotate: 15 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        {cap.icon}
                                    </motion.div>
                                    <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-500">
                                        {cap.title}
                                    </h3>
                                    <p className="text-white/30 leading-relaxed group-hover:text-white/50 transition-colors duration-500">
                                        {cap.description}
                                    </p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Spec Table */}
            <section className="bg-charcoal py-20">
                <div className="max-w-4xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <SlideReveal>
                            <span className="text-accent font-medium text-xs uppercase tracking-[0.3em]">Specifications</span>
                        </SlideReveal>
                        <TextReveal
                            text="Technical Parameters"
                            as="h2"
                            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tighter"
                        />
                    </div>

                    <div className="border border-white/10 rounded-2xl overflow-hidden">
                        {specs.map((spec, i) => (
                            <motion.div
                                key={spec.parameter}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                                className={`flex items-center justify-between px-6 lg:px-8 py-5 ${i < specs.length - 1 ? 'border-b border-white/5' : ''
                                    } hover:bg-white/[0.02] transition-colors duration-500 group`}
                            >
                                <span className="text-sm font-semibold text-white/50 group-hover:text-white transition-colors duration-500">{spec.parameter}</span>
                                <span className="text-sm text-white/30 group-hover:text-accent transition-colors duration-500">{spec.value}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mt-16"
                    >
                        <Link
                            href="/request-quote"
                            className="magnetic-btn inline-flex px-10 py-4 bg-accent text-charcoal rounded-xl text-lg font-bold hover:bg-accent-hover transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-1 active:scale-95"
                        >
                            Discuss Your Requirements
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
