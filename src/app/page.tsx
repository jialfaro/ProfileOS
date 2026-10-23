"use client";

import React, { useState } from "react";
import { PROFILE_DATA, Experience } from "@/data/profile";
import { ThreeCanvas } from "@/components/ThreeCanvas";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { JobAdapter } from "@/components/JobAdapter";
import { ExportStudio } from "@/components/ExportStudio";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Tailoring State (Passed from JobAdapter to ExportStudio)
  const [tailoredTitle, setTailoredTitle] = useState<string | undefined>(undefined);
  const [tailoredSummary, setTailoredSummary] = useState<string | undefined>(undefined);
  const [tailoredExperiences, setTailoredExperiences] = useState<Experience[] | undefined>(undefined);

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

  const handleApplyTailoring = (tailoredData: {
    targetTitle: string;
    customSummary: string;
    prioritizedExperience: Experience[];
  }) => {
    setTailoredTitle(tailoredData.targetTitle);
    setTailoredSummary(tailoredData.customSummary);
    setTailoredExperiences(tailoredData.prioritizedExperience);

    // Smooth scroll to Export Studio to preview the result
    scrollToSection("export");
  };

  const handleResetTailoring = () => {
    setTailoredTitle(undefined);
    setTailoredSummary(undefined);
    setTailoredExperiences(undefined);
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-sky-500/25 selection:text-sky-200">
      
      {/* 3D Background Canvas in Hero */}
      <ThreeCanvas />

      {/* Main Header */}
      <Header onNavigate={scrollToSection} activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10 space-y-12">
        
        {/* Hero Section */}
        <Hero
          profile={PROFILE_DATA}
          onExploreTimeline={() => scrollToSection("timeline")}
          onOpenAdapter={() => scrollToSection("adapter")}
          onExport={() => scrollToSection("export")}
        />

        {/* Experience Timeline */}
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

      {/* Footer */}
      <Footer />

    </div>
  );
}
