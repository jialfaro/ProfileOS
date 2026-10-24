"use client";

import React, { useState } from "react";
import { CandidateProfile, Experience } from "@/data/profile";
import { CVDocument } from "@/components/CVDocument";
import { exportCVToPDF } from "@/lib/pdfGenerator";
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
  ExternalLink,
  Loader2
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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);

  const displayTitle = tailoredTitle || profile.title;
  const displaySummary = tailoredSummary || profile.verifiedSummary;
  const displayExperiences = tailoredExperiences || profile.experiences;
  const isTailored = Boolean(tailoredTitle || tailoredSummary);

  const triggerConfetti = () => {
    confetti({
      particleCount: 75,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  const handleDownloadDirectPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      playTactileClick();
      triggerConfetti();
      await exportCVToPDF("cv-printable-area", "CV_Alexis_Alfaro_Salazar_Arquitecto_TI.pdf");
    } catch (err) {
      console.error("Direct PDF generation failed, falling back to print", err);
      handlePrint();
    } finally {
      setIsGeneratingPDF(false);
    }
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
      
      {/* Controls & Toolbar (Hidden during print) */}
      <div className="no-print space-y-6">
        
        {/* Header and Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel-subtle text-amber-400 text-xs font-sans">
              <FileText className="w-3.5 h-3.5" />
              <span>Dossier Ejecutivo & Exportación</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-white font-sans">
              Descarga y Lectura de CV
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-sans">
              Documento estructurado bajo estándares ATS e inspección ejecutiva, listo para descarga directa en PDF sin marcas web.
            </p>
          </div>

          {/* Action Buttons Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {isTailored && (
              <button
                onClick={() => {
                  playTactileClick();
                  onResetTailoring();
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-sans font-medium glass-panel text-stone-300 hover:text-white transition-all"
                title="Restaurar a versión maestra"
              >
                <Undo2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Restaurar Maestro</span>
              </button>
            )}

            <a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-sans font-medium glass-panel text-stone-300 hover:text-white transition-all"
              title="Abrir página dedicada exclusivamente al CV"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
              <span>Página Solo CV</span>
            </a>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-sans font-medium glass-panel text-stone-300 hover:text-white transition-all"
            >
              {copiedType === "md" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === "md" ? "¡Copiado!" : "Markdown"}</span>
            </button>

            <button
              onClick={handleCopyJSON}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-sans font-medium glass-panel text-stone-300 hover:text-white transition-all"
            >
              {copiedType === "json" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5" />}
              <span>{copiedType === "json" ? "¡Copiado!" : "JSON"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-sans font-medium glass-panel text-stone-300 hover:text-white transition-all"
              title="Imprimir o guardar con el diálogo nativo"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>

            {/* Primary Download Button */}
            <button
              onClick={handleDownloadDirectPDF}
              disabled={isGeneratingPDF}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 shadow-lg shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
              title="Generar y descargar archivo .pdf limpio"
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                  <span>Generando PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-stone-950" />
                  <span>Descargar PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tailoring Alert Banner */}
        {isTailored && (
          <div className="flex items-center justify-between p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-sans">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>
                Documento adaptado para el cargo: <strong className="text-white font-medium">{displayTitle}</strong>
              </span>
            </div>
            <span className="font-mono text-[11px] text-amber-300">Regla cv-architect activa</span>
          </div>
        )}

        {/* Mode Switcher Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-white/10">
            <button
              onClick={() => {
                playTactileClick();
                setViewMode("ats");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                viewMode === "ats"
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Vista ATS Estándar (Recomendada)</span>
            </button>
            <button
              onClick={() => {
                playTactileClick();
                setViewMode("visual");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all ${
                viewMode === "visual"
                  ? "bg-slate-800 text-white shadow-sm border border-slate-700"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              <span>Vista Ejecutiva Visual</span>
            </button>
          </div>

          <span className="text-[11px] font-sans text-slate-400">
            Exportación limpia de alta fidelidad sin bordes de color ni estilos web
          </span>
        </div>

      </div>

      {/* Printable Document Sheet Frame */}
      <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10">
        <CVDocument
          profile={profile}
          displayTitle={displayTitle}
          displaySummary={displaySummary}
          displayExperiences={displayExperiences}
          viewMode={viewMode}
        />
      </div>

    </section>
  );
};
