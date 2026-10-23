"use client";

import React, { useState } from "react";
import { JOB_PRESETS, CandidateProfile, Experience } from "@/data/profile";
import { 
  Sparkles, 
  CheckCircle, 
  AlertTriangle, 
  ArrowRight, 
  Copy, 
  Wand2, 
  FileCheck, 
  ListOrdered,
  Search,
  BookOpen
} from "lucide-react";

interface JobAdapterProps {
  profile: CandidateProfile;
  onApplyTailoring: (tailoredData: {
    targetTitle: string;
    customSummary: string;
    prioritizedExperience: Experience[];
  }) => void;
}

export const JobAdapter: React.FC<JobAdapterProps> = ({
  profile,
  onApplyTailoring
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string>(JOB_PRESETS[0].id);
  const [jobText, setJobText] = useState<string>(JOB_PRESETS[0].description);
  const [customRoleTitle, setCustomRoleTitle] = useState<string>(JOB_PRESETS[0].title);
  const [copiedSuccess, setCopiedSuccess] = useState<boolean>(false);

  // Skill pool from Alexis's verified profile
  const allVerifiedSkills = Array.from(
    new Set(
      profile.coreCompetencies.flatMap((c) => c.skills).concat(
        profile.experiences.flatMap((e) => e.technologies)
      )
    )
  );

  // Analyze job description
  const analyzeJob = () => {
    const textLower = jobText.toLowerCase();

    // Check verified matches
    const matchedSkills = allVerifiedSkills.filter((skill) =>
      textLower.includes(skill.toLowerCase())
    );

    // Common high-demand tech that might be in JDs but NOT in Alexis's confirmed core
    const potentialGapsList = [
      "Go / Golang",
      "Python / FastAPI",
      "C# / .NET",
      "Salesforce",
      "SAP",
      "Rust",
      "Databricks",
      "Snowflake",
      "GraphQL",
      "ServiceNow"
    ];

    const detectedGaps = potentialGapsList.filter((term) =>
      textLower.includes(term.toLowerCase())
    );

    // Match Score estimation based on matches
    const baseScore = 65;
    const bonus = Math.min(30, matchedSkills.length * 4);
    const penalty = Math.min(15, detectedGaps.length * 5);
    const score = Math.min(98, Math.max(45, baseScore + bonus - penalty));

    // Dynamic Tailored Summary
    const tailoredSummary = `Arquitecto de TI Senior orientado a ${customRoleTitle}, con más de 7 años de experiencia liderando soluciones escalables en banca y seguros. Respaldado por sólida trayectoria en ${
      matchedSkills.slice(0, 4).join(", ") || "arquitectura cloud, microservicios y gobierno de APIs"
    }. Capacidad comprobada para alinear decisiones con marcos BIAN y C4, gobernando la ejecución técnica de squads de ingeniería con enfoque en resiliencia, alta disponibilidad y seguridad zero-trust.`;

    // Prioritize experiences based on keyword matches
    const sortedExperiences = [...profile.experiences].sort((a, b) => {
      const aMatches = a.technologies.filter((t) => textLower.includes(t.toLowerCase())).length;
      const bMatches = b.technologies.filter((t) => textLower.includes(t.toLowerCase())).length;
      return bMatches - aMatches;
    });

    return {
      score,
      matchedSkills,
      detectedGaps,
      tailoredSummary,
      sortedExperiences
    };
  };

  const analysis = analyzeJob();

  const handleSelectPreset = (presetId: string) => {
    const preset = JOB_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setSelectedPreset(preset.id);
    setCustomRoleTitle(preset.title);
    setJobText(
      `${preset.description}\n\nRequisitos deseados:\n- Experiencia sólida en: ${preset.keywords.join(", ")}\n- Capacidad de interlocución con negocio y liderazgo de squads.`
    );
  };

  const handleApply = () => {
    onApplyTailoring({
      targetTitle: customRoleTitle,
      customSummary: analysis.tailoredSummary,
      prioritizedExperience: analysis.sortedExperiences
    });
  };

  return (
    <section id="adapter-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/60 border border-amber-800/40 text-amber-400 text-xs font-mono">
          <Wand2 className="w-3.5 h-3.5" />
          <span>Motor de Adaptación Dinámico (cv-architect)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100">
          Adaptar CV a una Vacante u Oferta Laboral
        </h2>
        <p className="text-sm sm:text-base text-slate-400 max-w-3xl">
          Ingresa la descripción de una vacante para analizar el ajuste técnico en tiempo real, priorizar los logros con mayor afinidad y detectar posibles brechas de conocimientos sin falsear información.
        </p>
      </div>

      {/* Preset Selector */}
      <div className="space-y-2">
        <label className="text-xs font-mono font-medium text-slate-400">
          O selecciona un arquetipo de cargo preconfigurado:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {JOB_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              className={`p-3 rounded-xl text-left border transition-all ${
                selectedPreset === preset.id
                  ? "bg-sky-950/60 border-sky-500/80 shadow-md shadow-sky-500/10 text-sky-100"
                  : "bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700"
              }`}
            >
              <div className="font-semibold text-xs leading-snug">{preset.title}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Adapter Grid: Input on Left, Live Analysis on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Input Textarea */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md space-y-4">
            
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Cargo / Rol Objetivo:
              </label>
              <input
                type="text"
                value={customRoleTitle}
                onChange={(e) => setCustomRoleTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-sm font-sans focus:outline-none focus:border-sky-500 transition-colors"
                placeholder="Ej. Arquitecto de Soluciones Senior"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">
                Descripción de la Oferta / Requisitos Técnicos:
              </label>
              <textarea
                rows={9}
                value={jobText}
                onChange={(e) => {
                  setJobText(e.target.value);
                  setSelectedPreset("");
                }}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-sky-500 transition-colors resize-none"
                placeholder="Pega aquí los requisitos de la vacante de LinkedIn, Bumeran, etc..."
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>{jobText.length} caracteres analizados</span>
              <span>Análisis automático activo</span>
            </div>

          </div>
        </div>

        {/* Right: Real-time Compatibility Matrix */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-5">
            
            {/* Score & Match Level */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/80 border border-slate-800">
              <div>
                <span className="text-xs font-mono text-slate-400">Afinidad Técnica Comprobable</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-mono text-emerald-400">
                    {analysis.score}%
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Alineación con experiencia real</span>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-semibold">
                Excelente Match
              </div>
            </div>

            {/* Matching Strengths */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span>Coincidencias Fuertes Respaldadas ({analysis.matchedSkills.length}):</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.matchedSkills.length > 0 ? (
                  analysis.matchedSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-0.5 text-xs font-mono rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40"
                    >
                      ✓ {sk}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 font-mono">
                    Ingresa tecnologías para identificar coincidencias.
                  </span>
                )}
              </div>
            </div>

            {/* Gaps / Unverified terms */}
            {analysis.detectedGaps.length > 0 && (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-800/40 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Términos no confirmados en CV (No falsear):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.detectedGaps.map((gap) => (
                    <span
                      key={gap}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-amber-950/60 text-amber-300 border border-amber-800/40"
                    >
                      ! {gap}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tailored Summary Generated */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-slate-300">
                  Extracto Ejecutivo Adaptado:
                </span>
                <span className="text-[10px] text-sky-400 font-mono">Regla cv-architect</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed p-3 rounded-lg bg-slate-950 border border-slate-800/80 italic font-sans">
                "{analysis.tailoredSummary}"
              </p>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApply}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-medium text-sm shadow-lg shadow-sky-500/20 border border-sky-400/30 transition-all active:scale-[0.98]"
            >
              <span>Aplicar al CV & Abrir Export Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>
        </div>

      </div>

    </section>
  );
};
