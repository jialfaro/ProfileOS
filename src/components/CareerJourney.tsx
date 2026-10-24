"use client";

import React, { useState } from "react";
import { Experience } from "@/data/profile";
import { 
  Building2, 
  Calendar, 
  MapPin, 
  Code2, 
  GitBranch, 
  Layers, 
  CheckCircle2,
  Award,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { playTactileClick } from "@/lib/sound";

interface CareerJourneyProps {
  experiences: Experience[];
}

export const CareerJourney: React.FC<CareerJourneyProps> = ({ experiences }) => {
  const [sectorFilter, setSectorFilter] = useState<string>("Todos");
  const [expandedId, setExpandedId] = useState<string | null>("tcs-bcp");

  const sectors = ["Todos", "Banca & Finanzas", "Seguros", "Educación", "Consultoría"];

  const filtered = experiences.filter(
    (exp) => sectorFilter === "Todos" || exp.domain === sectorFilter
  );

  const toggleExpand = (id: string) => {
    playTactileClick();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getCompanyMonogram = (company: string, client?: string) => {
    if (client && client.includes("BCP")) return "BCP";
    if (company.includes("TCS")) return "TCS";
    if (company.includes("OM Technology")) return "OM";
    if (company.includes("Rimac") || company.includes("Rímac")) return "RÍM";
    if (company.includes("Laureate")) return "LAU";
    if (company.includes("Mibanco")) return "MIB";
    if (company.includes("Indra")) return "IND";
    if (company.includes("Experis")) return "EXP";
    return company.slice(0, 3).toUpperCase();
  };

  return (
    <section id="journey-section" className="no-print py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-sans">
            <Layers className="w-3.5 h-3.5" />
            <span>Trayectoria Profesional Comprobada</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Experiencia en Sistemas Financieros
          </h2>
          <p className="text-sm text-stone-300 max-w-2xl font-sans">
            Evidencia de impacto directo en squads bancarios y aseguradores, estructurada bajo la fórmula de logro técnico verificable (acción + alcance + decisión + impacto).
          </p>
        </div>

        {/* Sector Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-stone-900/80 border border-white/10 self-start md:self-auto">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => {
                playTactileClick();
                setSectorFilter(sec);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all ${
                sectorFilter === sec
                  ? "bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-sm"
                  : "text-stone-400 hover:text-stone-200"
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Experience Stream */}
      <div className="space-y-4">
        {filtered.map((exp) => {
          const isExpanded = expandedId === exp.id;
          const monogram = getCompanyMonogram(exp.company, exp.client);

          return (
            <div
              key={exp.id}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? "bg-[#141622] border-amber-400/60 shadow-xl shadow-amber-500/5"
                  : "bg-[#11131c]/70 hover:bg-[#141622] border-white/[0.06] hover:border-amber-400/30"
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => toggleExpand(exp.id)}
                className="p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-stone-900 border border-amber-500/20 flex items-center justify-center font-bold font-mono text-sm text-amber-300 shrink-0 shadow-md">
                    {monogram}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-lg sm:text-xl text-white font-sans">
                        {exp.role}
                      </h3>
                      {exp.client && (
                        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/40">
                          Cliente: {exp.client}
                        </span>
                      )}
                      <span className="px-2 py-0.5 text-[11px] font-sans rounded-md bg-stone-900 text-stone-300 border border-white/5">
                        {exp.domain}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-stone-400 font-sans">
                      <span className="flex items-center gap-1.5 font-medium text-stone-200">
                        <Building2 className="w-3.5 h-3.5 text-amber-400" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5 text-stone-300">
                        <Calendar className="w-3.5 h-3.5 text-stone-500" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-stone-400">
                        <MapPin className="w-3.5 h-3.5 text-stone-500" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <div className="hidden lg:flex flex-wrap gap-1.5 justify-end max-w-xs">
                    {exp.specialties.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-0.5 text-[11px] font-sans font-medium rounded-full bg-stone-900 text-amber-200/90 border border-amber-500/20"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="p-2 rounded-xl bg-stone-900 text-stone-400 group-hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-amber-300" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-6 border-t border-white/[0.06] pt-5 animate-in fade-in duration-200">
                  <div className="p-4 rounded-2xl bg-stone-950/60 border border-white/[0.04] text-sm text-stone-300 font-sans leading-relaxed italic border-l-4 border-l-amber-500">
                    "{exp.summary}"
                  </div>

                  {/* Bullet Points */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-sans font-bold text-stone-400 uppercase tracking-wider">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span>Logros Verificados & Alcance:</span>
                    </div>
                    <ul className="space-y-2.5">
                      {exp.bulletPoints.map((bp, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-stone-300 leading-relaxed font-sans">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-white">{bp.action} </span>
                            <span>{bp.scope}, </span>
                            <span className="text-amber-300 font-medium">{bp.impact}.</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* ADRs */}
                  {exp.architectureDecisions && exp.architectureDecisions.length > 0 && (
                    <div className="p-4 rounded-2xl bg-stone-950/80 border border-amber-900/30 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-sans font-bold text-amber-300 uppercase tracking-wider">
                        <GitBranch className="w-4 h-4" />
                        <span>Decisiones de Arquitectura (ADRs):</span>
                      </div>
                      <ul className="space-y-2">
                        {exp.architectureDecisions.map((adr, index) => (
                          <li key={index} className="text-xs text-stone-300 font-sans leading-relaxed flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                            <span>{adr}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack */}
                  <div className="space-y-2 pt-1 border-t border-white/[0.06]">
                    <div className="flex items-center gap-2 text-xs font-sans font-bold text-stone-400 uppercase tracking-wider">
                      <Code2 className="w-4 h-4 text-amber-400" />
                      <span>Tecnologías & Protocolos:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((t) => (
                        <span key={t} className="px-2.5 py-1 text-xs font-mono rounded-lg bg-stone-900 text-stone-200 border border-white/5">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

    </section>
  );
};
