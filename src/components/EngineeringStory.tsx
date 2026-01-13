"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wifi, CloudOff, ShieldAlert, Smartphone, Zap, CheckCircle2, XCircle } from "lucide-react";
import { SectionWrapper } from "@/components/SectionWrapper";

export const EngineeringStory = () => {
    return (
        <section className="py-16 bg-[#080808] border-y border-white/5 relative overflow-hidden">
            {/* Subtle Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/50 via-black to-zinc-900/50 pointer-events-none" />

            <SectionWrapper>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left Column: Narrative */}
                    <div className="relative z-10 space-y-8">
                        <div>
                            <span className="font-mono text-xs text-secondary tracking-widest uppercase mb-2 block">
                                Engineering Decision #01
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2">
                                Designing for Failure in Physical Systems
                            </h2>
                            <p className="text-lg text-zinc-500 italic font-light">
                                "When reliability matters more than elegance."
                            </p>
                        </div>

                        <div className="space-y-6 text-zinc-400 leading-relaxed text-base md:text-lg">
                            <p>
                                <strong className="text-zinc-200 block mb-1 text-sm uppercase tracking-wide">The Constraint</strong>
                                We were scaling a distributed platform requiring real time interaction with physical hardware. The bottleneck was network reliability. Even small connectivity drops translated into hard user failures at the moment of action.
                            </p>
                            <p>
                                <strong className="text-zinc-200 block mb-1 text-sm uppercase tracking-wide">The Decision</strong>
                                Instead of adding complex retry logic (which would only increase system fragility), I engineered a proximity based fallback layer. We shifted the 'source of truth' to the physical edge. If the cloud failed, the app leveraged local hardware verification (implemented via NFC) to authorize access securely.
                            </p>
                            <p>
                                <strong className="text-zinc-200 block mb-1 text-sm uppercase tracking-wide">The Outcome</strong>
                                The system maintained high availability during critical growth phases. It proved that sometimes the best code is the code you write to eventually delete.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Animated visual */}
                    <div className="relative z-10 w-full flex justify-center lg:justify-end">
                        <SystemFlowDiagram />
                    </div>
                </div>
            </SectionWrapper>
        </section>
    );
};

// ------------------------------------
// ANIMATED DIAGRAM COMPONENT
// ------------------------------------

