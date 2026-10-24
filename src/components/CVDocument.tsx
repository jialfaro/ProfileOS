"use client";

import React from "react";
import { CandidateProfile, Experience } from "@/data/profile";

export interface CVDocumentProps {
  profile: CandidateProfile;
  displayTitle: string;
  displaySummary: string;
  displayExperiences: Experience[];
  viewMode: "ats" | "visual";
}

export const CVDocument: React.FC<CVDocumentProps> = ({
  profile,
  displayTitle,
  displaySummary,
  displayExperiences,
  viewMode
}) => {
  return (
    <div 
      id="cv-printable-area" 
      className="cv-sheet-container bg-white text-neutral-900 p-8 sm:p-10 shadow-2xl border border-neutral-200/80 max-w-4xl mx-auto font-sans leading-normal print:p-0 print:border-none print:shadow-none"
      style={{ borderRadius: 0 }}
    >
      {/* Document Header - Clean Executive Swiss Style */}
      <div className="cv-document-header border-b border-neutral-300 pb-3 mb-3.5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-neutral-950 uppercase font-sans">
                {profile.name}
              </h1>
              <span className="text-[11px] font-medium text-neutral-500 font-sans">
                (Legal: {profile.fullName})
              </span>
            </div>

            <p className="text-xs sm:text-[13px] font-bold text-neutral-900 uppercase tracking-wider font-mono">
              {displayTitle}
            </p>
            
            <p className="text-[11px] text-neutral-700 font-medium font-mono">
              Gobierno e Integración de APIs · Microservicios · Cloud & Event Mesh · BIAN v13
            </p>
          </div>

          {viewMode === "visual" && (
            <div className="w-14 h-16 rounded border border-neutral-300 overflow-hidden shrink-0 hidden sm:block">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}
        </div>

        {/* Contact Strip (Monochrome, crisp, zero blue links) */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[10.5px] text-neutral-700 mt-2.5 pt-2 border-t border-neutral-200 font-mono">
          <span className="font-semibold text-neutral-900">{profile.contact.location}</span>
          <span className="text-neutral-400">|</span>
          <span className="font-semibold text-neutral-900">{profile.contact.phone}</span>
          <span className="text-neutral-400">|</span>
          <span>{profile.contact.email}</span>
          <span className="text-neutral-400">|</span>
          <span>{profile.contact.linkedin.replace("https://", "")}</span>
          <span className="text-neutral-400">|</span>
          <span>{profile.contact.github.replace("https://", "")}</span>
        </div>
      </div>

      {/* Resumen Profesional */}
      <section className="mb-3.5">
        <h2 className="text-[11px] font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-300 pb-0.5 mb-1.5 font-mono">
          Perfil Profesional
        </h2>
        <p className="text-[11px] text-neutral-800 leading-relaxed text-justify">
          {displaySummary}
        </p>
      </section>

      {/* Stack Tecnológico & Marcos de Arquitectura (Structured Clean Grid) */}
      <section className="mb-3.5">
        <h2 className="text-[11px] font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-300 pb-0.5 mb-1.5 font-mono">
          Stack Tecnológico & Marcos de Arquitectura
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[10.5px] text-neutral-800">
          {profile.coreCompetencies.map((cat, idx) => (
            <div key={idx} className="leading-snug">
              <strong className="text-neutral-950 font-mono text-[9.5px] uppercase">{cat.category}: </strong>
              <span>{cat.skills.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Experiencia Profesional */}
      <section className="mb-3.5">
        <h2 className="text-[11px] font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-300 pb-0.5 mb-2 font-mono">
          Experiencia Profesional
        </h2>
        
        <div className="space-y-3">
          {displayExperiences.map((exp) => (
            <div key={exp.id} className="cv-experience-block">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-200 pb-0.5">
                <h3 className="text-[11.5px] font-bold text-neutral-950">
                  <span>{exp.company}</span>
                  {exp.client && <span className="font-semibold text-neutral-700"> (Cliente: {exp.client})</span>}
                  <span className="font-normal text-neutral-400"> — </span>
                  <span className="font-semibold text-neutral-800">{exp.role}</span>
                </h3>
                <span className="text-[10px] font-mono text-neutral-600 font-medium shrink-0">
                  {exp.period} | {exp.location}
                </span>
              </div>

              <ul className="list-disc list-outside ml-4 mt-0.5 space-y-0.5 text-[10.5px] text-neutral-800 leading-normal">
                {exp.bulletPoints.map((bp, i) => (
                  <li key={i}>
                    <span className="font-semibold text-neutral-950">{bp.action} </span>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-neutral-300 cv-experience-block">
        
        {/* Educación & Certificaciones */}
        <section>
          <h2 className="text-[11px] font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-300 pb-0.5 mb-1 font-mono">
            Formación Académica & Certificaciones
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10.5px] text-neutral-800 leading-tight">
            {profile.education.map((e, idx) => (
              <li key={idx}>
                <strong>{e.degree}</strong>, {e.institution} ({e.year})
              </li>
            ))}
            {profile.certifications.map((c, idx) => (
              <li key={idx}>
                <strong>{c.name}</strong> — <span className="text-neutral-700">{c.issuer} ({c.year})</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Idiomas */}
        <section>
          <h2 className="text-[11px] font-bold text-neutral-950 uppercase tracking-widest border-b border-neutral-300 pb-0.5 mb-1 font-mono">
            Idiomas
          </h2>
          <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10.5px] text-neutral-800 leading-tight">
            {profile.languages.map((l, idx) => (
              <li key={idx}>
                <strong>{l.language}:</strong> {l.level} {l.score && `(${l.score})`}
              </li>
            ))}
          </ul>
        </section>

      </div>
    </div>
  );
};
