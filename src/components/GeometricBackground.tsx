"use client";
import React, { useRef, useEffect, useState } from 'react';

export const GeometricBackground = () => {
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
    const resize = () => {
      if (!canvas.parentElement) return;
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    const colors = ['0, 200, 255', '255, 160, 50', '100, 180, 255', '255, 200, 80'];
    const shapes = Array.from({ length: 18 }).map(() => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      size: Math.random() * 60 + 30,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.008,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
      sides: Math.random() > 0.5 ? 6 : 4,
      depth: Math.random() * 0.5 + 0.5,
    }));
    const drawShape = (shape: typeof shapes[0]) => {
      const { x, y, size, rotation, color, sides, depth } = shape;
      ctx.save();
      ctx.translate(x, y); ctx.rotate(rotation);
      ctx.shadowColor = `rgba(${color}, 0.8)`; ctx.shadowBlur = 20;
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = (Math.PI * 2 / sides) * i - Math.PI / 2;
        const px = Math.cos(angle) * size, py = Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${color}, ${0.6 * depth})`; ctx.lineWidth = 1.5; ctx.stroke();
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.4);
      gradient.addColorStop(0, `rgba(${color}, 0.15)`);
      gradient.addColorStop(1, `rgba(${color}, 0)`);
      ctx.beginPath(); ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = gradient; ctx.fill();
      ctx.restore();
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const shape of shapes) {
        shape.rotation += shape.rotationSpeed;
        shape.x += shape.vx; shape.y += shape.vy;
        if (shape.x < -100) shape.x = canvas.width + 100;
        if (shape.x > canvas.width + 100) shape.x = -100;
        if (shape.y < -100) shape.y = canvas.height + 100;
        if (shape.y > canvas.height + 100) shape.y = -100;
        drawShape(shape);
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 50% 50%, rgba(0, 200, 255, 0.12) 0%, rgba(255, 160, 50, 0.08) 50%, transparent 70%)`,
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