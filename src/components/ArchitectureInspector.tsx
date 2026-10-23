"use client";

import React from "react";
import { ArchitectureNode } from "@/data/architectureNodes";
import { 
  X, 
  GitBranch, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Activity, 
  ArrowRight, 
  Building2, 
  Lock, 
  CheckCircle2,
  Terminal
} from "lucide-react";
import { playTactileClick } from "@/lib/sound";

interface ArchitectureInspectorProps {
  node: ArchitectureNode | null;
  onClose: () => void;
  onSelectNode: (nodeId: string) => void;
  allNodes: ArchitectureNode[];
}

export const ArchitectureInspector: React.FC<ArchitectureInspectorProps> = ({
  node,
  onClose,
  onSelectNode,
  allNodes
}) => {
  if (!node) return null;

  const connectedNodes = allNodes.filter((n) => node.connections.includes(n.id));

  return (
    <aside 
      className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-slate-950/95 border-l border-slate-800/90 shadow-2xl backdrop-blur-2xl flex flex-col transition-all duration-300 overflow-hidden"
      aria-label="Inspector de Arquitectura"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full animate-pulse shadow-sm"
            style={{ backgroundColor: node.color }}
          />
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
            {node.layer}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/40">
            {node.status}
          </span>
        </div>

        <button
          onClick={() => {
            playTactileClick();
            onClose();
          }}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
          aria-label="Cerrar Inspector"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        
        {/* Title & Organization Header */}
        <div className="space-y-1.5">
          <h3 className="text-2xl font-extrabold text-slate-100 tracking-tight font-sans">
            {node.name}
          </h3>
          <p className="text-sm font-mono text-sky-400">
            {node.subsystem}
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 pt-1 font-mono">
            <span className="flex items-center gap-1 text-slate-300">
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              {node.organization}
            </span>
            {node.client && (
              <span className="px-2 py-0.5 rounded bg-sky-950/80 text-sky-300 border border-sky-800/50">
                Cliente: {node.client}
              </span>
            )}
            {node.throughput && (
              <span className="flex items-center gap-1 text-amber-300">
                <Activity className="w-3.5 h-3.5" />
                {node.throughput}
              </span>
            )}
          </div>
        </div>

        {/* Verified Impact Highlight */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/90 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Impacto Verificado (cv-architect):</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            {node.impactSummary}
          </p>
        </div>

        {/* Architecture Decision Records (ADRs) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
            <GitBranch className="w-4 h-4 text-amber-400" />
            <span>Decisiones de Arquitectura (ADRs) & Trade-offs:</span>
          </div>

          <div className="space-y-3">
            {node.adrs.map((adr, index) => (
              <div 
                key={index} 
                className="p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/90 space-y-2 hover:border-slate-700 transition-colors"
              >
                <div className="text-xs font-mono font-semibold text-slate-200">
                  {adr.title}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-slate-400 font-mono">Decisión: </strong> 
                  {adr.decision}
                </p>
                <p className="text-[11px] text-amber-300/90 leading-relaxed font-mono bg-amber-950/20 p-2 rounded border border-amber-900/30">
                  <strong>Trade-off evaluado: </strong> {adr.tradeoffs}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Protocols & Zero-Trust Security */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
            <Lock className="w-3.5 h-3.5 text-sky-400" />
            <span>Protocolos & Capa de Seguridad:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {node.protocols.map((proto) => (
              <span 
                key={proto}
                className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900 text-sky-300 border border-slate-800"
              >
                {proto}
              </span>
            ))}
          </div>
        </div>

        {/* Technical Stack Pills */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5 text-purple-400" />
            <span>Stack de Implementación:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {node.technologies.map((tech) => (
              <span 
                key={tech}
                className="px-2.5 py-1 text-xs font-mono rounded bg-slate-900 text-slate-300 border border-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Specific Scope & Bullets */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
            <Terminal className="w-3.5 h-3.5 text-slate-400" />
            <span>Alcance & Responsabilidades Clave:</span>
          </div>
          <ul className="space-y-2">
            {node.responsibilities.map((resp, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{resp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Connected Subsystems */}
        {connectedNodes.length > 0 && (
          <div className="pt-2 border-t border-slate-800 space-y-2">
            <div className="text-xs font-mono text-slate-400">
              Sistemas Interconectados en el Mesh:
            </div>
            <div className="grid grid-cols-1 gap-2">
              {connectedNodes.map((cn) => (
                <button
                  key={cn.id}
                  onClick={() => {
                    playTactileClick();
                    onSelectNode(cn.id);
                  }}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 hover:bg-slate-900 text-left transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: cn.color }}
                    />
                    <span className="text-xs font-medium text-slate-200 group-hover:text-sky-300 transition-colors">
                      {cn.name}
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 group-hover:text-sky-400 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

      </div>
    </aside>
  );
};
