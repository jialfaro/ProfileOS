"use client";

import React from "react";
import Image from "next/image";
import { CandidateProfile } from "@/data/profile";
import { ARCHITECTURE_NODES } from "@/data/architectureNodes";
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Network, 
  Compass, 
  Terminal, 
  ChevronRight,
  Activity,
  Cpu,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from "lucide-react";
import { playTactileClick, playNodeSelect } from "@/lib/sound";

interface HeroProps {
  profile: CandidateProfile;
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  activeLayerFilter: string | null;
  onSetLayerFilter: (layer: string | null) => void;
  onExploreTimeline: () => void;
  onOpenAdapter: () => void;
  onExport: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  selectedNodeId,
  onSelectNode,
  activeLayerFilter,
  onSetLayerFilter,
  onExploreTimeline,
  onOpenAdapter,
  onExport
}) => {
  const layers = [
    "Gateway & Governance",
    "Core & Event Mesh",
    "Squad Leadership",
    "Hybrid Cloud",
    "Serverless & Payments"
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-6 pb-12 px-4 sm:px-6 lg:px-8">
      
      {/* Top Telemetry & Positioning Bar */}
      <div className="max-w-6xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10 pointer-events-auto">
        
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-xl backdrop-blur-md">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-medium text-slate-300">
            Spatial Architecture Workstation — <span className="text-emerald-400 font-semibold">{profile.name}</span>
          </span>
          <span className="h-3 w-px bg-slate-700" />
          <span className="text-[11px] font-mono text-slate-400">Verificado cv-architect</span>
        </div>

        {/* Live System Metric Indicators */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-xs text-slate-400">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/70 border border-slate-800">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>6 Nodos en Vivo</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/70 border border-slate-800">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Escala Banca & Seguros</span>
          </div>
        </div>

      </div>

      {/* Center Main Stage */}
      <div className="relative z-10 max-w-4xl mx-auto text-center my-auto space-y-6 pointer-events-auto">
        
        {/* Candidate Avatar & Verified Identity Card */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-sky-400/50 shadow-2xl shadow-sky-500/20 bg-slate-900">
            <img 
              src={profile.avatarUrl} 
              alt={profile.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 font-sans tracking-tight">
                {profile.name}
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-sky-950/80 text-sky-300 border border-sky-800/60">
                Llamar: {profile.preferredName}
              </span>
            </div>

            <p className="text-xs font-mono text-slate-400">
              Nombre Legal: <span className="text-slate-300">{profile.fullName}</span>
            </p>

            {/* Direct Professional Links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs font-mono text-slate-400">
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-slate-300 hover:text-sky-300 transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href={`mailto:${profile.contact.email}`}
                className="flex items-center gap-1 text-slate-300 hover:text-sky-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{profile.contact.email}</span>
              </a>

              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{profile.location}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-sky-400">
            {profile.title}
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-100 font-sans leading-none">
            Arquitectura de Integración & Cloud <br />
            <span className="bg-gradient-to-r from-slate-100 via-sky-200 to-sky-400 bg-clip-text text-transparent">
              en Escala Financiera
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
            Especialista en <strong className="text-sky-300 font-medium">Gobierno de APIs (Apigee / Azure APIM)</strong>, arquitecturas orientadas a eventos con <strong className="text-sky-300 font-medium">Kafka</strong>, marco <strong className="text-sky-300 font-medium">BIAN v13</strong> y liderazgo técnico de squads (~30 devs).
          </p>
        </div>

        {/* Interactive 3D Node Launcher Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {ARCHITECTURE_NODES.map((node) => {
            const isSelected = selectedNodeId === node.id;
            return (
              <button
                key={node.id}
                onClick={() => {
                  playNodeSelect();
                  onSelectNode(node.id);
                }}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all backdrop-blur-md ${
                  isSelected
                    ? "bg-sky-500/30 text-sky-200 border border-sky-400 shadow-lg shadow-sky-500/20 scale-105"
                    : "bg-slate-900/70 text-slate-300 border border-slate-800 hover:border-slate-600 hover:bg-slate-800/80"
                }`}
              >
                <span 
                  className="w-2 h-2 rounded-full transition-transform group-hover:scale-125"
                  style={{ backgroundColor: node.color }}
                />
                <span>{node.name}</span>
                <ChevronRight className="w-3 h-3 text-slate-500 group-hover:translate-x-0.5 group-hover:text-sky-400 transition-all" />
              </button>
            );
          })}
        </div>

      </div>

      {/* Bottom Architectural Layer Filter Bar */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-4 pointer-events-auto">
        <div className="p-3 rounded-2xl bg-slate-900/75 border border-slate-800/90 shadow-2xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Compass className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">Filtrar Capa:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                playTactileClick();
                onSetLayerFilter(null);
              }}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                activeLayerFilter === null
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/50"
                  : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              Todos los Nodos
            </button>

            {layers.map((layer) => (
              <button
                key={layer}
                onClick={() => {
                  playTactileClick();
                  onSetLayerFilter(activeLayerFilter === layer ? null : layer);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                  activeLayerFilter === layer
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50"
                    : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {layer}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playTactileClick();
                onOpenAdapter();
              }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 text-xs font-mono transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simulador de Vacante</span>
            </button>
          </div>

        </div>
      </div>

    </section>
  );
};
