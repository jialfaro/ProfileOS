"use client";

import React from "react";
import { CandidateProfile } from "@/data/profile";
import { 
  ShieldCheck, 
  Sparkles, 
  Network, 
  Cloud, 
  Workflow, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Terminal,
  Cpu
} from "lucide-react";

interface HeroProps {
  profile: CandidateProfile;
  onExploreTimeline: () => void;
  onOpenAdapter: () => void;
  onExport: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  onExploreTimeline,
  onOpenAdapter,
  onExport
}) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Subtle architectural ambient grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        
        {/* Verification & Positioning Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-xl backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-medium text-slate-300">
            Perfil Auditado con Reglas <span className="text-emerald-400 font-semibold">cv-architect</span>
          </span>
          <span className="h-3 w-px bg-slate-700" />
          <span className="text-[11px] font-mono text-slate-400">Sin Datos Inflados</span>
        </div>

        {/* Main Title */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 font-sans">
            <span className="block text-slate-300 font-normal text-2xl sm:text-3xl mb-1 tracking-wide font-mono">
              Alexis Alfaro Salazar
            </span>
            <span className="bg-gradient-to-r from-slate-100 via-sky-200 to-sky-400 bg-clip-text text-transparent">
              Arquitecto de TI & Soluciones Cloud
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-light">
            Especialista en <strong className="text-sky-300 font-medium">Gobierno del Ciclo de Vida de APIs</strong>, arquitecturas <strong className="text-sky-300 font-medium">Event-Driven (Kafka)</strong> y modernización cloud-native sobre <strong className="text-sky-300 font-medium">AWS y Azure</strong> en entornos de alta exigencia financiera (BCP, Mambu, Rímac).
          </p>
        </div>

        {/* Core Pillars / Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl mx-auto pt-2">
          
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left hover:border-slate-700 transition-all">
            <div className="flex items-center gap-2 text-sky-400 mb-1">
              <Workflow className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase">Experiencia</span>
            </div>
            <div className="text-2xl font-bold text-slate-100 font-mono">+7 Años</div>
            <div className="text-xs text-slate-400 mt-0.5">Banca, Seguros & Core</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left hover:border-slate-700 transition-all">
            <div className="flex items-center gap-2 text-emerald-400 mb-1">
              <Network className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase">API Management</span>
            </div>
            <div className="text-2xl font-bold text-slate-100 font-mono">Apigee & APIM</div>
            <div className="text-xs text-slate-400 mt-0.5">OAuth2, mTLS, JWT & EDA</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left hover:border-slate-700 transition-all">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Users className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase">Liderazgo</span>
            </div>
            <div className="text-2xl font-bold text-slate-100 font-mono">~30 Devs</div>
            <div className="text-xs text-slate-400 mt-0.5">Gobierno Multi-Squad</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left hover:border-slate-700 transition-all">
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Cloud className="w-4 h-4" />
              <span className="text-xs font-mono font-semibold uppercase">Marcos & Cloud</span>
            </div>
            <div className="text-2xl font-bold text-slate-100 font-mono">BIAN & C4</div>
            <div className="text-xs text-slate-400 mt-0.5">AWS, Azure & TOGAF</div>
          </div>

        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          
          <button
            onClick={onOpenAdapter}
            className="group flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium text-sm shadow-xl shadow-sky-500/25 border border-sky-400/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            <span>Adaptar CV a una Vacante Específica</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreTimeline}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 text-slate-200 font-medium text-sm border border-slate-700/80 hover:border-slate-600 shadow-md transition-all active:scale-[0.98]"
          >
            <Terminal className="w-4 h-4 text-slate-400" />
            <span>Explorar Trayectoria y Decisiones</span>
          </button>

        </div>

      </div>
    </section>
  );
};
