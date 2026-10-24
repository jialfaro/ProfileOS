"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Cpu, 
  Sparkles, 
  Layers, 
  FileText, 
  Volume2, 
  VolumeX, 
  Download, 
  Compass, 
  Menu,
  X
} from "lucide-react";
import { setSoundMuted, getSoundMuted, playTactileClick } from "@/lib/sound";

interface HeaderProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [muted, setMuted] = useState<boolean>(getSoundMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: "hero", label: "Topología 3D", icon: Compass, accent: "sky" },
    { id: "machine", label: "Máquina 3D", icon: Cpu, accent: "amber" },
    { id: "timeline", label: "Trayectoria", icon: Layers, accent: "indigo" },
    { id: "adapter", label: "Match Vacante", icon: Sparkles, accent: "emerald" },
    { id: "export", label: "Descargar CV", icon: FileText, accent: "teal" },
  ];

  return (
    <header className="no-print sticky top-3 z-40 w-full px-4 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-6xl mx-auto rounded-2xl glass-panel p-2 sm:px-4 sm:py-2.5 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-2xl">
        
        {/* Brand Profile Signature */}
        <div 
          onClick={() => handleNav("hero")}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 shadow-md group-hover:border-sky-400/60 transition-all duration-300">
            <Cpu className="w-5 h-5 text-sky-400 group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 tracking-tight text-sm sm:text-base font-sans">
                Alexis Alfaro
              </span>
              <span className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-full bg-sky-950/80 text-sky-300 border border-sky-800/50">
                Arquitecto TI
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-sans hidden sm:block">
              Soluciones & Integración Cloud
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-950/50 p-1 rounded-xl border border-slate-800/80">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                  isActive
                    ? "bg-slate-800/90 text-sky-300 shadow-sm border border-slate-700/70"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-900/60"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-sky-400" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Sound Switch & Primary CTA */}
        <div className="flex items-center gap-2">
          
          {/* Tactile Audio Switch */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-xl border text-xs transition-all ${
              muted
                ? "bg-slate-900/50 border-slate-800 text-slate-500 hover:text-slate-300"
                : "bg-slate-900/80 border-sky-500/40 text-sky-400 hover:bg-slate-800 shadow-sm shadow-sky-500/10"
            }`}
            title={muted ? "Activar audio táctil" : "Silenciar audio"}
            aria-label="Toggle sound"
          >
            {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Quick PDF Action */}
          <button
            onClick={() => handleNav("export")}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 border border-sky-400/30 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="font-sans">Descargar CV</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto rounded-2xl glass-panel p-3 border border-white/10 shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-sans font-medium transition-all text-left ${
                  isActive
                    ? "bg-sky-500/15 text-sky-300 border border-sky-500/40"
                    : "text-slate-300 hover:bg-slate-800/60"
                }`}
              >
                <Icon className="w-4 h-4 text-sky-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
