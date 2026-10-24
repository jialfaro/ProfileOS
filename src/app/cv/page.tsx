"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PROFILE_DATA } from "@/data/profile";
import { CVDocument } from "@/components/CVDocument";
import { 
  Printer, 
  ArrowLeft, 
  ShieldCheck, 
  Eye, 
  FileCheck2,
  Share2,
  Check
} from "lucide-react";

export default function CVPage() {
  const [viewMode, setViewMode] = useState<"ats" | "visual">("ats");
  const [copiedLink, setCopiedLink] = useState(false);

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
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 font-sans">
      
      {/* Top Action & Navigation Bar (Strictly hidden when saving or printing to PDF) */}
      <div className="no-print max-w-4xl mx-auto mb-8 bg-slate-950/90 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
        
        {/* Back Link */}
        <Link 
          href="/"
          className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-sky-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a la Web ProfileOS</span>
        </Link>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setViewMode("ats")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              viewMode === "ats"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ATS Estricto</span>
          </button>

          <button
            onClick={() => setViewMode("visual")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
              viewMode === "visual"
                ? "bg-sky-500/20 text-sky-300 border border-sky-500/40 font-semibold"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Ejecutivo Visual</span>
          </button>
        </div>

        {/* Download / Print Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-all active:scale-95"
            title="Copiar enlace directo al CV"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? "¡Copiado!" : "Compartir Enlace"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/25 border border-sky-400/40 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Descargar / Guardar PDF</span>
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
      <div className="no-print max-w-4xl mx-auto mt-6 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
        <FileCheck2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>Documento generado con datos reales auditados por cv-architect · Sin datos inventados</span>
      </div>

    </div>
  );
}
