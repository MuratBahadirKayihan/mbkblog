"use client";

import React from "react";
import { motion } from "framer-motion";

export const TerminalFooter: React.FC = () => {
    return (
        <footer className="w-full bg-[#0f0f0f] py-12 md:py-20 px-6 border-t border-white/10">
            <div className="max-w-[900px] mx-auto bg-[#111] rounded-lg p-6 md:p-10 shadow-2xl border border-white/5 font-mono text-xs md:text-sm text-zinc-400">

                {/* LINE 1: Contact */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-purple-400">visitor@kayihan.dev</span>
                        <span className="text-zinc-500">:</span>
                        <span className="text-blue-400">~/contact</span>
                        <span className="text-zinc-500">$</span>{" "}
                        <span className="text-zinc-100">connect</span>
                    </div>
                    <div className="flex flex-col gap-2 pl-4 md:pl-6 text-zinc-300 leading-relaxed border-l-2 border-white/5">
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                            <span className="text-zinc-500 w-20">email:</span>
                            <a href="mailto:contact@kayihan.dev" className="hover:text-cyan-400 transition-colors">contact@kayihan.dev</a>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                            <span className="text-zinc-500 w-20">github:</span>
                            <a href="https://github.com/MuratBahadirKayihan" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">github.com/MuratBahadirKayihan</a>
                        </div>
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
                            <span className="text-zinc-500 w-20">linkedin:</span>
                            <a href="https://www.linkedin.com/in/murat-bahadir-kayihan/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">linkedin.com/in/murat-bahadir-kayihan</a>
                        </div>
                    </div>
                </div>

                {/* LINE 2: Status Check */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-purple-400">visitor@kayihan.dev</span>
                        <span className="text-zinc-500">:</span>
                        <span className="text-blue-400">~/status</span>
                        <span className="text-zinc-500">$</span>{" "}
                        <span className="text-zinc-100">uptime</span>
                    </div>
                    <div className="pl-4 md:pl-6 text-green-400/90 border-l-2 border-white/5 leading-relaxed">
                        System stable. Open for new projects.
                    </div>
                </div>

                {/* LINE 3: The Manifesto Closing */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-purple-400">visitor@kayihan.dev</span>
                        <span className="text-zinc-500">:</span>
                        <span className="text-blue-400">~/philosophy</span>
                        <span className="text-zinc-500">$</span>{" "}
                        <span className="text-zinc-100">echo "The Goal"</span>
                    </div>
                    <div className="pl-4 md:pl-6 text-zinc-300 italic border-l-2 border-white/5 leading-relaxed">
                        "Build systems that let you sleep at night."
                    </div>
                </div>

                {/* LINE 4: Active Cursor */}
                <div className="flex items-center gap-2">
                    <div className="shrink-0">
                        <span className="text-purple-400">visitor@kayihan.dev</span>
                        <span className="text-zinc-500">:</span>
                        <span className="text-blue-400">~</span>
                        <span className="text-zinc-500">$</span>
                    </div>
                    <motion.div
                        className="w-2.5 h-4 bg-zinc-400"
                        animate={{ opacity: [0.6, 0.1, 0.6] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: "steps(2)" }}
                    />
                </div>
            </div>
        </footer>
    );
};
