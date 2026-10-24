"use client";

import React from "react";
import { ARCHITECTURE_NODES, ArchitectureNode } from "@/data/architectureNodes";
import { 
  Building2, 
  GitBranch, 
  ArrowUpRight, 
  Layers, 
  ShieldCheck, 
  Activity, 
  Cpu,
  Lock,
  Network
} from "lucide-react";
import { playNodeSelect, playTactileClick } from "@/lib/sound";

interface ArchitecturalBentoProps {
  onSelectNode: (nodeId: string) => void;
  selectedNodeId: string | null;
}

export const ArchitecturalBento: React.FC<ArchitecturalBentoProps> = ({
  onSelectNode,
  selectedNodeId
}) => {
  return (
    <section id="systems-section" className="no-print py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-sans">
            <Network className="w-3.5 h-3.5" />
            <span>Sistemas de Escala Empresarial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Arquitecturas Diseñadas & Gobernadas
          </h2>
          <p className="text-sm text-stone-300 max-w-2xl font-sans">
            Casos de arquitectura implementados en producción bancaria y de seguros. Cada sistema cuenta con Architecture Decision Records (ADRs) formales y métricas de impacto comprobable.
          </p>
        </div>

        <span className="text-xs font-mono text-stone-500">
          5 NÚCLEOS DE ARQUITECTURA RESPALDADOS
        </span>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Card 1 (Large 2-col on LG): BCP Flagship API Mesh */}
        {(() => {
          const bcp = ARCHITECTURE_NODES.find((n) => n.id === "bcp-gateway") || ARCHITECTURE_NODES[0];
          const isSelected = selectedNodeId === bcp.id;

          return (
            <div
              key={bcp.id}
              onClick={() => {
                playNodeSelect();
                onSelectNode(bcp.id);
              }}
              className={`lg:col-span-2 group p-6 sm:p-8 rounded-3xl cursor-pointer border transition-all duration-300 flex flex-col justify-between space-y-6 ${
                isSelected
                  ? "bg-[#161824] border-amber-400 shadow-2xl shadow-amber-500/10"
                  : "bg-[#11131c]/80 hover:bg-[#161824] border-white/[0.08] hover:border-amber-400/40"
              }`}
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3 h-3 rounded-full bg-sky-400 shadow-md shadow-sky-400/50" />
                    <span className="text-xs font-sans font-semibold uppercase tracking-wider text-amber-300">
                      {bcp.layer}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      {bcp.throughput}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-sans font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                      {bcp.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans group-hover:text-amber-200 transition-colors">
                    {bcp.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-stone-300 font-sans">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    <span>{bcp.organization}</span>
                    <span className="text-stone-600">·</span>
                    <span className="text-amber-300 font-semibold">{bcp.client}</span>
                  </div>
                </div>

                <p className="text-sm text-stone-300 leading-relaxed font-sans max-w-3xl">
                  {bcp.impactSummary}
                </p>

                {/* Primary ADR Highlight */}
                <div className="p-4 rounded-2xl bg-stone-950/60 border border-white/[0.06] space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-sans font-bold text-amber-300">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>{bcp.adrs[0].title}</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed font-sans">
                    {bcp.adrs[0].decision}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {bcp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs font-mono rounded-lg bg-stone-900/90 text-stone-200 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-xs font-sans font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
                  <span>Abrir Detalles de Arquitectura</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })()}

        {/* Card 2: Mambu Core Banking & Event Mesh */}
        {(() => {
          const mambu = ARCHITECTURE_NODES.find((n) => n.id === "mambu-core") || ARCHITECTURE_NODES[1];
          const isSelected = selectedNodeId === mambu.id;

          return (
            <div
              key={mambu.id}
              onClick={() => {
                playNodeSelect();
                onSelectNode(mambu.id);
              }}
              className={`group p-6 sm:p-7 rounded-3xl cursor-pointer border transition-all duration-300 flex flex-col justify-between space-y-5 ${
                isSelected
                  ? "bg-[#161824] border-amber-400 shadow-2xl shadow-amber-500/10"
                  : "bg-[#11131c]/80 hover:bg-[#161824] border-white/[0.08] hover:border-amber-400/40"
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-amber-300">
                    {mambu.layer}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-stone-900 text-amber-300 border border-amber-500/20">
                    {mambu.throughput}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-sans group-hover:text-amber-200 transition-colors">
                    {mambu.name}
                  </h3>
                  <p className="text-xs text-stone-400 font-sans mt-0.5">
                    {mambu.subsystem} ({mambu.organization})
                  </p>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {mambu.impactSummary}
                </p>

                <div className="p-3 rounded-xl bg-stone-950/60 border border-white/[0.06] text-xs text-stone-300 font-sans">
                  <strong className="text-amber-300">ADR Pattern: </strong>
                  Transactional Outbox con Apache Kafka para consistencia eventual sin pérdida transaccional.
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {mambu.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[11px] font-mono rounded bg-stone-900 text-stone-300">
                      {t}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-4 h-4 text-amber-400 group-hover:scale-125 transition-transform" />
              </div>
            </div>
          );
        })()}

        {/* Card 3: Rímac Seguros Squad Leadership */}
        {(() => {
          const rimac = ARCHITECTURE_NODES.find((n) => n.id === "rimac-squads") || ARCHITECTURE_NODES[2];
          const isSelected = selectedNodeId === rimac.id;

          return (
            <div
              key={rimac.id}
              onClick={() => {
                playNodeSelect();
                onSelectNode(rimac.id);
              }}
              className={`group p-6 sm:p-7 rounded-3xl cursor-pointer border transition-all duration-300 flex flex-col justify-between space-y-5 ${
                isSelected
                  ? "bg-[#161824] border-amber-400 shadow-2xl shadow-amber-500/10"
                  : "bg-[#11131c]/80 hover:bg-[#161824] border-white/[0.08] hover:border-amber-400/40"
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-emerald-400">
                    {rimac.layer}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                    {rimac.throughput}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-sans group-hover:text-amber-200 transition-colors">
                    {rimac.name}
                  </h3>
                  <p className="text-xs text-stone-400 font-sans mt-0.5">
                    {rimac.subsystem} ({rimac.organization})
                  </p>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {rimac.impactSummary}
                </p>

                <div className="p-3 rounded-xl bg-stone-950/60 border border-white/[0.06] text-xs text-stone-300 font-sans">
                  <strong className="text-emerald-400">Liderazgo de Squads: </strong>
                  Acompañamiento arquitectónico de ~30 ingenieros con C4 Model y ArchiMate para comités ejecutivos.
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {rimac.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[11px] font-mono rounded bg-stone-900 text-stone-300">
                      {t}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-400 group-hover:scale-125 transition-transform" />
              </div>
            </div>
          );
        })()}

        {/* Card 4: Laureate Multi-Cloud */}
        {(() => {
          const lau = ARCHITECTURE_NODES.find((n) => n.id === "laureate-cloud") || ARCHITECTURE_NODES[3];
          const isSelected = selectedNodeId === lau.id;

          return (
            <div
              key={lau.id}
              onClick={() => {
                playNodeSelect();
                onSelectNode(lau.id);
              }}
              className={`group p-6 sm:p-7 rounded-3xl cursor-pointer border transition-all duration-300 flex flex-col justify-between space-y-5 ${
                isSelected
                  ? "bg-[#161824] border-amber-400 shadow-2xl shadow-amber-500/10"
                  : "bg-[#11131c]/80 hover:bg-[#161824] border-white/[0.08] hover:border-amber-400/40"
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-purple-400">
                    {lau.layer}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-purple-950/80 text-purple-300 border border-purple-800/40">
                    {lau.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-sans group-hover:text-amber-200 transition-colors">
                    {lau.name}
                  </h3>
                  <p className="text-xs text-stone-400 font-sans mt-0.5">
                    {lau.subsystem} ({lau.organization})
                  </p>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {lau.impactSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {lau.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[11px] font-mono rounded bg-stone-900 text-stone-300">
                      {t}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-4 h-4 text-purple-400 group-hover:scale-125 transition-transform" />
              </div>
            </div>
          );
        })()}

        {/* Card 5: Mibanco Microloans */}
        {(() => {
          const mib = ARCHITECTURE_NODES.find((n) => n.id === "mibanco-microloans") || ARCHITECTURE_NODES[4];
          const isSelected = selectedNodeId === mib.id;

          return (
            <div
              key={mib.id}
              onClick={() => {
                playNodeSelect();
                onSelectNode(mib.id);
              }}
              className={`group p-6 sm:p-7 rounded-3xl cursor-pointer border transition-all duration-300 flex flex-col justify-between space-y-5 ${
                isSelected
                  ? "bg-[#161824] border-amber-400 shadow-2xl shadow-amber-500/10"
                  : "bg-[#11131c]/80 hover:bg-[#161824] border-white/[0.08] hover:border-amber-400/40"
              }`}
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-sans font-semibold uppercase tracking-wider text-pink-400">
                    Originación Microcréditos
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-pink-950/80 text-pink-300 border border-pink-800/40">
                    {mib.status}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white font-sans group-hover:text-amber-200 transition-colors">
                    {mib.name}
                  </h3>
                  <p className="text-xs text-stone-400 font-sans mt-0.5">
                    {mib.subsystem} ({mib.organization})
                  </p>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed font-sans">
                  {mib.impactSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {mib.technologies.slice(0, 3).map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[11px] font-mono rounded bg-stone-900 text-stone-300">
                      {t}
                    </span>
                  ))}
                </div>
                <ArrowUpRight className="w-4 h-4 text-pink-400 group-hover:scale-125 transition-transform" />
              </div>
            </div>
          );
        })()}

      </div>

    </section>
  );
};
