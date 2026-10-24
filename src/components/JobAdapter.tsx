"use client";

import React, { useState } from "react";
import { JOB_PRESETS, CandidateProfile, Experience } from "@/data/profile";
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Wand2, 
  Search,
  Check,
  ShieldCheck,
  Target
} from "lucide-react";
import { playTactileClick } from "@/lib/sound";

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
  const [applied, setApplied] = useState<boolean>(false);

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
    playTactileClick();
    const preset = JOB_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setSelectedPreset(preset.id);
    setCustomRoleTitle(preset.title);
    setJobText(
      `${preset.description}\n\nRequisitos deseados:\n- Experiencia sólida en: ${preset.keywords.join(", ")}\n- Capacidad de interlocución con negocio y liderazgo de squads.`
    );
    setApplied(false);
  };

  const handleApply = () => {
    playTactileClick();
    setApplied(true);
    onApplyTailoring({
      targetTitle: customRoleTitle,
      customSummary: analysis.tailoredSummary,
      prioritizedExperience: analysis.sortedExperiences
    });
  };

  return (
    <section id="adapter-section" className="no-print py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      
      {/* Section Header */}
      <div className="space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-amber-400 text-xs font-sans">
          <Target className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium">Evaluador de Compatibilidad en Tiempo Real</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
          Simulador de Match con Vacantes
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-3xl font-sans">
          Evalúa al instante la compatibilidad del perfil de Alexis con cualquier requerimiento de contratación técnica, priorizando las experiencias afines sin falsear datos.
        </p>
      </div>

      {/* Preset Selector Grid */}
      <div className="space-y-2.5">
        <label className="text-xs font-sans font-medium text-slate-400">
          Selecciona un rol objetivo predefinido o personaliza los requisitos:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {JOB_PRESETS.map((preset) => {
            const isSelected = selectedPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? "glass-panel border-sky-400/80 shadow-lg shadow-sky-500/10 text-white"
                    : "glass-card-interactive text-slate-400 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-sky-400 animate-pulse" : "bg-slate-600"}`} />
                  <span className="font-bold text-xs font-sans text-slate-200">
                    {preset.title}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2">
                  {preset.keywords.slice(0, 3).join(", ")}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Analysis Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Requirements Input */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl glass-panel space-y-4">
            
            <div>
              <label className="block text-xs font-sans font-medium text-slate-300 mb-1.5">
                Cargo / Rol Solicitado:
              </label>
              <input
                type="text"
                value={customRoleTitle}
                onChange={(e) => {
                  setCustomRoleTitle(e.target.value);
                  setApplied(false);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white text-sm font-sans focus:outline-none focus:border-sky-500 transition-colors"
                placeholder="Ej. Arquitecto de Soluciones Senior"
              />
            </div>

            <div>
              <label className="block text-xs font-sans font-medium text-slate-300 mb-1.5">
                Descripción de la Oferta / Requisitos Técnicos:
              </label>
              <textarea
                rows={8}
                value={jobText}
                onChange={(e) => {
                  setJobText(e.target.value);
                  setSelectedPreset("");
                  setApplied(false);
                }}
                className="w-full px-3.5 py-3 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-sky-500 transition-colors resize-none"
                placeholder="Pega aquí los requisitos de la vacante (LinkedIn, Bumeran, etc.)..."
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>{jobText.length} caracteres evaluados</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Motor de afinidad activo
              </span>
            </div>

          </div>
        </div>

        {/* Right Column: Compatibility Gauge & Tailored Output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl glass-panel space-y-5">
            
            {/* Score Metric Card */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-sans font-medium text-slate-400">Afinidad Comprobable con el CV</span>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl sm:text-4xl font-extrabold font-sans text-emerald-400">
                    {analysis.score}%
                  </span>
                  <span className="text-xs text-slate-400 font-sans">
                    {analysis.score >= 80 ? "Alta coincidencia técnica" : "Coincidencia moderada"}
                  </span>
                </div>
              </div>

              <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                Verificado cv-architect
              </div>
            </div>

            {/* Matched Strengths */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Habilidades Confirmadas en el Perfil ({analysis.matchedSkills.length}):</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {analysis.matchedSkills.length > 0 ? (
                  analysis.matchedSkills.map((sk) => (
                    <span
                      key={sk}
                      className="px-2.5 py-1 text-xs font-mono rounded-lg bg-emerald-950/50 text-emerald-300 border border-emerald-800/40"
                    >
                      ✓ {sk}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 font-sans">
                    Ingresa términos o requisitos para evaluar afinidad.
                  </span>
                )}
              </div>
            </div>

            {/* Honest Gap Disclosure */}
            {analysis.detectedGaps.length > 0 && (
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-900/30 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-sans font-semibold text-amber-400">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Tecnologías no declaradas en el perfil (Regla de honestidad):</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {analysis.detectedGaps.map((gap) => (
                    <span
                      key={gap}
                      className="px-2 py-0.5 text-[11px] font-mono rounded bg-amber-950/50 text-amber-300 border border-amber-800/40"
                    >
                      ! {gap}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Dynamic Tailored Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-sans font-semibold text-slate-200">
                  Resumen Ejecutivo Adaptado para esta Vacante:
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 italic font-sans">
                "{analysis.tailoredSummary}"
              </p>
            </div>

            {/* Apply Button */}
            <button
              onClick={handleApply}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                applied
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                  : "bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 active:scale-95"
              }`}
            >
              {applied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>¡Adaptación Aplicada al CV! (Deslizando a Exportar...)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Aplicar esta Adaptación al CV y Previsualizar</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </div>
        </div>

      </div>

    </section>
  );
};
