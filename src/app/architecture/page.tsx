'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import ArchitectureMachine3D, { ArchitectureStationId } from '@/components/ui/ArchitectureMachine3D'
import { ArchitectureInspector } from '@/components/ArchitectureInspector'
import { ARCHITECTURE_NODES } from '@/data/architectureNodes'
import { ArrowLeft, FileText, Layers, ShieldCheck, Sparkles } from 'lucide-react'
import { playTactileClick, playNodeSelect } from '@/lib/sound'

export default function Architecture3DPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('bcp-gateway')

  const selectedNode = ARCHITECTURE_NODES.find((n) => n.id === selectedNodeId) || null

  const handleSelectNode = (nodeId: string) => {
    setSelectedNodeId(nodeId)
    playNodeSelect()
  }

  return (
    <div className="relative w-full h-screen bg-[#02040a] text-slate-100 overflow-hidden flex flex-col">
      {/* Top Navigation Bar */}
      <header className="absolute top-0 inset-x-0 z-30 h-14 px-4 sm:px-8 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            onClick={() => playTactileClick()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 hover:border-sky-500/50 transition-all group"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:-translate-x-0.5 group-hover:text-sky-400 transition-transform" />
            <span>Volver a ProfileOS</span>
          </Link>

          <span className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-200">
              Estación 3D de Arquitectura Empresarial
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/40">
              Verificado BCP · Rímac · Mambu
            </span>
          </div>
        </div>

        {/* Right Action Links */}
        <div className="flex items-center gap-2">
          <Link
            href="/cv"
            onClick={() => playTactileClick()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-sky-300 bg-sky-950/60 border border-sky-800/60 hover:bg-sky-900/60 transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-sky-400" />
            <span>Descargar CV</span>
          </Link>
        </div>
      </header>

      {/* Main 3D Architecture Machine Canvas */}
      <main className="flex-1 w-full h-full pt-14">
        <ArchitectureMachine3D
          height="100%"
          selectedStation={selectedNodeId || undefined}
          onStationSelect={handleSelectNode}
        />
      </main>

      {/* Slide-out Architectural Inspector Drawer with real ADRs & Tech Specs */}
      <ArchitectureInspector
        node={selectedNode}
        onClose={() => setSelectedNodeId(null)}
        onSelectNode={handleSelectNode}
        allNodes={ARCHITECTURE_NODES}
      />
    </div>
  )
}
