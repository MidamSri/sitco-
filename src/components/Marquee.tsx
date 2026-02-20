'use client';

import { motion } from 'framer-motion';

export default function Marquee({
    text,
    speed = 'normal',
    className = '',
}: {
    text: string;
    speed?: 'slow' | 'normal' | 'fast';
    className?: string;
}) {
    const duration = speed === 'slow' ? 40 : speed === 'fast' ? 15 : 25;
    const repeated = `${text} — `.repeat(8);

    return (
        <div className={`overflow-hidden whitespace-nowrap ${className}`}>
            <motion.div
                className="inline-block"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration, repeat: Infinity, ease: 'linear' }}
            >
                <span className="text-[8vw] md:text-[6vw] font-bold tracking-tighter opacity-[0.03] select-none">
                    {repeated}
                </span>
            </motion.div>
        </div>
    );
}
