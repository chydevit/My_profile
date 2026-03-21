'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressProps {
    className?: string;
    color?: string;
    height?: number;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
    className = '',
    color = 'bg-gradient-to-r from-primary-400 to-primary-700',
    height = 3,
}) => {
    const [mounted, setMounted] = useState(false);
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    useEffect(() => { setMounted(true); }, []);

    if (!mounted) return null;

    return (
        <motion.div
            className={`fixed top-0 left-0 right-0 z-50 origin-left ${color} ${className}`}
            style={{
                scaleX,
                height: `${height}px`,
            }}
        />
    );
};

export default ScrollProgress;
