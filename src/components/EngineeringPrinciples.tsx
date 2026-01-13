"use client";

import React from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { motion } from "framer-motion";

const principles = [
    {
        title: "Reliability over Novelty",
        text: "Technology is chosen for survival, not hype. I prefer boring, battle tested solutions that have survived production at scale over the latest trends."
    },
    {
        title: "Complexity is Debt",
        text: "Every new library, microservice, or abstraction layer is a liability. The goal is always to keep the surface area small and the logic transparent."
    },
    {
        title: "Observability is Trust",
        text: "If a system can't report its health, it is already broken. Logging, metrics, and tracing are not \"nice to haves\"; they are the definition of production."
    },
    {
        title: "Temporary means Temporary",
        text: "\"Permanent workarounds\" are forbidden. If a quick fix is required, it must be documented, tracked, and planned for removal. No hidden ghosts in the code."
    }
];

export const EngineeringPrinciples = () => {
    return (
        <section className="bg-[#050505] border-t border-zinc-900 relative">
            <SectionWrapper className="py-24 sm:py-32">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                    {/* Header Column */}
                    <div className="lg:col-span-1 space-y-4">
                        <span className="font-mono text-xs text-secondary tracking-widest uppercase block">
                            The Constitution
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                            Engineering Principles
                        </h2>
                        <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-sm">
                            How I make decisions when systems are under pressure.
                        </p>
                    </div>

                    {/* Principles Grid */}
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        {principles.map((principle, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1, duration: 0.5 }}
                                className="space-y-4"
                            >
                                <h3 className="text-xl font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">
                                    <span className="text-secondary/50 mr-2 text-sm font-mono">0{idx + 1}.</span>
                                    {principle.title}
                                </h3>
                                <p className="text-zinc-400 leading-relaxed">
                                    {principle.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>
        </section>
    );
};
