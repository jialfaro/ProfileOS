'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import { playNodeSelect, playTactileClick } from '@/lib/sound'

export type ArchitectureStationId =
  | 'bcp-gateway'
  | 'mambu-core'
  | 'microservices-core'
  | 'observability-reactor'
  | 'cloud-governance'

export interface ArchitectureMachine3DProps {
  height?: number | string
  className?: string
  embed?: boolean
  selectedStation?: ArchitectureStationId | string | null
  onStationSelect?: (stationId: string) => void
  onReady?: () => void
}

type MachineMode = 'assembled' | 'exploded' | 'stations' | 'flow'
type CameraPreset = 'overview' | 'side' | 'top' | 'station' | 'flight'

interface StationMeta {
  id: ArchitectureStationId
  nodeId: string // maps to ARCHITECTURE_NODES
  title: string
  subtitle: string
  client: string
  color: number
  hexColor: string
  position: [number, number, number]
  specs: string[]
}

const STATIONS: StationMeta[] = [
  {
    id: 'bcp-gateway',
    nodeId: 'bcp-gateway',
    title: 'Zero-Trust API Gateway',
    subtitle: 'Apigee / Azure APIM Mesh',
    client: 'TCS Perú · BCP',
    color: 0x38bdf8,
    hexColor: '#38bdf8',
    position: [-5.4, 0.4, 2.6],
    specs: ['mTLS Enforced', 'OAuth2 / JWT', 'BIAN v13 Service Domains', 'Tier-1 Banking Scale'],
  },
  {
    id: 'mambu-core',
    nodeId: 'mambu-core',
    title: 'Event Mesh & Streaming',
    subtitle: 'Apache Kafka / SQS Broker',
    client: 'OM Technology · Mambu',
    color: 0xf59e0b,
    hexColor: '#f59e0b',
    position: [-4.6, 0.4, -2.8],
    specs: ['Transactional Outbox', 'Event-Driven Core', 'Zero Data Loss', 'Real-time Ledger Sync'],
  },
  {
    id: 'microservices-core',
    nodeId: 'mambu-core',
    title: 'Financial Domain Engine',
    subtitle: 'Hexagonal Spring Boot 17',
    client: 'Core Banking & Fintech',
    color: 0x6366f1,
    hexColor: '#6366f1',
    position: [0, 0.4, 0],
    specs: ['Domain-Driven Design (DDD)', 'Clean Ports & Adapters', 'Docker / K8s', 'High Resiliency'],
  },
  {
    id: 'observability-reactor',
    nodeId: 'bcp-gateway',
    title: 'Observability & APM',
    subtitle: 'Dynatrace & OpenTelemetry',
    client: 'Distributed Telemetry',
    color: 0x10b981,
    hexColor: '#10b981',
    position: [4.6, 0.4, -2.6],
    specs: ['SLO 99.99% Availability', 'Distributed End-to-End Tracing', 'Circuit Breakers', 'Anomaly AI'],
  },
  {
    id: 'cloud-governance',
    nodeId: 'rimac-squads',
    title: 'Hybrid Cloud & Squads',
    subtitle: 'AWS + Azure Multi-Cloud',
    client: 'Rímac · Laureate',
    color: 0xa855f7,
    hexColor: '#a855f7',
    position: [5.4, 0.4, 2.6],
    specs: ['Squad Leadership (~30 Devs)', 'C4 Model & TOGAF', 'BFF Web & Mobile', 'Multi-Region High Availability'],
  },
]

