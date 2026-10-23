"use client";

import React, { useState } from "react";
import { CandidateProfile, Experience } from "@/data/profile";
import confetti from "canvas-confetti";
import { 
  Printer, 
  Download, 
  Copy, 
  Check, 
  Eye, 
  FileText, 
  Sparkles, 
  ShieldCheck, 
  Code,
  Undo2
} from "lucide-react";

interface ExportStudioProps {
  profile: CandidateProfile;
  tailoredTitle?: string;
  tailoredSummary?: string;
  tailoredExperiences?: Experience[];
  onResetTailoring: () => void;
}

export const ExportStudio: React.FC<ExportStudioProps> = ({
  profile,
  tailoredTitle,
  tailoredSummary,
  tailoredExperiences,
  onResetTailoring
}) => {
  const [viewMode, setViewMode] = useState<"ats" | "visual">("ats");
  const [copiedType, setCopiedType] = useState<"md" | "json" | null>(null);

  const displayTitle = tailoredTitle || profile.title;
  const displaySummary = tailoredSummary || profile.verifiedSummary;
  const displayExperiences = tailoredExperiences || profile.experiences;
  const isTailored = Boolean(tailoredTitle || tailoredSummary);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handlePrint = () => {
    triggerConfetti();
    window.print();
  };

  const generateMarkdown = () => {
    return `# ${profile.name}
**${displayTitle}**
*${profile.location}* | *Ingeniero de Sistemas*

---

## RESUMEN PROFESIONAL
${displaySummary}

---

## COMPETENCIAS TÉCNICAS
${profile.coreCompetencies
  .map((c) => `- **${c.category}:** ${c.skills.join(", ")}`)
  .join("\n")}

---

## EXPERIENCIA LABORAL
${displayExperiences
  .map(
    (exp) => `### ${exp.role} — ${exp.company}${exp.client ? ` (Cliente: ${exp.client})` : ""}
*${exp.period} | ${exp.location}*
${exp.bulletPoints.map((bp) => `- ${bp.action} ${bp.scope}, ${bp.impact}.`).join("\n")}
`
  )
  .join("\n")}

---

## FORMACIÓN Y CERTIFICACIONES
${profile.education.map((e) => `- **${e.degree}** — ${e.institution} (${e.year})`).join("\n")}
${profile.certifications.map((c) => `- ${c.name} — ${c.issuer} (${c.year})`).join("\n")}

---

## IDIOMAS
${profile.languages.map((l) => `- ${l.language}: ${l.level}${l.score ? ` (${l.score})` : ""}`).join("\n")}
`;
  };

  const generateJSON = () => {
    return JSON.stringify(
      {
        candidate: profile.name,
        targetRole: displayTitle,
        summary: displaySummary,
        coreSkills: profile.coreCompetencies,
        experience: displayExperiences,
        education: profile.education,
        certifications: profile.certifications,
        languages: profile.languages
      },
      null,
      2
    );
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopiedType("md");
    triggerConfetti();
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(generateJSON());
    setCopiedType("json");
    triggerConfetti();
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <section id="export-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-950/60 border border-sky-800/40 text-sky-400 text-xs font-mono mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Centro de Exportación & Impresión</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-100">
            Export Studio & Descarga de CV
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Visualiza y exporta tu documento en formato optimizado para sistemas ATS o presentación ejecutiva.
          </p>
        </div>

        {/* Action Buttons Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {isTailored && (
            <button
              onClick={onResetTailoring}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 text-slate-300 hover:text-slate-100 hover:border-slate-600 transition-all"
              title="Restaurar a versión maestra"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Restaurar Maestro</span>
            </button>
          )}

          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 text-slate-300 hover:text-slate-100 hover:border-slate-600 transition-all active:scale-95"
          >
            {copiedType === "md" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedType === "md" ? "¡Copiado!" : "Copiar Markdown"}</span>
          </button>

          <button
            onClick={handleCopyJSON}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 text-slate-300 hover:text-slate-100 hover:border-slate-600 transition-all active:scale-95"
          >
            {copiedType === "json" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5" />}
            <span>{copiedType === "json" ? "¡Copiado JSON!" : "JSON Resume"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20 border border-sky-400/40 transition-all active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir / Descargar PDF</span>
          </button>
        </div>
      </div>

      {/* Tailoring Status Banner */}
      {isTailored && (
        <div className="flex items-center justify-between p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/60 text-sky-200 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>
              Documento actualmente adaptado para: <strong className="text-white font-mono">{displayTitle}</strong>
            </span>
          </div>
          <span className="font-mono text-[11px] text-sky-400">cv-architect applied</span>
        </div>
      )}

      {/* Mode Switcher */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode("ats")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === "ats"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Vista ATS Estricta (Recomendada)</span>
          </button>
          <button
            onClick={() => setViewMode("visual")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              viewMode === "visual"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vista Ejecutiva Visual</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-slate-500">
          Usa Ctrl+P o Cmd+P para guardar directamente en PDF
        </span>
      </div>

      {/* Printable Document Sheet (ATS / Visual) */}
      <div id="cv-printable-area" className="cv-sheet-container bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-300/40 max-w-4xl mx-auto font-sans leading-normal">
        
        {/* Document Header */}
        <header className="border-b border-slate-300 pb-5 mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 uppercase">
            {profile.name}
          </h1>
          <p className="text-base font-semibold text-slate-700 mt-0.5">
            {displayTitle}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-2 font-mono">
            <span>{profile.location}</span>
            <span>•</span>
            <span>Ingeniería de Sistemas</span>
            <span>•</span>
            <span className="font-semibold text-slate-800">LinkedIn: Alexis Alfaro Salazar</span>
          </div>
        </header>

        {/* Resumen */}
        <section className="mb-6">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2 font-mono">
            Resumen Profesional
          </h2>
          <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed text-justify">
            {displaySummary}
          </p>
        </section>

        {/* Competencias Clave */}
        <section className="mb-6">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2 font-mono">
            Competencias y Dominios Técnicos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-800">
            {profile.coreCompetencies.map((cat, idx) => (
              <div key={idx} className="leading-snug">
                <strong className="text-slate-900">{cat.category}: </strong>
                <span>{cat.skills.join(", ")}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Experiencia Laboral */}
        <section className="mb-6">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3 font-mono">
            Experiencia Laboral
          </h2>
          
          <div className="space-y-4">
            {displayExperiences.map((exp) => (
              <div key={exp.id} className="cv-experience-block">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-950">
                    {exp.role} — <span className="font-semibold text-slate-800">{exp.company}</span>
                    {exp.client && <span className="font-medium text-slate-600"> (Cliente: {exp.client})</span>}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-600 font-medium shrink-0">
                    {exp.period} | {exp.location}
                  </span>
                </div>

                <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs text-slate-800 leading-relaxed">
                  {exp.bulletPoints.map((bp, i) => (
                    <li key={i}>
                      <span className="font-medium text-slate-900">{bp.action} </span>
                      <span>{bp.scope}, </span>
                      <span>{bp.impact}.</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Formación, Certificaciones e Idiomas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 border-t border-slate-200">
          
          {/* Educación & Certificaciones */}
          <section>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2 font-mono">
              Educación & Credenciales
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-800 leading-snug">
              {profile.education.map((e, idx) => (
                <li key={idx}>
                  <strong>{e.degree}</strong>, {e.institution} ({e.year})
                </li>
              ))}
              {profile.certifications.map((c, idx) => (
                <li key={idx}>
                  {c.name} — <span className="text-slate-600">{c.issuer} ({c.year})</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Idiomas */}
          <section>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2 font-mono">
              Idiomas
            </h2>
            <ul className="list-disc list-outside ml-4 space-y-1 text-xs text-slate-800 leading-snug">
              {profile.languages.map((l, idx) => (
                <li key={idx}>
                  <strong>{l.language}:</strong> {l.level} {l.score && `(${l.score})`}
                </li>
              ))}
            </ul>
          </section>

        </div>

      </div>

    </section>
  );
};
