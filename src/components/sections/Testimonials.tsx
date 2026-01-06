"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getTestimonials } from "@/lib/content";
import { Container } from "@/components/ui/Container";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export function Testimonials() {
    const testimonials = getTestimonials();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideNext = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, [testimonials.length]);

    const slidePrev = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    }, [testimonials.length]);

    useEffect(() => {
        const timer = setInterval(slideNext, 8000);
        return () => clearInterval(timer);
    }, [slideNext]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    return (
        <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                        Client Testimonials
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        What others say about working with me
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto h-[400px] md:h-[350px] flex items-center justify-center">
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            className="absolute bg-white dark:bg-gray-800 p-10 md:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 w-full"
                        >
                            <Quote className="absolute top-10 right-10 w-16 h-16 text-primary-50 dark:text-primary-900/20" />

                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 italic leading-relaxed mb-8">
                                    "{testimonials[currentIndex].content}"
                                </p>

                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-primary-100 shrink-0">
                                        {testimonials[currentIndex].avatar ? (
                                            <Image
                                                src={testimonials[currentIndex].avatar}
                                                alt={testimonials[currentIndex].name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-primary-600 text-2xl font-bold">
                                                {testimonials[currentIndex].name[0]}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                                            {testimonials[currentIndex].name}
                                        </h4>
                                        <p className="text-primary-600 dark:text-primary-400 font-medium">
                                            {testimonials[currentIndex].role}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {testimonials[currentIndex].company}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={slidePrev}
                        className="absolute left-0 md:-left-20 z-20 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform hidden sm:block"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={slideNext}
                        className="absolute right-0 md:-right-20 z-20 p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:scale-110 transition-transform hidden sm:block"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {testimonials.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${idx === currentIndex
                                    ? "w-8 bg-primary-600"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                            aria-label={`Go to testimonial ${idx + 1}`}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
