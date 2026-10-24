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
      className="cv-sheet-container bg-white text-slate-900 p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-300/40 max-w-4xl mx-auto font-sans leading-normal"
    >
      {/* Document Header */}
      <div className="cv-document-header border-b border-slate-300 pb-5 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-950 uppercase">
              {profile.fullName}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm font-bold text-sky-900 font-mono">
                {profile.name}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                (Nombre profesional / preferred: {profile.preferredName})
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-700 mt-1 uppercase tracking-wide font-mono">
              {displayTitle}
            </p>
            <p className="text-xs text-slate-600 font-mono">
              Integración de Sistemas | APIs | Cloud | Gobierno TI
            </p>
          </div>

          {viewMode === "visual" && (
            <div className="w-16 h-20 rounded-lg overflow-hidden border border-slate-300 shrink-0 hidden sm:block">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100 font-mono">
          <span>{profile.contact.location}</span>
          <span>·</span>
          <span className="font-medium text-slate-900">{profile.contact.phone}</span>
          <span>·</span>
          <span>{profile.contact.email}</span>
          <span>·</span>
          <span>{profile.contact.linkedin.replace("https://", "")}</span>
          <span>·</span>
          <span>{profile.contact.github.replace("https://", "")}</span>
        </div>
      </div>

      {/* Resumen Profesional */}
      <section className="mb-6">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2 font-mono">
          Perfil Profesional
        </h2>
        <p className="text-xs sm:text-[13px] text-slate-800 leading-relaxed text-justify">
          {displaySummary}
        </p>
      </section>

      {/* Competencias Clave */}
      <section className="mb-6">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-2 font-mono">
          Stack Tecnológico & Marcos de Arquitectura
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-xs text-slate-800">
          {profile.coreCompetencies.map((cat, idx) => (
            <div key={idx} className="leading-snug">
              <strong className="text-slate-950 font-mono text-[11px] uppercase">{cat.category}: </strong>
              <span>{cat.skills.join(", ")}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Experiencia Laboral */}
      <section className="mb-6">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-1 mb-3 font-mono">
          Experiencia Profesional
        </h2>
        
        <div className="space-y-4">
          {displayExperiences.map((exp) => (
            <div key={exp.id} className="cv-experience-block">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-slate-100 pb-0.5">
                <h3 className="text-xs sm:text-sm font-bold text-slate-950">
                  <span className="text-sky-950">{exp.company}</span>
                  {exp.client && <span className="font-semibold text-slate-700"> (Cliente: {exp.client})</span>}
                  <span className="font-normal text-slate-500"> — </span>
                  <span className="font-semibold text-slate-800">{exp.role}</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-600 font-medium shrink-0">
                  {exp.period} | {exp.location}
                </span>
              </div>

              <ul className="list-disc list-outside ml-4 mt-1.5 space-y-1 text-xs text-slate-800 leading-relaxed">
                {exp.bulletPoints.map((bp, i) => (
                  <li key={i}>
                    <span className="font-medium text-slate-950">{bp.action} </span>
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
            Formación Académica & Certificaciones
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
  );
};
