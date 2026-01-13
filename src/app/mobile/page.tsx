"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PhoneSystem, EngineeringStage } from "@/components/PhoneSystem";
import { ArrowLeft, Smartphone, Layers, Cpu, Wifi } from "lucide-react";
import { TechGrid, GridItemProps } from "@/components/TechGrid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface WalkthroughStage {
    id: EngineeringStage;
    title: string;
    copy: string;
    gradient: string;
}

const stages: WalkthroughStage[] = [
    {
        id: "foundation",
        title: "Architecture First",
        copy: "I don't just write code; I design systems that outlive their initial requirements. My approach relies on strict Unidirectional Data Flow (UDF) and Clean Architecture principles, ensuring that business logic is completely decoupled from the UI layer. This means the app remains stable, testable, and scalable even as frameworks evolve.",
        gradient: "radial-gradient(circle at 30% 40%, rgba(6,182,212,0.25), transparent 60%)" // Cyan / Teal
    },
    {
        id: "performance",
        title: "Performance Is the Baseline",
        copy: "A frame dropped is trust lost, so I treat performance as a fundamental feature, not an afterthought. By meticulously profiling recomposition counts and optimizing memory allocation, I ensure 60 FPS buttery smooth rendering even on low-end devices. It’s about respecting the user’s hardware constraints while delivering a premium experience.",
        gradient: "radial-gradient(circle at 30% 40%, rgba(16,185,129,0.25), transparent 60%)" // Emerald
    },
    {
        id: "ux",
        title: "Intuitive UX",
        copy: "Great engineering is invisible; users should feel the app, not just use it. I implement complex gesture handling and physics-based animations that respond organically to touch, creating a tactile connection that feels alive. It’s the difference between a static screen and a responsive digital surface.",
        gradient: "radial-gradient(circle at 30% 40%, rgba(168,85,247,0.30), transparent 60%)" // Purple
    },
    {
        id: "resilience",
        title: "Built for Reality",
        copy: "Real-world connectivity is messy, so I build apps that thrive in chaos. Using robust offline-first synchronization strategies and optimistic UI updates, I ensure the user never sees a loading spinner when they shouldn't. The data is queued, persisted, and synced silently, banking on eventual consistency without compromising data integrity.",
        gradient: "radial-gradient(circle at 30% 40%, rgba(245,158,11,0.20), transparent 60%)" // Amber
    }
];

const mobileSpecs: GridItemProps[] = [
    {
        title: "Native Engineering",
        description: "Moving from Java legacy to pure Kotlin & Compose.",
        icon: <Smartphone size={20} />,
        tags: ["Kotlin", "Java", "Android SDK"],
        gradient: "linear-gradient(to bottom right, #0ea5e9, #22d3ee)",
        colSpan: 2
    },
    {
        title: "Modern UI",
        description: "Declarative UI patterns separating state from rendering.",
        icon: <Layers size={20} />,
        tags: ["Jetpack Compose", "Material 3"],
        gradient: "linear-gradient(to bottom right, #a855f7, #e879f9)",
    },
    {
        title: "Async & State",
        description: "Managing data streams without blocking main thread.",
        icon: <Cpu size={20} />,
        tags: ["Coroutines", "Flow", "MVI"],
        gradient: "linear-gradient(to bottom right, #f59e0b, #fbbf24)",
    },
    {
        title: "Offline-First",
        description: "Apps that work regardless of connectivity.",
        icon: <Wifi size={20} />,
        tags: ["Room DB", "WorkManager"],
        gradient: "linear-gradient(to bottom right, #10b981, #34d399)",
    }
];

// ... existing imports
import { ProjectCard, ProjectCardProps } from "@/components/ProjectCard";

// ... existing code

const mobileProjects: ProjectCardProps[] = [
    {
        title: "The Signal (Android Node)",
        type: "MOBILE",
        status: "ALPHA",
        rank: "FLAGSHIP",
        thesis: "Native implementation of a cognitive security protocol acting as a sanctuary against the 'Attention Economy'. Features hardware-backed isolation to block trackers at the OS level and ensures cognitive sovereignty.",
        tech: ["Kotlin", "Compose", "Android Keystore", "ExoPlayer"]
    },
    {
        title: "GoodTurn Client",
        type: "MOBILE",
        status: "BETA",
        rank: "SIDE",
        thesis: "A social engineering experiment gamifying altruism through 'variable-ratio reinforcement' schedules. Uses a custom physics engine and haptic feedback to create a friction-free, stochastic behavioral modification loop.",
        tech: ["Flutter/Kotlin", "Physics Engine", "Haptics"]
    },
    {
        title: "Sonar Discovery",
        type: "MOBILE",
        status: "CONCEPT",
        rank: "CONCEPT",
        thesis: "Disrupts algorithmic monopolies via a 'Rapid Decision Mechanism'. Uses heuristic pre-fetching and psycho-acoustic preference mapping to democratize music discovery through intuitive swipe gestures.",
        tech: ["Kotlin", "Waveform Viz", "YouTube API"]
    }
];

