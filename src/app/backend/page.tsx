"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TerminalSystem, BackendStage } from "@/components/TerminalSystem";
import { ArrowLeft, Server, Database, Shield, Globe, ArrowRight } from "lucide-react";
import { TechGrid, GridItemProps } from "@/components/TechGrid";
import Link from "next/link";
import { ProjectCard, ProjectCardProps } from "@/components/ProjectCard";

interface WalkthroughStage {
    id: BackendStage;
    title: string;
    copy: string;
    gradient: string;
}

const stages: WalkthroughStage[] = [
    {
        id: "api",
        title: "Microservices Gateway",
        copy: "The gateway is the fortress wall; it must be both impenetrable and invisible. I design high-throughput API gateways that handle authentication, sophisticated rate-limiting, and request routing with sub-millisecond latency. This ensures that downstream services are protected from traffic spikes while providing a unified, secure entry point for all clients.",
        gradient: "radial-gradient(circle at 70% 40%, rgba(59,130,246,0.25), transparent 60%)" // Blue
    },
    {
        id: "scale",
        title: "Elastic Scalability",
        copy: "Vertical scaling is a crutch; true power lies in horizontal elasticity. I architect stateless microservices that perform seamless auto-scaling based on real-time CPU and memory metrics. This allows the system to breathe—expanding instantly during viral traffic surges and contracting to minimize costs during quiet hours, all without human intervention.",
        gradient: "radial-gradient(circle at 70% 40%, rgba(139,92,246,0.25), transparent 60%)" // Violet
    },
    {
        id: "data",
        title: "Data Integrity",
        copy: "Data is the gravity of any system; handle it poorly and everything collapses. I implement polyglot persistence strategies, using ACID-compliant relational databases for financial transactions and eventual consistency models for high-speed social feeds. It’s about choosing the right tool for the specific consistency availability partition tolerance trade-off.",
        gradient: "radial-gradient(circle at 70% 40%, rgba(245,158,11,0.20), transparent 60%)" // Amber
    },
    {
        id: "security",
        title: "Zero Trust Security",
        copy: "In a distributed system, 'inside the network' does not mean 'safe.' I enforce a strict Zero Trust architecture where every service-to-service communication is mutually authenticated via mTLS. From encryption at rest to ephemeral secrets management, security is baked into the DNA of the infrastructure, not plastered on as an afterthought.",
        gradient: "radial-gradient(circle at 70% 40%, rgba(16,185,129,0.20), transparent 60%)" // Emerald
    }
];

const backendSpecs: GridItemProps[] = [
    {
        title: "Java Ecosystem",
        description: "Enterprise-grade reliability with modern syntax.",
        icon: <Globe size={20} />,
        tags: ["Java 21", "Spring Boot 3", "Quarkus"],
        gradient: "linear-gradient(to bottom right, #3b82f6, #60a5fa)",
        colSpan: 2
    },
    {
        title: "Infrastructure",
        description: "Code that manages the metal.",
        icon: <Server size={20} />,
        tags: ["Docker", "Kubernetes", "Terraform"],
        gradient: "linear-gradient(to bottom right, #8b5cf6, #a78bfa)",
    },
    {
        title: "Data Persistence",
        description: "Storing reality without corruption.",
        icon: <Database size={20} />,
        tags: ["PostgreSQL", "Redis", "Kafka"],
        gradient: "linear-gradient(to bottom right, #f59e0b, #fbbf24)",
    },
    {
        title: "Security",
        description: "Protecting the core assets.",
        icon: <Shield size={20} />,
        tags: ["OAuth2/OIDC", "Vault", "Spring Security"],
        gradient: "linear-gradient(to bottom right, #10b981, #34d399)",
    }
];

