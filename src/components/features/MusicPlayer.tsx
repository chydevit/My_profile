"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
    Music, 
    X, 
    Play, 
    Pause, 
    SkipForward, 
    SkipBack, 
    ListMusic, 
    Volume2, 
    VolumeX, 
    Shuffle, 
    Repeat, 
    Video, 
    VideoOff,
    Minus
} from "lucide-react";

interface Song {
    id: string;
    title: string;
    artist: string;
    language: "english" | "khmer" | "chinese";
    flag: string;
    bgGradient: string;
}

const PLAYLIST: Song[] = [
    // English
    {
        id: "JGwWNGJdvx8",
        title: "Shape of You",
        artist: "Ed Sheeran",
        language: "english",
        flag: "🇬🇧",
        bgGradient: "from-indigo-500/20 to-blue-500/20"
    },
    {
        id: "09R8_2nJffg",
        title: "Sugar",
        artist: "Maroon 5",
        language: "english",
        flag: "🇬🇧",
        bgGradient: "from-pink-500/20 to-rose-500/20"
    },
    {
        id: "2Vv-BfVoq4g",
        title: "Perfect",
        artist: "Ed Sheeran",
        language: "english",
        flag: "🇬🇧",
        bgGradient: "from-amber-500/20 to-orange-500/20"
    },
    {
        id: "kTJSAhwCuw4",
        title: "Stay",
        artist: "The Kid LAROI & Justin Bieber",
        language: "english",
        flag: "🇬🇧",
        bgGradient: "from-purple-500/20 to-pink-500/20"
    },
    // Khmer
    {
        id: "rvje5oblrLw",
        title: "Time To Rise",
        artist: "VannDa ft. Master Kong Nay",
        language: "khmer",
        flag: "🇰🇭",
        bgGradient: "from-red-500/20 to-amber-500/20"
    },
    {
        id: "eOB0qLRO020",
        title: "Champa Battambang",
        artist: "Sinn Sisamouth",
        language: "khmer",
        flag: "🇰🇭",
        bgGradient: "from-emerald-500/20 to-teal-500/20"
    },
    {
        id: "kaIZnQrgASU",
        title: "Are You Ok?",
        artist: "Ton Chanseyma",
        language: "khmer",
        flag: "🇰🇭",
        bgGradient: "from-purple-500/20 to-indigo-500/20"
    },
    {
        id: "e0yB6hN_Z_U",
        title: "Catch Me If You Can",
        artist: "VannDa",
        language: "khmer",
        flag: "🇰🇭",
        bgGradient: "from-yellow-500/20 to-red-500/20"
    },
    {
        id: "FQy2vjF3pJw",
        title: "Solo",
        artist: "VannDa",
        language: "khmer",
        flag: "🇰🇭",
        bgGradient: "from-sky-500/20 to-indigo-500/20"
    },
    // Chinese
    {
        id: "bu7nU9Mhpyo",
        title: "Love Confession (告白气球)",
        artist: "Jay Chou (周杰伦)",
        language: "chinese",
        flag: "🇨🇳",
        bgGradient: "from-rose-500/20 to-red-500/20"
    },
    {
        id: "XKuL5xaKZHM",
        title: "Actor (演员)",
        artist: "Joker Xue (薛之谦)",
        language: "chinese",
        flag: "🇨🇳",
        bgGradient: "from-slate-500/20 to-zinc-500/20"
    },
    {
        id: "T4SimnaiktU",
        title: "Light Years Away (光年之外)",
        artist: "G.E.M. (邓紫棋)",
        language: "chinese",
        flag: "🇨🇳",
        bgGradient: "from-cyan-500/20 to-violet-500/20"
    },
    {
        id: "mQ5l86T3lAg",
        title: "Let's Not Be Friends Anymore (以後別做朋友)",
        artist: "Eric Chou (周兴哲)",
        language: "chinese",
        flag: "🇨🇳",
        bgGradient: "from-blue-500/20 to-indigo-500/20"
    },
    {
        id: "uSg6s_iXf2U",
        title: "Suddenly Missing You (突然好想你)",
        artist: "Mayday (五月天)",
        language: "chinese",
        flag: "🇨🇳",
        bgGradient: "from-teal-500/20 to-green-500/20"
    }
];

