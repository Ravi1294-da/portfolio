"use client";
import React, { useRef, useEffect, useState } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number; radius: number;
}

export const ParticleBackground = ({ color }: { color: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: Particle[] = [];
    let animationFrameId: number;
    const resize = () => {
      if (!containerRef.current) return;
      canvas.width = containerRef.current.offsetWidth;
      canvas.height = containerRef.current.offsetHeight;
      particles = [];
      const num = Math.floor((canvas.width * canvas.height) / 6000);
      for (let i = 0; i < num; i++) {
        particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.8, vy: (Math.random() - 0.5) * 0.8, radius: Math.random() * 3 + 1.5 });
      }
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const maxDist = 180;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 1)`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x, dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${color}, ${0.6 * (1 - dist / maxDist)})`;
            ctx.lineWidth = 1.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    window.addEventListener('resize', resize);
    resize();
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
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};