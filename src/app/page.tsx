"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PROFILE_DATA, Experience } from "@/data/profile";
import { ARCHITECTURE_NODES, ArchitectureNode } from "@/data/architectureNodes";
import { ThreeCanvas } from "@/components/ThreeCanvas";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ArchitectureInspector } from "@/components/ArchitectureInspector";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { JobAdapter } from "@/components/JobAdapter";
import { ExportStudio } from "@/components/ExportStudio";
import { Footer } from "@/components/Footer";
import ArchitectureMachine3D from "@/components/ui/ArchitectureMachine3D";
import { Maximize2, Cpu } from "lucide-react";
import { playNodeSelect, playTactileClick } from "@/lib/sound";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  
  // 3D Spatial Architecture State
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("bcp-gateway");
  const [activeLayerFilter, setActiveLayerFilter] = useState<string | null>(null);

  // Tailoring State (Passed from JobAdapter to ExportStudio)
  const [tailoredTitle, setTailoredTitle] = useState<string | undefined>(undefined);
  const [tailoredSummary, setTailoredSummary] = useState<string | undefined>(undefined);
  const [tailoredExperiences, setTailoredExperiences] = useState<Experience[] | undefined>(undefined);

  const selectedNode = ARCHITECTURE_NODES.find((n) => n.id === selectedNodeId) || null;

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(`${sectionId}-section`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSelectNode = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    playNodeSelect();
  };

  const handleCloseInspector = () => {
    setSelectedNodeId(null);
  };

  const handleApplyTailoring = (tailoredData: {
    targetTitle: string;
    customSummary: string;
    prioritizedExperience: Experience[];
  }) => {
    setTailoredTitle(tailoredData.targetTitle);
    setTailoredSummary(tailoredData.customSummary);
    setTailoredExperiences(tailoredData.prioritizedExperience);

    // Smooth scroll to Export Studio to preview the tailored output
    scrollToSection("export");
  };

  const handleResetTailoring = () => {
    setTailoredTitle(undefined);
    setTailoredSummary(undefined);
    setTailoredExperiences(undefined);
  };

  return (
    <div className="relative min-h-screen bg-[#0c0d12] text-stone-100 flex flex-col selection:bg-amber-500/25 selection:text-amber-200">
      
      {/* 3D Spatial Architecture Canvas */}
      <ThreeCanvas 
        selectedNodeId={selectedNodeId}
        onSelectNode={handleSelectNode}
        activeLayerFilter={activeLayerFilter}
      />

      {/* Main Header */}
      <Header onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10 space-y-16">
        
        {/* Spatial Architecture Hero Console */}
        <Hero
          profile={PROFILE_DATA}
          selectedNodeId={selectedNodeId}
          onSelectNode={handleSelectNode}
          activeLayerFilter={activeLayerFilter}
          onSetLayerFilter={setActiveLayerFilter}
          onExploreTimeline={() => scrollToSection("timeline")}
          onOpenAdapter={() => scrollToSection("adapter")}
          onExport={() => scrollToSection("export")}
          onExploreMachine={() => scrollToSection("machine")}
        />

        {/* Interactive 3D Architecture Machine Section */}
        <section
          id="machine-section"
          className="no-print relative max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl glass-panel shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-sm shadow-amber-400/50" />
                <h2 className="text-base sm:text-lg font-bold font-sans text-white uppercase tracking-tight">
                  Máquina 3D de Arquitectura Empresarial
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-sans bg-amber-500/10 text-amber-300 border border-amber-500/30 hidden sm:inline-block">
                  Procedural Three.js CAD
                </span>
              </div>
              <p className="text-xs font-sans text-stone-300 max-w-2xl leading-relaxed">
                Inspección interactiva de los 5 núcleos de arquitectura de Alexis: Gateway Zero-Trust (BCP), Streaming Kafka (Mambu), Dominio Spring Boot, Observabilidad Dynatrace y Gobierno Multi-Cloud.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/architecture"
                onClick={() => playTactileClick()}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-sans font-medium transition-all group"
              >
                <Maximize2 className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>Pantalla Completa</span>
              </Link>
            </div>
          </div>

          {/* 3D Machine Frame */}
          <div className="relative w-full h-[620px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#0c0d12]">
            <ArchitectureMachine3D
              height="100%"
              selectedStation={selectedNodeId || undefined}
              onStationSelect={handleSelectNode}
            />
          </div>
        </section>

        {/* Experience & Decisions Ledger */}
        <ExperienceTimeline experiences={PROFILE_DATA.experiences} />

        {/* Dynamic CV Job Adapter */}
        <JobAdapter
          profile={PROFILE_DATA}
          onApplyTailoring={handleApplyTailoring}
        />

        {/* Export & Download Studio */}
        <ExportStudio
          profile={PROFILE_DATA}
          tailoredTitle={tailoredTitle}
          tailoredSummary={tailoredSummary}
          tailoredExperiences={tailoredExperiences}
          onResetTailoring={handleResetTailoring}
        />

      </main>

      {/* Slide-out Architectural Inspector Drawer */}
      <ArchitectureInspector
        node={selectedNode}
        onClose={handleCloseInspector}
        onSelectNode={handleSelectNode}
        allNodes={ARCHITECTURE_NODES}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
