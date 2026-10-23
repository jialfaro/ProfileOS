"use client";

import React from "react";
import { Download, Cpu, Sparkles, FileText, Layers } from "lucide-react";

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/75 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/60 shadow-inner">
            <Cpu className="w-5 h-5 text-sky-400" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-100 tracking-tight text-sm sm:text-base font-mono">ProfileOS</span>
              <span className="px-1.5 py-0.5 text-[10px] uppercase font-mono tracking-wider font-semibold rounded bg-sky-950/80 text-sky-400 border border-sky-800/40">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">Alexis Alfaro Salazar — Solutions & API Architect</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1 rounded-full border border-slate-800/80">
          <button
            onClick={() => onNavigate("hero")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeSection === "hero"
                ? "bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Showcase
          </button>
          <button
            onClick={() => onNavigate("timeline")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeSection === "timeline"
                ? "bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Trayectoria
          </button>
          <button
            onClick={() => onNavigate("adapter")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
              activeSection === "adapter"
                ? "bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Adaptador CV
          </button>
          <button
            onClick={() => onNavigate("export")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeSection === "export"
                ? "bg-sky-500/15 text-sky-300 border border-sky-500/30 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Export Studio
          </button>
        </nav>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("export")}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20 border border-sky-400/30 transition-all active:scale-[0.98]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar CV</span>
          </button>
        </div>

      </div>
    </header>
  );
};
