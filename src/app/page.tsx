"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTypewriter } from "@/hooks/useTypewriter";
import { motion, useInView } from "framer-motion";
import { Smartphone, Server, Terminal, GitBranch, Cpu, Command, Laptop, Database } from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { TechGrid, GridItemProps } from "@/components/TechGrid";
import { NeofetchCard } from "@/components/NeofetchCard";
import { GlassCard } from "@/components/GlassCard";
import { EngineeringStory } from "@/components/EngineeringStory";
import { EngineeringPrinciples } from "@/components/EngineeringPrinciples";

const coreSpecs: GridItemProps[] = [
    {
        title: "The Arch Way",
        description: "Minimalism, modernity, and pragmatism. I run a custom kernel for peak compilation speeds.",
        // Keeping the Neofetch style as requested
        customContent: <NeofetchCard />,
        colSpan: 1
    },
    {
        title: "The Terminal",
        description: "Efficiency comes from scripting, not clicking. I prefer the precision of the CLI.",
        icon: <Terminal size={20} />,
        tags: ["Zsh", "Bash", "Tmux", "CachyOS"],
        gradient: "linear-gradient(to bottom right, #3f3f46, #52525b)",
        colSpan: 1
    },
    {
        title: "The Workbench",
        description: "Native work requires native power. A curated environment for deep focus.",
        icon: <Laptop size={20} />,
        tags: ["Android Studio", "IntelliJ Ultimate", "Google IDX"],
        gradient: "linear-gradient(to bottom right, #27272a, #3f3f46)",
        colSpan: 1
    },
    {
        title: "Data & Delivery",
        description: "Managing APIs reliably. Bruno for versioned collections, curl for raw CLI inspection.",
        icon: <Database size={20} />,
        tags: ["Git", "PostgreSQL", "Bruno", "curl"],
        gradient: "linear-gradient(to bottom right, #18181b, #27272a)",
        colSpan: 1
    }
];


export default function Home() {
    const { displayText } = useTypewriter("Engineering software that actually works.", 40, 500);

    // Ref for the final line to trigger the dimming effect
    const finalLineRef = useRef(null);
    const isFinalLineInView = useInView(finalLineRef, { margin: "-10% 0px -10% 0px", once: false });

    return (
        <main className="min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden relative selection:bg-cyan-500/30">
            {/* Ambient Background */}
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10" />

            <SectionWrapper>
                <div className="max-w-4xl mx-auto space-y-24">
                    {/* Hero Header */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="inline-flex items-center gap-2 mb-2"
                        >
                            <span className="w-8 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent"></span>
                            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-500 font-mono tracking-[0.2em] text-sm uppercase">
                                Murat Bahadır Kayıhan
                            </h2>
                        </motion.div>
                        <div className="h-20 sm:h-24">
                            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
                                {displayText}
                                <span className="animate-blink text-secondary">|</span>
                            </h1>
                        </div>
                        {/* MISSION LINE - Strategic Positioning */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                            className="max-w-xl pt-8"
                        >
                            <p className="font-mono text-sm md:text-base text-zinc-400 leading-relaxed border-l-2 border-emerald-500/50 pl-4">
                                Architecting digital sovereignty with high performance mobile nodes and decentralized backend systems.
                            </p>
                        </motion.div>
                    </div>

                    {/* MANIFESTO SECTION */}
                    <div className={`space-y-8 text-xl md:text-2xl text-gray-300 leading-relaxed font-light transition-opacity duration-700 ${isFinalLineInView ? "opacity-70" : "opacity-100"}`}>
                        <p>
                            I’ve seen enough “
                            <motion.span
                                className="inline-block relative text-gray-200"
                                initial={{ x: 0, opacity: 1 }}
                                animate={{
                                    x: [0, -2, 2, -1, 0],
                                    opacity: [1, 0.8, 1, 0.9, 1],
                                    filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
                                }}
                                transition={{
                                    duration: 0.5,
                                    times: [0, 0.2, 0.4, 0.6, 1],
                                    delay: 0.5
                                }}
                            >
                                revolutionary
                            </motion.span>
                            ” tech stacks to know that{" "}
                            <span className="relative inline-block group">
                                boring code
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full h-[1px] bg-cyan-400/50"
                                    initial={{ width: "0%" }}
                                    whileInView={{ width: "100%" }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                                />
                            </span>
                            {" "}usually works best.
                        </p>

                        <p>
                            While the industry chases the next shiny toy, I focus on building mobile experiences that don’t lag and backends that don’t crash.
                        </p>

                        <p>
                            I don’t write code to look smart; I write it so I can sleep at night without server alerts.
                        </p>
                    </div>

                    {/* FINAL LINE - Separated for view detection */}
                    <div ref={finalLineRef} className="pt-4">
                        <p className={`text-xl md:text-2xl text-white font-normal transition-opacity duration-500 ${isFinalLineInView ? "opacity-100 placeholder-opacity-100" : "opacity-100"}`}>
                            Simple, scalable, and surprisingly rare.
                        </p>
                    </div>

                    {/* Navigation Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12">
                        <Link href="/mobile" className="block h-full">
                            <GlassCard
                                className="h-full p-8"
                                gradient="from-emerald-500/10 via-cyan-500/5 to-transparent"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                    <Smartphone className="w-24 h-24" />
                                </div>
                                <div className="space-y-4">
                                    <Smartphone className="w-8 h-8 text-secondary group-hover:text-cyan-400 transition-colors duration-300" />
                                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-50 transition-colors">Mobile Engineering</h3>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                        Native Android development with Kotlin & Compose. Performance first architecture.
                                    </p>
                                    <div className="flex items-center gap-2 text-secondary group-hover:text-cyan-400 font-medium mt-4 transition-colors">
                                        View Walkthrough <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </Link>

                        <Link href="/backend" className="block h-full">
                            <GlassCard
                                className="h-full p-8"
                                gradient="from-blue-600/10 via-indigo-500/5 to-transparent"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                                    <Server className="w-24 h-24" />
                                </div>
                                <div className="space-y-4">
                                    <Server className="w-8 h-8 text-blue-400 group-hover:text-indigo-400 transition-colors duration-300" />
                                    <h3 className="text-2xl font-bold text-white group-hover:text-indigo-50 transition-colors">Backend Systems</h3>
                                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                        Scalable microservices with Java & Spring. Robust data layers and security.
                                    </p>
                                    <div className="flex items-center gap-2 text-blue-400 group-hover:text-indigo-400 font-medium mt-4 transition-colors">
                                        View Walkthrough <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                                    </div>
                                </div>
                            </GlassCard>
                        </Link>
                    </div>
                </div>
            </SectionWrapper>

            {/* ENGINEERING STORY SECTION */}
            <EngineeringStory />

            {/* CORE SPECIFICATIONS (BENTO GRID) */}
            <div className="max-w-7xl mx-auto px-6 mt-20 mb-32">
                <TechGrid
                    title="Production Toolbox"
                    subtitle="The ecosystem I live in. Built for control, efficiency, and reliability."
                    items={coreSpecs}
                    compact={true}
                />
            </div>

            {/* ENGINEERING PRINCIPLES SECTION */}
            <EngineeringPrinciples />

        </main>
    );
}
