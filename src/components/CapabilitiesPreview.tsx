'use client';

import { motion } from 'framer-motion';
import TextReveal, { SlideReveal } from './TextReveal';

const capabilities = [
    {
        title: 'Precision Manufacturing',
        description: 'State-of-the-art CNC machinery and automated production lines.',
        icon: '⚙️',
    },
    {
        title: 'Quality Control',
        description: 'Multi-point inspection with ISO-standard testing protocols.',
        icon: '🛡️',
    },
    {
        title: 'Custom Design',
        description: 'Full CAD/CAM design for bespoke radiator configurations.',
        icon: '✏️',
    },
    {
        title: 'Technical Support',
        description: 'Dedicated engineering team from design through commissioning.',
        icon: '🤝',
    },
];

export default function CapabilitiesPreview() {
    return (
        <section className="relative py-32 lg:py-44 bg-charcoal overflow-hidden">
            {/* Horizontal accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            {/* Large background text */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none select-none overflow-hidden">
                <motion.span
                    className="block text-[15vw] font-bold text-white/[0.015] tracking-tighter whitespace-nowrap"
                    initial={{ x: '0%' }}
                    animate={{ x: '-20%' }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                    ENGINEERING EXCELLENCE • ENGINEERING EXCELLENCE •
                </motion.span>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <SlideReveal>
                        <span className="text-accent font-medium text-xs uppercase tracking-[0.3em]">
                            What We Do
                        </span>
                    </SlideReveal>
                    <TextReveal
                        text="Engineering Excellence"
                        as="h2"
                        className="mt-4 text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
                    {capabilities.map((cap, i) => (
                        <motion.div
                            key={cap.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-80px' }}
                            transition={{
                                delay: i * 0.12,
                                duration: 0.8,
                                ease: [0.33, 1, 0.68, 1],
                            }}
                            className="group"
                        >
                            <motion.div
                                className="relative p-8 lg:p-10 text-center h-full border border-white/5 hover:border-accent/20 transition-all duration-700 overflow-hidden"
                                whileHover={{ backgroundColor: 'rgba(232, 168, 56, 0.03)' }}
                            >
                                {/* Background number */}
                                <span className="absolute top-4 right-4 text-6xl font-bold text-white/[0.03] tracking-tighter">
                                    0{i + 1}
                                </span>

                                <motion.div
                                    className="text-5xl mb-6"
                                    whileHover={{ scale: 1.3, rotate: 10 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {cap.icon}
                                </motion.div>

                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-accent transition-colors duration-500">
                                    {cap.title}
                                </h3>
                                {/* <p className="text-sm text-white/30 leading-relaxed group-hover:text-white/50 transition-colors duration-500">
                                    {cap.description}
                                </p> */}

                                {/* Bottom accent line */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-0.5 bg-accent"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
