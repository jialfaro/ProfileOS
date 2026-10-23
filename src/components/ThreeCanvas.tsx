"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const ThreeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.035);

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;
    camera.position.y = 2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Group for mouse parallax
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Architectural Nodes & Network Lattice
    const nodeCount = 42;
    const nodePositions: THREE.Vector3[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.18, 16, 16);
    
    // Core node materials: Platinum, Cyan-Teal accent, Warm Gold
    const materialCyan = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const materialPlatinum = new THREE.MeshBasicMaterial({ color: 0xe2e8f0 });
    const materialGold = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    const nodesMeshGroup = new THREE.Group();

    for (let i = 0; i < nodeCount; i++) {
      // Cluster nodes in a multi-tiered architectural layer (simulating cloud & edge)
      const u = (Math.random() - 0.5) * 32;
      const v = (Math.random() - 0.5) * 16;
      const w = (Math.random() - 0.5) * 18;
      const pos = new THREE.Vector3(u, v, w);
      nodePositions.push(pos);

      const mat = i % 7 === 0 ? materialGold : i % 3 === 0 ? materialCyan : materialPlatinum;
      const sphere = new THREE.Mesh(nodeGeometry, mat);
      sphere.position.copy(pos);
      nodesMeshGroup.add(sphere);
    }
    worldGroup.add(nodesMeshGroup);

    // Connecting Lines (Network topology / Event Streams)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending
    });

    const linePositions: number[] = [];
    const maxDistance = 7.5;

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < maxDistance) {
          linePositions.push(
            nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
            nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
          );
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    worldGroup.add(networkLines);

    // Floating Ambient Dust/Particles
    const particleCount = 200;
    const particleGeometry = new THREE.BufferGeometry();
    const particleCoords = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particleCoords[i] = (Math.random() - 0.5) * 50;
      particleCoords[i + 1] = (Math.random() - 0.5) * 30;
      particleCoords[i + 2] = (Math.random() - 0.5) * 35;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particleCoords, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.08,
      color: 0x94a3b8,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const particleField = new THREE.Points(particleGeometry, particleMaterial);
    worldGroup.add(particleField);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / container.clientWidth - 0.5) * 2;
      mouseY = (y / container.clientHeight - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
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
        // Slow architectural orbit
        worldGroup.rotation.y = time * 0.04;
        worldGroup.rotation.x = Math.sin(time * 0.02) * 0.08;

        // Smooth mouse damping
        targetX += (mouseX * 0.45 - targetX) * 0.05;
        targetY += (mouseY * 0.35 - targetY) * 0.05;
        camera.position.x = targetX * 6;
        camera.position.y = -targetY * 4 + 2;
        camera.lookAt(0, 0, 0);

        // Gentle floating pulsation for nodes
        nodesMeshGroup.children.forEach((mesh, idx) => {
          mesh.position.y += Math.sin(time * 1.5 + idx) * 0.003;
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean up geometries and materials
      nodeGeometry.dispose();
      lineGeometry.dispose();
      particleGeometry.dispose();
      materialCyan.dispose();
      materialPlatinum.dispose();
      materialGold.dispose();
      lineMaterial.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mounted]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    />
  );
};
