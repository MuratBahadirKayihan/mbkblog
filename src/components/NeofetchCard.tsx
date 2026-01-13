"use client";

import React, { useState, useEffect } from "react";

export const NeofetchCard = () => {
    const [uptime, setUptime] = useState<string>("calculating...");

    useEffect(() => {
        // Mock start time: user "booted" when they landed on the page
        // or effectively just a counter from component mount
        const startTime = Date.now();

        const updateUptime = () => {
            const now = Date.now();
            const diff = now - startTime;

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setUptime(`${hours}h ${minutes}m ${seconds}s`);
        };

        const interval = setInterval(updateUptime, 1000);
        updateUptime(); // Initial call

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="font-mono text-xs leading-relaxed text-zinc-400">
            <div className="flex gap-4">
                <div className="hidden sm:block text-blue-500 font-bold select-none">
                    {`
       /\\
      /  \\
     /    \\
    /      \\
   /   ,,   \\
  /   |  |   \\
 /_-''    ''-_\\
                    `}
                </div>
                <div className="space-y-1">
                    <div><span className="text-blue-400 font-bold">kayihan</span>@<span className="text-blue-400 font-bold">archlinux</span></div>
                    <div>-------------------</div>
                    <div><span className="text-blue-400 font-bold">OS</span>: CachyOS Linux x86_64</div>
                    <div><span className="text-blue-400 font-bold">Kernel</span>: 6.10.2-22-cachyos</div>
                    <div><span className="text-blue-400 font-bold">Uptime</span>: {uptime}</div>
                    <div><span className="text-blue-400 font-bold">Shell</span>: zsh 5.9</div>
                    <div><span className="text-blue-400 font-bold">WM</span>: Hyprland</div>
                    <div><span className="text-blue-400 font-bold">Theme</span>: Catppuccin Mocha</div>
                    <div><span className="text-blue-400 font-bold">Terminal</span>: Alacritty / Ghostty</div>
                    <div className="flex gap-1 mt-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full hover:scale-125 transition-transform cursor-pointer" />
                        <div className="w-3 h-3 bg-green-500 rounded-full hover:scale-125 transition-transform cursor-pointer" />
                        <div className="w-3 h-3 bg-yellow-500 rounded-full hover:scale-125 transition-transform cursor-pointer" />
                        <div className="w-3 h-3 bg-blue-500 rounded-full hover:scale-125 transition-transform cursor-pointer" />
                        <div className="w-3 h-3 bg-purple-500 rounded-full hover:scale-125 transition-transform cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    );
};
