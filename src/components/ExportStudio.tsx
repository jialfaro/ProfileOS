"use client";

import React, { useState } from "react";
import { CandidateProfile, Experience } from "@/data/profile";
import { CVDocument } from "@/components/CVDocument";
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
  Undo2,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from "lucide-react";
import { playTactileClick } from "@/lib/sound";

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
    playTactileClick();
    triggerConfetti();
    const originalTitle = document.title;
    document.title = "CV_Alexis_Alfaro_Salazar_Arquitecto_TI";
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const generateMarkdown = () => {
    return `# ${profile.fullName}
**${profile.name} — ${displayTitle}**
*${profile.location}* | *${profile.contact.phone}* | *${profile.contact.email}*
*LinkedIn: ${profile.contact.linkedin}* | *GitHub: ${profile.contact.github}*

---

## RESUMEN PROFESIONAL
${displaySummary}

---

## COMPETENCIAS TÉCNICAS & FRAMEWORKS
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
        candidate: {
          fullName: profile.fullName,
          preferredName: profile.preferredName,
          professionalName: profile.name,
          title: displayTitle,
          contact: profile.contact
        },
        summary: displaySummary,
        competencies: profile.coreCompetencies,
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
    playTactileClick();
    navigator.clipboard.writeText(generateMarkdown());
    setCopiedType("md");
    triggerConfetti();
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleCopyJSON = () => {
    playTactileClick();
    navigator.clipboard.writeText(generateJSON());
    setCopiedType("json");
    triggerConfetti();
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <section id="export-section" className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      
      {/* Interactive Controls & Toolbars (Hidden completely during print) */}
      <div className="no-print space-y-6">
        
        {/* Header and Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-sky-950/60 border border-sky-800/40 text-sky-400 text-xs font-mono mb-2">
              <FileText className="w-3.5 h-3.5" />
              <span>Centro de Exportación & Impresión</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-100 font-sans">
              Export Studio & Descarga de CV
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Visualiza y descarga únicamente el documento del CV limpio (formato ATS o Ejecutivo) sin elementos de la plataforma web.
            </p>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {isTailored && (
              <button
                onClick={() => {
                  playTactileClick();
                  onResetTailoring();
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium bg-slate-900 border border-slate-700 text-slate-300 hover:text-slate-100 hover:border-slate-600 transition-all"
                title="Restaurar a versión maestra"
              >
                <Undo2 className="w-3.5 h-3.5" />
                <span>Restaurar Maestro</span>
              </button>
            )}

            <a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium bg-slate-900 border border-slate-700 text-sky-400 hover:text-sky-300 hover:border-sky-500/60 transition-all active:scale-95"
              title="Abrir página dedicada exclusivamente al CV sin la plataforma web 3D"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Página Solo CV</span>
            </a>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium bg-slate-900 border border-slate-700 text-slate-300 hover:text-slate-100 hover:border-slate-600 transition-all active:scale-95"
            >
              {copiedType === "md" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === "md" ? "¡Copiado!" : "Copiar Markdown"}</span>
            </button>

            <button
              onClick={handleCopyJSON}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium bg-slate-900 border border-slate-700 text-slate-300 hover:text-slate-100 hover:border-slate-600 transition-all active:scale-95"
            >
              {copiedType === "json" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5" />}
              <span>{copiedType === "json" ? "¡Copiado JSON!" : "JSON Resume"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20 border border-sky-400/40 transition-all active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Descargar CV en PDF</span>
            </button>
          </div>
        </div>

        {/* Tailoring Status Banner */}
        {isTailored && (
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/60 text-sky-200 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>
                Documento adaptado para: <strong className="text-white font-mono">{displayTitle}</strong>
              </span>
            </div>
            <span className="font-mono text-[11px] text-sky-400">cv-architect applied</span>
          </div>
        )}

        {/* Mode Switcher */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => {
                playTactileClick();
                setViewMode("ats");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                viewMode === "ats"
                  ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Vista ATS Estricta (Recomendada)</span>
            </button>
            <button
              onClick={() => {
                playTactileClick();
                setViewMode("visual");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
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
            La descarga genera exclusivamente las páginas del CV sin la web
          </span>
        </div>

      </div>

      {/* Printable Document Sheet (ATS / Visual) */}
      <CVDocument
        profile={profile}
        displayTitle={displayTitle}
        displaySummary={displaySummary}
        displayExperiences={displayExperiences}
        viewMode={viewMode}
      />

    </section>
  );
};
