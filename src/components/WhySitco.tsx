'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TextReveal, { SlideReveal } from './TextReveal';

const icons = {
    clock: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    ),
    building: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
        </svg>
    ),
    pencil: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
        </svg>
    ),
    shield: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
        </svg>
    ),
};

const benefits = [
    {
        title: 'Timely Delivery',
        description: 'Committed production schedules with transparent tracking from order to dispatch.',
        icon: icons.clock,
        num: '01',
    },
    {
        title: 'OEM-Focused Manufacturing',
        description: 'Purpose-built facility designed to serve OEM requirements at scale.',
        icon: icons.building,
        num: '02',
    },
    {
        title: 'Custom Design Capability',
        description: 'In-house engineering team for bespoke radiator solutions matching your specs.',
        icon: icons.pencil,
        num: '03',
    },
    {
        title: 'Industry-Standard Quality',
        description: 'Rigorous multi-point inspection ensuring leak-proof, performance-grade radiators.',
        icon: icons.shield,
        num: '04',
    },
];

export default function WhySitco() {
    return (
        <section className="relative py-32 lg:py-44 bg-charcoal overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <SlideReveal>
                        <span className="text-accent font-medium text-xs uppercase tracking-[0.3em]">
                            Why Choose Us
                        </span>
                    </SlideReveal>
                    <TextReveal
                        text="Why SITCO"
                        as="h2"
                        className="mt-4 text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter"
                    />
                </div>

                {/* Horizontal layout like Lando's partnerships section */}
                <div className="space-y-1">
                    {benefits.map((benefit, i) => (
                        <motion.div
                            key={benefit.title}
                            initial={{ opacity: 0, x: -60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{
                                delay: i * 0.1,
                                duration: 0.8,
                                ease: [0.33, 1, 0.68, 1],
                            }}
                        >
                            <motion.div
                                className="group flex items-center gap-8 p-6 lg:p-8 border-b border-white/5 hover:bg-white/[0.02] transition-all duration-700 cursor-pointer"
                                whileHover={{ x: 12 }}
                                transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                            >
                                {/* Number */}
                                <span className="text-2xl font-bold text-white/10 group-hover:text-accent/30 transition-colors duration-500 hidden sm:block w-12">
                                    {benefit.num}
                                </span>

                                {/* Icon */}
                                <motion.div
                                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-accent/60 group-hover:text-accent group-hover:border-accent/20 transition-all duration-500 shrink-0"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {benefit.icon}
                                </motion.div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg lg:text-xl font-bold text-white group-hover:text-accent transition-colors duration-500">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-sm text-white/30 mt-1 group-hover:text-white/50 transition-colors duration-500">
                                        {benefit.description}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <motion.div
                                    className="text-white/10 group-hover:text-accent transition-colors duration-500 shrink-0"
                                    initial={{ x: 0 }}
                                    whileHover={{ x: 8 }}
                                >
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                    </svg>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="text-center mt-20"
                >
                    <p className="text-white/60 text-lg mb-8">Ready to Explore Partnership?</p>
                    <Link
                        href="/contact"
                        className="magnetic-btn inline-flex px-12 py-5 bg-accent text-charcoal rounded-xl text-lg font-bold hover:bg-accent-hover hover:shadow-xl hover:shadow-accent/25 hover:-translate-y-1 active:scale-95 transition-all duration-300"
                    >
                        Get in Touch
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
