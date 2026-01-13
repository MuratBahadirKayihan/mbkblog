"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const KatanaLoader = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isSlashActive, setIsSlashActive] = useState(false);

    useEffect(() => {
        // Check session storage to run only once per session
        const hasVisited = sessionStorage.getItem("hasVisited");
        if (hasVisited) {
            setIsVisible(false);
            return;
        }

        // Mark as visited immediately so it doesn't run again on refresh
        sessionStorage.setItem("hasVisited", "true");

        // Sequence:
        // 0ms: Black screen, cursor blinking
        // 800ms: Trigger Slash
        // 900ms: Slash complete, fade out

        const slashTimer = setTimeout(() => {
            setIsSlashActive(true);
        }, 800);

        const hideTimer = setTimeout(() => {
            setIsVisible(false);
        }, 1200); // 800ms wait + ~400ms buffer for slash/fade

        return () => {
            clearTimeout(slashTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-[9999] cursor-none overflow-hidden">

                    {/* --- PHASE 1: PRE-SPLIT (Black Screen) --- */}
                    {!isSlashActive && (
                        <div className="absolute inset-0 bg-black flex items-center justify-center">
                            <div className="font-mono text-zinc-500 text-sm tracking-widest flex items-center gap-3">
                                <span className="opacity-80">&gt; system ready.</span>
                                <motion.div
                                    className="w-2.5 h-4 bg-zinc-500"
                                    animate={{ opacity: [1, 0, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: "steps(2)" }}
                                />
                            </div>
                        </div>
                    )}

                    {/* --- PHASE 2: THE SPLIT (Shards) --- */}
                    {isSlashActive && (
                        <>
                            {/* SHARD 1: Left Angled */}
                            <motion.div
                                className="absolute inset-0 bg-black"
                                style={{ clipPath: "polygon(0% 0%, 35% 0%, 25% 100%, 0% 100%)" }}
                                initial={{ x: 0, y: 0 }}
                                animate={{ x: -100, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                            />

                            {/* SHARD 2: Center Angled */}
                            <motion.div
                                className="absolute inset-0 bg-black"
                                style={{ clipPath: "polygon(35% 0%, 75% 0%, 65% 100%, 25% 100%)" }}
                                initial={{ x: 0, y: 0 }}
                                animate={{ y: -50, opacity: 0 }} // Moves UP/Fade
                                transition={{ duration: 0.4, ease: "circOut" }}
                            />

                            {/* SHARD 3: Right Angled */}
                            <motion.div
                                className="absolute inset-0 bg-black"
                                style={{ clipPath: "polygon(75% 0%, 100% 0%, 100% 100%, 65% 100%)" }}
                                initial={{ x: 0, y: 0 }}
                                animate={{ x: 100, opacity: 0 }}
                                transition={{ duration: 0.4, ease: "circOut" }}
                            />
                        </>
                    )}

                    {/* --- PHASE 3: THE SABERS (Overlay) --- */}
                    {isSlashActive && (
                        <div className="absolute inset-0 pointer-events-none">
                            {/* Global Flash */}
                            <motion.div
                                className="absolute inset-0 bg-white mix-blend-overlay"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.2 }}
                            />

                            {/* Cut Line 1: Left-Center Boundary */}
                            <motion.div
                                className="absolute top-0 bottom-0 w-[4px] bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,1),0_0_50px_rgba(255,255,255,0.8)]"
                                style={{ left: "30%", transform: "skew(-15deg)" }} // Approximate the clip-path angle
                                initial={{ scaleY: 0, opacity: 1 }}
                                animate={{ scaleY: 1.5, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "circOut" }}
                            />

                            {/* Cut Line 2: Center-Right Boundary */}
                            <motion.div
                                className="absolute top-0 bottom-0 w-[6px] bg-white shadow-[0_0_30px_rgba(255,255,255,1),0_0_80px_rgba(6,182,212,1)]"
                                style={{ left: "70%", transform: "skew(-15deg)" }}
                                initial={{ scaleY: 0, opacity: 1 }}
                                animate={{ scaleY: 1.5, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "circOut" }}
                            />

                            {/* Cut Line 3: Cross Slash (Visual flair) */}
                            <motion.div
                                className="absolute top-1/2 left-1/2 w-[120vw] h-[2px] bg-cyan-200 shadow-[0_0_20px_rgba(6,182,212,1)]"
                                initial={{ x: "-50%", y: "-50%", rotate: 45, scaleX: 0, opacity: 1 }}
                                animate={{ scaleX: 1, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "circOut" }}
                            />
                        </div>
                    )}
                </div>
            )}
        </AnimatePresence>
    );
};
