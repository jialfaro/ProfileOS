"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CandidateProfile } from "@/data/profile";
import { ARCHITECTURE_NODES, ArchitectureNode } from "@/data/architectureNodes";
import ArchitectureMachine3D, { ArchitectureStationId } from "@/components/ui/ArchitectureMachine3D";
import { 
  ShieldCheck, 
  Download, 
  ExternalLink, 
  Mail, 
  MapPin, 
  Sparkles, 
  Layers, 
  ArrowUpRight, 
  Maximize2,
  CheckCircle2,
  Cpu,
  GitBranch,
  Activity
} from "lucide-react";
import { playTactileClick, playNodeSelect } from "@/lib/sound";

interface ExecutiveHeroProps {
  profile: CandidateProfile;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  onOpenInspector: () => void;
  onExport: () => void;
  onExploreSystems: () => void;
  onOpenMatcher: () => void;
}

export const ExecutiveHero: React.FC<ExecutiveHeroProps> = ({
  profile,
  selectedNodeId,
  onSelectNode,
  onOpenInspector,
  onExport,
  onExploreSystems,
  onOpenMatcher
}) => {
  const activeNode = ARCHITECTURE_NODES.find((n) => n.id === selectedNodeId) || ARCHITECTURE_NODES[0];

  return (
    <section id="hero-section" className="no-print relative min-h-[92vh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-4 pb-12 max-w-7xl mx-auto w-full">
      
      {/* Top Telemetry Ticker */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.06] text-xs font-sans text-stone-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-stone-300 font-medium">Perfil Verificado cv-architect</span>
          <span className="text-stone-600">·</span>
          <span className="text-stone-400">Lima, Perú</span>
          <span className="text-stone-600">·</span>
          <span className="text-amber-300/90 font-mono">Tier-1 Banking Scale</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-stone-500">
            FRAMEWORKS: BIAN v13 · TOGAF · C4 MODEL · ARCHIMATE
          </span>
        </div>
      </div>

      {/* Main Split Layout: Left Content (45%) | Right 3D Viewport (55%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        
        {/* Left Column: Executive Identity & Live Telemetry Card */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Identity Presentation */}
          <div className="flex items-start gap-4">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600 opacity-25 blur-md group-hover:opacity-50 transition duration-500" />
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-amber-400/30 bg-stone-900 shadow-xl">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#0c0d12]" title="Disponible para contratación" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-100 font-sans tracking-tight">
                  {profile.name}
                </h1>
              </div>
              <p className="text-xs sm:text-sm font-sans font-medium text-amber-300">
                {profile.title}
              </p>
              <p className="text-xs text-stone-400 font-sans">
                Nombre Legal: <span className="text-stone-300">{profile.fullName}</span> (Llamar: <strong className="text-stone-200">{profile.preferredName}</strong>)
              </p>
            </div>
          </div>

          {/* Value Proposition Thesis */}
          <p className="text-sm text-stone-300 leading-relaxed font-sans">
            Más de 7 años de experiencia diseñando arquitecturas de integración empresarial de misión crítica. Especialista en <strong className="text-stone-100">Gobierno de APIs (Apigee / Azure APIM)</strong>, streaming asíncrono con <strong className="text-stone-100">Kafka</strong>, marco <strong className="text-stone-100">BIAN v13</strong> y liderazgo técnico de squads (~30 devs) en banca y seguros.
          </p>

          {/* Key Executive Stat Chips */}
          <div className="grid grid-cols-3 gap-2 py-1">
            <div className="p-3 rounded-xl bg-stone-900/60 border border-white/[0.06] text-left">
              <div className="text-lg font-black text-amber-300 font-sans">+7 Años</div>
              <div className="text-[10px] text-stone-400 font-sans leading-tight">Arquitectura TI & Banca</div>
            </div>
            <div className="p-3 rounded-xl bg-stone-900/60 border border-white/[0.06] text-left">
              <div className="text-lg font-black text-stone-100 font-sans">~30 Devs</div>
              <div className="text-[10px] text-stone-400 font-sans leading-tight">Gobierno de Squads</div>
            </div>
            <div className="p-3 rounded-xl bg-stone-900/60 border border-white/[0.06] text-left">
              <div className="text-lg font-black text-emerald-400 font-sans">Tier-1</div>
              <div className="text-[10px] text-stone-400 font-sans leading-tight">BCP · Mambu · Rímac</div>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <button
              onClick={() => {
                playTactileClick();
                onExport();
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Descargar CV (ATS)</span>
            </button>

            <button
              onClick={() => {
                playTactileClick();
                onExploreSystems();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-medium bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-white/10 transition-all"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Ver Sistemas</span>
            </button>

            <button
              onClick={() => {
                playTactileClick();
                onOpenMatcher();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-medium bg-stone-900/40 hover:bg-stone-800/60 text-stone-400 hover:text-stone-200 border border-white/[0.06] transition-all"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Match Vacante</span>
            </button>
          </div>

          {/* Direct Professional Links */}
          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-sans text-stone-400">
            <a
              href={profile.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-stone-300 hover:text-amber-300 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>LinkedIn</span>
            </a>
            <span className="text-stone-700">·</span>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-stone-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>GitHub</span>
            </a>
            <span className="text-stone-700">·</span>
            <a
              href={`mailto:${profile.contact.email}`}
              className="flex items-center gap-1 text-stone-300 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-stone-400" />
              <span>{profile.contact.email}</span>
            </a>
          </div>

          {/* Active 3D Node Telemetry Card (Linked to the 3D Machine) */}
          <div className="p-4 rounded-2xl bg-[#13151f]/90 border border-amber-500/20 shadow-xl space-y-2.5 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full animate-ping"
                  style={{ backgroundColor: activeNode.color }}
                />
                <span className="text-xs font-sans font-bold text-stone-100 uppercase tracking-wider">
                  {activeNode.name}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                {activeNode.status}
              </span>
            </div>

            <p className="text-xs text-amber-300/90 font-sans font-medium">
              {activeNode.subsystem} ({activeNode.organization})
            </p>

            <p className="text-xs text-stone-300 line-clamp-2 font-sans">
              {activeNode.impactSummary}
            </p>

            <div className="pt-1 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {activeNode.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-stone-900 text-stone-300 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  playTactileClick();
                  onOpenInspector();
                }}
                className="text-xs font-sans font-semibold text-amber-300 hover:text-amber-200 flex items-center gap-1 transition-colors"
              >
                <span>Inspeccionar ADRs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Interactive 3D Architecture Machine (Living Centerpiece) */}
        <div className="lg:col-span-7 relative h-[560px] sm:h-[620px] rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl bg-[#0c0d12]">
          
          {/* Top Bar inside Viewport */}
          <div className="absolute top-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-stone-950/80 border border-white/10 backdrop-blur-md text-[11px] font-sans text-stone-300">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>Estación 3D en Vivo · Toca o arrastra para girar</span>
            </div>

            <Link
              href="/architecture"
              onClick={() => playTactileClick()}
              className="pointer-events-auto flex items-center gap-1 px-3 py-1 rounded-full bg-stone-950/80 hover:bg-stone-900 border border-white/10 text-[11px] font-sans text-amber-300 transition-colors"
              title="Ver en pantalla completa"
            >
              <Maximize2 className="w-3 h-3" />
              <span className="hidden sm:inline">Pantalla Completa</span>
            </Link>
          </div>

          {/* 3D Scene */}
          <ArchitectureMachine3D
            height="100%"
            selectedStation={selectedNodeId || undefined}
            onStationSelect={(nodeId) => {
              onSelectNode(nodeId);
            }}
          />

        </div>

      </div>

    </section>
  );
};