export default function MobilePage() {
    const [currentStage, setCurrentStage] = useState<EngineeringStage>("foundation");

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">

            {/* FIXED BACKGROUND LAYER */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStage}
                        className="absolute inset-0"
                        style={{ background: stages.find(s => s.id === currentStage)?.gradient }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                </AnimatePresence>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 pt-4 pb-20">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* LEFT COLUMN: VISUAL ANCHOR (STICKY & CENTERED) */}
                    <div className="lg:col-span-6 hidden lg:flex h-screen sticky top-0 items-center justify-center">
                        <div className="w-full h-full flex flex-col items-center justify-center py-12 relative">
                            <PhoneSystem stage={currentStage} />

                            {/* PUNCHLINE - Strategic Enhancement */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="absolute bottom-20 text-center"
                            >
                                <p className="font-mono text-sm text-zinc-500 uppercase tracking-widest mb-2">Philosophy</p>
                                <p className="text-xl md:text-2xl font-light text-white italic opacity-80">
                                    "Not just an app. A digital sanctuary."
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: NARRATIVE (SCROLLABLE) */}
                    <div className="lg:col-span-6 lg:pl-12 pt-32 lg:pt-0">

                        {/* INTRO: TECH GRID */}
                        <div className="min-h-[90vh] flex flex-col justify-center">

                            <TechGrid
                                title="Mobile Engineering Stack"
                                subtitle="The tools and technologies I use to build world-class Android applications."
                                items={mobileSpecs}
                                compact={true}
                            />
                            <div className="mt-12 text-zinc-500 animate-bounce">
                                ↓ Scroll to see the engineering process
                            </div>
                        </div>

                        {/* Mobile Top Visual - Static (Only visible on mobile) */}
                        <div className="lg:hidden h-[60vh] flex items-center justify-center sticky top-0 z-0">
                            <div className="scale-[0.85] origin-center shadow-2xl">
                                <PhoneSystem stage={currentStage} />
                            </div>
                        </div>

                        <div className="space-y-[20vh]">
                            {stages.map((stage) => {
                                const isActive = currentStage === stage.id;
                                return (
                                    <div
                                        key={stage.id}
                                        className="min-h-[60vh] flex flex-col justify-center relative z-10"
                                    >
                                        <ScrollTrigger onEnter={() => setCurrentStage(stage.id)} />

                                        <motion.div
                                            className="space-y-6 max-w-lg p-6 rounded-3xl transition-colors duration-500"
                                            animate={{ opacity: isActive ? 1 : 0.3 }}
                                            style={{ filter: isActive ? 'blur(0px)' : 'blur(2px)' }}
                                        >
                                            {/* Stage Number & Label */}
                                            <div className={`flex items-center gap-4 text-sm font-mono uppercase tracking-widest transition-colors duration-500
                                                ${isActive ? 'text-white' : 'text-zinc-600'}`}>
                                                <span className="text-lg font-bold">0{stages.indexOf(stage) + 1}</span>
                                                <div className={`h-[1px] w-12 transition-colors duration-500 ${isActive ? 'bg-white' : 'bg-zinc-800'}`} />
                                                {stage.id}
                                            </div>

                                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
                                                {stage.title}
                                            </h2>

                                            <p className="text-xl leading-relaxed font-light text-zinc-200">
                                                {stage.copy}
                                            </p>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* PROJECT LAB - STEALTH CARDS */}
                        <div className="min-h-[50vh] pt-32 pb-16">
                            <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-8 border-b border-zinc-800 pb-4">
                                Mobile R&D Lab
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                {mobileProjects.map((project, idx) => (
                                    <ProjectCard key={project.title} {...project} index={idx} />
                                ))}
                            </div>
                        </div>

                        {/* Ending Navigation */}
                        <div className="min-h-[30vh] flex flex-col justify-center gap-8 border-t border-white/10 mt-20 pt-20">
                            <div>
                                <h3 className="text-3xl font-medium text-white mb-4">This is how I build mobile apps.</h3>
                                <p className="text-zinc-500 text-lg">Rigorous engineering, native performance.</p>
                            </div>

                            <Link
                                href="/backend"
                                className="group inline-flex items-center gap-4 text-xl text-white font-medium hover:text-cyan-400 transition-colors"
                            >
                                Explore Backend Engineering
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </main>
    );
}

// Invisible trigger to detect scroll position more accurately
const ScrollTrigger = ({ onEnter }: { onEnter: () => void }) => {
    return (
        <motion.div
            className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 bg-transparent pointer-events-none"
            onViewportEnter={() => onEnter()}
            viewport={{ amount: 1, margin: "-45% 0px -45% 0px" }}
        />
    )
}
