"use client";

import React, { useState } from "react";
import { 
  Cpu, 
  Sparkles, 
  Layers, 
  FileText, 
  Volume2, 
  VolumeX, 
  Printer, 
  Compass, 
  Terminal
} from "lucide-react";
import { setSoundMuted, getSoundMuted, playTactileClick } from "@/lib/sound";

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [muted, setMuted] = useState<boolean>(getSoundMuted());

  const handleToggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    setSoundMuted(nextMuted);
    if (!nextMuted) {
      playTactileClick();
    }
  };

  const handleNav = (section: string) => {
    playTactileClick();
    onNavigate(section);
  };

  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => handleNav("hero")}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 shadow-inner group-hover:border-sky-500/50 transition-colors">
            <Cpu className="w-5 h-5 text-sky-400 group-hover:rotate-45 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-100 tracking-tight text-sm sm:text-base font-mono">
                ProfileOS
              </span>
              <span className="px-1.5 py-0.5 text-[9px] uppercase font-mono tracking-wider font-semibold rounded bg-sky-950/80 text-sky-400 border border-sky-800/40">
                Workstation
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono hidden sm:block">
              Alexis Alfaro — IT & Cloud Solutions Architect
            </p>
          </div>
        </div>

        {/* Central Lenses Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-full border border-slate-800 shadow-inner">
          <button
            onClick={() => handleNav("hero")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
              activeSection === "hero"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>3D Topology</span>
          </button>

          <button
            onClick={() => handleNav("timeline")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
              activeSection === "timeline"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Decisiones & Trayectoria</span>
          </button>

          <button
            onClick={() => handleNav("adapter")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
              activeSection === "adapter"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Job Match HUD</span>
          </button>

          <button
            onClick={() => handleNav("export")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
              activeSection === "export"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Dossier & ATS</span>
          </button>
        </nav>

        {/* Right Tools (Sound Toggle + Quick Export) */}
        <div className="flex items-center gap-2.5">
          
          {/* Tactile Audio Feedback Switch */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              muted
                ? "bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-300"
                : "bg-slate-900 border-sky-500/40 text-sky-400 hover:bg-slate-800 shadow-sm"
            }`}
            title={muted ? "Activar audio táctil" : "Silenciar audio"}
            aria-label="Toggle sound"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Quick PDF Action */}
          <button
            onClick={() => handleNav("export")}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20 border border-sky-400/30 transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono">Exportar CV</span>
          </button>

        </div>

      </div>
    </header>
  );
};
