"use client";

import React from "react";
import { motion } from "framer-motion";

export interface GridItemProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    tags?: string[];
    gradient?: string;
    colSpan?: 1 | 2; // 1 = standard, 2 = wide (featured)
    customContent?: React.ReactNode;
}

interface TechGridProps {
    title: string;
    subtitle: string;
    items: GridItemProps[];
    compact?: boolean;
}

export const TechGrid: React.FC<TechGridProps> = ({ title, subtitle, items, compact = false }) => {
    return (
        <section className="py-20 relative z-10">
            <div className="space-y-4 mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">{title}</h2>
                <p className="text-lg text-zinc-400 max-w-2xl">{subtitle}</p>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 ${compact ? 'lg:grid-cols-2 gap-4' : 'lg:grid-cols-4 gap-4 lg:gap-6'} auto-rows-[minmax(180px,auto)]`}>
                {items.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`
                        relative group overflow-hidden rounded-3xl border border-white/5 bg-[#0A0A0A] 
                        hover:border-white/10 transition-colors duration-500
                        ${item.colSpan === 2 ? 'md:col-span-2' : 'col-span-1'}
                    `}
                    >
                        {/* Ambient Gradient Background */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                            style={{ background: item.gradient }}
                        />

                        <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                            {item.customContent ? (
                                item.customContent
                            ) : (
                                <>
                                    <div>
                                        <div className={`mb-4 w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300 shadow-[0_0_0_1px_rgba(255,255,255,0.05)]`}>
                                            {item.icon}
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                                        <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                                    </div>

                                    {/* Tags */}
                                    {item.tags && item.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-6">
                                            {item.tags.map(tag => (
                                                <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded-md bg-white/10 text-zinc-400 border border-white/5">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
