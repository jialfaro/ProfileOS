"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ARCHITECTURE_NODES, ArchitectureNode } from "@/data/architectureNodes";
import { playNodeSelect, playTactileClick } from "@/lib/sound";

interface ThreeCanvasProps {
  selectedNodeId: string | null;
  onSelectNode: (nodeId: string) => void;
  activeLayerFilter?: string | null;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  selectedNodeId,
  onSelectNode,
  activeLayerFilter
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<ArchitectureNode | null>(null);

  // Store callbacks in ref to avoid re-initializing Three.js on every prop change
  const onSelectNodeRef = useRef(onSelectNode);
  onSelectNodeRef.current = onSelectNode;

  const selectedNodeIdRef = useRef(selectedNodeId);
  selectedNodeIdRef.current = selectedNodeId;

  const activeLayerFilterRef = useRef(activeLayerFilter);
  activeLayerFilterRef.current = activeLayerFilter;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0d12, 0.032);

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1.5, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Create Architecture Node Meshes
    const nodeMeshes: {
      mesh: THREE.Mesh;
      ring: THREE.Mesh;
      data: ArchitectureNode;
      basePos: THREE.Vector3;
    }[] = [];

    const nodeGeometry = new THREE.SphereGeometry(0.55, 32, 32);
    const ringGeometry = new THREE.RingGeometry(0.75, 0.85, 32);

    ARCHITECTURE_NODES.forEach((nodeData) => {
      const color = new THREE.Color(nodeData.color);

      // Node Sphere with soft inner glow
      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
      });
      const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      const pos = new THREE.Vector3(...nodeData.position);
      nodeMesh.position.copy(pos);
      nodeMesh.userData = { id: nodeData.id, data: nodeData };

      // Orbital Ring around the node
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.position.copy(pos);
      ringMesh.rotation.x = Math.PI / 2;

      worldGroup.add(nodeMesh);
      worldGroup.add(ringMesh);

      nodeMeshes.push({
        mesh: nodeMesh,
        ring: ringMesh,
        data: nodeData,
        basePos: pos
      });
    });

    // Connecting Lines (Event Streams & Service Mesh)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x475569,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });

    const activeLineMaterial = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      linewidth: 2
    });

    const connectionLines: { line: THREE.Line; fromId: string; toId: string }[] = [];

    ARCHITECTURE_NODES.forEach((node) => {
      node.connections.forEach((targetId) => {
        const targetNode = ARCHITECTURE_NODES.find((n) => n.id === targetId);
        if (targetNode) {
          const points = [
            new THREE.Vector3(...node.position),
            new THREE.Vector3(...targetNode.position)
          ];
          const geometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(geometry, lineMaterial);
          worldGroup.add(line);
          connectionLines.push({ line, fromId: node.id, toId: targetId });
        }
      });
    });

    // Background Architectural Lattice Dust
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particleCoords[i] = (Math.random() - 0.5) * 45;
      particleCoords[i + 1] = (Math.random() - 0.5) * 28;
      particleCoords[i + 2] = (Math.random() - 0.5) * 30;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particleCoords, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    });
    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    worldGroup.add(particleField);

    // Raycasting for Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);
    let targetRotationX = 0;
    let targetRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      mouse.x = (x / container.clientWidth) * 2 - 1;
      mouse.y = -(y / container.clientHeight) * 2 + 1;

      targetRotationY = ((x / container.clientWidth) - 0.5) * 0.5;
      targetRotationX = ((y / container.clientHeight) - 0.5) * 0.3;
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = nodeMeshes.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const nodeId = hit.userData.id;
        if (nodeId) {
          playNodeSelect();
          onSelectNodeRef.current(nodeId);
        }
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("click", handleClick);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = (performance.now() - startTime) / 1000;

      if (!prefersReducedMotion) {
        // Smooth camera tilt & damping
        worldGroup.rotation.y += (targetRotationY - worldGroup.rotation.y) * 0.05;
        worldGroup.rotation.x += (targetRotationX - worldGroup.rotation.x) * 0.05;

        // Animate nodes and rings
        nodeMeshes.forEach((item, index) => {
          const isSelected = item.data.id === selectedNodeIdRef.current;
          const isFiltered = activeLayerFilterRef.current && item.data.layer !== activeLayerFilterRef.current;

          // Scale and pulsing
          const pulse = Math.sin(time * 2.5 + index) * 0.05;
          const targetScale = isSelected ? 1.45 : isFiltered ? 0.75 : 1 + pulse;
          item.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

          // Rotate orbital ring
          item.ring.rotation.z = time * 0.8 + index;
          item.ring.scale.set(targetScale * 1.1, targetScale * 1.1, targetScale * 1.1);
        });

        // Highlight active connections
        connectionLines.forEach((conn) => {
          const isConnectedToSelected =
            conn.fromId === selectedNodeIdRef.current || conn.toId === selectedNodeIdRef.current;
          conn.line.material = isConnectedToSelected ? activeLineMaterial : lineMaterial;
        });
      }

      // Check hover with raycaster
      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = nodeMeshes.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const data = hit.userData.data as ArchitectureNode;
        container.style.cursor = "pointer";
        setHoveredNode(data);
      } else {
        container.style.cursor = "default";
        setHoveredNode(null);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("click", handleClick);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      nodeGeometry.dispose();
      ringGeometry.dispose();
      lineMaterial.dispose();
      activeLineMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mounted]);

  if (!mounted) {
    return <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true" />;
  }

  return (
    <div 
      ref={containerRef} 
      className="no-print absolute inset-0 z-0 overflow-hidden select-none"
    >
      {/* Floating Hover Tooltip HUD in 3D Space */}
      {hoveredNode && (
        <div 
          className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none z-20 px-4 py-2.5 rounded-2xl bg-[#12141c]/95 border border-amber-500/30 shadow-2xl backdrop-blur-2xl text-center space-y-0.5 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-center gap-2">
            <span 
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: hoveredNode.color }}
            />
            <span className="text-xs font-sans font-bold text-stone-100">
              {hoveredNode.name}
            </span>
          </div>
          <p className="text-[11px] font-sans text-amber-300 font-medium">
            {hoveredNode.subsystem} ({hoveredNode.organization})
          </p>
          <span className="text-[10px] text-stone-400 font-sans block">
            Click para inspeccionar decisiones técnicas (ADRs)
          </span>
        </div>
      )}
    </div>
  );
};
