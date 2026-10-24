"use client";

import React from "react";
import { ShieldCheck, Cpu, Heart } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="no-print border-t border-white/5 bg-[#04070e] py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-sans">
        
        {/* Left: Brand & Identification */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
            <Cpu className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-slate-200">Alexis Alfaro Salazar</span>
          <span className="text-slate-600">·</span>
          <span>Arquitecto de Soluciones Senior & Integración</span>
          <span className="text-slate-600">·</span>
          <span className="text-slate-400">Lima, Perú</span>
        </div>

        {/* Center: Verification */}
        <div className="flex items-center gap-1.5 text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Información técnica respaldada y verificada</span>
        </div>

        {/* Right: Links */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/jaime-ivan-alexis-a-2361a1130"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-sky-300 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/jialfaro/ProfileOS"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-sky-300 transition-colors"
          >
            GitHub
          </a>
          <span className="text-slate-600">© 2026 ProfileOS</span>
        </div>

      </div>
    </footer>
  );
};
