"use client";
import React, { useRef, useEffect, useState } from 'react';

export const HexagonBackground = ({ color = "251, 191, 36" }: { color?: string }) => {
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
    const drawHex = (x: number, y: number, r: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const px = x + r * Math.cos(angle), py = y + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;
      const r = 45, w = Math.sqrt(3) * r, h = 1.5 * r;
      const cols = Math.ceil(canvas.width / w) + 3;
      const rows = Math.ceil(canvas.height / h) + 3;
      const offsetX = (time * 15) % w, offsetY = (time * 15) % (h * 2);
      for (let row = -2; row < rows; row++) {
        for (let col = -2; col < cols; col++) {
          const x = col * w + (row % 2 === 0 ? 0 : w / 2) - offsetX;
          const y = row * h - offsetY;
          const noise = Math.sin(row * 10 + col * 10 + time * 1.5) * 0.5 + 0.5;
          const distToCenter = Math.hypot(x - canvas.width / 2, y - canvas.height / 2);
          const radialFade = Math.max(0, 1 - distToCenter / (canvas.width * 0.7));
          if (noise > 0.2) {
            drawHex(x, y, r * 0.85);
            ctx.strokeStyle = `rgba(${color}, ${noise * 0.6 * radialFade})`;
            ctx.lineWidth = 1.5; ctx.stroke();
            if (noise > 0.7) {
              drawHex(x, y, r * 0.85);
              ctx.fillStyle = `rgba(${color}, ${noise * 0.08 * radialFade})`; ctx.fill();
            }
          }
        }
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