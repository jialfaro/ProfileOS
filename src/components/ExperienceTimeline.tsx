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
  CheckCircle2,
  Sparkles,
  Award
} from "lucide-react";
import { playTactileClick } from "@/lib/sound";

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
    playTactileClick();
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getCompanyInitials = (company: string, client?: string) => {
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
    <section id="timeline-section" className="no-print py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-amber-400 text-xs font-sans">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium">Historial Arquitectónico & Decisiones Técnicas</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
          Trayectoria Profesional Comprobada
        </h2>
        <p className="text-sm sm:text-base text-stone-300 max-w-3xl font-sans">
          Evidencia de impacto directo en squads bancarios y aseguradores, estructurada bajo la fórmula de logro técnico verificable (acción + alcance + decisión + impacto verificable).
        </p>
      </div>

      {/* Filter Tabs Bar */}
      <div className="p-4 rounded-2xl glass-panel space-y-3">
        
        {/* Domain Filter */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-stone-400 font-sans font-medium mr-2">Sector:</span>
          {domains.map((dom) => (
            <button
              key={dom}
              onClick={() => {
                playTactileClick();
                setDomainFilter(dom);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all ${
                domainFilter === dom
                  ? "bg-amber-500/20 text-amber-200 border border-amber-500/50 shadow-sm"
                  : "bg-stone-900/40 text-stone-400 hover:text-stone-200 border border-white/5"
              }`}
            >
              {dom}
            </button>
          ))}
        </div>

        {/* Specialty Filter */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-white/5">
          <span className="text-xs text-stone-400 font-sans font-medium mr-2">Especialidad:</span>
          {specialties.map((spec) => (
            <button
              key={spec}
              onClick={() => {
                playTactileClick();
                setSpecialtyFilter(spec);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all ${
                specialtyFilter === spec
                  ? "bg-amber-500/20 text-amber-200 border border-amber-500/50 shadow-sm"
                  : "bg-stone-900/40 text-stone-400 hover:text-stone-200 border border-white/5"
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

      </div>

      {/* Experience List */}
      <div className="space-y-4">
        {filteredExperiences.map((exp) => {
          const isExpanded = expandedId === exp.id;
          const initials = getCompanyInitials(exp.company, exp.client);

          return (
            <div
              key={exp.id}
              className={`rounded-2xl transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? "glass-panel border-amber-500/40 shadow-xl shadow-amber-500/5"
                  : "glass-card-interactive"
              }`}
            >
              {/* Card Header (Clickable) */}
              <div
                onClick={() => toggleExpand(exp.id)}
                className="p-5 sm:p-6 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  {/* Monogram Badge */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-stone-800 to-stone-900 border border-amber-500/30 flex items-center justify-center font-bold font-mono text-sm text-amber-300 shrink-0 shadow-md">
                    {initials}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-lg sm:text-xl text-white font-sans group-hover:text-amber-200 transition-colors">
                        {exp.role}
                      </h3>
                      {exp.client && (
                        <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/50">
                          Cliente: {exp.client}
                        </span>
                      )}
                      <span className="px-2 py-0.5 text-[11px] font-sans rounded-md bg-stone-800/80 text-stone-300 border border-stone-700">
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
                        className="px-2.5 py-0.5 text-[11px] font-sans font-medium rounded-full bg-stone-800/80 text-amber-200/90 border border-amber-500/20"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="p-2 rounded-xl bg-stone-800/60 text-stone-400 group-hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Card Expanded Content */}
              {isExpanded && (
                <div className="px-5 pb-6 sm:px-6 space-y-6 border-t border-white/5 pt-5 animate-in fade-in duration-200">
                  
                  {/* Verified Summary Callout */}
                  <div className="p-4 rounded-xl bg-stone-950/70 border border-stone-800 text-sm text-stone-300 font-sans leading-relaxed italic border-l-4 border-l-amber-500">
                    "{exp.summary}"
                  </div>

                  {/* Bullet Points with Technical Formula */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span>Logros Comprobables & Responsabilidades:</span>
                    </div>
                    <ul className="space-y-3">
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

                  {/* Architecture Decisions (ADRs) */}
                  {exp.architectureDecisions && exp.architectureDecisions.length > 0 && (
                    <div className="p-4 rounded-xl bg-stone-950/80 border border-amber-900/30 space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-300 uppercase tracking-wider">
                        <GitBranch className="w-4 h-4" />
                        <span>Decisiones Técnicas Clave (ADRs Evaluados):</span>
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

                  {/* Tech Stack Pills */}
                  <div className="space-y-2 pt-1 border-t border-white/5">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-400 uppercase tracking-wider">
                      <Code2 className="w-4 h-4 text-amber-400" />
                      <span>Tecnologías & Protocolos Aplicados:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono rounded-lg bg-stone-900 text-stone-200 border border-stone-800"
                        >
                          {tech}
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
