"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wifi, Battery, Signal, Layers, CloudOff, Activity, Cpu, Fingerprint, Play, Pause } from "lucide-react";

export type EngineeringStage = "foundation" | "performance" | "ux" | "resilience";

interface PhoneSystemProps {
    stage: EngineeringStage;
}

const stageConfig = {
    foundation: {
        color: "text-cyan-400",
        gradient: "from-cyan-500 to-teal-500",
        label: "Architecture"
    },
    performance: {
        color: "text-emerald-400",
        gradient: "from-emerald-500 to-lime-500",
        label: "Performance"
    },
    ux: {
        color: "text-purple-400",
        gradient: "from-purple-500 to-pink-500",
        label: "Experience"
    },
    resilience: {
        color: "text-amber-400",
        gradient: "from-amber-500 to-orange-500",
        label: "Resilience"
    }
};

export const PhoneSystem: React.FC<PhoneSystemProps> = ({ stage }) => {
    return (
        <div className={`
        relative overflow-hidden transition-all duration-700
        w-full h-full
        lg:w-[400px] lg:h-[800px] 
        lg:bg-[#050505] lg:border-[16px] lg:border-[#121212] lg:rounded-[4rem] lg:shadow-2xl lg:ring-1 lg:ring-white/5
    `}>
            {/* Notch */}
            <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-48 h-8 bg-[#121212] rounded-b-3xl z-50 border-b border-l border-r border-white/5" />

            {/* Screen Container */}
            <div className="w-full h-full relative overflow-hidden flex flex-col bg-[#0A0A0A]">
                {/* Dynamic Inner Glow */}
                <motion.div
                    className="absolute inset-0 z-0 opacity-20"
                    animate={{ background: `radial-gradient(circle at 50% 120%, ${stage === 'foundation' ? '#06b6d4' : stage === 'performance' ? '#10b981' : stage === 'ux' ? '#a855f7' : '#f59e0b'}, transparent 70%)` }}
                    transition={{ duration: 1.5 }}
                />

                <StatusBar />

                <InternalHeader stage={stage} />

                <div className="flex-1 relative w-full h-full">
                    <LayerFoundation active={true} />
                    <LayerPerformance active={stage === 'performance' || stage === 'ux' || stage === 'resilience'} />
                    <LayerUX active={stage === 'ux' || stage === 'resilience'} />
                    <LayerResilience active={stage === 'resilience'} />
                </div>
            </div>

            {/* Reflection */}
            <div className="hidden lg:block absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent z-50 rounded-[4rem]" />
        </div>
    );
};

const StatusBar = () => (
    <div className="w-full px-8 pt-4 pb-2 flex justify-between items-center z-40 lg:pt-10 text-white/40">
        <RealTimeClock />
        <div className="flex gap-2">
            <Signal size={12} />
            <Wifi size={12} />
            <Battery size={12} />
        </div>
    </div>
);

const InternalHeader = ({ stage }: { stage: EngineeringStage }) => {
    const config = stageConfig[stage];
    return (
        <div className="w-full px-8 py-6 z-40 relative">
            <motion.div className="flex flex-col gap-3">
                <div className="flex justify-between items-end">
                    <motion.div
                        key={config.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col"
                    >
                        <span className={`text-[9px] font-mono uppercase tracking-widest mb-1 ${config.color}`}>System Mode</span>
                        <h2 className="text-2xl font-bold text-white tracking-tight leading-none">{config.label}</h2>
                    </motion.div>
                </div>
                <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full w-full bg-gradient-to-r ${config.gradient}`}
                        layoutId="header-bar"
                    />
                </div>
            </motion.div>
        </div>
    )
}

const LayerWrapper = ({ active, children, className = "" }: { active: boolean, children: React.ReactNode, className?: string }) => (
    <motion.div
        className={`absolute inset-0 p-8 pt-0 flex flex-col gap-6 ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.8 }}
    >
        {children}
    </motion.div>
);

const LayerFoundation = ({ active }: { active: boolean }) => (
    <div className="absolute inset-0 p-8 pt-0 flex flex-col gap-6">
        <div className="w-full aspect-square border border-dashed border-zinc-800 rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-30">
                {[...Array(36)].map((_, i) => (
                    <div key={i} className="border-[0.5px] border-zinc-700/50" />
                ))}
            </div>
            {/* Animated Data Flow */}
            <motion.div
                className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500/50"
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />

            {/* Scrolling Log Stream */}
            <div className="absolute inset-x-4 bottom-4 top-4 overflow-hidden mask-linear-fade">
                <motion.div
                    initial={{ y: 0 }}
                    animate={{ y: "-50%" }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="flex flex-col gap-2"
                >
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="font-mono text-[8px] text-cyan-500/40 truncate">
                            {`> 0x${Math.random().toString(16).substr(2, 8).toUpperCase()} // SYNC_ACK`}
                        </div>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {[...Array(20)].map((_, i) => (
                        <div key={`d-${i}`} className="font-mono text-[8px] text-cyan-500/40 truncate">
                            {`> 0x${Math.random().toString(16).substr(2, 8).toUpperCase()} // SYNC_ACK`}
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <Cpu className="text-cyan-500 opacity-20" size={48} />
            </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
            <div className="h-24 w-full bg-zinc-900/50 rounded-xl border border-white/5 p-3 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                <motion.div
                    className="font-mono text-[9px] text-zinc-500 leading-relaxed"
                    animate={{ y: [-20, -100] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                    <p> initializing core systems...</p>
                    <p> loading modules: [net, fs, crypto]</p>
                    <p> mounting volumes...</p>
                    <p> verifying integrity... OK</p>
                    <p> starting daemon...</p>
                    <p> listening on port 8080...</p>
                    <p> connection established.</p>
                    <p> initializing core systems...</p>
                    <p> loading modules: [net, fs, crypto]</p>
                </motion.div>
            </div>
        </div>
    </div>
);

const LayerPerformance = ({ active }: { active: boolean }) => (
    <LayerWrapper active={active} className="bg-[#0A0A0A] z-10">
        <div className="w-full aspect-square bg-zinc-900/50 rounded-3xl relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col p-6 gap-3">
                <div className="w-full h-full bg-zinc-800/20 rounded-2xl animate-pulse relative overflow-hidden">
                    {/* Scanning Line Effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-500/10 to-transparent"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                </div>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
                <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-emerald-500/10 text-emerald-500 text-[10px] font-mono px-2 py-1 rounded border border-emerald-500/20 backdrop-blur-sm flex items-center gap-1"
                >
                    <Activity size={10} /> 60 FPS
                </motion.div>
            </div>
        </div>
        <div className="flex-1 flex flex-col gap-4">
            <div className="h-4 w-3/4 bg-zinc-800/80 rounded" />
            <div className="space-y-3">
                <div className="h-2 w-full bg-zinc-900 rounded" />
                <div className="h-2 w-5/6 bg-zinc-900 rounded" />
            </div>
            <div className="mt-auto h-14 w-full bg-zinc-900 rounded-2xl" />
        </div>
    </LayerWrapper>
);

const LayerUX = ({ active }: { active: boolean }) => (
    <LayerWrapper active={active} className="bg-[#0A0A0A] z-20">
        <div className="w-full aspect-square relative rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-transparent" />

            {/* Ripple Emitter */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-0 rounded-full border border-purple-500/30"
                            animate={{ width: ["0%", "200%"], height: ["0%", "200%"], opacity: [1, 0] }}
                            style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
                        />
                    ))}
                    <div className="w-20 h-20 bg-purple-500/20 rounded-full blur-xl relative z-10 flex items-center justify-center">
                        <Fingerprint className="text-purple-400" size={32} />
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/50 to-transparent">
                <p className="text-sm font-medium text-white">Fluid Interactions</p>
                <div className="flex gap-1 mt-1">
                    <div className="w-1 h-1 rounded-full bg-purple-500" />
                    <div className="w-1 h-1 rounded-full bg-zinc-600" />
                    <div className="w-1 h-1 rounded-full bg-zinc-600" />
                </div>
            </div>
        </div>

        <div className="flex-1 flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-white leading-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Human First</span>
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
                Gestures that feel natural. Interfaces that respond to touch with organic fluidity.
            </p>
            <div className="mt-auto w-full">
                <MusicWidget />
            </div>
        </div>
    </LayerWrapper>
);

const LayerResilience = ({ active }: { active: boolean }) => (
    <LayerWrapper active={active} className="z-30 pointer-events-none">

        {/* Connection Lost Toast - Floating Top */}
        <div className="absolute top-28 left-0 right-0 flex justify-center z-50">
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={active ? { y: 0, opacity: 1 } : { y: -20, opacity: 0 }}
                className="bg-neutral-900/95 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full flex items-center gap-3 shadow-2xl"
            >
                <Wifi size={14} className="text-amber-500" />
                <span className="text-[10px] font-bold text-zinc-200 tracking-wider">OFFLINE MODE</span>
            </motion.div>
        </div>

        {/* Subtle Desaturation layer */}
        <div className="absolute inset-0 bg-black/20 backdrop-grayscale-[30%] transition-all duration-1000" />

        {/* Sync Status Bottom Card */}
        <div className="absolute bottom-32 left-8 right-8">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={active ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                className="bg-neutral-900 border-l-2 border-l-amber-500 p-4 rounded-r-xl shadow-2xl flex gap-4 items-center"
            >
                <CloudOff className="text-amber-500/80 shrink-0" size={20} />
                <div>
                    <p className="text-xs font-bold text-white">Sync Paused</p>
                    <p className="text-[10px] text-zinc-500">Data queued locally. zero data loss.</p>
                </div>
            </motion.div>
        </div>
    </LayerWrapper>
);

// ---------------------------
// NEW COMPONENTS
// ---------------------------

const RealTimeClock = () => {
    const [time, setTime] = React.useState<string>("");

    React.useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }));
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    if (!time) return <span className="text-[10px] font-mono tracking-widest">--:--</span>;

    return (
        <span className="text-[10px] font-mono tracking-widest">{time}</span>
    );
};

const MusicWidget = () => {
    const [isPlaying, setIsPlaying] = React.useState(true);

    return (
        <div
            className="h-14 w-full bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center px-4 gap-3 shadow-lg cursor-pointer active:scale-95 transition-transform"
            onClick={() => setIsPlaying(!isPlaying)}
        >
            {/* Album Art Placeholder */}
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shrink-0 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />

                <div className="text-white/80">
                    {isPlaying ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" className="ml-0.5" />}
                </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="text-[10px] text-white/90 font-medium truncate leading-tight">Time</div>
                <div className="text-[9px] text-white/50 truncate leading-tight">Hans Zimmer - Inception</div>
            </div>

            {/* Waveform Animation */}
            <div className="flex gap-[2px] items-end h-3 pb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                        key={i}
                        className="w-[2px] bg-purple-400 rounded-full"
                        animate={isPlaying ? { height: ["20%", "100%", "40%"] } : { height: "20%" }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: i * 0.1,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
