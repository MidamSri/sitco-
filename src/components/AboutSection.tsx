'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal, { SlideReveal } from './TextReveal';

const stats = [
    { value: '700–4000', unit: 'mm', label: 'Centre Distance Range' },
    { value: '40', unit: '+', label: 'Fins Per Radiator' },
    { value: '91', unit: '%', label: 'Thermal Efficiency' },
    { value: '2026', unit: '', label: 'Production Launch' },
];

export default function AboutSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const imgScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
    const textX = useTransform(scrollYProgress, [0, 1], ['5%', '-5%']);

    return (
        <section ref={sectionRef} className="relative py-32 lg:py-44 bg-charcoal overflow-hidden">
            {/* Diagonal accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    {/* Stats side — large numbers like Lando's race stats */}
                    <div>
                        <motion.div
                            className="grid grid-cols-2 gap-6"
                            style={{ x: textX }}
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: i * 0.15,
                                        duration: 0.8,
                                        ease: [0.33, 1, 0.68, 1],
                                    }}
                                    className="glow-card rounded-2xl p-6 lg:p-8 group"
                                >
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl lg:text-5xl font-bold text-white tracking-tighter group-hover:text-accent transition-colors duration-500">
                                            {stat.value}
                                        </span>
                                        <span className="text-xl text-accent font-bold">{stat.unit}</span>
                                    </div>
                                    <p className="text-xs text-white/30 mt-2 uppercase tracking-wider font-medium group-hover:text-white/50 transition-colors duration-500">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Text side */}
                    <div>
                        <SlideReveal>
                            <span className="text-accent font-medium text-xs uppercase tracking-[0.3em] block mb-4">
                                About SITCO
                            </span>
                        </SlideReveal>
                        <TextReveal
                            text="Precision Manufacturing in Gujarat"
                            as="h2"
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tighter mb-8"
                        />
                        <SlideReveal delay={0.3}>
                            <div className="space-y-5 text-white/40 leading-relaxed text-sm lg:text-base">
                                <p>
                                    SITCO is a next-generation manufacturer of high-performance transformer radiators,
                                    strategically located in Manjusar, Vadodara — the industrial heartland of Gujarat.
                                    Our state-of-the-art facility is designed from the ground up for precision, efficiency,
                                    and scale.
                                </p>
                                <p>
                                    With cutting-edge manufacturing technology and a team of experienced engineers,
                                    we deliver radiators that meet the most demanding specifications. From standard
                                    configurations to fully custom solutions, every product that leaves our facility
                                    is tested to exacting quality standards.
                                </p>
                            </div>
                        </SlideReveal>

                        {/* Location badge */}
                        <SlideReveal delay={0.5}>
                            <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.02]">
                                <span className="text-accent">📍</span>
                                <div>
                                    <p className="text-white text-sm font-semibold">Manjusar, Vadodara</p>
                                    <p className="text-white/30 text-xs">Gujarat, India</p>
                                </div>
                            </div>
                        </SlideReveal>
                    </div>
                </div>
            </div>

            {/* Animated parallax image placeholder */}
            <motion.div
                className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/[0.02] blur-3xl pointer-events-none"
                style={{ scale: imgScale }}
            />
        </section>
    );
}