export default function ArchitectureMachine3D({
  height = '100vh',
  className = '',
  embed = false,
  selectedStation,
  onStationSelect,
  onReady,
}: ArchitectureMachine3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeMode, setActiveMode] = useState<MachineMode>('assembled')
  const [activeCamera, setActiveCamera] = useState<CameraPreset>('overview')
  const [focusedStation, setFocusedStation] = useState<ArchitectureStationId>('bcp-gateway')
  const [isPlaying, setIsPlaying] = useState<boolean>(true)
  const [hoveredStation, setHoveredStation] = useState<StationMeta | null>(null)
  const [flowStep, setFlowStep] = useState<number>(0)

  const callbacksRef = useRef({ onStationSelect, onReady })
  useEffect(() => {
    callbacksRef.current = { onStationSelect, onReady }
  }, [onStationSelect, onReady])

  // Sync external selectedStation prop with internal station state
  useEffect(() => {
    if (selectedStation) {
      const match = STATIONS.find(
        (s) => s.id === selectedStation || s.nodeId === selectedStation
      )
      if (match) {
        setFocusedStation(match.id)
      }
    }
  }, [selectedStation])

  // References to communicate with Three.js runtime
  const machineApiRef = useRef<{
    setMode: (mode: MachineMode) => void
    setCamera: (preset: CameraPreset, stationId?: ArchitectureStationId) => void
    focusStation: (id: ArchitectureStationId) => void
    togglePlay: () => void
  } | null>(null)

  const handleSelectStation = useCallback((id: ArchitectureStationId) => {
    playNodeSelect()
    setFocusedStation(id)
    machineApiRef.current?.focusStation(id)
    const meta = STATIONS.find((s) => s.id === id)
    if (meta && callbacksRef.current.onStationSelect) {
      callbacksRef.current.onStationSelect(meta.nodeId)
    }
  }, [])

  const handleModeChange = (mode: MachineMode) => {
    playTactileClick()
    setActiveMode(mode)
    machineApiRef.current?.setMode(mode)
  }

  const handleCameraChange = (preset: CameraPreset) => {
    playTactileClick()
    setActiveCamera(preset)
    machineApiRef.current?.setCamera(preset, focusedStation)
  }

  const handleTogglePlay = () => {
    playTactileClick()
    setIsPlaying((prev) => !prev)
    machineApiRef.current?.togglePlay()
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let cleanup: (() => void) | undefined

    document.fonts.ready.then(() => {
      if (cancelled) return
      cleanup = initArchitectureMachine(container, {
        embedded: embed,
        onStationClick: (id) => handleSelectStation(id),
        onStationHover: (meta) => setHoveredStation(meta),
        onFlowStepChange: (step) => setFlowStep(step),
        onReady: () => callbacksRef.current.onReady?.(),
      }, (api) => {
        machineApiRef.current = api
      })
    })

    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [embed, handleSelectStation])

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none bg-[#02040a] text-slate-100 font-sans ${className}`}
      style={{ height }}
    >
      {/* Three.js Canvas Container */}
      <div className="absolute inset-0 z-0" id="three-stage" />

      {/* Subtle Vignette & Gradient Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(2,4,10,0.85)_100%] z-10" />

      {/* Top HUD Telemetry Bar */}
      <header className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-lg shadow-amber-500/15 backdrop-blur-md">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2" />
              <polyline points="2 17 12 22 22 17" />
              <polyline points="2 12 12 17 22 12" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-sans font-bold tracking-wider text-stone-100 uppercase">
                ProfileOS Engine 3D
              </span>
              <span className="px-2 py-0.5 rounded-full text-[9px] font-sans font-medium bg-amber-500/10 text-amber-300 border border-amber-500/30">
                CAD Executive
              </span>
            </div>
            <p className="text-[11px] font-sans text-stone-400">
              Arquitectura Empresarial · Alexis Alfaro Salazar
            </p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-xs font-sans pointer-events-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-stone-300">TIER-1 CORE: ONLINE</span>
          <span className="h-3 w-px bg-stone-700" />
          <span className="text-amber-300 font-medium">5 MÓDULOS ACTIVOS</span>
        </div>
      </header>

      {/* Floating Hover Tooltip */}
      {hoveredStation && (
        <div
          className="absolute bottom-28 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-4 py-2.5 rounded-2xl bg-[#12141c]/95 border border-amber-500/30 shadow-2xl backdrop-blur-xl text-center space-y-1 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: hoveredStation.hexColor }}
            />
            <span className="text-xs font-sans font-bold text-stone-100">
              {hoveredStation.title}
            </span>
          </div>
          <p className="text-[11px] font-sans text-amber-200">
            {hoveredStation.subtitle} · <span className="text-stone-400">{hoveredStation.client}</span>
          </p>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-stone-400 font-sans">
            <span>Click para inspeccionar ADRs y decisiones de arquitectura</span>
          </div>
        </div>
      )}

      {/* Flow Mode Step Tracker */}
      {activeMode === 'flow' && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none px-4 py-2 rounded-xl bg-slate-900/90 border border-amber-500/50 shadow-2xl backdrop-blur-md text-center max-w-md w-full">
          <div className="flex items-center justify-between text-[11px] font-mono text-amber-300 mb-1">
            <span>TRANSACCIÓN BANCARIA EN VIVO</span>
            <span>PASO {flowStep + 1} DE 5</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
            <div
              className="bg-amber-400 h-full transition-all duration-500"
              style={{ width: `${((flowStep + 1) / 5) * 100}%` }}
            />
          </div>
          <p className="text-xs font-mono text-slate-200 mt-1.5 font-medium">
            {flowStep === 0 && '1. Ingress Perimeter · mTLS & OAuth2 Token Validation'}
            {flowStep === 1 && '2. Event Mesh · Publicación asíncrona en Kafka Cluster'}
            {flowStep === 2 && '3. Core Banking · Ejecución de dominio con Transactional Outbox'}
            {flowStep === 3 && '4. Observability · Trace distribuido en Dynatrace / APM'}
            {flowStep === 4 && '5. Multi-Cloud Fabric · Réplica resiliente AWS/Azure y Entrega'}
          </p>
        </div>
      )}

      {/* Bottom Mission Control Dock */}
      <footer className="absolute bottom-4 inset-x-4 sm:inset-x-8 flex flex-col sm:flex-row items-center justify-between gap-3 z-20 pointer-events-none">
        
        {/* Mode Selector */}
        <div className="flex items-center gap-1 p-1 rounded-2xl glass-panel pointer-events-auto">
          {(
            [
              { id: 'assembled', label: 'Ensamblado', icon: 'M4 6h16M4 12h16M4 18h16' },
              { id: 'exploded', label: 'Desacoplado', icon: 'M4 8h16M4 16h16' },
              { id: 'stations', label: 'Estaciones', icon: 'M12 2l10 6.5v9L12 24 2 17.5v-9L12 2z' },
              { id: 'flow', label: 'Flujo Bancario', icon: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z' },
            ] as const
          ).map((mode) => (
            <button
              key={mode.id}
              onClick={() => handleModeChange(mode.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-sans font-medium transition-all ${
                activeMode === mode.id
                  ? 'bg-amber-500/20 text-amber-200 border border-amber-500/40 shadow-sm'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60 border border-transparent'
              }`}
            >
              <span>{mode.label}</span>
            </button>
          ))}
        </div>

        {/* Camera Views & Play/Pause */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl glass-panel pointer-events-auto text-xs font-sans">
          <span className="text-[10px] text-stone-500 px-2 font-bold uppercase tracking-wider">
            CÁMARA
          </span>
          {(
            [
              { id: 'overview', label: 'Heroica' },
              { id: 'side', label: 'Perfil' },
              { id: 'top', label: 'Planta' },
              { id: 'station', label: 'Enfoque' },
              { id: 'flight', label: 'Órbita' },
            ] as const
          ).map((cam) => (
            <button
              key={cam.id}
              onClick={() => handleCameraChange(cam.id)}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeCamera === cam.id
                  ? 'bg-stone-800 text-amber-300 border border-stone-700'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              {cam.label}
            </button>
          ))}

          <span className="h-4 w-px bg-stone-800 mx-1" />

          {/* Play/Pause */}
          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pausar animación' : 'Reanudar animación'}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors"
          >
            {isPlaying ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
        </div>

        {/* Station Navigation Quick Tabs */}
        <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/85 border border-slate-800/90 shadow-2xl backdrop-blur-xl pointer-events-auto text-xs font-mono">
          {STATIONS.map((s) => {
            const isSelected = focusedStation === s.id
            return (
              <button
                key={s.id}
                onClick={() => handleSelectStation(s.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
                  isSelected
                    ? 'bg-slate-800 text-slate-100 border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: s.hexColor }}
                />
                <span className="truncate max-w-[100px]">{s.title.split(' ')[0]}</span>
              </button>
            )
          })}
        </div>

      </footer>

      {/* Exploratory Gesture Hint for First-Time Users */}
      <div className="absolute bottom-16 right-6 hidden sm:flex items-center gap-2 text-[11px] font-mono text-slate-500 pointer-events-none z-10">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
        <span>Arrastra para rotar · Scroll para zoom</span>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// THREE.JS SCENE ENGINE
// ---------------------------------------------------------------------------

interface SceneOptions {
  embedded: boolean
  onStationClick: (id: ArchitectureStationId) => void
  onStationHover: (meta: StationMeta | null) => void
  onFlowStepChange: (step: number) => void
  onReady: () => void
}

function initArchitectureMachine(
  container: HTMLDivElement,
  options: SceneOptions,
  onApi: (api: {
    setMode: (mode: MachineMode) => void
    setCamera: (preset: CameraPreset, stationId?: ArchitectureStationId) => void
    focusStation: (id: ArchitectureStationId) => void
    togglePlay: () => void
  }) => void
) {
  const stageEl = container.querySelector('#three-stage') as HTMLDivElement
  if (!stageEl) return () => {}

  const width = container.clientWidth
  const height = container.clientHeight

  // Scene & Camera
  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x0c0d12, 0.022)

  const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 150)
  camera.position.set(0, 16, 26)

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  stageEl.appendChild(renderer.domElement)

  // Environment Lighting
  const pmrem = new THREE.PMREMGenerator(renderer)
  const room = new RoomEnvironment()
  const envTexture = pmrem.fromScene(room, 0.04).texture
  scene.environment = envTexture
  pmrem.dispose()
  room.dispose()

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.065
  controls.maxPolarAngle = Math.PI * 0.48
  controls.minDistance = 8
  controls.maxDistance = 45
  controls.target.set(0, 0.8, 0)

  // Lighting Rig with Warm Champagne Tone
  const hemiLight = new THREE.HemisphereLight(0xfff5ea, 0x16141a, 1.3)
  scene.add(hemiLight)

  const keyLight = new THREE.DirectionalLight(0xfffbf2, 3.6)
  keyLight.position.set(-6, 18, 10)
  keyLight.castShadow = true
  keyLight.shadow.mapSize.set(2048, 2048)
  keyLight.shadow.bias = -0.0001
  scene.add(keyLight)

  const fillLight = new THREE.DirectionalLight(0xe5c07b, 1.6)
  fillLight.position.set(8, 12, -8)
  scene.add(fillLight)

  const groundGrid = new THREE.GridHelper(40, 40, 0x242228, 0x121115)
  groundGrid.position.y = -0.45
  scene.add(groundGrid)

  // Materials Library
  const materials = {
    chassisDark: new THREE.MeshStandardMaterial({
      color: 0x13151f,
      metalness: 0.85,
      roughness: 0.35,
    }),
    chassisPlate: new THREE.MeshStandardMaterial({
      color: 0x1c1f2b,
      metalness: 0.75,
      roughness: 0.45,
    }),
    steelChrome: new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      metalness: 0.95,
      roughness: 0.15,
    }),
    goldConductor: new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.25,
    }),
    darkGlass: new THREE.MeshPhysicalMaterial({
      color: 0x14161f,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.85,
      thickness: 0.8,
      transparent: true,
      opacity: 0.85,
    }),
    cyanGlow: new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    }),
    amberGlow: new THREE.MeshBasicMaterial({
      color: 0xd4af37,
    }),
    purpleGlow: new THREE.MeshBasicMaterial({
      color: 0xa855f7,
    }),
    emeraldGlow: new THREE.MeshBasicMaterial({
      color: 0x10b981,
    }),
  }

  // -------------------------------------------------------------------------
  // Helper: Create Text Canvas Texture for In-Scene High-Res Screens
  // -------------------------------------------------------------------------
  function createScreenTexture(title: string, subtitle: string, lines: string[], accentColor: string) {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 320
    const ctx = canvas.getContext('2d')!

    // Screen Background
    ctx.fillStyle = '#060a12'
    ctx.fillRect(0, 0, 512, 320)

    // Subtle Monospace Scanline Grid
    ctx.strokeStyle = 'rgba(30, 41, 59, 0.45)'
    ctx.lineWidth = 1
    for (let y = 0; y < 320; y += 16) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(512, y)
      ctx.stroke()
    }

    // Top Header Banner
    ctx.fillStyle = accentColor
    ctx.fillRect(0, 0, 512, 42)

    ctx.fillStyle = '#02040a'
    ctx.font = 'bold 20px monospace'
    ctx.fillText(`PROFILEOS // ${title.toUpperCase()}`, 18, 28)

    // Subtitle
    ctx.fillStyle = accentColor
    ctx.font = 'bold 18px monospace'
    ctx.fillText(`> ${subtitle}`, 20, 80)

    // Specification Lines
    ctx.fillStyle = '#cbd5e1'
    ctx.font = '15px monospace'
    lines.forEach((line, index) => {
      ctx.fillText(`• ${line}`, 24, 125 + index * 34)
    })

    // Telemetry Footer
    ctx.fillStyle = '#475569'
    ctx.font = '12px monospace'
    ctx.fillText('STATUS: OPERATIONAL · CONTRACT VALIDATED', 20, 298)

    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }

  // -------------------------------------------------------------------------
  // Assemble the Main Motherboard Chassis Base
  // -------------------------------------------------------------------------
  const machineGroup = new THREE.Group()
  scene.add(machineGroup)

  // Primary Heavy Base Plate
  const baseGeo = new RoundedBoxGeometry(17, 0.6, 11, 4, 0.25)
  const baseMesh = new THREE.Mesh(baseGeo, materials.chassisPlate)
  baseMesh.position.y = -0.3
  baseMesh.receiveShadow = true
  machineGroup.add(baseMesh)

  // Top Inset Circuit Deck
  const deckGeo = new RoundedBoxGeometry(16.2, 0.15, 10.2, 3, 0.15)
  const deckMesh = new THREE.Mesh(deckGeo, materials.chassisDark)
  deckMesh.position.y = 0.05
  deckMesh.receiveShadow = true
  machineGroup.add(deckMesh)

  // Motherboard Corner Screws
  const screwGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 16)
  const screwCorners = [
    [-7.8, 0.14, -4.8],
    [7.8, 0.14, -4.8],
    [-7.8, 0.14, 4.8],
    [7.8, 0.14, 4.8],
  ]
  screwCorners.forEach(([x, y, z]) => {
    const screw = new THREE.Mesh(screwGeo, materials.steelChrome)
    screw.position.set(x, y, z)
    machineGroup.add(screw)
  })

  // -------------------------------------------------------------------------
  // Fiber Optic Bus Rails (Data Highway on Chassis)
  // -------------------------------------------------------------------------
  const highwayPoints = [
    new THREE.Vector3(-5.4, 0.16, 2.6), // Station 1 (Gateway)
    new THREE.Vector3(-4.6, 0.16, -2.8), // Station 2 (Kafka)
    new THREE.Vector3(0, 0.16, 0), // Station 3 (Core)
    new THREE.Vector3(4.6, 0.16, -2.6), // Station 4 (Observability)
    new THREE.Vector3(5.4, 0.16, 2.6), // Station 5 (Cloud)
  ]
  const highwayCurve = new THREE.CatmullRomCurve3(highwayPoints, true)
  const tubeGeo = new THREE.TubeGeometry(highwayCurve, 120, 0.05, 8, true)
  const highwayMat = new THREE.MeshBasicMaterial({
    color: 0xd4af37,
    transparent: true,
    opacity: 0.75,
  })
  const highwayTube = new THREE.Mesh(tubeGeo, highwayMat)
  machineGroup.add(highwayTube)

  // Flow Packet Capsule (Active in Flow Mode)
  const packetGeo = new THREE.SphereGeometry(0.22, 16, 16)
  const packetMat = new THREE.MeshBasicMaterial({ color: 0xffe082 })
  const packetMesh = new THREE.Mesh(packetGeo, packetMat)
  packetMesh.visible = false
  machineGroup.add(packetMesh)

  // -------------------------------------------------------------------------
  // Build the 5 Physical Stations
  // -------------------------------------------------------------------------
  interface StationObject {
    meta: StationMeta
    group: THREE.Group
    hitbox: THREE.Mesh
    baseY: number
    explodedY: number
    screenMesh: THREE.Mesh
    rotatables: THREE.Object3D[]
  }

  const stationObjects: StationObject[] = []

  STATIONS.forEach((meta) => {
    const stationGroup = new THREE.Group()
    stationGroup.position.set(...meta.position)
    machineGroup.add(stationGroup)

    const rotatables: THREE.Object3D[] = []

    // 1. Module Base Pedestal
    const pedGeo = new RoundedBoxGeometry(3.2, 0.35, 2.6, 3, 0.1)
    const pedMesh = new THREE.Mesh(pedGeo, materials.chassisDark)
    pedMesh.castShadow = true
    pedMesh.receiveShadow = true
    stationGroup.add(pedMesh)

    // Glowing Station LED Edge Line
    const edgeGeo = new THREE.BoxGeometry(3.1, 0.04, 0.06)
    const edgeMat = new THREE.MeshBasicMaterial({ color: meta.color })
    const edgeFront = new THREE.Mesh(edgeGeo, edgeMat)
    edgeFront.position.set(0, 0.16, 1.25)
    stationGroup.add(edgeFront)

    // 2. High-Res Screen Terminal
    const screenTexture = createScreenTexture(meta.title, meta.subtitle, meta.specs, meta.hexColor)
    const screenGeo = new THREE.PlaneGeometry(1.9, 1.15)
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture, toneMapped: false })
    const screenMesh = new THREE.Mesh(screenGeo, screenMat)
    screenMesh.position.set(0, 1.5, 0.8)
    screenMesh.rotation.x = -0.2
    stationGroup.add(screenMesh)

    // Screen Protective Enclosure Frame
    const frameGeo = new RoundedBoxGeometry(2.05, 1.3, 0.12, 2, 0.04)
    const frameMesh = new THREE.Mesh(frameGeo, materials.chassisPlate)
    frameMesh.position.copy(screenMesh.position)
    frameMesh.position.z -= 0.06
    frameMesh.rotation.copy(screenMesh.rotation)
    stationGroup.add(frameMesh)

    // 3. Station-Specific Procedural 3D Elements
    if (meta.id === 'bcp-gateway') {
      // Hexagonal Fortress Gateway Tower
      const towerGeo = new THREE.CylinderGeometry(0.75, 0.9, 2.2, 6)
      const tower = new THREE.Mesh(towerGeo, materials.chassisPlate)
      tower.position.set(0, 1.1, -0.4)
      tower.castShadow = true
      stationGroup.add(tower)

      // Revolving Cyan Laser Ring
      const ringGeo = new THREE.TorusGeometry(1.1, 0.04, 12, 32)
      const ring = new THREE.Mesh(ringGeo, materials.cyanGlow)
      ring.position.set(0, 1.3, -0.4)
      ring.rotation.x = Math.PI / 2.2
      stationGroup.add(ring)
      rotatables.push(ring)
    } else if (meta.id === 'mambu-core') {
      // Triplet of Kafka Stream Partitions
      const cylGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.8, 16)
      ;[-0.7, 0, 0.7].forEach((xOffset, i) => {
        const cyl = new THREE.Mesh(cylGeo, materials.steelChrome)
        cyl.position.set(xOffset, 0.9, -0.4)
        cyl.castShadow = true
        stationGroup.add(cyl)

        // Revolving Rotor Disks
        const diskGeo = new THREE.TorusGeometry(0.42, 0.03, 8, 24)
        const disk = new THREE.Mesh(diskGeo, materials.amberGlow)
        disk.position.set(xOffset, 1.5, -0.4)
        disk.rotation.x = Math.PI / 2
        stationGroup.add(disk)
        rotatables.push(disk)
      })
    } else if (meta.id === 'microservices-core') {
      // Central Hex Domain CPU & Server Blade Stack
      const cpuGeo = new RoundedBoxGeometry(1.6, 2.0, 1.2, 3, 0.1)
      const cpu = new THREE.Mesh(cpuGeo, materials.chassisPlate)
      cpu.position.set(0, 1.0, -0.4)
      cpu.castShadow = true
      stationGroup.add(cpu)

      // Hex heatsink fan on top
      const fanGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.08, 6)
      const fan = new THREE.Mesh(fanGeo, materials.steelChrome)
      fan.position.set(0, 2.05, -0.4)
      stationGroup.add(fan)
      rotatables.push(fan)
    } else if (meta.id === 'observability-reactor') {
      // Reactor Tower with Oscillating Sensor Dish
      const vesselGeo = new THREE.CylinderGeometry(0.7, 0.85, 2.1, 16)
      const vessel = new THREE.Mesh(vesselGeo, materials.darkGlass)
      vessel.position.set(0, 1.05, -0.4)
      stationGroup.add(vessel)

      // Inner Luminous Core
      const coreGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.6, 16)
      const core = new THREE.Mesh(coreGeo, materials.emeraldGlow)
      core.position.copy(vessel.position)
      stationGroup.add(core)

      // Radar Scanner Dish on Mast
      const mastGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8)
      const mast = new THREE.Mesh(mastGeo, materials.steelChrome)
      mast.position.set(0, 2.4, -0.4)
      stationGroup.add(mast)

      const dishGeo = new THREE.ConeGeometry(0.35, 0.2, 16, 1, true)
      const dish = new THREE.Mesh(dishGeo, materials.steelChrome)
      dish.position.set(0, 2.8, -0.4)
      dish.rotation.x = Math.PI / 3
      stationGroup.add(dish)
      rotatables.push(dish)
    } else if (meta.id === 'cloud-governance') {
      // Twin Pylon Towers Connected by an Arch Bridge
      const towerGeo = new THREE.CylinderGeometry(0.28, 0.38, 2.2, 12)
      ;[-0.7, 0.7].forEach((xOffset) => {
        const tower = new THREE.Mesh(towerGeo, materials.chassisPlate)
        tower.position.set(xOffset, 1.1, -0.4)
        tower.castShadow = true
        stationGroup.add(tower)
      })

      // Connecting Arch Bridge
      const archGeo = new RoundedBoxGeometry(1.6, 0.15, 0.4, 2, 0.05)
      const arch = new THREE.Mesh(archGeo, materials.steelChrome)
      arch.position.set(0, 2.1, -0.4)
      stationGroup.add(arch)

      // Holographic Purple Beacon
      const beaconGeo = new THREE.OctahedronGeometry(0.25)
      const beacon = new THREE.Mesh(beaconGeo, materials.purpleGlow)
      beacon.position.set(0, 2.5, -0.4)
      stationGroup.add(beacon)
      rotatables.push(beacon)
    }

    // Invisible Click/Hover Hitbox
    const hitGeo = new THREE.BoxGeometry(3.6, 3.2, 3.2)
    const hitMat = new THREE.MeshBasicMaterial({ visible: false })
    const hitbox = new THREE.Mesh(hitGeo, hitMat)
    hitbox.position.set(0, 1.4, 0)
    hitbox.userData = { meta }
    stationGroup.add(hitbox)

    stationObjects.push({
      meta,
      group: stationGroup,
      hitbox,
      baseY: meta.position[1],
      explodedY: meta.position[1] + 1.8,
      screenMesh,
      rotatables,
    })
  })

  // -------------------------------------------------------------------------
  // Raycaster for Hover & Selection
  // -------------------------------------------------------------------------
  const raycaster = new THREE.Raycaster()
  const mouse = new THREE.Vector2(-999, -999)

  const handlePointerMove = (e: MouseEvent) => {
    const rect = renderer.domElement.getBoundingClientRect()
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
  }

  const handleClick = (e: MouseEvent) => {
    raycaster.setFromCamera(mouse, camera)
    const hits = raycaster.intersectObjects(stationObjects.map((s) => s.hitbox))
    if (hits.length > 0) {
      const hitObj = hits[0].object
      const meta = hitObj.userData.meta as StationMeta
      if (meta) {
        options.onStationClick(meta.id)
      }
    }
  }

  renderer.domElement.addEventListener('mousemove', handlePointerMove)
  renderer.domElement.addEventListener('click', handleClick)

  // -------------------------------------------------------------------------
  // Camera & Mode State Machine
  // -------------------------------------------------------------------------
  let currentMode: MachineMode = 'assembled'
  let currentCameraPreset: CameraPreset = 'overview'
  let activeStationId: ArchitectureStationId = 'bcp-gateway'
  let animationRunning = true

  const cameraGoals = {
    position: new THREE.Vector3(0, 16, 26),
    target: new THREE.Vector3(0, 0.8, 0),
  }

  function applyCameraPreset(preset: CameraPreset, stationId?: ArchitectureStationId) {
    currentCameraPreset = preset
    if (stationId) activeStationId = stationId

    if (preset === 'overview') {
      cameraGoals.position.set(0, 16, 26)
      cameraGoals.target.set(0, 0.8, 0)
    } else if (preset === 'side') {
      cameraGoals.position.set(24, 6, 0)
      cameraGoals.target.set(0, 1.2, 0)
    } else if (preset === 'top') {
      cameraGoals.position.set(0, 28, 0.1)
      cameraGoals.target.set(0, 0, 0)
    } else if (preset === 'station') {
      const targetStation = stationObjects.find((s) => s.meta.id === activeStationId)
      if (targetStation) {
        const [x, y, z] = targetStation.meta.position
        cameraGoals.position.set(x * 1.35, y + 4.5, z * 1.35 + 6.5)
        cameraGoals.target.set(x, y + 1.2, z)
      }
    } else if (preset === 'flight') {
      cameraGoals.position.set(-18, 12, 18)
      cameraGoals.target.set(0, 1.0, 0)
    }
  }

  function applyMode(mode: MachineMode) {
    currentMode = mode
    if (mode === 'flow') {
      packetMesh.visible = true
      applyCameraPreset('overview')
    } else {
      packetMesh.visible = false
    }
  }

  // Expose API to React
  onApi({
    setMode: applyMode,
    setCamera: applyCameraPreset,
    focusStation: (id) => {
      activeStationId = id
      applyCameraPreset('station', id)
    },
    togglePlay: () => {
      animationRunning = !animationRunning
    },
  })

  // -------------------------------------------------------------------------
  // Render & Animation Loop
  // -------------------------------------------------------------------------
  let reqId: number
  let clock = new THREE.Clock()
  let hoveredStationRef: StationMeta | null = null
  let packetT = 0

  const animate = () => {
    reqId = requestAnimationFrame(animate)
    const delta = clock.getDelta()
    const elapsed = clock.getElapsedTime()

    // Smooth Camera Transition (Lerp)
    camera.position.lerp(cameraGoals.position, 0.05)
    controls.target.lerp(cameraGoals.target, 0.05)
    controls.update()

    // Flight Camera Slow Gentle Orbit
    if (currentCameraPreset === 'flight' && animationRunning) {
      const radius = 24
      cameraGoals.position.x = Math.sin(elapsed * 0.15) * radius
      cameraGoals.position.z = Math.cos(elapsed * 0.15) * radius
    }

    // Raycast Hover Test
    raycaster.setFromCamera(mouse, camera)
    const intersects = raycaster.intersectObjects(stationObjects.map((s) => s.hitbox))
    if (intersects.length > 0) {
      const hit = intersects[0].object
      const meta = hit.userData.meta as StationMeta
      if (hoveredStationRef !== meta) {
        hoveredStationRef = meta
        renderer.domElement.style.cursor = 'pointer'
        options.onStationHover(meta)
      }
    } else if (hoveredStationRef !== null) {
      hoveredStationRef = null
      renderer.domElement.style.cursor = 'default'
      options.onStationHover(null)
    }

    // Animate Stations (Exploded vs Assembled)
    stationObjects.forEach((station) => {
      const isTarget = station.meta.id === activeStationId
      const isHovered = hoveredStationRef?.id === station.meta.id

      // Y-axis target elevation
      const targetY =
        currentMode === 'exploded'
          ? station.explodedY
          : isHovered
          ? station.baseY + 0.3
          : station.baseY

      station.group.position.y += (targetY - station.group.position.y) * 0.08

      // Rotate Internal Mechanical Parts
      if (animationRunning) {
        station.rotatables.forEach((obj, idx) => {
          obj.rotation.y += delta * (1.2 + idx * 0.4)
          obj.rotation.z += delta * 0.5
        })
      }
    })

    // Animate Flow Mode Transaction Packet
    if (currentMode === 'flow' && animationRunning) {
      packetT = (packetT + delta * 0.18) % 1
      const point = highwayCurve.getPoint(packetT)
      packetMesh.position.copy(point)
      packetMesh.position.y += 0.25

      const stepIndex = Math.min(4, Math.floor(packetT * 5))
      options.onFlowStepChange(stepIndex)
    }

    renderer.render(scene, camera)
  }

  animate()
  options.onReady()

  // Resize Handler
  const handleResize = () => {
    if (!container) return
    const w = container.clientWidth
    const h = container.clientHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }

  window.addEventListener('resize', handleResize)

  return () => {
    cancelAnimationFrame(reqId)
    renderer.domElement.removeEventListener('mousemove', handlePointerMove)
    renderer.domElement.removeEventListener('click', handleClick)
    window.removeEventListener('resize', handleResize)
    renderer.dispose()
    if (stageEl.contains(renderer.domElement)) {
      stageEl.removeChild(renderer.domElement)
    }
  }
}
