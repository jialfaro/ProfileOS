"use client";

import React, { useState } from "react";
import { Experience } from "@/data/profile";
import { 
  Building2, 
  Calendar, 
  MapPin, 
  Code2, 
  GitBranch, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Filter,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

interface ExperienceTimelineProps {
  experiences: Experience[];
  selectedCategory?: string;
}

export const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({
  experiences
}) => {
  const [domainFilter, setDomainFilter] = useState<string>("Todos");
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("Todos");
  const [expandedId, setExpandedId] = useState<string | null>("tcs-bcp");

  const domains = ["Todos", "Banca & Finanzas", "Seguros", "Educación", "Consultoría"];
  const specialties = ["Todos", "API Governance", "Event-Driven", "Cloud-Native", "Core Banking", "Liderazgo"];

  const filteredExperiences = experiences.filter((exp) => {
    const matchDomain = domainFilter === "Todos" || exp.domain === domainFilter;
    const matchSpecialty = specialtyFilter === "Todos" || exp.specialties.includes(specialtyFilter as any);
    return matchDomain && matchSpecialty;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="timeline-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-950/60 border border-sky-800/40 text-sky-400 text-xs font-mono">
          <Layers className="w-3.5 h-3.5" />
          <span>Historial Arquitectónico Verificado</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Trayectoria Profesional & Decisiones Técnicas
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl">
          Evidencia de impacto directo en squads bancarios y aseguradores, estructurada bajo la fórmula de logro técnico verificable (acción + alcance + decisión + impacto).
        </p>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
        
        {/* Domain Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 font-mono mr-1">Sector:</span>
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => setDomainFilter(dom)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                domainFilter === dom
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                  : "bg-slate-950/40 text-slate-400 hover:text-slate-200 border border-slate-800/80"
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Specialty Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-slate-400 font-mono mr-1">Enfoque:</span>
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSpecialtyFilter(spec)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                specialtyFilter === spec
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-sm"
                  : "bg-slate-950/40 text-slate-400 hover:text-slate-200 border border-slate-800/80"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

      </div>

      {/* Experience List */}
      <div className="space-y-6">
        {filteredExperiences.map((exp) => {
          const isExpanded = expandedId === exp.id;

          return (
            <div
              key={exp.id}
              className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? "bg-slate-900/80 border-sky-500/40 shadow-xl shadow-sky-500/5"
                  : "bg-slate-900/40 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60"
              }`}
            >
              {/* Card Header (Clickable) */}
              <div
                onClick={() => toggleExpand(exp.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-lg sm:text-xl text-slate-100 group-hover:text-sky-300 transition-colors">
                      {exp.role}
                    </span>
                    {exp.client && (
                      <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                        Cliente: {exp.client}
                      </span>
                    )}
                    <span className="px-2.5 py-0.5 text-xs font-mono rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {exp.domain}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5 font-medium text-slate-300">
                      <Building2 className="w-3.5 h-3.5 text-slate-400" />
                      {exp.company}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  <div className="hidden sm:flex flex-wrap gap-1.5 justify-end">
                    {exp.specialties.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-800/80 text-sky-300 border border-slate-700/60"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="p-1 rounded-lg bg-slate-800/60 text-slate-400 group-hover:text-slate-200">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Card Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 space-y-5 border-t border-slate-800/80 pt-5">
                  
                  {/* Summary */}
                  <p className="text-sm text-slate-300 font-light italic">
                    "{exp.summary}"
                  </p>

                  {/* Bullet Points with Technical Formula */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
                      Contribuciones y Logros Comprobables:
                    </h4>
                    <ul className="space-y-2.5">
                      {exp.bulletPoints.map((bp, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-100">{bp.action} </span>
                            <span>{bp.scope}, </span>
                            <span className="text-sky-300">{bp.impact}.</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Architecture Decisions (ADRs) */}
                  {exp.architectureDecisions && exp.architectureDecisions.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400">
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>Decisiones Arquitectónicas Clave (ADRs):</span>
                      </div>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
                        {exp.architectureDecisions.map((ad, idx) => (
                          <li key={idx} className="leading-relaxed">
                            {ad}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies Stack */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    <span className="text-xs text-slate-400 font-mono mr-1">Stack:</span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-950 text-slate-300 border border-slate-800 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              )}
            </div>
          );
        })}

        {filteredExperiences.length === 0 && (
          <div className="p-8 text-center rounded-xl bg-slate-900/40 border border-slate-800 text-slate-400 font-mono text-sm">
            No se encontraron experiencias para el filtro seleccionado.
          </div>
        )}
      </div>

    </section>
  );
};
