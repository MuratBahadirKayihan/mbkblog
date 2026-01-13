"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, ExternalLink, Activity, Radio, Cpu, Database, Eye } from "lucide-react";

export type ProjectStatus = "LIVE" | "BETA" | "ALPHA" | "PROTOTYPE" | "CONCEPT";
export type ProjectType = "MOBILE" | "BACKEND" | "WEB" | "FULLSTACK";

export type ProjectCardRank = "FLAGSHIP" | "SIDE" | "CONCEPT";

export interface ProjectCardProps {
    title: string;
    type: ProjectType;
    thesis: string;
    tech: string[];
    status: ProjectStatus;
    link?: string;
    index?: number;
    rank?: ProjectCardRank;
}

const statusColors = {
    LIVE: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    BETA: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    ALPHA: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    PROTOTYPE: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    CONCEPT: "text-zinc-400 bg-zinc-400/10 border-zinc-400/20",
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, type, thesis, tech, status, link, index = 0, rank = "SIDE" }) => {
    const isStealth = !link || status === "PROTOTYPE" || status === "CONCEPT";

    // Rank-based styling
    const rankStyles = {
        FLAGSHIP: "opacity-100 bg-zinc-900/80 border-cyan-500/20 hover:border-cyan-400/40 shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)]",
        SIDE: "opacity-80 hover:opacity-100 bg-zinc-900/40 border-zinc-800 hover:border-zinc-700",
        CONCEPT: "opacity-50 hover:opacity-90 grayscale hover:grayscale-0 bg-transparent border-zinc-800/50 hover:border-zinc-700 border-dashed"
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`
                group relative w-full p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 overflow-hidden
                ${rankStyles[rank]}
                ${isStealth ? "cursor-default" : "cursor-pointer hover:bg-zinc-900/90"}
            `}
            onClick={() => link && window.open(link, "_blank")}
        >
            {/* Top Bar: Status & Type */}
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex gap-2 items-center">
                    <span className={`text-[10px] font-mono px-2 py-1 rounded border tracking-wider flex items-center gap-1.5 ${statusColors[status]}`}>
                        {status === "LIVE" ? <Activity size={10} /> : <Radio size={10} />}
                        {status}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase px-2 py-1 border border-zinc-800 rounded bg-black/20">
                        {type}
                    </span>
                </div>
                {isStealth ? (
                    <Lock size={14} className="text-zinc-600" />
                ) : (
                    <ExternalLink size={14} className="text-zinc-400 group-hover:text-cyan-400 transition-colors" />
                )}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 font-mono tracking-tight group-hover:text-cyan-50 group-hover:translate-x-1 transition-all relative z-10">
                {title}
            </h3>

            {/* Tech Stack - Horizontal Scrollable */}
            <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-1 relative z-10">
                {tech.map((t) => (
                    <span key={t} className="text-[10px] whitespace-nowrap text-zinc-400 bg-zinc-800/50 px-2 py-0.5 rounded-full border border-zinc-700/50">
                        {t}
                    </span>
                ))}
            </div>

            {/* Engineering Thesis */}
            <div className="relative z-10">
                <div className="absolute -left-3 top-0 bottom-0 w-[2px] bg-zinc-800 group-hover:bg-zinc-700 transition-colors rounded-full" />
                <p className="text-sm text-zinc-400 leading-relaxed pl-3 font-light">
                    <span className="block text-[10px] font-bold text-zinc-600 mb-1 uppercase tracking-widest">Engineering Thesis</span>
                    {thesis}
                </p>
            </div>

            {/* Stealth Pattern Overlay */}
            {isStealth && (
                <div className="absolute -right-12 -bottom-12 opacity-[0.02] pointer-events-none select-none text-8xl font-black rotate-[-15deg] whitespace-nowrap">
                    CONFIDENTIAL
                </div>
            )}
        </motion.div>
    );
};
