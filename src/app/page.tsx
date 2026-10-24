"use client";

import React, { useState } from "react";
import { PROFILE_DATA, Experience } from "@/data/profile";
import { ARCHITECTURE_NODES, ArchitectureNode } from "@/data/architectureNodes";
import { Header } from "@/components/Header";
import { ExecutiveHero } from "@/components/ExecutiveHero";
import { ArchitecturalBento } from "@/components/ArchitecturalBento";
import { CareerJourney } from "@/components/CareerJourney";
import { RecruiterStudio } from "@/components/RecruiterStudio";
import { ArchitectureInspector } from "@/components/ArchitectureInspector";
import { Footer } from "@/components/Footer";
import { playNodeSelect, playTactileClick } from "@/lib/sound";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  
  // 3D & Active System State
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("bcp-gateway");
  const [isInspectorOpen, setIsInspectorOpen] = useState<boolean>(false);

  // Tailoring State (Passed from RecruiterStudio to CV)
  const [tailoredTitle, setTailoredTitle] = useState<string | undefined>(undefined);
  const [tailoredSummary, setTailoredSummary] = useState<string | undefined>(undefined);
  const [tailoredExperiences, setTailoredExperiences] = useState<Experience[] | undefined>(undefined);

  const selectedNode = ARCHITECTURE_NODES.find((n) => n.id === selectedNodeId) || ARCHITECTURE_NODES[0];

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

  const handleOpenInspector = () => {
    setIsInspectorOpen(true);
  };

  const handleCloseInspector = () => {
    setIsInspectorOpen(false);
  };

  const handleApplyTailoring = (tailoredData: {
    targetTitle: string;
    customSummary: string;
    prioritizedExperience: Experience[];
  }) => {
    setTailoredTitle(tailoredData.targetTitle);
    setTailoredSummary(tailoredData.customSummary);
    setTailoredExperiences(tailoredData.prioritizedExperience);
    scrollToSection("studio");
  };

  const handleResetTailoring = () => {
    setTailoredTitle(undefined);
    setTailoredSummary(undefined);
    setTailoredExperiences(undefined);
  };

  return (
    <div className="relative min-h-screen bg-[#0c0d12] text-stone-100 flex flex-col selection:bg-amber-500/25 selection:text-amber-200">
      
      {/* Floating Executive Pill Dock Navigation */}
      <Header onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Main Content Experience */}
      <main className="flex-1 relative z-10 space-y-16">
        
        {/* 1. Flagship Executive Split Hero with Live 3D Architecture Machine */}
        <ExecutiveHero
          profile={PROFILE_DATA}
          selectedNodeId={selectedNodeId}
          onSelectNode={handleSelectNode}
          onOpenInspector={handleOpenInspector}
          onExport={() => scrollToSection("studio")}
          onExploreSystems={() => scrollToSection("systems")}
          onOpenMatcher={() => scrollToSection("studio")}
        />

        {/* 2. Bento Grid of 5 Verified Enterprise Architecture Systems */}
        <ArchitecturalBento
          selectedNodeId={selectedNodeId}
          onSelectNode={(nodeId) => {
            handleSelectNode(nodeId);
            handleOpenInspector();
          }}
        />

        {/* 3. Chronological Career Journey & Measurable Accomplishments */}
        <CareerJourney experiences={PROFILE_DATA.experiences} />

        {/* 4. Unified Recruiter Studio: Job Matcher + ATS CV Preview & PDF Export */}
        <RecruiterStudio
          profile={PROFILE_DATA}
          tailoredTitle={tailoredTitle}
          tailoredSummary={tailoredSummary}
          tailoredExperiences={tailoredExperiences}
          onApplyTailoring={handleApplyTailoring}
          onResetTailoring={handleResetTailoring}
        />

      </main>

      {/* Slide-out Architectural Inspector Drawer */}
      <ArchitectureInspector
        node={isInspectorOpen ? selectedNode : null}
        onClose={handleCloseInspector}
        onSelectNode={handleSelectNode}
        allNodes={ARCHITECTURE_NODES}
      />

      {/* Footer */}
      <Footer />

    </div>
  );
}
