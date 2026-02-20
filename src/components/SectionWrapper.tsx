'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
    delay?: number;
}

export default function SectionWrapper({ children, className = '', id, delay = 0 }: SectionWrapperProps) {
    return (
        <motion.section
            id={id}
            className={className}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: 'easeOut', delay }}
        >
            {children}
        </motion.section>
    );
}
