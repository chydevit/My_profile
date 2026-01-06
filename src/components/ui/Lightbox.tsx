'use client';

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface LightboxProps {
    images: string[];
    initialIndex?: number;
    isOpen: boolean;
    onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({
    images,
    initialIndex = 0,
    isOpen,
    onClose,
}) => {
    const [index, setIndex] = useState(initialIndex);
    const [direction, setDirection] = useState(0);

    useEffect(() => {
        if (isOpen) {
            setIndex(initialIndex);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, initialIndex]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') paginate(-1);
            if (e.key === 'ArrowRight') paginate(1);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, index, onClose]);

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = images.length - 1;
            if (nextIndex >= images.length) nextIndex = 0;
            return nextIndex;
        });
    };

    const handleDragEnd = (e: any, { offset, velocity }: PanInfo) => {
        const swipe = Math.abs(offset.x) * velocity.x;

        if (swipe < -100) {
            paginate(1);
        } else if (swipe > 100) {
            paginate(-1);
        }
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    if (!isOpen || typeof window === 'undefined') return null;

    return createPortal(
        <AnimatePresence initial={false} custom={direction}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors"
                    aria-label="Close lightbox"
                >
                    <X size={32} />
                </button>

                {images.length > 1 && (
                    <>
                        <button
                            onClick={() => paginate(-1)}
                            className="absolute left-4 z-50 p-2 text-white/70 hover:text-white transition-colors hidden md:block"
                            aria-label="Previous image"
                        >
                            <ChevronLeft size={48} />
                        </button>
                        <button
                            onClick={() => paginate(1)}
                            className="absolute right-4 z-50 p-2 text-white/70 hover:text-white transition-colors hidden md:block"
                            aria-label="Next image"
                        >
                            <ChevronRight size={48} />
                        </button>
                    </>
                )}

                <div className="relative w-full h-full max-w-6xl max-h-[90vh] mx-auto p-4 flex items-center justify-center overflow-hidden">
                    <motion.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: 'spring', stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={handleDragEnd}
                        className="absolute max-w-full max-h-full"
                    >
                        <div className="relative w-[90vw] h-[80vh] md:w-[80vw] md:h-[85vh]">
                            <Image
                                src={images[index]}
                                alt={`Gallery image ${index + 1}`}
                                fill
                                className="object-contain"
                                quality={90}
                                priority
                            />
                        </div>
                        <div className="absolute bottom-[-40px] left-0 right-0 text-center text-white/70 text-sm">
                            {index + 1} / {images.length}
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>,
        document.body
    );
};

export default Lightbox;
