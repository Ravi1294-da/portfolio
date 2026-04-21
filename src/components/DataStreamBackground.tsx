"use client";
import React, { useRef, useEffect, useState } from 'react';

export const DataStreamBackground = ({ color = "248, 113, 113" }: { color?: string }) => {
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
    const fontSize = 18;
    let columns: { x: number; y: number; speed: number }[] = [];
    const initColumns = () => {
      const numCols = Math.floor(canvas.width / fontSize);
      columns = [];
      for (let i = 0; i < numCols; i++) {
        columns.push({ x: i * fontSize, y: Math.random() * canvas.height * 2 - canvas.height, speed: Math.random() * 2 + 1.5 });
      }
    };
    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      initColumns();
    };
    window.addEventListener('resize', resize);
    resize();
    let lastTime = 0;
    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);
      if (currentTime - lastTime < 1000 / 30) return;
      lastTime = currentTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `bold ${fontSize}px monospace`;
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i];
        const tailLength = 30;
        for (let j = 0; j < tailLength; j++) {
          const ry = col.y - j * fontSize;
          if (ry < 0 || ry > canvas.height + fontSize) continue;
          const alpha = 1 - (j / tailLength);
          ctx.fillStyle = j === 0 ? `rgba(255, 255, 255, 1)` : `rgba(${color}, ${alpha * 0.9})`;
          ctx.fillText(Math.random() > 0.5 ? '1' : '0', col.x, ry);
        }
        col.y += col.speed;
        if (col.y > canvas.height + tailLength * fontSize && Math.random() > 0.98) {
          col.y = -fontSize; col.speed = Math.random() * 2 + 1.5;
        }
      }
    };
    animationFrameId = requestAnimationFrame(draw);
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