"use client";

import React, { useState } from "react";
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
    <div className="relative min-h-screen bg-[#02040a] text-slate-100 flex flex-col selection:bg-sky-500/25 selection:text-sky-200">
      
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
        />

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
