"use client";
import React, { useRef, useEffect, useState } from 'react';

export const ChartBackground = ({ color = "168, 85, 247" }: { color?: string }) => {
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
    const bars = Array.from({ length: 50 }).map(() => ({ heightOffset: Math.random() * Math.PI * 2, speed: Math.random() * 0.015 + 0.005 }));
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 1;
      const barWidth = Math.max(20, canvas.width / 40);
      const spacing = barWidth * 1.8;
      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i];
        const x = i * spacing - ((time * 0.3) % spacing);
        if (x < -barWidth || x > canvas.width) continue;
        const hm = Math.sin(time * bar.speed + bar.heightOffset) * 0.5 + 0.5;
        const h = canvas.height * 0.15 + hm * (canvas.height * 0.4);
        const y = canvas.height - h;
        ctx.fillStyle = `rgba(${color}, 0.12)`; ctx.fillRect(x, y, barWidth, h);
        ctx.fillStyle = `rgba(${color}, 0.5)`; ctx.fillRect(x, y, barWidth, 3);
      }
      ctx.beginPath();
      for (let x = 0; x <= canvas.width + 20; x += 15) {
        const yBase = canvas.height * 0.45;
        const y = yBase + Math.sin(x * 0.003 - time * 0.01) * 120 + Math.cos(x * 0.008 + time * 0.015) * 60;
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = `rgba(${color}, 0.6)`; ctx.lineWidth = 2.5; ctx.stroke();
      for (let x = 0; x < canvas.width; x += 120) {
        const sx = (x + (time * 1.5)) % canvas.width;
        const yBase = canvas.height * 0.45;
        const y = yBase + Math.sin(sx * 0.003 - time * 0.01) * 120 + Math.cos(sx * 0.008 + time * 0.015) * 60;
        ctx.beginPath(); ctx.arc(sx, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 1)`; ctx.fill();
        ctx.beginPath(); ctx.arc(sx, y, 14, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, 0.25)`; ctx.fill();
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