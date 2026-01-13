"use client";

import React from "react";
import { SectionWrapper } from "@/components/SectionWrapper";
import { Github, Linkedin, Mail } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-20 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />

            <SectionWrapper className="text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
                    Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">meaningful</span>.
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 leading-relaxed">
                    I'm currently available for freelance projects and consulting. <br />
                    If you have a complex engineering challenge, I'd love to hear about it.
                </p>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                    <a
                        href="mailto:contact@kayihan.dev"
                        className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 w-48 border border-white/5 hover:border-primary/30"
                    >
                        <Mail className="w-8 h-8 text-gray-300 group-hover:text-primary transition-colors" />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">Email Me</span>
                    </a>

                    <a
                        href="https://github.com/MuratBahadirKayihan"
                        className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 w-48 border border-white/5 hover:border-white/30"
                    >
                        <Github className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors" />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">GitHub</span>
                    </a>

                    <a
                        href="https://www.linkedin.com/in/murat-bahadir-kayihan/"
                        className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 w-48 border border-white/5 hover:border-blue-500/30"
                    >
                        <Linkedin className="w-8 h-8 text-gray-300 group-hover:text-blue-500 transition-colors" />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">LinkedIn</span>
                    </a>
                </div>
            </SectionWrapper>
        </main>
    );
}