export default function MusicPlayer() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaylistOpen, setIsPlaylistOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<"all" | "english" | "khmer" | "chinese">("all");
    const [showVideo, setShowVideo] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [isRepeat, setIsRepeat] = useState<"off" | "all" | "one">("off");
    const [hasInteracted, setHasInteracted] = useState(false);

    const iframeRef = useRef<HTMLIFrameElement>(null);
    const currentSong = PLAYLIST[currentSongIndex];

    // Filter songs based on chosen language tab
    const filteredSongs = PLAYLIST.filter(
        (song) => selectedLanguage === "all" || song.language === selectedLanguage
    );

    const handleNext = useCallback(() => {
        setHasInteracted(true);
        if (isRepeat === "one") {
            // Replay same song by refreshing iframe
            if (iframeRef.current) {
                const src = iframeRef.current.src;
                iframeRef.current.src = "";
                iframeRef.current.src = src;
            }
            setIsPlaying(true);
            return;
        }

        if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * PLAYLIST.length);
            setCurrentSongIndex(randomIndex);
        } else {
            setCurrentSongIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
        }
        setIsPlaying(true);
    }, [isShuffle, isRepeat]);

    const handlePrev = () => {
        setHasInteracted(true);
        if (isShuffle) {
            const randomIndex = Math.floor(Math.random() * PLAYLIST.length);
            setCurrentSongIndex(randomIndex);
        } else {
            setCurrentSongIndex((prevIndex) => (prevIndex - 1 + PLAYLIST.length) % PLAYLIST.length);
        }
        setIsPlaying(true);
    };

    const handleSelectSong = (songId: string) => {
        setHasInteracted(true);
        const originalIndex = PLAYLIST.findIndex((s) => s.id === songId);
        if (originalIndex !== -1) {
            setCurrentSongIndex(originalIndex);
            setIsPlaying(true);
        }
    };

    // Stably register next handler for message listener
    const handleNextRef = useRef<() => void>(handleNext);
    useEffect(() => {
        handleNextRef.current = handleNext;
    }, [handleNext]);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.origin !== "https://www.youtube.com") return;
            try {
                const data = JSON.parse(event.data);
                if (data.event === "onStateChange") {
                    // YouTube player states: 0 = ended, 1 = playing, 2 = paused
                    if (data.info === 1) {
                        setIsPlaying(true);
                    } else if (data.info === 2) {
                        setIsPlaying(false);
                    } else if (data.info === 0) {
                        handleNextRef.current();
                    }
                }
            } catch {
                /* empty */
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    const togglePlay = () => {
        setHasInteracted(true);
        if (!iframeRef.current) return;
        if (isPlaying) {
            iframeRef.current.contentWindow?.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                "*"
            );
            setIsPlaying(false);
        } else {
            iframeRef.current.contentWindow?.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                "*"
            );
            setIsPlaying(true);
        }
    };

    const toggleMute = () => {
        if (!iframeRef.current) return;
        if (isMuted) {
            iframeRef.current.contentWindow?.postMessage(
                '{"event":"command","func":"unMute","args":""}',
                "*"
            );
        } else {
            iframeRef.current.contentWindow?.postMessage(
                '{"event":"command","func":"mute","args":""}',
                "*"
            );
        }
        setIsMuted(!isMuted);
    };

    const toggleRepeat = () => {
        if (isRepeat === "off") setIsRepeat("all");
        else if (isRepeat === "all") setIsRepeat("one");
        else setIsRepeat("off");
    };

    const togglePlayerOpen = () => {
        setIsOpen(!isOpen);
    };

    // Close the panel (Hide UI) but let the music continue playing in the background
    const hidePlayerUI = () => {
        setIsOpen(false);
    };

    // Full Stop Player (Pause playback and close the panel)
    const stopAndClosePlayer = () => {
        if (iframeRef.current) {
            iframeRef.current.contentWindow?.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                "*"
            );
        }
        setIsPlaying(false);
        setIsOpen(false);
    };

    return (
        <>
            <div className="fixed bottom-5 left-5 z-50 flex items-center gap-3 sm:bottom-7 sm:left-7">
                {/* Floating Action Launcher Button */}
                <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={togglePlayerOpen}
                    className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-400/20 bg-slate-950/85 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-cyan-400/40 hover:bg-cyan-500 hover:text-slate-950 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 dark:border-cyan-400/20"
                    aria-label="Toggle playlist music player"
                    title={isOpen ? "Close Player" : "Open Player"}
                >
                    <Music className={`h-5 w-5 ${isPlaying ? "animate-pulse" : "animate-pulse-slow"}`} />
                    
                    {/* Ring glow when playing in background */}
                    {isPlaying && (
                        <>
                            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500"></span>
                            </span>
                            <span className="absolute inset-0 rounded-full border-2 border-cyan-400/60 animate-ping opacity-45 pointer-events-none" />
                        </>
                    )}
                </motion.button>

                {/* Now Playing Hover Tooltip (Active only when UI is hidden/minimized but song is playing) */}
                <AnimatePresence>
                    {!isOpen && isPlaying && (
                        <motion.div
                            initial={{ opacity: 0, x: -15, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: -15, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="hidden md:flex items-center gap-2.5 rounded-xl border border-cyan-400/20 bg-slate-950/90 px-3 py-1.5 shadow-[0_4px_20px_rgba(2,6,23,0.6)] backdrop-blur-md"
                        >
                            <span className="text-sm select-none">{currentSong.flag}</span>
                            <div className="flex flex-col min-w-0 max-w-[140px]">
                                <span className="truncate text-[10px] font-bold text-slate-100 font-heading">
                                    {currentSong.title}
                                </span>
                                <span className="truncate text-[8px] text-slate-400 mt-0.5">
                                    {currentSong.artist}
                                </span>
                            </div>
                            
                            {/* Visualizer animation bar */}
                            <div className="flex gap-[2px] items-end h-2.5 w-3 ml-1 select-none">
                                <span className="w-[2px] bg-cyan-400 rounded-full animate-bounce h-2" style={{ animationDelay: "0s" }} />
                                <span className="w-[2px] bg-cyan-400 rounded-full animate-bounce h-2.5" style={{ animationDelay: "0.15s" }} />
                                <span className="w-[2px] bg-cyan-400 rounded-full animate-bounce h-1.5" style={{ animationDelay: "0.3s" }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 30, scale: 0.92 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="fixed bottom-20 left-5 z-50 w-[310px] rounded-2xl border border-cyan-400/20 bg-slate-950/95 p-4 shadow-[0_20px_50px_rgba(2,6,23,0.7)] backdrop-blur-xl sm:bottom-24 sm:left-7 sm:w-[350px] overflow-hidden"
                    >
                        {/* Background glowing aura based on song gradient */}
                        <div className={`absolute -inset-10 bg-gradient-to-tr ${currentSong.bgGradient} opacity-30 blur-2xl pointer-events-none transition-all duration-700`} />

                        {/* Header */}
                        <div className="relative z-10 mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                                    <Music className="h-3.5 w-3.5" />
                                </div>
                                <span className="text-xs font-bold tracking-widest text-cyan-300/90 uppercase font-heading">
                                    Aero Playback
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                {/* Video toggle button */}
                                <button
                                    type="button"
                                    onClick={() => setShowVideo(!showVideo)}
                                    className={`flex h-6 w-6 items-center justify-center rounded-full transition-all border ${showVideo ? "bg-cyan-500/20 border-cyan-400/30 text-cyan-300" : "border-slate-800 text-slate-400 hover:text-slate-200"}`}
                                    title={showVideo ? "Hide Video Player" : "Show Video Player"}
                                >
                                    {showVideo ? <VideoOff className="h-3.5 w-3.5" /> : <Video className="h-3.5 w-3.5" />}
                                </button>
                                {/* Minimize (Hide UI but keep playing) */}
                                <button
                                    type="button"
                                    onClick={hidePlayerUI}
                                    className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-800 text-slate-400 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
                                    title="Minimize (Keep Playing)"
                                >
                                    <Minus className="h-3.5 w-3.5" />
                                </button>
                                {/* Full Close & Stop */}
                                <button
                                    type="button"
                                    onClick={stopAndClosePlayer}
                                    className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-800 text-slate-400 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400 transition-all"
                                    title="Close & Stop Playback"
                                    aria-label="Close music player"
                                >
                                    <X className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        </div>

                        {/* Player Content (IFrame / Visualizer CD) */}
                        <div className="relative z-10 mb-4 aspect-video w-full overflow-hidden rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-center shadow-inner">
                            {/* YouTube IFrame - always loaded but hidden/shown based on showVideo */}
                            <iframe
                                ref={iframeRef}
                                src={`https://www.youtube.com/embed/${currentSong.id}?enablejsapi=1&autoplay=${hasInteracted ? 1 : 0}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                                className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${showVideo ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                                allow="autoplay; encrypted-media"
                                title="YouTube music player"
                            />

                            {/* Custom CD / Vinyl Disk Visualizer when video is hidden */}
                            {!showVideo && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 select-none">
                                    <motion.div
                                        animate={isPlaying ? { rotate: 360 } : {}}
                                        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                                        className="relative h-24 w-24 rounded-full border-4 border-slate-800 bg-slate-950 flex items-center justify-center shadow-2xl overflow-hidden group"
                                    >
                                        {/* Vinyl Grooves */}
                                        <div className="absolute inset-2 rounded-full border border-slate-800/50" />
                                        <div className="absolute inset-4 rounded-full border border-slate-700/30" />
                                        <div className="absolute inset-6 rounded-full border border-slate-800/50" />

                                        {/* Center Label (Colored matching flag/language) */}
                                        <div className="h-10 w-10 rounded-full bg-cyan-500/10 border-2 border-cyan-400/40 flex items-center justify-center shadow-lg relative z-10">
                                            <span className="text-lg leading-none">{currentSong.flag}</span>
                                        </div>

                                        {/* Outer glowing halo */}
                                        {isPlaying && (
                                            <div className="absolute inset-0 rounded-full bg-cyan-500/5 animate-pulse" />
                                        )}
                                    </motion.div>

                                    {/* Visualizer bars */}
                                    <div className="mt-4 flex items-center gap-[3px] h-4">
                                        {[...Array(9)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={isPlaying ? { height: [4, 16, 4] } : { height: 4 }}
                                                transition={{
                                                    duration: 0.8,
                                                    repeat: Infinity,
                                                    repeatType: "reverse",
                                                    delay: i * 0.08,
                                                    ease: "easeInOut"
                                                }}
                                                className="w-[3px] rounded-full bg-cyan-400/80"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Song Details */}
                        <div className="relative z-10 mb-3 flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate text-sm font-semibold text-slate-100 font-heading">
                                    {currentSong.title}
                                </h3>
                                <p className="truncate text-xs text-slate-400 mt-0.5">
                                    {currentSong.artist}
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/10 bg-cyan-500/5 px-2 py-0.5 text-[10px] font-medium text-cyan-400 capitalize whitespace-nowrap">
                                {currentSong.flag} {currentSong.language}
                            </span>
                        </div>

                        {/* Controls */}
                        <div className="relative z-10 flex flex-col gap-3">
                            {/* Playback Action Buttons */}
                            <div className="flex items-center justify-between px-2">
                                <button
                                    type="button"
                                    onClick={() => setIsShuffle(!isShuffle)}
                                    className={`p-1.5 transition-colors ${isShuffle ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
                                    title="Shuffle"
                                >
                                    <Shuffle className="h-4 w-4" />
                                </button>

                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-all active:scale-95"
                                        title="Previous Song"
                                    >
                                        <SkipBack className="h-4 w-4" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={togglePlay}
                                        className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all hover:scale-105 hover:bg-cyan-400 active:scale-95"
                                        aria-label={isPlaying ? "Pause" : "Play"}
                                    >
                                        {isPlaying ? (
                                            <Pause className="h-5 w-5 fill-slate-950" />
                                        ) : (
                                            <Play className="h-5 w-5 fill-slate-950 ml-0.5" />
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-800 bg-slate-900/40 text-slate-400 hover:bg-slate-800 hover:text-slate-100 transition-all active:scale-95"
                                        title="Next Song"
                                    >
                                        <SkipForward className="h-4 w-4" />
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={toggleRepeat}
                                    className={`relative p-1.5 transition-colors ${isRepeat !== "off" ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"}`}
                                    title={`Repeat Mode: ${isRepeat}`}
                                >
                                    <Repeat className="h-4 w-4" />
                                    {isRepeat === "one" && (
                                        <span className="absolute bottom-0 right-0 flex h-3 w-3 items-center justify-center rounded-full bg-cyan-500 text-[8px] font-bold text-slate-950">
                                            1
                                        </span>
                                    )}
                                </button>
                            </div>

                            {/* Volume & Playlist Toggle Bar */}
                            <div className="flex items-center justify-between border-t border-slate-900 pt-3">
                                <button
                                    type="button"
                                    onClick={toggleMute}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-900 bg-slate-900/20 text-slate-400 hover:text-slate-200 transition-colors"
                                    title={isMuted ? "Unmute" : "Mute"}
                                >
                                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsPlaylistOpen(!isPlaylistOpen)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${isPlaylistOpen ? "bg-cyan-500/10 border-cyan-400/20 text-cyan-300" : "bg-slate-900/20 border-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-800"}`}
                                >
                                    <ListMusic className="h-3.5 w-3.5" />
                                    <span>Playlist</span>
                                    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-slate-800 px-1 text-[9px] font-bold text-slate-300">
                                        {PLAYLIST.length}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Playlist Drawer */}
                        <AnimatePresence>
                            {isPlaylistOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="relative z-10 mt-3 border-t border-slate-900 pt-3 overflow-hidden"
                                >
                                    {/* Language Tabs */}
                                    <div className="flex gap-1 mb-2.5 overflow-x-auto pb-1 no-scrollbar">
                                        {(["all", "english", "khmer", "chinese"] as const).map((lang) => {
                                            const flag = lang === "english" ? "🇬🇧" : lang === "khmer" ? "🇰🇭" : lang === "chinese" ? "🇨🇳" : "";
                                            return (
                                                <button
                                                    key={lang}
                                                    type="button"
                                                    onClick={() => setSelectedLanguage(lang)}
                                                    className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${selectedLanguage === lang ? "bg-cyan-500/10 border-cyan-400/30 text-cyan-300" : "bg-slate-900/30 border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/60"}`}
                                                >
                                                    {flag && <span className="mr-1">{flag}</span>}
                                                    {lang}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Scrollable Song List */}
                                    <div className="max-h-40 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                                        {filteredSongs.map((song) => {
                                            const isActive = song.id === currentSong.id;
                                            return (
                                                <button
                                                    key={song.id}
                                                    type="button"
                                                    onClick={() => handleSelectSong(song.id)}
                                                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all ${isActive ? "bg-cyan-500/10 border border-cyan-400/20 text-cyan-300" : "bg-slate-900/10 border border-transparent text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"}`}
                                                >
                                                    <div className="flex items-center gap-2.5 min-w-0">
                                                        <span className="text-[10px] tabular-nums font-mono opacity-50 w-3">
                                                            {PLAYLIST.findIndex((s) => s.id === song.id) + 1}
                                                        </span>
                                                        <div className="min-w-0">
                                                            <p className={`truncate text-xs font-medium ${isActive ? "text-cyan-300 font-semibold" : "text-slate-300"}`}>
                                                                {song.title}
                                                            </p>
                                                            <p className="truncate text-[10px] opacity-70">
                                                                {song.artist}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 pl-2 select-none">
                                                        {isActive && isPlaying && (
                                                            <div className="flex gap-[2px] items-end h-2.5 w-3">
                                                                <span className="w-[2px] bg-cyan-400 rounded-full animate-bounce h-2" style={{ animationDelay: "0s" }} />
                                                                <span className="w-[2px] bg-cyan-400 rounded-full animate-bounce h-2.5" style={{ animationDelay: "0.15s" }} />
                                                                <span className="w-[2px] bg-cyan-400 rounded-full animate-bounce h-1.5" style={{ animationDelay: "0.3s" }} />
                                                            </div>
                                                        )}
                                                        <span className="text-xs">{song.flag}</span>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                        {filteredSongs.length === 0 && (
                                            <p className="text-[11px] text-slate-500 text-center py-4">No songs in this language.</p>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}