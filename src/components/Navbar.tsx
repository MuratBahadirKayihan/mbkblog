"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
    { name: "Mobile", path: "/mobile" },
    { name: "Backend", path: "/backend" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
];

export const Navbar = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo - Live Terminal Identity */}
                    <Link
                        href="/"
                        className="group flex items-center gap-0.5 text-lg font-bold text-white tracking-tight hover:text-white transition-colors font-mono"
                    >
                        <span>kayihan.dev</span>
                        <span className="text-primary/70 animate-blink group-hover:animate-none group-hover:opacity-100 transition-all">_</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex gap-8">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`text-sm font-medium transition-colors duration-200 ${isActive ? "text-primary" : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        {/* Command Palette Hint */}
                        <div className="flex items-center ml-4 pl-4 border-l border-white/10">
                            <span className="text-xs text-zinc-500 font-mono flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/5">
                                <span className="text-[10px] font-sans">CTRL</span> K
                            </span>
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-400 hover:text-white p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#0a0a0a] border-b border-white/5">
                    <nav className="flex flex-col px-4 py-4 gap-4">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.path;
                            return (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`text-base font-medium py-2 border-b border-white/5 last:border-0 ${isActive ? "text-primary" : "text-gray-400 hover:text-white"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            )}
        </header>
    );
};
