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
  Mail,
  Phone,
  MapPin,
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
      particleCount: 80,
      spread: 70,
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
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all"
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
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all active:scale-95"
              title="Abrir página dedicada exclusivamente al CV sin la plataforma web 3D"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Página Solo CV</span>
            </a>

            <button
              onClick={handleCopyMarkdown}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all active:scale-95"
            >
              {copiedType === "md" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedType === "md" ? "¡Copiado!" : "Markdown"}</span>
            </button>

            <button
              onClick={handleCopyJSON}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all active:scale-95"
            >
              {copiedType === "json" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code className="w-3.5 h-3.5" />}
              <span>{copiedType === "json" ? "¡Copiado!" : "JSON"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-medium bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all active:scale-95"
              title="Imprimir o guardar como PDF a través del diálogo nativo del navegador"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={handleDownloadDirectPDF}
              disabled={isGeneratingPDF}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold bg-neutral-100 hover:bg-white text-neutral-950 shadow-md border border-neutral-300 transition-all active:scale-95 disabled:opacity-50"
              title="Generar y descargar archivo .pdf limpio directamente a tu equipo"
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-900" />
                  <span>Generando PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-neutral-900" />
                  <span>Descargar PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tailoring Status Banner */}
        {isTailored && (
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-neutral-900/90 border border-neutral-700 text-neutral-200 text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>
                Documento adaptado para: <strong className="text-white font-mono">{displayTitle}</strong>
              </span>
            </div>
            <span className="font-mono text-[11px] text-neutral-400">cv-architect applied</span>
          </div>
        )}

        {/* Mode Switcher */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => {
                playTactileClick();
                setViewMode("ats");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                viewMode === "ats"
                  ? "bg-neutral-800 text-white border border-neutral-600 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Vista ATS Estricta (Recomendada)</span>
            </button>
            <button
              onClick={() => {
                playTactileClick();
                setViewMode("visual");
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                viewMode === "visual"
                  ? "bg-neutral-800 text-white border border-neutral-600 shadow-sm"
                  : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-neutral-300" />
              <span>Vista Ejecutiva Visual</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-neutral-400">
            Exportación limpia sin bordes de color ni elementos web
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
