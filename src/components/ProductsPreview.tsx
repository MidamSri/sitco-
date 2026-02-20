'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import TextReveal, { SlideReveal } from './TextReveal';
import Marquee from './Marquee';

const products = [
    {
        title: 'Standard Radiators',
        bullets: ['Sizes 700–4000 mm', 'Immediate availability', 'Most cost-effective'],
        num: '01',
        href: '/products',
    },
    {
        title: 'Finned Radiators',
        bullets: ['91% thermal efficiency', 'Up to 40 fins', 'High-performance cooling'],
        num: '02',
        href: '/products',
    },
    {
        title: 'Customised Solutions',
        bullets: ['Swan Neck & Off-side', 'Fully customizable design', 'OEM-focused'],
        num: '03',
        href: '/products',
    },
    {
        title: 'Surface Treatments',
        bullets: ['3 finish options', 'Corrosion protection', 'Premium durability'],
        num: '04',
        href: '/products',
    },
];

export default function ProductsPreview() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const bgX = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);

    return (
        <section ref={sectionRef} className="relative py-32 lg:py-44 bg-charcoal overflow-hidden">
            {/* Background marquee — positioned behind everything */}
            <motion.div className="absolute bottom-8 left-0 right-0 pointer-events-none" style={{ x: bgX }}>
                <Marquee text="ENGINEERED FOR PERFORMANCE" speed="fast" className="text-white" />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-20">
                    <SlideReveal>
                        <span className="text-accent font-medium text-xs uppercase tracking-[0.3em] block mb-4">
                            Our Products
                        </span>
                    </SlideReveal>
                    <TextReveal
                        text="Engineered for Performance"
                        as="h2"
                        className="text-4xl md:text-5xl lg:text-7xl font-bold text-white tracking-tighter"
                    />
                </div>

                {/* Product cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {products.map((product, i) => (
                        <motion.div
                            key={product.title}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{
                                delay: i * 0.1,
                                duration: 0.8,
                                ease: [0.33, 1, 0.68, 1],
                            }}
                        >
                            <Link href={product.href}>
                                <motion.div
                                    className="glow-card relative rounded-2xl bg-charcoal-light border border-white/[0.08] p-8 lg:p-10 h-full cursor-pointer group overflow-hidden transition-all duration-700 hover:border-accent/20"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                                >
                                    {/* Number badge */}
                                    <div className="w-20 h-20 bg-accent rounded-xl flex items-center justify-center mb-8">
                                        <span className="text-3xl font-bold text-charcoal italic tracking-tight">
                                            {product.num}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl lg:text-3xl font-bold text-accent mb-6 tracking-tight">
                                        {product.title}
                                    </h3>

                                    {/* Bullets */}
                                    <ul className="space-y-3 mb-8">
                                        {product.bullets.map((bullet) => (
                                            <li
                                                key={bullet}
                                                className="flex items-center gap-3 text-sm text-white/50 group-hover:text-white/70 transition-colors duration-500"
                                            >
                                                <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Arrow */}
                                    <div className="text-accent group-hover:translate-x-2 transition-transform duration-300">
                                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </div>

                                    {/* Hover glow */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br from-accent/[0.03] to-transparent" />
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Section divider */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </section>
    );
}
