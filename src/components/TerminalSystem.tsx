"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Server, Database, Shield, Lock, Globe, Code2, Activity } from "lucide-react";

export type BackendStage = "api" | "scale" | "data" | "security";

interface TerminalSystemProps {
    stage: BackendStage;
}

const stageConfig = {
    api: {
        color: "text-blue-400",
        label: "API Gateway"
    },
    scale: {
        color: "text-violet-400",
        label: "Microservices"
    },
    data: {
        color: "text-amber-400",
        label: "Data Layer"
    },
    security: {
        color: "text-emerald-400",
        label: "Security Net"
    }
};

// Helper Hook for Typing Animation
const useTypingEffect = (text: string, speed: number = 20, start: boolean = false) => {
    const [displayedText, setDisplayedText] = React.useState("");

    React.useEffect(() => {
        if (!start) {
            setDisplayedText("");
            return;
        }

        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [text, speed, start]);

    return displayedText;
};

export const TerminalSystem: React.FC<TerminalSystemProps> = ({ stage }) => {
    return (
        <div className="relative w-full h-full lg:w-[600px] lg:h-[400px] flex flex-col font-mono text-sm leading-relaxed antialiased shadow-2xl">
            {/* Terminal Window Frame */}
            <div className="h-10 bg-[#1e1e1e] rounded-t-xl flex items-center px-4 gap-2 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <div className="ml-auto text-xs text-white/30 flex items-center gap-2">
                    <Terminal size={12} />
                    <span>bash — 80x24</span>
                </div>
            </div>

            {/* Terminal Content Area */}
            <div className="flex-1 bg-[#0c0c0c] border border-t-0 border-white/5 rounded-b-xl p-6 relative overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                {/* Content Layers */}
                <LayerAPI active={stage === 'api'} />
                <LayerScale active={stage === 'scale'} />
                <LayerData active={stage === 'data'} />
                <LayerSecurity active={stage === 'security'} />

                {/* Scanline Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-20" />
            </div>
        </div>
    );
};

// ---------------------------
// LAYERS
// ---------------------------

const LayerWrapper = ({ active, children }: { active: boolean, children: React.ReactNode }) => (
    <motion.div
        className="absolute inset-0 p-6 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.5 }}
    >
        {children}
    </motion.div>
);

const LayerAPI = ({ active }: { active: boolean }) => {
    const jsonString = `
{
    "id": "usr_kayihan",
    "role": "SYSTEM_ARCHITECT",
    "skills": [
        "Java", "Spring Boot", "Microservices", "PostgreSQL"
    ]
}`;
    const typedJSON = useTypingEffect(jsonString, 10, active);

    return (
        <LayerWrapper active={active}>
            <div className="text-blue-400 mb-4 flex items-center gap-2">
                <Globe size={16} />
                <span>GET /api/v1/users/profile</span>
            </div>
            <div className="space-y-1 text-zinc-400">
                <div className="flex gap-2">
                    <span className="text-purple-400">Status:</span>
                    <span className="text-green-400">200 OK</span>
                </div>
                <div className="flex gap-2">
                    <span className="text-purple-400">Time:</span>
                    <span>42ms</span>
                </div>

                <div className="white-space-pre font-mono text-zinc-500 mt-4 leading-tight">
                    {typedJSON}
                </div>

                <motion.div
                    className="w-3 h-5 bg-blue-400/50 mt-4"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                />
            </div>
        </LayerWrapper>
    );
};

const LayerScale = ({ active }: { active: boolean }) => (
    <LayerWrapper active={active}>
        <div className="text-violet-400 mb-6 flex items-center gap-2">
            <Activity size={16} />
            <span>Load Balancer: Active</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
                <motion.div
                    key={i}
                    className="bg-zinc-900/50 border border-violet-500/30 p-3 rounded flex items-center gap-3"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={active ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    <Server size={16} className="text-violet-500" />
                    <div>
                        <div className="text-[10px] text-zinc-500 uppercase">Instance {i}</div>
                        <div className="text-xs text-green-400">Healthy</div>
                    </div>
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </motion.div>
            ))}
        </div>

        <div className="mt-auto space-y-2 font-mono text-[10px] text-zinc-600">
            <div>&gt; Autoscaling group capacity: 4/10</div>
            <div>&gt; CPU Utilization: 45% (Stable)</div>
        </div>
    </LayerWrapper>
);

const LayerData = ({ active }: { active: boolean }) => (
    <LayerWrapper active={active}>
        <div className="text-amber-400 mb-6 flex items-center gap-2">
            <Database size={16} />
            <span>PostgreSQL: Primary Writer</span>
        </div>

        <div className="flex gap-4 items-start relative h-32">
            <div className="w-24 h-24 border-2 border-amber-500/30 rounded-lg flex items-center justify-center bg-amber-500/10 z-10">
                <span className="text-xs text-amber-500 font-bold">MASTER</span>
            </div>

            {/* Connection Lines */}
            <motion.div className="flex-1 h-[2px] bg-amber-500/20 mt-12 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-amber-500"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
            </motion.div>

            <div className="flex flex-col gap-2 z-10">
                <div className="w-16 h-10 border border-zinc-700 bg-zinc-900 rounded flex items-center justify-center text-zinc-500 text-[10px]">
                    Read 1
                </div>
                <div className="w-16 h-10 border border-zinc-700 bg-zinc-900 rounded flex items-center justify-center text-zinc-500 text-[10px]">
                    Read 2
                </div>
            </div>
        </div>

        <div className="mt-auto p-3 bg-amber-900/10 border border-amber-500/20 rounded text-amber-200/70 text-xs">
            Query optimized. Index scan used. 0.04ms execution.
        </div>
    </LayerWrapper>
);

const LayerSecurity = ({ active }: { active: boolean }) => (
    <LayerWrapper active={active}>
        <div className="text-emerald-400 mb-6 flex items-center gap-2">
            <Shield size={16} />
            <span>Security Protocols: Enforced</span>
        </div>

        <div className="space-y-3">
            <motion.div
                className="flex items-center gap-3 p-2 bg-emerald-900/10 border border-emerald-500/20 rounded"
                initial={{ x: -20, opacity: 0 }}
                animate={active ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Lock size={14} className="text-emerald-500" />
                <span className="text-xs text-emerald-200">TLS 1.3 Encryption Active</span>
            </motion.div>
            <motion.div
                className="flex items-center gap-3 p-2 bg-emerald-900/10 border border-emerald-500/20 rounded"
                initial={{ x: -20, opacity: 0 }}
                animate={active ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: 0.2 }}
            >
                <Lock size={14} className="text-emerald-500" />
                <span className="text-xs text-emerald-200">Rate Limiting: Enabled</span>
            </motion.div>
            <motion.div
                className="flex items-center gap-3 p-2 bg-emerald-900/10 border border-emerald-500/20 rounded"
                initial={{ x: -20, opacity: 0 }}
                animate={active ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Lock size={14} className="text-emerald-500" />
                <span className="text-xs text-emerald-200">SQL Injection Protection</span>
            </motion.div>
        </div>

        <div className="mt-auto pointer-events-none opacity-50 font-mono text-[10px] text-emerald-600/50 break-words leading-none">
            01001001 01000110 00100000 01011001 01001111 01010101 00100111 01010010 01000101
        </div>
    </LayerWrapper>
);
