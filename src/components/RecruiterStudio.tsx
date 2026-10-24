"use client";

import React, { useState } from "react";
import { CandidateProfile, Experience, JOB_PRESETS } from "@/data/profile";
import { CVDocument } from "@/components/CVDocument";
import { exportCVToPDF } from "@/lib/pdfGenerator";
import confetti from "canvas-confetti";
import { 
  Sparkles, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  ShieldCheck, 
  Wand2, 
  Target, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink,
  Loader2,
  Undo2
} from "lucide-react";
import { playTactileClick } from "@/lib/sound";

interface RecruiterStudioProps {
  profile: CandidateProfile;
  tailoredTitle?: string;
  tailoredSummary?: string;
  tailoredExperiences?: Experience[];
  onApplyTailoring: (tailoredData: {
    targetTitle: string;
    customSummary: string;
    prioritizedExperience: Experience[];
  }) => void;
  onResetTailoring: () => void;
}

export const RecruiterStudio: React.FC<RecruiterStudioProps> = ({
  profile,
  tailoredTitle,
  tailoredSummary,
  tailoredExperiences,
  onApplyTailoring,
  onResetTailoring
}) => {
  const [activeTab, setActiveTab] = useState<"matcher" | "cv">("matcher");
  const [selectedPreset, setSelectedPreset] = useState<string>(JOB_PRESETS[0].id);
  const [jobText, setJobText] = useState<string>(JOB_PRESETS[0].description);
  const [customRoleTitle, setCustomRoleTitle] = useState<string>(JOB_PRESETS[0].title);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [copiedType, setCopiedType] = useState<"md" | "json" | null>(null);

  const displayTitle = tailoredTitle || profile.title;
  const displaySummary = tailoredSummary || profile.verifiedSummary;
  const displayExperiences = tailoredExperiences || profile.experiences;
  const isTailored = Boolean(tailoredTitle || tailoredSummary);

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

    const matchedSkills = allVerifiedSkills.filter((skill) =>
      textLower.includes(skill.toLowerCase())
    );

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

    const baseScore = 65;
    const bonus = Math.min(30, matchedSkills.length * 4);
    const penalty = Math.min(15, detectedGaps.length * 5);
    const score = Math.min(98, Math.max(45, baseScore + bonus - penalty));

    const tailoredSummaryText = `Arquitecto de TI Senior orientado a ${customRoleTitle}, con más de 7 años de experiencia liderando soluciones escalables en banca y seguros. Respaldado por sólida trayectoria en ${
      matchedSkills.slice(0, 4).join(", ") || "arquitectura cloud, microservicios y gobierno de APIs"
    }. Capacidad comprobada para alinear decisiones con marcos BIAN y C4, gobernando la ejecución técnica de squads de ingeniería con enfoque en resiliencia, alta disponibilidad y seguridad zero-trust.`;

    const sortedExperiences = [...profile.experiences].sort((a, b) => {
      const aMatches = a.technologies.filter((t) => textLower.includes(t.toLowerCase())).length;
      const bMatches = b.technologies.filter((t) => textLower.includes(t.toLowerCase())).length;
      return bMatches - aMatches;
    });

    return {
      score,
      matchedSkills,
      detectedGaps,
      tailoredSummary: tailoredSummaryText,
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
  };

  const handleApply = () => {
    playTactileClick();
    onApplyTailoring({
      targetTitle: customRoleTitle,
      customSummary: analysis.tailoredSummary,
      prioritizedExperience: analysis.sortedExperiences
    });
    setActiveTab("cv");
  };

  const handleDownloadDirectPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      playTactileClick();
      confetti({ particleCount: 75, spread: 60, origin: { y: 0.6 } });
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
    const originalTitle = document.title;
    document.title = "CV_Alexis_Alfaro_Salazar_Arquitecto_TI";
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const handleCopyMarkdown = () => {
    playTactileClick();
    const md = `# ${profile.fullName}
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
`;
    navigator.clipboard.writeText(md);
    setCopiedType("md");
    setTimeout(() => setCopiedType(null), 2500);
  };

  return (
    <section id="studio-section" className="no-print py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Studio Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-sans">
            <Target className="w-3.5 h-3.5" />
            <span>Centro Ejecutivo de Selección</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-sans">
            Match de Vacante & Dossier de CV
          </h2>
          <p className="text-sm text-stone-300 max-w-2xl font-sans">
            Evalúa la compatibilidad técnica del perfil con tu descripción de puesto o descarga directamente el CV en formato ATS oficial.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-900/80 border border-white/10 self-start md:self-auto">
          <button
            onClick={() => {
              playTactileClick();
              setActiveTab("matcher");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-medium transition-all ${
              activeTab === "matcher"
                ? "bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-sm"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulador de Match</span>
          </button>

          <button
            onClick={() => {
              playTactileClick();
              setActiveTab("cv");
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-sans font-medium transition-all ${
              activeTab === "cv"
                ? "bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-sm"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-400" />
            <span>Ver y Descargar CV ATS</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Matcher */}
      {activeTab === "matcher" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Preset Roles */}
          <div className="space-y-2">
            <label className="text-xs font-sans font-medium text-stone-400">
              Selecciona un perfil objetivo para autocompletar requisitos:
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
                        ? "bg-[#181a24] border-amber-400/80 shadow-md shadow-amber-500/10 text-white"
                        : "bg-[#11131c]/80 hover:bg-[#161822] text-stone-400 hover:text-white border-white/[0.06]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-amber-400 animate-pulse" : "bg-stone-600"}`} />
                      <span className="font-bold text-xs font-sans text-stone-200">
                        {preset.title}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-400 line-clamp-2">
                      {preset.keywords.slice(0, 3).join(", ")}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2-Column Evaluation Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Input */}
            <div className="lg:col-span-6 p-5 rounded-3xl bg-[#11131c]/90 border border-white/[0.08] space-y-4">
              <div>
                <label className="block text-xs font-sans font-medium text-stone-300 mb-1.5">
                  Cargo Solicitado:
                </label>
                <input
                  type="text"
                  value={customRoleTitle}
                  onChange={(e) => setCustomRoleTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950/70 border border-stone-800 text-white text-sm font-sans focus:outline-none focus:border-amber-400 transition-colors"
                  placeholder="Ej. Arquitecto de Soluciones Senior"
                />
              </div>

              <div>
                <label className="block text-xs font-sans font-medium text-stone-300 mb-1.5">
                  Requisitos de la Oferta Laboral:
                </label>
                <textarea
                  rows={8}
                  value={jobText}
                  onChange={(e) => {
                    setJobText(e.target.value);
                    setSelectedPreset("");
                  }}
                  className="w-full px-3.5 py-3 rounded-xl bg-stone-950/70 border border-stone-800 text-stone-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  placeholder="Pega aquí los requisitos del puesto..."
                />
              </div>

              <div className="text-[11px] text-stone-500 font-sans flex items-center justify-between">
                <span>{jobText.length} caracteres analizados</span>
                <span className="text-emerald-400">Algoritmo cv-architect activo</span>
              </div>
            </div>

            {/* Right: Real-time Evaluation Card */}
            <div className="lg:col-span-6 p-5 rounded-3xl bg-[#11131c]/90 border border-white/[0.08] space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-stone-950/80 border border-white/[0.06] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-sans font-medium text-stone-400">Afinidad Comprobable</span>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl sm:text-4xl font-extrabold font-sans text-amber-300">
                        {analysis.score}%
                      </span>
                      <span className="text-xs text-stone-400 font-sans">
                        {analysis.score >= 80 ? "Alta afinidad técnica" : "Afinidad moderada"}
                      </span>
                    </div>
                  </div>

                  <span className="px-3 py-1.5 rounded-full text-xs font-sans font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                    Sin Datos Falsos
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-sans font-semibold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Habilidades Respaldadas en el Perfil ({analysis.matchedSkills.length}):</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.matchedSkills.map((sk) => (
                      <span
                        key={sk}
                        className="px-2.5 py-1 text-xs font-mono rounded-lg bg-emerald-950/50 text-emerald-300 border border-emerald-800/40"
                      >
                        ✓ {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {analysis.detectedGaps.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-900/30 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-sans font-semibold text-amber-400">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Tecnologías no declaradas en CV (Honestidad cv-architect):</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {analysis.detectedGaps.map((gap) => (
                        <span key={gap} className="px-2 py-0.5 text-[11px] font-mono rounded bg-amber-950/50 text-amber-300">
                          ! {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <button
                onClick={handleApply}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Aplicar al CV y Previsualizar Documento</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: Clean CV View & Export */}
      {activeTab === "cv" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Action Toolbar */}
          <div className="p-4 rounded-2xl bg-[#11131c]/90 border border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {isTailored && (
                <button
                  onClick={() => {
                    playTactileClick();
                    onResetTailoring();
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-sans font-medium bg-stone-900 border border-white/10 text-stone-300 hover:text-white"
                >
                  <Undo2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Restaurar CV Maestro</span>
                </button>
              )}

              <button
                onClick={handleCopyMarkdown}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-sans font-medium bg-stone-900 border border-white/10 text-stone-300 hover:text-white"
              >
                {copiedType === "md" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedType === "md" ? "¡Copiado!" : "Copiar Texto ATS"}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-sans font-medium bg-stone-900 border border-white/10 text-stone-300 hover:text-white"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir</span>
              </button>
            </div>

            {/* Direct PDF Download */}
            <button
              onClick={handleDownloadDirectPDF}
              disabled={isGeneratingPDF}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 shadow-lg shadow-amber-500/25 active:scale-95 disabled:opacity-50 transition-all"
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-stone-950" />
                  <span>Generando PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-stone-950" />
                  <span>Descargar Archivo PDF</span>
                </>
              )}
            </button>
          </div>

          {/* Printable Document Frame */}
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/80 border border-white/10">
            <CVDocument
              profile={profile}
              displayTitle={displayTitle}
              displaySummary={displaySummary}
              displayExperiences={displayExperiences}
              viewMode="ats"
            />
          </div>

        </div>
      )}

    </section>
  );
};
