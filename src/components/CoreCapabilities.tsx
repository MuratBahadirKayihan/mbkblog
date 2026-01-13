import React from "react";
import { SectionWrapper } from "./SectionWrapper";
import { Card } from "./Card";
import { Smartphone, Server, Component } from "lucide-react";

export const CoreCapabilities = () => {
    const capabilities = [
        {
            title: "Mobile Applications",
            icon: <Smartphone className="text-primary w-8 h-8" />,
            description: "Building resilient, offline-first applications that handle real-world connectivity. Focus on Kotlin, Compose, and user-centric UX patterns.",
            tags: ["Offline First", "Compose", "UX Architecture"]
        },
        {
            title: "Backend Systems",
            icon: <Server className="text-secondary w-8 h-8" />,
            description: "Designing scalable microservices and robust APIs. Emphasizing security, authentication flows, and reliable data synchronization.",
            tags: ["RESTful APIs", "Microservices", "Auth Security"]
        },
        {
            title: "System Mindset",
            icon: <Component className="text-white w-8 h-8" />,
            description: "Bridging the gap between mobile and server. Understanding the full lifecycle from Docker containers to CI/CD pipelines.",
            tags: ["Docker", "Linux", "CI/CD"]
        }
    ];

    return (
        <SectionWrapper className="py-24">
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-white mb-4">Core Capabilities</h2>
                <p className="text-gray-400 max-w-2xl">
                    Moving beyond simple coding to engineering robust systems.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {capabilities.map((cap, index) => (
                    <Card key={index} className="h-full flex flex-col justify-between group">
                        <div>
                            <div className="mb-6 p-3 bg-white/5 rounded-lg w-fit group-hover:bg-white/10 transition-colors">
                                {cap.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{cap.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                {cap.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-auto">
                            {cap.tags.map((tag) => (
                                <span key={tag} className="text-xs font-mono px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </SectionWrapper>
    );
};
