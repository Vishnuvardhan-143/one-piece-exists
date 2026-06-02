import React, { useState, useRef, useEffect } from 'react';
import { Island } from '../types';
import { Compass, Ship, Skull, Globe, Wind, Anchor } from 'lucide-react';

interface MapNavigatorProps {
  islands: Island[];
  activeIslandId: string | null;
  onIslandSelect: (islandId: string) => void;
}

// Generate uniform points on a sphere using Fibonacci distribution for high-tech premium aesthetics
const generateSphereDots = (count: number) => {
  const points: { x: number; y: number; z: number }[] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radius = Math.sqrt(1 - y * y); // radius at y
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const theta = (2 * Math.PI * i) / goldenRatio;

    const x = Math.cos(theta) * radius;
    const z = Math.sin(theta) * radius;
    points.push({ x, y, z });
  }
  return points;
};

const GLOBE_RADIUS = 220;
const SPHERE_DOTS = generateSphereDots(450);

export default function MapNavigator({ islands, activeIslandId, onIslandSelect }: MapNavigatorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // States
  const [hoveredIsland, setHoveredIsland] = useState<Island | null>(null);
  const [logPoseDegree, setLogPoseDegree] = useState(0);

  // 3D Angles & Physics Refs (to avoid re-running useEffect setup on state change)
  const yawRef = useRef(-1.2); // Start tilted to view initial islands
  const pitchRef = useRef(0.2);
  const targetYawRef = useRef<number | null>(null);
  const targetPitchRef = useRef<number | null>(null);
  const isAutoCenteringRef = useRef(false);

  // Drag variables
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ yaw: 0, pitch: 0 });
  const lastInteractionTimeRef = useRef(Date.now());

  // Projected nodes positions for hover testing
  const projectedNodesRef = useRef<{ id: string; x: number; y: number; z: number; island: Island }[]>([]);

  // Convert 2D mock data coordinates to spherical coordinates on our 3D globe
  const getSphereCoords = (island: Island) => {
    // Map x [0, 100] to longitude theta [-PI * 1.2, PI * 1.2]
    // Map y [0, 100] to latitude phi [-PI * 0.35, PI * 0.35]
    const theta = ((island.coordinates.x - 50) / 100) * Math.PI * 2.2;
    const phi = ((50 - island.coordinates.y) / 100) * Math.PI * 0.7;
    return { theta, phi };
  };

  // Lock Log Pose on hovered island angle
  const getLogPoseAngle = (island: Island) => {
    return (island.chronologicalOrder * 45) % 360;
  };

  // Dynamic continuous spinning effect for idle log pose needle
  useEffect(() => {
    let animId: number;
    const spinNeedle = () => {
      setLogPoseDegree((prev) => (prev + 0.3) % 360);
      animId = requestAnimationFrame(spinNeedle);
    };
    if (!hoveredIsland) {
      spinNeedle();
    }
    return () => cancelAnimationFrame(animId);
  }, [hoveredIsland]);

  // Setup auto-centering when active island changes
  useEffect(() => {
    if (activeIslandId) {
      const activeIsland = islands.find(i => i.id === activeIslandId);
      if (activeIsland) {
        const { theta, phi } = getSphereCoords(activeIsland);
        // Target angles to align this island facing direct front (theta' = 0, phi' = 0)
        targetYawRef.current = -theta;
        targetPitchRef.current = -phi;
        isAutoCenteringRef.current = true;
        lastInteractionTimeRef.current = Date.now();
      }
    }
  }, [activeIslandId, islands]);

  // Main 3D Canvas Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let dashOffset = 0;

    const render = () => {
      time += 0.02;
      dashOffset = (dashOffset + 0.2) % 20;

      // Handle auto-focus transitions or inertia/idle rotations
      if (isDraggingRef.current) {
        // Dragging is active, no auto-spin or centering
        isAutoCenteringRef.current = false;
        velocityRef.current.yaw *= 0.95;
        velocityRef.current.pitch *= 0.95;
      } else {
        // Apply inertia friction
        yawRef.current += velocityRef.current.yaw;
        pitchRef.current += velocityRef.current.pitch;
        velocityRef.current.yaw *= 0.92;
        velocityRef.current.pitch *= 0.92;

        if (isAutoCenteringRef.current && targetYawRef.current !== null && targetPitchRef.current !== null) {
          // Smoothly interpolate yaw & pitch towards target centering angles
          // Standardize angles to avoid long rotations
          let diffYaw = targetYawRef.current - yawRef.current;
          diffYaw = Math.atan2(Math.sin(diffYaw), Math.cos(diffYaw));
          
          let diffPitch = targetPitchRef.current - pitchRef.current;
          diffPitch = Math.atan2(Math.sin(diffPitch), Math.cos(diffPitch));

          yawRef.current += diffYaw * 0.08;
          pitchRef.current += diffPitch * 0.08;

          // Arrived?
          if (Math.abs(diffYaw) < 0.002 && Math.abs(diffPitch) < 0.002) {
            isAutoCenteringRef.current = false;
          }
        } else {
          // Idle rotation after 3 seconds of inactivity
          if (Date.now() - lastInteractionTimeRef.current > 3000) {
            yawRef.current += 0.0012; // Gentle slow rotation
            pitchRef.current += (0.15 - pitchRef.current) * 0.01; // Ease back to slightly tilted equatorial plane
          }
        }
      }

      // Clamp pitch to avoid turning the globe upside down
      pitchRef.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, pitchRef.current));

      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Rotate points helper function
      const rotatePoint = (x: number, y: number, z: number) => {
        // Y-rotation (yaw)
        const x1 = x * Math.cos(yawRef.current) + z * Math.sin(yawRef.current);
        const z1 = -x * Math.sin(yawRef.current) + z * Math.cos(yawRef.current);
        const y1 = y;

        // X-rotation (pitch)
        const z2 = z1 * Math.cos(pitchRef.current) - y1 * Math.sin(pitchRef.current);
        const y2 = z1 * Math.sin(pitchRef.current) + y1 * Math.cos(pitchRef.current);
        const x2 = x1;

        return { x: cx + x2, y: cy - y2, z: z2 };
      };

      // 1. Draw glowing background grid & radial atmospheric space glow
      const oceanBgGlow = ctx.createRadialGradient(cx, cy, GLOBE_RADIUS * 0.5, cx, cy, GLOBE_RADIUS);
      oceanBgGlow.addColorStop(0, 'rgba(0, 15, 30, 0.6)');
      oceanBgGlow.addColorStop(0.8, 'rgba(10, 35, 60, 0.8)');
      oceanBgGlow.addColorStop(1, 'rgba(57, 204, 204, 0.3)');
      ctx.beginPath();
      ctx.arc(cx, cy, GLOBE_RADIUS, 0, 2 * Math.PI);
      ctx.fillStyle = oceanBgGlow;
      ctx.fill();

      // 2. Draw atmospheric halo (Outer glow)
      const atmosphereGlow = ctx.createRadialGradient(cx, cy, GLOBE_RADIUS, cx, cy, GLOBE_RADIUS + 45);
      atmosphereGlow.addColorStop(0, 'rgba(57, 204, 204, 0.4)');
      atmosphereGlow.addColorStop(0.4, 'rgba(57, 204, 204, 0.1)');
      atmosphereGlow.addColorStop(1, 'rgba(57, 204, 204, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, GLOBE_RADIUS + 45, 0, 2 * Math.PI);
      ctx.fillStyle = atmosphereGlow;
      ctx.fill();

      // 3. Draw Fibonacci Globe dot-mesh
      SPHERE_DOTS.forEach((point) => {
        const px = point.x * GLOBE_RADIUS;
        const py = point.y * GLOBE_RADIUS;
        const pz = point.z * GLOBE_RADIUS;

        const rotated = rotatePoint(px, py, pz);

        // Calculate opacity based on Z depth
        if (rotated.z > 0) {
          // Front side: brighter
          const depthRatio = rotated.z / GLOBE_RADIUS;
          ctx.fillStyle = `rgba(57, 204, 204, ${0.1 + depthRatio * 0.35})`;
          ctx.beginPath();
          ctx.arc(rotated.x, rotated.y, 1.4, 0, 2 * Math.PI);
          ctx.fill();
        } else {
          // Back side: very faint
          const depthRatio = Math.abs(rotated.z) / GLOBE_RADIUS;
          ctx.fillStyle = `rgba(57, 204, 204, ${Math.max(0.01, 0.08 - depthRatio * 0.07)})`;
          ctx.beginPath();
          ctx.arc(rotated.x, rotated.y, 0.8, 0, 2 * Math.PI);
          ctx.fill();
        }
      });

      // 4. Draw Red Line / Meridians (Tactical grid boundaries)
      // Red Line is located at specific vertical arcs. We can draw it as a great circle rotated.
      // We will trace the circle path.
      ctx.strokeStyle = 'rgba(230, 0, 18, 0.25)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      for (let angle = 0; angle <= Math.PI * 2; angle += 0.05) {
        // Red Line is a meridian at longitudes matching the grid boundary
        const rx = GLOBE_RADIUS * Math.cos(angle) * Math.sin(0.4);
        const ry = GLOBE_RADIUS * Math.sin(angle);
        const rz = GLOBE_RADIUS * Math.cos(angle) * Math.cos(0.4);
        const rot = rotatePoint(rx, ry, rz);
        if (rot.z > 0) {
          if (angle === 0) ctx.moveTo(rot.x, rot.y);
          else ctx.lineTo(rot.x, rot.y);
        }
      }
      ctx.stroke();

      // Equator Line
      ctx.strokeStyle = 'rgba(57, 204, 204, 0.15)';
      ctx.beginPath();
      for (let angle = 0; angle <= Math.PI * 2; angle += 0.05) {
        const rx = GLOBE_RADIUS * Math.cos(angle);
        const ry = 0;
        const rz = GLOBE_RADIUS * Math.sin(angle);
        const rot = rotatePoint(rx, ry, rz);
        if (rot.z > 0) {
          if (angle === 0) ctx.moveTo(rot.x, rot.y);
          else ctx.lineTo(rot.x, rot.y);
        }
      }
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      // 5. Draw 3D Voyage Connection Path wrapping the globe
      const nodesData = islands.map((island) => {
        const { theta, phi } = getSphereCoords(island);
        const x = GLOBE_RADIUS * Math.cos(phi) * Math.sin(theta);
        const y = GLOBE_RADIUS * Math.sin(phi);
        const z = GLOBE_RADIUS * Math.cos(phi) * Math.cos(theta);
        return { island, x, y, z, theta, phi };
      });

      // Draw curved segment lines between consecutive islands
      ctx.shadowBlur = 0;
      for (let i = 0; i < nodesData.length - 1; i++) {
        const nodeA = nodesData[i];
        const nodeB = nodesData[i + 1];

        // Interpolate along the sphere surface to bend the line
        const steps = 18;
        const segmentPoints: { x: number; y: number; z: number }[] = [];

        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const theta = nodeA.theta + (nodeB.theta - nodeA.theta) * t;
          const phi = nodeA.phi + (nodeB.phi - nodeA.phi) * t;

          const ix = GLOBE_RADIUS * Math.cos(phi) * Math.sin(theta);
          const iy = GLOBE_RADIUS * Math.sin(phi);
          const iz = GLOBE_RADIUS * Math.cos(phi) * Math.cos(theta);

          segmentPoints.push(rotatePoint(ix, iy, iz));
        }

        // Draw segments with depth opacity
        for (let p = 0; p < segmentPoints.length - 1; p++) {
          const pA = segmentPoints[p];
          const pB = segmentPoints[p + 1];
          const zAvg = (pA.z + pB.z) / 2;

          ctx.beginPath();
          ctx.moveTo(pA.x, pA.y);
          ctx.lineTo(pB.x, pB.y);

          if (zAvg > 0) {
            // Front side: solid neon glow path
            ctx.strokeStyle = `rgba(57, 204, 204, ${0.4 + (zAvg / GLOBE_RADIUS) * 0.55})`;
            ctx.lineWidth = 2.5;
            ctx.stroke();
          } else {
            // Back side: dashed faint path
            ctx.strokeStyle = `rgba(57, 204, 204, ${Math.max(0.02, 0.12 - Math.abs(zAvg) / GLOBE_RADIUS * 0.1)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 6. Draw Animated Voyage Flow dashes on front side path
      ctx.save();
      ctx.strokeStyle = '#FFD700';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 12]);
      ctx.lineDashOffset = -dashOffset;
      ctx.beginPath();
      let firstDraw = true;

      for (let i = 0; i < nodesData.length - 1; i++) {
        const nodeA = nodesData[i];
        const nodeB = nodesData[i + 1];
        const steps = 18;

        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const theta = nodeA.theta + (nodeB.theta - nodeA.theta) * t;
          const phi = nodeA.phi + (nodeB.phi - nodeA.phi) * t;

          const ix = GLOBE_RADIUS * Math.cos(phi) * Math.sin(theta);
          const iy = GLOBE_RADIUS * Math.sin(phi);
          const iz = GLOBE_RADIUS * Math.cos(phi) * Math.cos(theta);

          const rot = rotatePoint(ix, iy, iz);
          if (rot.z > 5) {
            if (firstDraw) {
              ctx.moveTo(rot.x, rot.y);
              firstDraw = false;
            } else {
              ctx.lineTo(rot.x, rot.y);
            }
          } else {
            firstDraw = true; // Break the path at back side
          }
        }
      }
      ctx.stroke();
      ctx.restore();

      // 7. Render Island Nodes & collect projected positions
      const currentProjected: typeof projectedNodesRef.current = [];

      nodesData.forEach(({ island, x, y, z }) => {
        const rot = rotatePoint(x, y, z);
        currentProjected.push({ id: island.id, x: rot.x, y: rot.y, z: rot.z, island });

        const isActive = activeIslandId === island.id;
        const isHovered = hoveredIsland?.id === island.id;

        if (rot.z > -10) {
          // Opacity multiplier depending on depth
          const opacity = rot.z > 0 
            ? 0.3 + (rot.z / GLOBE_RADIUS) * 0.7 
            : 0.15; // Back of sphere is drawn faint

          ctx.shadowBlur = 0;

          if (isActive) {
            // Pulsing Gold Active Node
            const pulseRadius = 11 + Math.sin(time * 6) * 4;
            
            // Outer pulse circle
            ctx.strokeStyle = `rgba(255, 215, 0, ${0.45 * opacity})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(rot.x, rot.y, pulseRadius, 0, 2 * Math.PI);
            ctx.stroke();

            // Inner solid gold node
            ctx.fillStyle = `rgba(255, 215, 0, ${opacity})`;
            ctx.beginPath();
            ctx.arc(rot.x, rot.y, 6.5, 0, 2 * Math.PI);
            ctx.fill();

            // Core white highlight
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(rot.x, rot.y, 2.5, 0, 2 * Math.PI);
            ctx.fill();

            // Active mini text label (Always visible for active node if in front)
            if (rot.z > 0) {
              ctx.fillStyle = '#FFD700';
              ctx.font = 'bold 13px sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText(`#${island.chronologicalOrder} ${island.name.toUpperCase()}`, rot.x, rot.y - 18);
            }

          } else if (isHovered) {
            // Glowing Cyan Hovered Node
            const pulseRadius = 10 + Math.sin(time * 10) * 3;
            ctx.strokeStyle = `rgba(57, 204, 204, ${0.75 * opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(rot.x, rot.y, pulseRadius, 0, 2 * Math.PI);
            ctx.stroke();

            ctx.fillStyle = `rgba(57, 204, 204, ${opacity})`;
            ctx.beginPath();
            ctx.arc(rot.x, rot.y, 6.5, 0, 2 * Math.PI);
            ctx.fill();

            // Label
            if (rot.z > 0) {
              ctx.fillStyle = '#39CCCC';
              ctx.font = 'bold 13px sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText(island.name, rot.x, rot.y - 16);
            }

          } else {
            // Standard Island Node
            ctx.fillStyle = `rgba(0, 31, 63, ${opacity})`;
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(rot.x, rot.y, 5, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();

            // Label for front-facing standard nodes (fainter text)
            if (rot.z > 55) {
              ctx.fillStyle = `rgba(245, 245, 220, ${0.5 * opacity})`;
              ctx.font = '11px sans-serif';
              ctx.textAlign = 'center';
              ctx.fillText(island.name, rot.x, rot.y + 14);
            }
          }
        }
      });

      projectedNodesRef.current = currentProjected;

      // 8. Update floating HTML tooltip position seamlessly inside canvas loop
      if (tooltipRef.current && hoveredIsland) {
        const hoveredProj = currentProjected.find(n => n.id === hoveredIsland.id);
        if (hoveredProj && hoveredProj.z > 0) {
          tooltipRef.current.style.display = 'block';
          // Anchor tooltip position relative to client canvas offsets
          tooltipRef.current.style.left = `${hoveredProj.x + (hoveredProj.x > width * 0.7 ? -270 : 20)}px`;
          tooltipRef.current.style.top = `${hoveredProj.y - 90}px`;
        } else {
          tooltipRef.current.style.display = 'none';
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [islands, activeIslandId, hoveredIsland]);

  // Handle Resize of Canvas element for High-DPI support
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse Interaction Helpers
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    isAutoCenteringRef.current = false;
    canvasRef.current?.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDraggingRef.current) {
      // Hover detection on front nodes
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      const hovered = projectedNodesRef.current
        .filter(node => node.z > 0)
        .find(node => {
          const dx = node.x - localX;
          const dy = node.y - localY;
          return Math.sqrt(dx * dx + dy * dy) < 14;
        });

      if (hovered) {
        setHoveredIsland(hovered.island);
      } else {
        setHoveredIsland(null);
      }
      return;
    }

    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;

    // Update yaw and pitch based on delta
    yawRef.current += dx * 0.007;
    pitchRef.current += dy * 0.007;

    // Store velocities for inertia deceleration
    velocityRef.current = {
      yaw: dx * 0.007,
      pitch: dy * 0.007
    };

    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    lastInteractionTimeRef.current = Date.now();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDraggingRef.current = false;
    canvasRef.current?.releasePointerCapture(e.pointerId);
    lastInteractionTimeRef.current = Date.now();
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // If we clicked on an island, select it!
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    const clickedNode = projectedNodesRef.current
      .filter(node => node.z > 0)
      .find(node => {
        const dx = node.x - localX;
        const dy = node.y - localY;
        return Math.sqrt(dx * dx + dy * dy) < 14;
      });

    if (clickedNode) {
      onIslandSelect(clickedNode.island.id);
    }
  };

  return (
    <div className="w-full flex flex-col bg-[#001F3F] border border-white/10 rounded-lg overflow-hidden shadow-2xl relative select-none">
      
      {/* Nautical Header bar (Glossy Upgrade) */}
      <div className="bg-[#001428]/80 backdrop-blur-md border-b-2 border-[#FFD700] px-6 py-4 flex flex-wrap justify-between items-center gap-4 relative z-10">
        
        {/* Title */}
        <div className="flex gap-3 items-center">
          <Globe className="h-6 w-6 text-[#FFD700] animate-[spin_12s_linear_infinite]" />
          <div>
            <h2 className="text-2xl font-black tracking-wide text-[#FFD700] uppercase text-glow-gold">
              Grand Line Interactive 3D Chart
            </h2>
            <p className="text-xs text-stone-400 font-sans tracking-wide uppercase mt-1">
              DRAG OR HIGHLIGHT ISLAND NODES TO CENTER VOYAGE PATHS
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-sm font-sans text-stone-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#39CCCC] animate-ping inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#39CCCC] inline-block -ml-4" />
            <span className="text-stone-400">Straw Hat Route</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full border border-[#FFD700]/50 flex items-center justify-center bg-[#FFD700]/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700]" />
            </span>
            <span className="text-stone-400">Island Node</span>
          </div>
          
          <div className="bg-[#0A1929]/70 border border-[#39CCCC]/45 rounded px-3 py-1.5 flex items-center gap-2 backdrop-blur-xs">
            <Compass className="h-4 w-4 text-[#39CCCC] animate-[spin_6s_linear_infinite]" />
            <span className="font-sans text-xs text-[#39CCCC] font-bold">LOG POSE STABLE</span>
          </div>
        </div>
      </div>

      {/* Main Globe Board Stage (Cursor grab handles drag rotation) */}
      <div className="relative w-full h-[550px] overflow-hidden select-none bg-[#020914] flex items-center justify-center">
        
        {/* Deep Ocean grid background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{
            backgroundImage: `
              linear-gradient(rgba(57,204,204,0.08) 1px, transparent 1px), 
              linear-gradient(90deg, rgba(57,204,204,0.08) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Compass Rose overlay in bottom-left */}
        <div className="absolute left-8 bottom-8 opacity-10 pointer-events-none rotate-12 scale-90">
          <div className="w-48 h-48 border border-dashed border-[#FFD700]/30 rounded-full flex items-center justify-center">
            <Compass className="w-28 h-28 text-[#FFD700]/40 animate-[spin_80s_linear_infinite]" />
          </div>
        </div>

        {/* Calm belt overlay in top-right */}
        <div className="absolute right-10 top-8 opacity-10 pointer-events-none scale-75">
          <div className="w-40 h-40 border border-dashed border-[#39CCCC]/30 rounded-full flex items-center justify-center">
            <Wind className="w-20 h-20 text-[#39CCCC]/40 animate-pulse" />
          </div>
        </div>

        {/* Interactive Globe Canvas */}
        <canvas 
          ref={canvasRef} 
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={handleCanvasClick}
          className="w-full h-full cursor-grab active:cursor-grabbing block z-10"
        />

        {/* DYNAMIC COMPREHENSIVE FLOATING LOG POSE COMPASS (Glossy design) */}
        <div className="absolute right-6 bottom-6 bg-[#001F3F]/80 border border-[#39CCCC]/30 rounded-lg p-4 w-60 shadow-2xl z-20 backdrop-blur-md glass-panel">
          <h4 className="font-sans text-xs uppercase font-bold tracking-wider text-[#39CCCC] border-b border-[#39CCCC]/20 pb-1.5 mb-2.5 flex items-center justify-between">
            <span>Log Pose Lock</span>
            <Compass className="h-4 w-4 text-[#39CCCC] animate-spin-slow" />
          </h4>
          
          <div className="flex gap-4 items-center">
            {/* Spinning compass needle graphic */}
            <div 
              className="w-14 h-14 rounded-full border border-[#39CCCC]/35 bg-[#0A1929] flex items-center justify-center relative overflow-hidden flex-shrink-0"
              style={{
                boxShadow: 'inset 0 1px 8px rgba(0,0,0,0.8)'
              }}
            >
              <div 
                className="w-full h-full flex items-center justify-center relative transition-transform duration-500 ease-out"
                style={{
                  transform: `rotate(${hoveredIsland ? getLogPoseAngle(hoveredIsland) : logPoseDegree}deg)`
                }}
              >
                {/* Glowing vertical needle pointer */}
                <div className="absolute w-0.5 h-12 bg-gradient-to-b from-[#39CCCC] via-[#FFD700] to-[#E60012] rounded-full" />
                <div className="w-2 h-2 rounded-full bg-white border border-stone-800 absolute z-10 shadow" />
              </div>
            </div>

            <div className="flex-1 min-w-0 font-sans text-xs uppercase text-stone-300">
              {hoveredIsland ? (
                <>
                  <p className="text-[#FFD700] font-black truncate text-glow-gold text-sm">{hoveredIsland.name}</p>
                  <p className="text-stone-500 mt-0.5 font-bold text-[10px]">LOCKED DIRECT</p>
                  <p className="text-[10px] text-[#39CCCC] mt-0.5 font-bold">AXIS: {getLogPoseAngle(hoveredIsland)}° NE</p>
                </>
              ) : (
                <>
                  <p className="text-stone-500 italic truncate text-[10px]">Sailing open seas</p>
                  <p className="text-stone-500 mt-0.5 font-bold text-[10px]">SPINNING LOG POSE</p>
                  <p className="text-[10px] text-[#E60012] mt-0.5 font-bold">SEARCHING SIGNAL...</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* DYNAMIC EXPANDING WANTED MINI-POSTER TOOLTIP (Positioned absolute, follow-mouse in loop) */}
        <div 
          ref={tooltipRef}
          className="absolute pointer-events-none z-30 flex flex-col bg-[#001F3F]/95 border border-[#FFD700]/50 p-4 rounded-lg shadow-[0_0_30px_rgba(57,204,204,0.4)] font-sans text-stone-300 w-80 backdrop-blur-md glass-panel"
          style={{
            display: 'none',
            backgroundImage: 'radial-gradient(circle at center, rgba(57,204,204,0.04) 0%, transparent 100%)',
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center text-[10px] tracking-wider text-[#FFD700] uppercase border-b border-white/10 pb-1.5 mb-2.5">
            <span>SECTOR: {hoveredIsland?.chronologicalOrder} OF 29</span>
            <span className="text-[#E60012] font-black">BOUNTY CLASH</span>
          </div>

          {hoveredIsland && (
            <div className="flex gap-3.5 min-w-0">
              {/* Villain miniature silhouette or wanted poster thumbnail */}
              <div className="w-20 h-28 bg-[#0A1929] border border-white/15 overflow-hidden flex-shrink-0 relative rounded">
                <img 
                  src={hoveredIsland.villainPoster} 
                  alt={hoveredIsland.villainName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-125 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-85" />
                <span className="absolute bottom-0 w-full text-center text-[9px] bg-[#E60012] text-white font-black uppercase py-0.5 tracking-wide font-sans truncate">
                  TARGET
                </span>
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  <h5 className="text-xs text-[#39CCCC] uppercase tracking-wide leading-none font-black">
                    {hoveredIsland.arcName}
                  </h5>
                  <h3 className="text-base font-black text-[#FFD700] uppercase tracking-wide mt-1.5 leading-tight text-glow-gold">
                    {hoveredIsland.name}
                  </h3>
                </div>

                <div className="text-xs text-[#F5F5DC]/90 leading-normal space-y-1.5">
                  <p className="line-clamp-3 italic font-sans text-stone-300">
                    &ldquo;{hoveredIsland.description}&rdquo;
                  </p>
                  <div className="flex gap-1.5 items-center font-sans text-[10px] uppercase mt-1.5">
                    <Skull className="h-3 w-3 text-[#E60012] flex-shrink-0" />
                    <span className="text-stone-400 font-bold">Threat:</span> 
                    <span className="text-[#FFD700] font-black truncate">{hoveredIsland.villainName}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instructions footer of tooltip */}
          <div className="mt-3.5 pt-2 border-t border-white/10 flex justify-between items-center text-[10px] tracking-wide text-[#39CCCC] uppercase font-bold">
            <span>⚓ Click to explore node...</span>
            <span className="text-[#39CCCC] font-black">SELECT &rarr;</span>
          </div>
        </div>
      </div>

      {/* Navigator Mobile Horizontal Scroll / Fallback Vertical Timeline Tracker (Glossy Upgrade) */}
      <div className="bg-[#001428]/95 p-5 border-t border-white/5 text-stone-300 text-sm text-center flex flex-col justify-center items-center backdrop-blur-md">
        <p className="text-stone-450 text-xs max-w-2xl text-center leading-relaxed font-sans mb-3 font-bold">
          💡 **Navigator Directive**: Click on any of the **29 sequential island nodes** plotted on the interactive globe. Selecting an island will auto-spin the globe to center on it!
        </p>
        
        {/* Rapid Horizontal index timeline slider to support easy jumps! */}
        <div className="w-full flex gap-2 bg-[#0A1929]/50 border border-white/10 p-2.5 rounded items-center overflow-x-auto scrollbar-thin select-none mt-1.5 backdrop-blur-xs">
          <span className="text-xs uppercase font-black text-[#FFD700] px-3.5 flex-shrink-0 font-sans text-glow-gold">Quick Jump Index &rarr;</span>
          {islands.map((i) => (
            <button
              key={`jump-${i.id}`}
              onClick={() => onIslandSelect(i.id)}
              className={`px-3 py-1.5 text-xs font-sans rounded select-none flex-shrink-0 uppercase font-extrabold transition-all cursor-pointer ${
                activeIslandId === i.id 
                  ? 'bg-[#FFD700] text-black font-black shadow-md glow-gold' 
                  : 'text-stone-300 hover:text-white hover:bg-[#001F3F]'
              }`}
            >
              #{i.chronologicalOrder} {i.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