const SystemFlowDiagram = () => {
    const [step, setStep] = useState(0);

    // Animation Loop
    useEffect(() => {
        const sequence = async () => {
            while (true) {
                // Reset
                setStep(0); // Check Network
                await wait(2000);

                setStep(1); // Network Unstable / Fail
                await wait(1500);

                setStep(2); // Route to Edge Protocol
                await wait(1500);

                setStep(3); // Verify Proximity
                await wait(2000);

                setStep(4); // Execute Action
                await wait(3000);
            }
        };
        sequence();
    }, []);

    return (
        <div className="relative w-full max-w-xl p-8 rounded-3xl">
            {/* Connecting Lines (Background) */}
            <div className="absolute inset-0 z-0">
                <ConnectionLines step={step} />
            </div>

            <div className="relative z-10 flex flex-col gap-6 items-center">

                {/* NODE 1: Network Check */}
                <DiagramNode
                    active={step >= 0}
                    status={step === 0 ? "processing" : step === 1 ? "failed" : "inactive"}
                    icon={<Wifi size={20} />}
                    label="Check Network"
                    subLabel="Signal Latency < 50ms"
                />

                {/* Branching Logic Visual */}
                <div className="grid grid-cols-2 gap-4 w-full">
                    {/* Cloud Path (Failed) */}
                    <motion.div
                        className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/50 flex flex-col items-center gap-2 opacity-30 grayscale"
                        animate={{ opacity: step === 1 ? 0.3 : 0.1 }}
                    >
                        <CloudOff size={20} />
                        <span className="text-[10px] uppercase tracking-wider">Cloud Sync</span>
                    </motion.div>

                    {/* Fallback Path (Active) */}
                    <motion.div
                        className="p-4 rounded-xl border border-secondary/20 bg-secondary/5 flex flex-col items-center gap-2 relative overflow-hidden"
                        animate={{
                            borderColor: step >= 2 ? "rgba(124, 58, 237, 0.4)" : "rgba(255,255,255,0.05)",
                            backgroundColor: step >= 2 ? "rgba(124, 58, 237, 0.1)" : "rgba(0,0,0,0)",
                            scale: step === 2 ? 1.05 : 1
                        }}
                    >
                        {step >= 2 && (
                            <motion.div
                                className="absolute inset-0 bg-secondary/10"
                                initial={{ top: "-100%" }}
                                animate={{ top: "100%" }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        )}
                        <ShieldAlert size={20} className={step >= 2 ? "text-secondary" : "text-zinc-600"} />
                        <span className={`text-[10px] uppercase tracking-wider transition-colors ${step >= 2 ? "text-secondary" : "text-zinc-600"}`}>
                            Edge Protocol
                        </span>
                    </motion.div>
                </div>

                {/* NODE 3: Proximity Check */}
                <DiagramNode
                    active={step >= 3}
                    status={step >= 3 ? "active" : "inactive"}
                    icon={<Smartphone size={20} />}
                    label="Verify Proximity"
                    subLabel="NFC Handshake"
                    pulse={step === 3}
                />

                {/* NODE 4: Execution */}
                <DiagramNode
                    active={step >= 4}
                    status={step === 4 ? "success" : "inactive"}
                    icon={step === 4 ? <CheckCircle2 size={24} /> : <Zap size={20} />}
                    label="Execute Action"
                    subLabel="Edge Verified"
                    isFinal={true}
                />

            </div>
        </div>
    );
};

// ------------------------------------
// HELPERS & SUB-COMPONENTS
// ------------------------------------

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const DiagramNode = ({ active, status, icon, label, subLabel, pulse = false, isFinal = false }: any) => {
    // Status colors
    const colors = {
        inactive: "border-zinc-800 text-zinc-600 bg-zinc-900/50",
        processing: "border-blue-500/50 text-blue-400 bg-blue-500/10",
        failed: "border-red-500/50 text-red-400 bg-red-500/10",
        active: "border-secondary/50 text-secondary bg-secondary/10",
        success: "border-emerald-500 text-emerald-400 bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
    };

    const currentColor = colors[status as keyof typeof colors];

    return (
        <motion.div
            className={`
                relative w-full p-4 rounded-2xl border flex items-center gap-4 transition-all duration-500 z-10
                ${currentColor}
                ${isFinal && status === 'success' ? 'scale-105' : ''}
            `}
            animate={pulse ? { scale: [1, 1.02, 1], boxShadow: ["0 0 0px rgba(124,58,237,0)", "0 0 15px rgba(124,58,237,0.3)", "0 0 0px rgba(124,58,237,0)"] } : {}}
            transition={{ duration: 1.5, repeat: pulse ? Infinity : 0 }}
        >
            {/* Icon Box */}
            <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center 
                ${status === 'processing' ? 'animate-pulse' : ''}
                ${status === 'success' ? 'bg-emerald-500/20' : 'bg-black/20'}
            `}>
                {icon}
            </div>

            {/* Labels */}
            <div className="flex-1">
                <div className={`font-bold text-sm ${status === 'success' ? 'text-white' : ''}`}>{label}</div>
                <div className="text-[10px] opacity-70 uppercase tracking-wider font-mono">{subLabel}</div>
            </div>

            {/* Status Indicator */}
            {status === 'processing' && <div className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />}
            {status === 'failed' && <XCircle size={16} />}
            {status === 'success' && <CheckCircle2 size={16} />}
        </motion.div>
    )
}

const ConnectionLines = ({ step }: { step: number }) => {
    // Simple vertical line logic handled via absolute divs for simplicity over SVG for now
    return (
        <div className="absolute inset-0 flex justify-center">
            {/* Main Vertical Spine */}
            <div className="w-[1px] h-full bg-zinc-800 relative overflow-hidden">
                {step > 0 && (
                    <motion.div
                        className="absolute top-0 w-full bg-gradient-to-b from-transparent via-secondary to-transparent"
                        style={{ height: "50%" }}
                        animate={{ top: ["-50%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                )}
            </div>
        </div>
    )
}
