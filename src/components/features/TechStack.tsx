"use client";

import { motion, useAnimationFrame, AnimatePresence, type PanInfo } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";
import type { IconType } from "react-icons";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiJavascript,
    SiVite,
    SiNestjs,
    SiDocker,
    SiGithub,
    SiGit,
    SiNpm,
    SiBun,
    SiPostgresql,
    SiMysql,
    SiFirebase,
    SiAmazon,
    SiGooglecloud,
    SiPrisma,
    SiStripe,
    SiTailwindcss,
    SiNodedotjs,
    SiFigma,
    SiMongodb,
    SiAndroid,
    SiKotlin,
    SiPython,
    SiHtml5,
    SiCss3,
    SiOpenjdk,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

const Icons: Record<string, IconType> = {
    React: SiReact,
    NextJS: SiNextdotjs,
    TypeScript: SiTypescript,
    JavaScript: SiJavascript,
    VSCode: VscVscode,
    Vite: SiVite,
    NestJS: SiNestjs,
    Docker: SiDocker,
    Github: SiGithub,
    Git: SiGit,
    NPM: SiNpm,
    Bun: SiBun,
    PostgreSQL: SiPostgresql,
    MySQL: SiMysql,
    Firebase: SiFirebase,
    AWS: SiAmazon,
    GoogleCloud: SiGooglecloud,
    Prisma: SiPrisma,
    Stripe: SiStripe,
    Tailwind: SiTailwindcss,
    NodeJS: SiNodedotjs,
    Figma: SiFigma,
    MongoDB: SiMongodb,
    Android: SiAndroid,
    Java: SiOpenjdk,
    Kotlin: SiKotlin,
    Python: SiPython,
    HTML: SiHtml5,
    CSS: SiCss3,
};
const items = [
    { icon: Icons.React, color: "text-[#61DAFB]", glow: "shadow-[#61DAFB]/20", label: "React", description: "A JavaScript library for building user interfaces." },
    { icon: Icons.TypeScript, color: "text-[#3178C6]", glow: "shadow-[#3178C6]/20", label: "TypeScript", description: "Typed superset of JavaScript that compiles to plain JavaScript." },
    { icon: Icons.NextJS, color: "text-foreground", glow: "shadow-foreground/20", label: "Next.js", description: "React framework for production-grade applications." },
    { icon: Icons.VSCode, color: "text-[#007ACC]", glow: "shadow-[#007ACC]/20", label: "VS Code", description: "Powerful code editor with extensive extensions." },
    { icon: Icons.Docker, color: "text-[#2496ED]", glow: "shadow-[#2496ED]/20", label: "Docker", description: "Platform for developing and running applications in containers." },
    { icon: Icons.Github, color: "text-foreground", glow: "shadow-foreground/20", label: "GitHub", description: "Hosting platform for version control and collaboration." },
    { icon: Icons.JavaScript, color: "text-[#F7DF1E]", glow: "shadow-[#F7DF1E]/20", label: "JavaScript", description: "Versatile programming language for web development." },
    { icon: Icons.Tailwind, color: "text-[#38B2AC]", glow: "shadow-[#38B2AC]/20", label: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development." },
    { icon: Icons.NodeJS, color: "text-[#339933]", glow: "shadow-[#339933]/20", label: "Node.js", description: "JavaScript runtime built on Chrome's V8 engine." },
    { icon: Icons.Figma, color: "text-[#F24E1E]", glow: "shadow-[#F24E1E]/20", label: "Figma", description: "Collaborative interface design tool." },
    { icon: Icons.MongoDB, color: "text-[#47A248]", glow: "shadow-[#47A248]/20", label: "MongoDB", description: "NoSQL database program using JSON-like documents." },
    { icon: Icons.Android, color: "text-[#3DDC84]", glow: "shadow-[#3DDC84]/20", label: "Android", description: "Mobile operating system based on Linux." },
    { icon: Icons.Java, color: "text-[#F89820]", glow: "shadow-[#F89820]/20", label: "Java", description: "High-level, class-based, object-oriented ecosystem." },
    { icon: Icons.Kotlin, color: "text-[#7F52FF]", glow: "shadow-[#7F52FF]/20", label: "Kotlin", description: "Cross-platform, statically typed, general-purpose language." },
    { icon: Icons.Python, color: "text-[#3776AB]", glow: "shadow-[#3776AB]/20", label: "Python", description: "High-level, general-purpose programming language." },
    { icon: Icons.HTML, color: "text-[#E34F26]", glow: "shadow-[#E34F26]/20", label: "HTML5", description: "Standard markup language for building web pages." },
    { icon: Icons.CSS, color: "text-[#1572B6]", glow: "shadow-[#1572B6]/20", label: "CSS3", description: "Style sheet language for styling HTML documents." },
    { icon: Icons.Vite, color: "text-[#646CFF]", glow: "shadow-[#646CFF]/20", label: "Vite", description: "Next generation front-end tooling designed for speed." },
    { icon: Icons.NestJS, color: "text-[#E0234E]", glow: "shadow-[#E0234E]/20", label: "NestJS", description: "Progressive Node.js framework for server-side apps." },
    { icon: Icons.Bun, color: "text-[#FBF0BA]", glow: "shadow-[#FBF0BA]/20", label: "Bun", description: "Fast all-in-one JavaScript runtime." },
    { icon: Icons.PostgreSQL, color: "text-[#336791]", glow: "shadow-[#336791]/20", label: "PostgreSQL", description: "Powerful, open source object-relational database." },
    { icon: Icons.Git, color: "text-[#F05032]", glow: "shadow-[#F05032]/20", label: "Git", description: "Distributed version control system." },
];

interface TechStackProps {
    onBack?: () => void;
}

export function TechStack({ onBack }: TechStackProps) {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const containerRef = useRef<HTMLDivElement>(null);
    const [radius, setRadius] = useState(190);
    const [isCompactLayout, setIsCompactLayout] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [selectedTech, setSelectedTech] = useState<typeof items[0] | null>(null);
    const [hoveredTech, setHoveredTech] = useState<typeof items[0] | null>(null);
    const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
    const [isPointerActive, setIsPointerActive] = useState(false);

    // Size the sphere from the rendered container so tablet/mobile stay inside bounds.
    useEffect(() => {
        const updateLayout = () => {
            const container = containerRef.current;
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const compactLayout = viewportWidth < 1024;
            const touchDevice = window.matchMedia("(pointer: coarse)").matches;
            const minSize = Math.min(
                container?.clientWidth ?? viewportWidth,
                container?.clientHeight ?? viewportHeight,
            );

            let nextRadius = 190;
            if (viewportWidth < 400) {
                nextRadius = Math.min(88, minSize * 0.34);
            } else if (viewportWidth < 640) {
                nextRadius = Math.min(108, minSize * 0.36);
            } else if (viewportWidth < 1024) {
                nextRadius = Math.min(138, minSize * 0.38);
            } else {
                nextRadius = Math.min(190, minSize * 0.4);
            }

            setRadius(Math.max(72, nextRadius));
            setIsCompactLayout(compactLayout || viewportHeight < 760);
            setIsTouchDevice(touchDevice);
        };

        updateLayout();

        const observer = new ResizeObserver(() => updateLayout());
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        window.addEventListener("resize", updateLayout);
        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateLayout);
        };
    }, []);

    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const velocity = useRef({ x: 0, y: 0 });

    // Auto-rotation with inertia
    useAnimationFrame((t, delta) => {
        if (isDragging) return;

        const pointerInfluenceX = isPointerActive ? pointerPosition.y * 0.003 : 0;
        const pointerInfluenceY = isPointerActive ? pointerPosition.x * 0.003 : 0;

        // Decay velocity
        velocity.current.x *= 0.95;
        velocity.current.y *= 0.95;

        // Combined constant rotation + inertia
        setRotation(prev => ({
            x: prev.x + (delta * 0.002) + (velocity.current.x * delta * 0.0001) + pointerInfluenceX,
            y: prev.y + (delta * 0.002) + (velocity.current.y * delta * 0.0001) + pointerInfluenceY
        }));
    });

    const updatePointerPosition = (clientX: number, clientY: number, element: HTMLDivElement) => {
        const bounds = element.getBoundingClientRect();
        const x = clientX - (bounds.left + bounds.width / 2);
        const y = clientY - (bounds.top + bounds.height / 2);

        setPointerPosition({ x, y });
        setIsPointerActive(true);
    };

    const handleDrag = (_: PointerEvent, info: PanInfo) => {
        if (isCompactLayout || isTouchDevice) return;
        setRotation(prev => ({
            x: prev.x + info.delta.y * 0.1,
            y: prev.y + info.delta.x * 0.1
        }));
    };

    const handleDragEnd = (_: PointerEvent, info: PanInfo) => {
        if (isCompactLayout || isTouchDevice) {
            setIsDragging(false);
            return;
        }
        setIsDragging(false);
        velocity.current = { x: info.velocity.y, y: info.velocity.x };
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (isCompactLayout || event.pointerType !== "mouse") return;
        updatePointerPosition(event.clientX, event.clientY, event.currentTarget);
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "mouse") {
            resetPointerState();
            return;
        }
        updatePointerPosition(event.clientX, event.clientY, event.currentTarget);
    };

    const resetPointerState = () => {
        setIsPointerActive(false);
        setPointerPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`group relative h-full w-full overflow-hidden ${isCompactLayout ? "touch-auto" : "cursor-grab touch-pan-y active:cursor-grabbing"}`}
            onClick={(e) => {
                if (onBack) {
                    e.stopPropagation();
                    onBack();
                }
            }}
            onPan={handleDrag}
            onPanStart={() => {
                if (isCompactLayout || isTouchDevice) return;
                setIsDragging(true);
            }}
            onPanEnd={handleDragEnd}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerLeave={() => {
                resetPointerState();
                setHoveredTech(null);
            }}
            onPointerCancel={() => {
                resetPointerState();
                setHoveredTech(null);
            }}
            onPointerUp={() => {
                resetPointerState();
                setHoveredTech(null);
            }}
        >
            {/* Central Logo/Icon (Optional - User's logo or just empty space) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Animated Central Node */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className={`flex h-12 w-12 items-center justify-center rounded-full border border-foreground/10 bg-foreground/5 backdrop-blur-sm transition-opacity duration-300 sm:h-14 sm:w-14 md:h-16 md:w-16 ${hoveredTech && !selectedTech ? "opacity-0" : "opacity-100"}`}
                >
                    <div className="h-6 w-6 rounded-full bg-primary-500/50 blur-md sm:h-7 sm:w-7 md:h-8 md:w-8" />
                </motion.div>
            </div>

            <AnimatePresence>
                {hoveredTech && !selectedTech && !isCompactLayout && (
                    <motion.div
                        initial={{ opacity: 0, y: 18, scale: 0.94 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 18, scale: 0.94 }}
                        transition={{ duration: 0.24, ease: "easeOut" }}
                        className="pointer-events-none absolute left-1/2 top-1/2 z-40 w-[min(92%,24rem)] -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="rounded-[2rem] border border-white/10 bg-background/70 px-4 py-5 text-center shadow-[0_30px_80px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:px-6 sm:py-7">
                            <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground/5 sm:h-16 sm:w-16 ${hoveredTech.color}`}>
                                <hoveredTech.icon className="h-8 w-8 drop-shadow-[0_0_18px_currentColor] sm:h-9 sm:w-9" />
                            </div>
                            <p className={`mb-2 text-sm font-medium tracking-[0.18em] uppercase ${hoveredTech.color}`}>
                                Tech Stack
                            </p>
                            <h3 className="text-2xl font-semibold tracking-tight text-foreground sm:text-4xl">
                                {hoveredTech.label}
                            </h3>
                            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted-foreground sm:text-base">
                                {hoveredTech.description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Icons */}
            {isMounted && items.map((item, index) => {
                const phi = Math.acos(-1 + (2 * index) / items.length);
                const theta = Math.sqrt(items.length * Math.PI) * phi;

                // Convert spherical to Cartesian coordinates
                const x0 = radius * Math.cos(theta) * Math.sin(phi);
                const y0 = radius * Math.sin(theta) * Math.sin(phi);
                const z0 = radius * Math.cos(phi);

                // Apply rotation
                const degToRad = Math.PI / 180;
                const rotX = rotation.x * degToRad;
                const rotY = rotation.y * degToRad;

                // Rotate around X-axis
                const y1 = y0 * Math.cos(rotX) - z0 * Math.sin(rotX);
                const z1 = y0 * Math.sin(rotX) + z0 * Math.cos(rotX);

                // Rotate around Y-axis
                const x2 = x0 * Math.cos(rotY) + z1 * Math.sin(rotY);
                const z2 = -x0 * Math.sin(rotY) + z1 * Math.cos(rotY);

                // Perspective projection
                const scale = (z2 + radius * 2) / (radius * 3);
                const opacity = Math.max(0.1, (z2 + radius) / (radius * 2));
                const zIndex = Math.floor(z2 + radius);
                const blur = Math.max(0, (radius - z2) * 0.02); // Depth blur
                const distanceFromPointer = Math.hypot(pointerPosition.x - x2, pointerPosition.y - y1);
                const hoverStrength = !isCompactLayout && isPointerActive ? Math.max(0, 1 - distanceFromPointer / 140) : 0;
                const interactiveScale = scale + hoverStrength * 0.22;
                const interactiveY = y1 - hoverStrength * 14;
                const interactiveOpacity = Math.min(1, opacity + hoverStrength * 0.35);

                return (
                    <div
                        key={index}
                        className={`absolute top-1/2 left-1/2 ${item.color} flex flex-col items-center justify-center`}
                        style={{
                            transform: `translate(calc(-50% + ${x2}px), calc(-50% + ${interactiveY}px)) scale(${interactiveScale})`,
                            opacity: interactiveOpacity,
                            zIndex: zIndex,
                            filter: `blur(${blur}px)`,
                        }}
                    >
                        <div 
                            className={`relative group rounded-2xl p-1.5 transition-all duration-500 ${isCompactLayout ? "cursor-default" : "cursor-pointer hover:bg-white/5"} sm:p-2 md:p-4`}
                            onMouseEnter={() => {
                                if (isCompactLayout) return;
                                setHoveredTech(item);
                            }}
                            onMouseLeave={() => {
                                if (isCompactLayout) return;
                                setHoveredTech((current) => current?.label === item.label ? null : current);
                            }}
                            onPointerDown={(e) => {
                                e.stopPropagation();
                                if (!isCompactLayout && e.pointerType === "mouse") {
                                    setHoveredTech(item);
                                }
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (isCompactLayout) return;
                                setSelectedTech(item);
                            }}
                            role="button"
                            tabIndex={isCompactLayout ? -1 : 0}
                            onKeyDown={(e) => {
                                if (isCompactLayout) return;
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setSelectedTech(item);
                                }
                            }}
                            style={{
                                backgroundColor: hoverStrength > 0 ? `rgb(255 255 255 / ${0.04 + hoverStrength * 0.1})` : undefined,
                            }}
                        >
                            <item.icon
                                className={`h-7 w-7 drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-transform duration-300 sm:h-9 sm:w-9 ${isCompactLayout ? "md:h-11 md:w-11" : "md:h-16 md:w-16"} group-hover:scale-110`}
                                style={{
                                    transform: `scale(${1 + hoverStrength * 0.18})`,
                                    filter: `drop-shadow(0 0 ${15 + hoverStrength * 18}px currentColor)`,
                                }}
                            />
                            
                            {/* Glow Effect */}
                            <div
                                className={`absolute inset-0 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity bg-current`}
                                style={{ opacity: 0.2 + hoverStrength * 0.45 }}
                            />
                        </div>
                    </div>
                );
            })}

            {/* Click hint */}
            {onBack && !selectedTech && (
                <div className="pointer-events-none absolute bottom-4 left-0 right-0 hidden text-center lg:block">
                    <p className="text-xs text-muted-foreground animate-bounce">Click surrounding space to return</p>
                </div>
            )}

            {/* Selected Tech Detail Overlay */}
            <AnimatePresence>
                {selectedTech && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[1000] flex cursor-default items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTech(null);
                        }}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className={`relative flex max-h-[90svh] w-full max-w-sm flex-col items-center gap-5 overflow-y-auto rounded-3xl border border-foreground/10 bg-background p-6 pt-12 shadow-2xl sm:p-8 sm:pt-12 ${selectedTech.glow} cursor-auto`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTech(null);
                                }}
                                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-foreground/5 cursor-pointer z-10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                            </button>
                            
                            <div className={`${selectedTech.color} p-4 rounded-2xl bg-foreground/5`}>
                                <selectedTech.icon className="h-20 w-20 drop-shadow-[0_0_20px_rgba(0,0,0,0.5)] sm:h-24 sm:w-24" />
                            </div>
                            
                            <div className="text-center space-y-3">
                                <h3 className={`text-3xl font-bold ${selectedTech.color}`}>{selectedTech.label}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {selectedTech.description}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