const backendProjects: ProjectCardProps[] = [
    {
        title: "The Signal (Core Network)",
        type: "BACKEND",
        status: "PROTOTYPE", // Architecture Design Phase
        rank: "FLAGSHIP",
        thesis: "A reactive signaling backbone designed for censorship resistance. Utilizes an SFU distribution model to manage massive concurrency for live voice rooms, handling state in-memory for zero-latency communication.",
        tech: ["Spring WebFlux", "WebRTC", "Redis Pub/Sub", "Kafka"]
    },
    {
        title: "Fallmind Core API",
        type: "BACKEND",
        status: "ALPHA",
        rank: "SIDE",
        thesis: "Stateful orchestration engine correllating user-declared focus signals. leveraging AI pattern analysis and temporal correlation to measure cognitive synchronization with sub-millisecond precision.",
        tech: ["Spring Boot", "Redis Time-Series", "Kafka"]
    },
    {
        title: "GoodTurn Impact Engine",
        type: "BACKEND",
        status: "BETA",
        rank: "SIDE",
        thesis: "Analytics infrastructure mapping the 'Chain of Reaction' in community dynamics. Uses weighted RNG algorithms to ensure fair task distribution and measure the cumulative social impact of micro-actions.",
        tech: ["Spring Boot", "PostgreSQL", "Adv. Algorithms"]
    },
    {
        title: "Sonar Licensing Core",
        type: "BACKEND",
        status: "CONCEPT",
        rank: "CONCEPT",
        thesis: "Peer-to-Peer micro-licensing ecosystem bridging artists and creators directly. Automates IP rights management and smart-contract generation to make licensing transparent and accessible.",
        tech: ["Spring Boot", "ElasticSearch", "Stripe API", "PDF Gen"]
    },
    {
        title: "Devonair Platform",
        type: "WEB",
        status: "BETA",
        rank: "FLAGSHIP",
        thesis: "A monolithic digital product hub rejecting client-side bloat. Delivers server-side rendered content via Spring MVC for maximum stability, SEO dominance, and unified management of the product ecosystem.",
        tech: ["Spring MVC", "Thymeleaf", "Docker", "Spring Security"]
    },
    {
        title: "Bright Spire Studio",
        type: "WEB",
        status: "LIVE",
        rank: "SIDE",
        thesis: "Professional digital transformation services and corporate web solutions. Delivering high-performance, SEO-optimized frontend experiences for diverse industries.",
        tech: ["Web Technologies", "Frontend Dev"],
        link: "https://www.brightspirestudio.com"
    }
];

export default function BackendPage() {
    const [currentStage, setCurrentStage] = useState<BackendStage>("api");

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">

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
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1 }}
                            className="w-full h-full flex items-center justify-center py-12"
                        >
                            <TerminalSystem stage={currentStage} />
                        </motion.div>
                    </div>

                    {/* RIGHT COLUMN: NARRATIVE (SCROLLABLE) */}
                    <div className="lg:col-span-6 lg:pl-12 pt-32 lg:pt-0">

                        {/* INTRO: TECH GRID */}
                        <div className="min-h-[90vh] flex flex-col justify-center">

                            <TechGrid
                                title="Backend Engineering Stack"
                                subtitle="The server-side technologies I use to build scalable, secure, and performant systems."
                                items={backendSpecs}
                                compact={true}
                            />
                            <div className="mt-12 text-zinc-500 animate-bounce">
                                ↓ Scroll to see the active systems
                            </div>
                        </div>

                        {/* Mobile Top Visual - Static */}
                        <div className="lg:hidden h-[60vh] flex items-center justify-center sticky top-0 z-0">
                            <div className="w-full px-4 shadow-2xl">
                                <TerminalSystem stage={currentStage} />
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
                                                ${isActive ? 'text-blue-400' : 'text-zinc-600'}`}>
                                                <span className="text-lg font-bold">0{stages.indexOf(stage) + 1}</span>
                                                <div className={`h-[1px] w-12 transition-colors duration-500 ${isActive ? 'bg-blue-400' : 'bg-zinc-800'}`} />
                                                {stage.id}
                                            </div>

                                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white">
                                                {stage.title}
                                            </h2>

                                            <p className="text-xl leading-relaxed font-light text-zinc-300">
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
                                Systems Architecture & Live Ops
                            </h3>
                            <div className="grid grid-cols-1 gap-6">
                                {backendProjects.map((project, idx) => (
                                    <ProjectCard key={project.title} {...project} index={idx} />
                                ))}
                            </div>
                        </div>

                        {/* Ending Section */}
                        <div className="min-h-[30vh] flex flex-col justify-center gap-8 border-t border-white/10 mt-20 pt-20">
                            <div>
                                <h3 className="text-3xl font-medium text-white mb-4">Scalable architecture is an art.</h3>
                                <p className="text-zinc-500 text-lg">And I paint in code.</p>
                            </div>

                            <Link
                                href="/mobile"
                                className="group inline-flex items-center gap-4 text-xl text-white font-medium hover:text-blue-400 transition-colors"
                            >
                                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                                Explore Mobile Engineering
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
