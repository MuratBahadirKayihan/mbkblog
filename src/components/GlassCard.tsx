"use client";

import React from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
    gradient?: string; // Optional specific gradient override, defaults to a subtle white/cyan mist
    onClick?: () => void;
}

export const GlassCard = ({ children, className = "", gradient = "from-cyan-500/10 to-blue-500/5", onClick }: GlassCardProps) => {
    return (
        <motion.div
            className={`
                relative group overflow-hidden rounded-3xl 
                bg-white/5 backdrop-blur-md border border-white/5
                transition-all duration-500
                hover:border-white/10 hover:shadow-2xl hover:shadow-cyan-500/5
                ${onClick ? "cursor-pointer" : ""}
                ${className}
            `}
            whileHover={{ scale: 1.01 }}
            onClick={onClick}
        >
            {/* Mystic Fog Gradient Layer */}
            {/* Initially invisible, revealing from bottom-up or as a subtle wash on hover */}
            <div
                className={`
                    absolute inset-0 opacity-0 group-hover:opacity-100 
                    bg-gradient-to-t ${gradient}
                    transition-opacity duration-700 ease-in-out
                `}
            />

            {/* Content Layer - Ensure it stays above the gradient */}
            <div className="relative z-10 h-full">
                {children}
            </div>

            {/* Reflection / Shine Effect on Top Edge */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
};
