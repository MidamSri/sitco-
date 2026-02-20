'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { CharReveal, SlideReveal } from './TextReveal';

export default function HeroSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
    const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '15%']);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[110vh] flex items-center justify-center overflow-hidden bg-charcoal noise-overlay"
        >
            {/* Animated grid background with parallax */}
            <motion.div className="absolute inset-0 hero-grid" style={{ y: bgY }} />

            {/* Speed lines — racing-inspired */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="speed-line"
                        style={{
                            top: `${10 + i * 12}%`,
                            left: '-100%',
                            right: '-100%',
                            height: i % 3 === 0 ? '2px' : '1px',
                        }}
                        animate={{
                            x: ['-100%', '200%'],
                        }}
                        transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: i * 0.3,
                        }}
                    />
                ))}
            </div>

            {/* Vertical accent lines */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`v-${i}`}
                        className="absolute w-px bg-gradient-to-b from-transparent via-accent/10 to-transparent"
                        style={{
                            left: `${25 + i * 25}%`,
                            top: 0,
                            bottom: 0,
                        }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ duration: 1.5, delay: 0.5 + i * 0.2, ease: [0.33, 1, 0.68, 1] }}
                    />
                ))}
            </div>

            {/* Large background text — Lando Norris style */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                style={{ y: bgY }}
            >
                <motion.span
                    className="text-[20vw] font-bold text-white/[0.02] tracking-tighter leading-none"
                    initial={{ opacity: 0, scale: 1.2 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                >
                    SITCO
                </motion.span>
            </motion.div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal" />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 via-transparent to-charcoal/40" />

            {/* Content */}
            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center"
                style={{ opacity, scale, y: textY }}
            >
                {/* Status badge */}
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
                    className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-accent/20 mb-10 bg-accent/5 backdrop-blur-sm"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                    </span>
                    <span className="text-accent text-sm font-medium tracking-wide">
                        Commercial production starting — 1st week of February 2026
                    </span>
                </motion.div>

                {/* Headline — character reveal */}
                <div className="mb-2">
                    <CharReveal
                        text="Manufacturing"
                        className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9]"
                        delay={0.5}
                    />
                </div>
                <div className="mb-2">
                    <CharReveal
                        text="Excellence"
                        className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9]"
                        delay={0.8}
                    />
                </div>
                <div className="mb-0">
                    <motion.span
                        className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gradient-clip tracking-tighter leading-[0.9]"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2, ease: [0.33, 1, 0.68, 1] }}
                    >
                        Transformer Radiators
                    </motion.span>
                </div>

                {/* Subhead */}
                <SlideReveal delay={1.4} className="mt-8">
                    <p className="text-lg md:text-xl text-white/50 max-w-xl mx-auto leading-relaxed font-light">
                        Built in Vadodara. State-of-the-art manufacturing for transformer radiators and allied components.
                    </p>
                </SlideReveal>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.6, ease: [0.33, 1, 0.68, 1] }}
                    className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link
                        href="/request-quote"
                        className="magnetic-btn group relative px-10 py-4 bg-accent text-charcoal rounded-xl text-lg font-bold overflow-hidden w-full sm:w-auto"
                    >
                        <span className="relative z-10">Request a Quote</span>
                        <motion.div
                            className="absolute inset-0 bg-white"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3, ease: [0.33, 1, 0.68, 1] }}
                        />
                    </Link>
                    <Link
                        href="/contact"
                        className="magnetic-btn group relative px-10 py-4 border border-white/20 text-white rounded-xl text-lg font-medium overflow-hidden w-full sm:w-auto hover:border-accent/50"
                    >
                        <span className="relative z-10 group-hover:text-accent transition-colors duration-300">
                            Technical Discussion
                        </span>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    className="flex flex-col items-center gap-3"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <span className="text-white/30 text-xs tracking-[0.3em] uppercase">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent" />
                </motion.div>
            </motion.div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />
        </section>
    );
}
