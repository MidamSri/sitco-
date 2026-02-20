'use client';

import { motion } from 'framer-motion';

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
    as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export default function TextReveal({
    text,
    className = '',
    delay = 0,
    staggerDelay = 0.03,
    as: Tag = 'h2',
}: TextRevealProps) {
    const words = text.split(' ');

    return (
        <Tag className={className}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-[0.3em] overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: '100%', rotateX: -80 }}
                        whileInView={{ y: '0%', rotateX: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{
                            duration: 0.8,
                            delay: delay + wordIndex * staggerDelay * 3,
                            ease: [0.33, 1, 0.68, 1],
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </Tag>
    );
}

// Character-by-character reveal for hero headlines
export function CharReveal({
    text,
    className = '',
    delay = 0,
}: {
    text: string;
    className?: string;
    delay?: number;
}) {
    const chars = text.split('');

    return (
        <span className={className} aria-label={text}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.6,
                        delay: delay + i * 0.02,
                        ease: [0.33, 1, 0.68, 1],
                    }}
                    style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </span>
    );
}

// Slide-up reveal for paragraphs
export function SlideReveal({
    children,
    className = '',
    delay = 0,
    direction = 'up',
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}) {
    const dirMap = {
        up: { y: 60, x: 0 },
        down: { y: -60, x: 0 },
        left: { y: 0, x: 60 },
        right: { y: 0, x: -60 },
    };

    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, ...dirMap[direction] }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{
                duration: 0.9,
                delay,
                ease: [0.33, 1, 0.68, 1],
            }}
        >
            {children}
        </motion.div>
    );
}

// Scale reveal for images / large elements
export function ScaleReveal({
    children,
    className = '',
    delay = 0,
}: {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 1,
                delay,
                ease: [0.33, 1, 0.68, 1],
            }}
        >
            {children}
        </motion.div>
    );
}
