'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import TextReveal, { SlideReveal } from '@/components/TextReveal';

const products = [
    {
        title: 'Standard Radiators',
        description: 'Cost-effective and readily available transformer radiators in standard configurations for immediate deployment.',
        bullets: ['Sizes 700–4000 mm centre distance', 'Immediate availability for standard sizes', 'Most cost-effective solution', '520 mm width standard'],
        num: '01',
    },
    {
        title: 'Finned Radiators',
        description: 'High-performance finned radiators delivering superior thermal efficiency for demanding transformer applications.',
        bullets: ['91% thermal efficiency rating', 'Up to 40 fins per radiator', '90mm / 100mm OD fin options', 'High-performance cooling capacity'],
        num: '02',
    },
    {
        title: 'Customised Solutions',
        description: 'Fully bespoke radiator designs engineered to meet your exact transformer specifications and mounting requirements.',
        bullets: ['Swan Neck configurations', 'Off-side mounting options', 'Fully customizable dimensions', 'OEM-focused design partnership'],
        num: '03',
    },
    {
        title: 'Surface Treatments',
        description: 'Premium surface finishes providing superior corrosion resistance and extended radiator lifespan.',
        bullets: ['3 finish options available', 'Hot-dip galvanised finish', 'Corrosion protection coatings', 'Premium durability guarantee'],
        num: '04',
    },
];

export default function ProductsPage() {
    return (
        <>
            {/* Hero */}
            <section className="pt-40 pb-20 bg-charcoal relative overflow-hidden noise-overlay">
                <div className="absolute inset-0 hero-grid opacity-30" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                    <SlideReveal>
                        <span className="text-accent font-medium text-xs uppercase tracking-[0.3em]">Our Products</span>
                    </SlideReveal>
                    <TextReveal
                        text="Engineered for Performance"
                        as="h1"
                        className="mt-4 text-5xl md:text-6xl lg:text-8xl font-bold text-white tracking-tighter"
                    />
                    <SlideReveal delay={0.3}>
                        <p className="mt-6 text-lg text-white/40 max-w-2xl font-light">
                            From standard configurations to fully custom solutions, our transformer radiators are built for reliability, efficiency, and long service life.
                        </p>
                    </SlideReveal>
                </div>
            </section>

            {/* Products */}
            <section className="bg-charcoal">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                    <div className="space-y-2">
                        {products.map((product, i) => (
                            <motion.div
                                key={product.title}
                                initial={{ opacity: 0, y: 60 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ delay: i * 0.05, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                            >
                                <motion.div
                                    className="group border border-white/5 rounded-2xl overflow-hidden hover:border-accent/20 transition-all duration-700"
                                    whileHover={{ backgroundColor: 'rgba(232, 168, 56, 0.02)' }}
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                                        {/* Number + Title */}
                                        <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-center">
                                            <span className="text-7xl font-bold text-white/[0.04] tracking-tighter block mb-4 group-hover:text-accent/10 transition-colors duration-700">
                                                {product.num}
                                            </span>
                                            <h2 className="text-2xl lg:text-3xl font-bold text-white tracking-tight group-hover:text-accent transition-colors duration-500">
                                                {product.title}
                                            </h2>
                                        </div>

                                        {/* Description + Bullets */}
                                        <div className="lg:col-span-3 p-8 lg:p-12">
                                            <p className="text-white/35 mb-6 leading-relaxed">{product.description}</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {product.bullets.map((bullet, bi) => (
                                                    <motion.div
                                                        key={bullet}
                                                        className="flex items-center gap-3"
                                                        initial={{ opacity: 0, x: -20 }}
                                                        whileInView={{ opacity: 1, x: 0 }}
                                                        viewport={{ once: true }}
                                                        transition={{ delay: 0.1 + bi * 0.05, duration: 0.5 }}
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-accent/50 shrink-0" />
                                                        <span className="text-sm text-white/30 group-hover:text-white/50 transition-colors duration-500">{bullet}</span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-center mt-24"
                    >
                        <p className="text-white/30 text-lg mb-8">Need a specific configuration?</p>
                        <Link
                            href="/request-quote"
                            className="magnetic-btn group relative inline-flex px-12 py-5 bg-accent text-charcoal rounded-xl text-lg font-bold overflow-hidden"
                        >
                            <span className="relative z-10">Request a Custom Quote</span>
                            <motion.div
                                className="absolute inset-0 bg-white"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
                            />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
