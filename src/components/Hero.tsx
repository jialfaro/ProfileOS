"use client";

import React from "react";
import Image from "next/image";
import { CandidateProfile } from "@/data/profile";
import { ARCHITECTURE_NODES } from "@/data/architectureNodes";
import { 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Compass, 
  ChevronRight,
  Activity,
  Cpu,
  Mail,
  MapPin,
  ExternalLink,
  Users,
  Award,
  CheckCircle2,
  Download
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
  onExploreMachine?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  selectedNodeId,
  onSelectNode,
  activeLayerFilter,
  onSetLayerFilter,
  onExploreTimeline,
  onOpenAdapter,
  onExport,
  onExploreMachine
}) => {
  const layers = [
    "Gateway & Governance",
    "Core & Event Mesh",
    "Squad Leadership",
    "Hybrid Cloud",
    "Serverless & Payments"
  ];

  return (
    <section id="hero-section" className="no-print relative min-h-[88vh] flex flex-col justify-between pt-6 pb-8 px-4 sm:px-6 lg:px-8">
      
      {/* Top Identity & Availability Pill */}
      <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-10 pointer-events-auto">
        
        {/* Verification Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-slate-300 text-xs font-sans shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium text-slate-200">
            Perfil Verificado cv-architect · <span className="text-emerald-400 font-semibold">{profile.preferredName} Alfaro</span>
          </span>
          <span className="h-3 w-px bg-slate-700 hidden sm:inline-block" />
          <span className="text-slate-400 text-[11px] hidden sm:inline-block font-mono">Lima, Perú</span>
        </div>

        {/* Live System Indicator */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-sans text-slate-400">
          <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-[11px] font-mono flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            <span>Escala Banca & Seguros</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-emerald-300">
            BIAN v13 · TOGAF
          </span>
        </div>

      </div>

      {/* Main Center Presentation Stage */}
      <div className="relative z-10 max-w-4xl mx-auto text-center my-auto py-6 space-y-6 pointer-events-auto">
        
        {/* Candidate Presentation Badge */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          
          {/* Avatar with Radiant Glow Ring */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 opacity-30 blur-md group-hover:opacity-60 transition duration-500" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/20 bg-slate-900 shadow-2xl">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-md" title="Disponible para contratación" />
          </div>

          {/* Name & Contact Quick Links */}
          <div className="text-center sm:text-left space-y-1.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 font-sans tracking-tight">
                {profile.name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-sky-500/10 text-sky-300 border border-sky-500/30">
                Prefiere: {profile.preferredName}
              </span>
            </div>

            <p className="text-sm font-sans font-medium text-sky-400">
              {profile.title}
            </p>

            {/* Direct Contact Links */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1 text-xs font-sans text-slate-400">
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-sky-400 hover:text-sky-300 hover:border-sky-500/40 transition-all"
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
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </a>

              <a
                href={`mailto:${profile.contact.email}`}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>Email</span>
              </a>

              <span className="flex items-center gap-1 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{profile.location}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Hero Headline & Value Narrative */}
        <div className="space-y-3 pt-2">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-sans leading-tight">
            Arquitectura de Integración & Cloud <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-sky-400 via-teal-300 to-indigo-300 bg-clip-text text-transparent">
              en Escala Financiera
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Especializado en <strong className="text-white font-medium">Gobierno de APIs (Apigee / Azure APIM)</strong>, arquitecturas orientadas a eventos con <strong className="text-white font-medium">Apache Kafka</strong>, marco bancario <strong className="text-white font-medium">BIAN v13</strong> y liderazgo técnico de squads (~30 ingenieros).
          </p>
        </div>

        {/* 3 Executive Stat Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-2">
          <div className="p-3.5 rounded-2xl glass-card-interactive text-left space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-sky-400 font-sans">+7 Años</span>
              <Award className="w-4 h-4 text-sky-400/70" />
            </div>
            <p className="text-xs font-medium text-slate-200">Arquitectura TI & Banca</p>
            <p className="text-[11px] text-slate-400">Integración de sistemas críticos</p>
          </div>

          <div className="p-3.5 rounded-2xl glass-card-interactive text-left space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-emerald-400 font-sans">~30 Devs</span>
              <Users className="w-4 h-4 text-emerald-400/70" />
            </div>
            <p className="text-xs font-medium text-slate-200">Gobierno de Squads</p>
            <p className="text-[11px] text-slate-400">Liderazgo técnico en Rímac</p>
          </div>

          <div className="p-3.5 rounded-2xl glass-card-interactive text-left space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-black text-amber-400 font-sans">Tier-1</span>
              <ShieldCheck className="w-4 h-4 text-amber-400/70" />
            </div>
            <p className="text-xs font-medium text-slate-200">Banca & Seguros</p>
            <p className="text-[11px] text-slate-400">BCP, Mambu, Laureate, Indra</p>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          
          <button
            onClick={() => {
              playTactileClick();
              onExploreMachine?.();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-semibold shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-95"
          >
            <Cpu className="w-4 h-4" />
            <span>Explorar Máquina 3D</span>
          </button>

          <button
            onClick={() => {
              playTactileClick();
              onExport();
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-100 border border-slate-700/80 shadow-md transition-all hover:scale-[1.02] active:scale-95"
          >
            <Download className="w-4 h-4 text-sky-400" />
            <span>Descargar CV (ATS)</span>
          </button>

          <button
            onClick={() => {
              playTactileClick();
              onOpenAdapter();
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm bg-slate-900/60 hover:bg-slate-800/80 text-slate-300 border border-slate-800 transition-all"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Simulador de Vacante</span>
          </button>

        </div>

        {/* Quick 3D Node Inspection Chips */}
        <div className="pt-3 space-y-2">
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
            Nodos Arquitectónicos Verificados — Haz clic para inspeccionar ADRs
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {ARCHITECTURE_NODES.map((node) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => {
                    playNodeSelect();
                    onSelectNode(node.id);
                  }}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-sans transition-all ${
                    isSelected
                      ? "bg-sky-500/25 text-white border border-sky-400 shadow-md shadow-sky-500/20 scale-105"
                      : "bg-slate-900/70 text-slate-300 border border-slate-800 hover:border-slate-600 hover:bg-slate-800/80"
                  }`}
                >
                  <span 
                    className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125"
                    style={{ backgroundColor: node.color }}
                  />
                  <span className="font-medium">{node.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 group-hover:text-sky-400 transition-transform" />
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Bottom Layer Filter Bar */}
      <div className="relative z-10 max-w-4xl mx-auto w-full pt-4 pointer-events-auto">
        <div className="p-2 sm:p-2.5 rounded-2xl glass-panel-subtle flex flex-wrap items-center justify-between gap-2 text-xs">
          
          <div className="flex items-center gap-2 text-slate-400 font-sans pl-2">
            <Compass className="w-4 h-4 text-sky-400" />
            <span className="font-medium hidden sm:inline">Filtrar por Capa:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => {
                playTactileClick();
                onSetLayerFilter(null);
              }}
              className={`px-3 py-1 rounded-lg text-xs font-sans transition-all ${
                activeLayerFilter === null
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow-sm"
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
                className={`px-3 py-1 rounded-lg text-xs font-sans transition-all ${
                  activeLayerFilter === layer
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 shadow-sm"
                    : "bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {layer}
              </button>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
};
