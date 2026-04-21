"use client";
import React, { useRef, useEffect, useState } from 'react';

export const DNABackground = ({ color = "160, 200, 255" }: { color?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationFrameId: number;
    let time = 0;
    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.015;
      const centerY = canvas.height / 2, amplitude = 90, spacing = 35;
      const numNodes = Math.ceil(canvas.width / spacing) + 5;
      const offsetX = (time * 25) % spacing;
      for (let i = -2; i < numNodes; i++) {
        const x = i * spacing - offsetX;
        const angle = i * 0.25 + time;
        const y1 = centerY + Math.sin(angle) * amplitude;
        const y2 = centerY + Math.sin(angle + Math.PI) * amplitude;
        const z1 = Math.cos(angle), z2 = Math.cos(angle + Math.PI);
        ctx.beginPath(); ctx.moveTo(x, y1); ctx.lineTo(x, y2);
        ctx.strokeStyle = `rgba(${color}, 0.3)`; ctx.lineWidth = 1.5; ctx.stroke();
        const drawNode = (px: number, py: number, z: number) => {
          const size = 4 + z * 2, alpha = 0.6 + ((z + 1) / 2) * 0.4;
          ctx.beginPath(); ctx.arc(px, py, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${alpha})`; ctx.fill();
          ctx.beginPath(); ctx.arc(px, py, size + 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, 0.1)`; ctx.fill();
        };
        if (z1 < z2) { drawNode(x, y1, z1); drawNode(x, y2, z2); }
        else { drawNode(x, y2, z2); drawNode(x, y1, z1); }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, [color, isMobile]);

  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 50% 50%, rgba(${color}, 0.15) 0%, transparent 70%)`,
        animation: 'mobilePulse 4s ease-in-out infinite',
      }}>
        <style>{`@keyframes mobilePulse { 0%,100%{opacity:0.6} 50%{opacity:1} }`}</style>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};