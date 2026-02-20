'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/capabilities', label: 'Capabilities' },
    { href: '/contact', label: 'Contact' },
];

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        setScrolled(latest > 50);
        // Hide header on scroll down, show on scroll up
        if (latest > previous && latest > 300) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [mobileOpen]);

    return (
        <motion.header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
                    ? 'bg-charcoal/90 backdrop-blur-xl shadow-2xl shadow-black/20'
                    : 'bg-transparent'
                }`}
            initial={{ y: -100 }}
            animate={{ y: hidden ? -100 : 0 }}
            transition={{ duration: 0.4, ease: [0.33, 1, 0.68, 1] }}
        >
            {/* Progress bar */}
            <motion.div
                className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-accent via-accent-light to-accent"
                style={{ scaleX: useScroll().scrollYProgress, transformOrigin: '0%' }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center font-bold text-charcoal text-lg overflow-hidden relative"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            <motion.span
                                initial={{ y: 0 }}
                                whileHover={{ y: -30 }}
                                className="absolute"
                            >
                                S
                            </motion.span>
                            <motion.span
                                initial={{ y: 30 }}
                                whileHover={{ y: 0 }}
                                className="absolute"
                            >
                                S
                            </motion.span>
                        </motion.div>
                        <div>
                            <span className="font-bold text-lg text-white tracking-tight">SITCO</span>
                            <span className="block text-[10px] tracking-[0.2em] uppercase text-white/40">
                                Transformer Radiators
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                            >
                                <Link
                                    href={link.href}
                                    className="relative px-4 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 group"
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" />
                                </Link>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            <Link
                                href="/request-quote"
                                className="magnetic-btn ml-4 px-6 py-2.5 bg-accent text-charcoal rounded-xl text-sm font-bold hover:bg-accent-hover transition-all duration-300 hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 active:scale-95"
                            >
                                Request Quote
                            </Link>
                        </motion.div>
                    </nav>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden relative w-10 h-10 flex items-center justify-center"
                        aria-label="Toggle menu"
                    >
                        <div className="flex flex-col gap-1.5">
                            <motion.span
                                className="block h-0.5 w-6 rounded bg-white"
                                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="block h-0.5 w-6 rounded bg-white"
                                animate={mobileOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="block h-0.5 w-6 rounded bg-white"
                                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                        animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
                        exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
                        transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                        className="md:hidden fixed inset-0 top-20 bg-charcoal/98 backdrop-blur-2xl"
                    >
                        <nav className="flex flex-col px-6 py-12 gap-2">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.08, ease: [0.33, 1, 0.68, 1] }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="block px-4 py-4 text-white/70 hover:text-white hover:pl-8 text-3xl font-bold transition-all duration-300 border-b border-white/5"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link
                                    href="/request-quote"
                                    onClick={() => setMobileOpen(false)}
                                    className="block mt-8 px-6 py-4 bg-accent text-charcoal rounded-xl text-center text-xl font-bold hover:bg-accent-hover transition-all"
                                >
                                    Request Quote
                                </Link>
                            </motion.div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
