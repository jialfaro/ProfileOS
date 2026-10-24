"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PROFILE_DATA } from "@/data/profile";
import { CVDocument } from "@/components/CVDocument";
import { exportCVToPDF } from "@/lib/pdfGenerator";
import { 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Eye, 
  FileCheck2,
  Share2,
  Check,
  Download,
  Loader2
} from "lucide-react";

export default function CVPage() {
  const [viewMode, setViewMode] = useState<"ats" | "visual">("ats");
  const [copiedLink, setCopiedLink] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    // Check if ?print=true parameter is present in URL
    const params = new URLSearchParams(window.location.search);
    if (params.get("print") === "true") {
      const timer = setTimeout(() => {
        handlePrint();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDownloadDirectPDF = async () => {
    try {
      setIsGeneratingPDF(true);
      await exportCVToPDF("cv-printable-area", "CV_Alexis_Alfaro_Salazar_Arquitecto_TI.pdf");
    } catch (err) {
      console.error("Direct PDF export error, falling back to print", err);
      handlePrint();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "CV_Alexis_Alfaro_Salazar_Arquitecto_TI";
    window.print();
    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-8 px-4 sm:px-6 font-sans">
      
      {/* Top Action & Navigation Bar (Strictly hidden when saving or printing to PDF) */}
      <div className="no-print max-w-4xl mx-auto mb-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
        
        {/* Back Link */}
        <Link 
          href="/"
          className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Web ProfileOS</span>
        </Link>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-neutral-950 p-1 rounded-xl border border-neutral-800">
          <button
            onClick={() => setViewMode("ats")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === "ats"
                ? "bg-neutral-800 text-white border border-neutral-700 font-semibold shadow-sm"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>ATS Estricto</span>
          </button>

          <button
            onClick={() => setViewMode("visual")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
              viewMode === "visual"
                ? "bg-neutral-800 text-white border border-neutral-700 font-semibold shadow-sm"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-neutral-300" />
            <span>Ejecutivo Visual</span>
          </button>
        </div>

        {/* Download / Print Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700 transition-all active:scale-95"
            title="Copiar enlace directo al CV"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? "¡Copiado!" : "Compartir"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium bg-neutral-900 border border-neutral-700 text-neutral-300 hover:text-white hover:border-neutral-500 transition-all active:scale-95"
            title="Imprimir vía diálogo nativo"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>

          <button
            onClick={handleDownloadDirectPDF}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-white text-neutral-950 hover:bg-neutral-100 shadow-lg border border-neutral-200 transition-all active:scale-95 disabled:opacity-50"
            title="Descargar archivo PDF limpio directamente"
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-950" />
                <span>Generando PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5 text-neutral-950" />
                <span>Descargar PDF</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* Standalone CV Document Sheet */}
      <main className="max-w-4xl mx-auto">
        <CVDocument
          profile={PROFILE_DATA}
          displayTitle={PROFILE_DATA.title}
          displaySummary={PROFILE_DATA.verifiedSummary}
          displayExperiences={PROFILE_DATA.experiences}
          viewMode={viewMode}
        />
      </main>

      {/* Subtle Bottom Caption (Hidden on print) */}
      <div className="no-print max-w-4xl mx-auto mt-6 text-center text-xs font-mono text-neutral-500 flex items-center justify-center gap-2">
        <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>Documento generado con datos reales auditados por cv-architect · Sin datos inventados</span>
      </div>

    </div>
  );
}
