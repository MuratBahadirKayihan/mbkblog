"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Search, ArrowRight, CornerDownLeft, Sparkles, Terminal, Map, Mail, User } from "lucide-react";

interface PaletteCommand {
    id: string;
    label: string;
    subLabel?: string;
    icon: React.ReactNode;
    action: () => void;
    group: "navigation" | "utility" | "social";
}

export const CommandPalette = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const router = useRouter();

    const commands: PaletteCommand[] = [
        // Navigation
        {
            id: "nav-home",
            label: "Go to Home",
            subLabel: "Engineering First",
            icon: <Terminal size={18} />,
            action: () => router.push("/"),
            group: "navigation"
        },
        {
            id: "nav-mobile",
            label: "Go to Mobile",
            subLabel: "Android & Compose",
            icon: <Map size={18} />,
            action: () => router.push("/mobile"),
            group: "navigation"
        },
        {
            id: "nav-backend",
            label: "Go to Backend",
            subLabel: "Microservices & Cloud",
            icon: <Map size={18} />,
            action: () => router.push("/backend"),
            group: "navigation"
        },
        {
            id: "nav-blog",
            label: "Go to Blog",
            subLabel: "Thoughts & Rants",
            icon: <Map size={18} />,
            action: () => router.push("/blog"),
            group: "navigation"
        },
        // Utilities
        {
            id: "util-whoami",
            label: "whoami",
            subLabel: "Display user profile",
            icon: <User size={18} />,
            action: () => alert("Murat Bahadır Kayıhan\nSystem Architect | Mobile & Backend"), // Placeholder for visual feedback
            group: "utility"
        },
        {
            id: "util-contact",
            label: "Contact Me",
            subLabel: "Send an email",
            icon: <Mail size={18} />,
            action: () => window.location.href = "mailto:contact@kayihan.dev",
            group: "utility"
        }
    ];

    // Filter commands
    const filteredCommands = commands.filter(cmd =>
        cmd.label.toLowerCase().includes(query.toLowerCase()) ||
        cmd.subLabel?.toLowerCase().includes(query.toLowerCase())
    );

    // Keyboard Shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsOpen(prev => !prev);
                setQuery("");
                setSelectedIndex(0);
            }

            if (!isOpen) return;

            if (e.key === "Escape") {
                setIsOpen(false);
            }

            if (e.key === "ArrowDown") {
                e.preventDefault();
                setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
            }

            if (e.key === "ArrowUp") {
                e.preventDefault();
                setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
            }

            if (e.key === "Enter") {
                e.preventDefault();
                if (filteredCommands[selectedIndex]) {
                    filteredCommands[selectedIndex].action();
                    setIsOpen(false);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, filteredCommands, selectedIndex]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Modal */}
                    <motion.div
                        className="relative w-full max-w-lg bg-[#0A0A0A] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col"
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Search Bar */}
                        <div className="flex items-center px-4 py-4 border-b border-white/5 gap-3">
                            <Search className="text-zinc-500" size={20} />
                            <input
                                type="text"
                                className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none text-lg font-medium"
                                placeholder="Type a command or search..."
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    setSelectedIndex(0);
                                }}
                                autoFocus
                            />
                            <div className="px-2 py-1 bg-white/10 rounded text-[10px] font-mono text-zinc-400">
                                ESC
                            </div>
                        </div>

                        {/* List */}
                        <div className="max-h-[60vh] overflow-y-auto py-2">
                            {filteredCommands.length === 0 ? (
                                <div className="px-4 py-8 text-center text-zinc-500 text-sm">
                                    No commands found.
                                </div>
                            ) : (
                                filteredCommands.map((cmd, index) => (
                                    <div
                                        key={cmd.id}
                                        className={`px-4 py-3 flex items-center gap-3 cursor-pointer transition-colors ${index === selectedIndex ? "bg-white/10" : "hover:bg-white/5"
                                            }`}
                                        onClick={() => {
                                            cmd.action();
                                            setIsOpen(false);
                                        }}
                                        onMouseEnter={() => setSelectedIndex(index)}
                                    >
                                        <div className={`p-2 rounded-lg ${index === selectedIndex ? "text-white bg-white/10" : "text-zinc-400 bg-white/5"}`}>
                                            {cmd.icon}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className={`text-sm font-medium ${index === selectedIndex ? "text-white" : "text-zinc-300"}`}>
                                                {cmd.label}
                                            </div>
                                            {cmd.subLabel && (
                                                <div className="text-xs text-zinc-500 truncate">
                                                    {cmd.subLabel}
                                                </div>
                                            )}
                                        </div>
                                        {index === selectedIndex && (
                                            <CornerDownLeft size={16} className="text-zinc-400" />
                                        )}
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-2 border-t border-white/5 bg-white/5 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1">
                                    <span className="bg-white/10 px-1 rounded">↑↓</span> navigate
                                </span>
                                <span className="flex items-center gap-1">
                                    <span className="bg-white/10 px-1 rounded">↵</span> select
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Sparkles size={10} className="text-blue-400" />
                                <span>SYSTEM READY</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
