"use client";

import React from "react";
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
  Cpu
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
            Spatial Architecture Workstation — <span className="text-emerald-400 font-semibold">Alexis Alfaro</span>
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

      {/* Center Main Stage (Leaves clear view for the 3D Node Mesh) */}
      <div className="relative z-10 max-w-4xl mx-auto text-center my-auto space-y-6 pointer-events-auto">
        
        <div className="space-y-3">
          <p className="font-mono text-xs uppercase tracking-widest text-sky-400">
            Soluciones Cloud · Gobierno de APIs · Event-Driven (Kafka) · Microservicios
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-100 font-sans leading-none">
            Arquitectura de Sistemas <br />
            <span className="bg-gradient-to-r from-slate-100 via-sky-200 to-sky-400 bg-clip-text text-transparent">
              en Escala Transaccional
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-300 leading-relaxed font-light">
            Explora interactivamente los sistemas reales diseñados para <strong className="text-sky-300 font-medium">BCP, Mambu y Rímac</strong>. Haz clic en cualquier nodo 3D para inspeccionar sus decisiones técnicas (ADRs), contratos y protocolos.
          </p>
        </div>

        {/* Interactive 3D Node Launcher Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
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
            <span className="hidden sm:inline">Filtrar Capa Arquitectónica:</span>
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
