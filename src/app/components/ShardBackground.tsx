"use client";
import React, { useRef, useEffect, useState } from 'react';

export const ShardBackground = () => {
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
    const colors = ['180, 0, 255', '220, 50, 255', '100, 200, 255', '255, 255, 255'];
    const createShard = () => {
      const size = Math.random() * 80 + 20;
      const w = canvas.width || 800;
      const h = canvas.height || 600;
      return {
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        points: Array.from({ length: Math.floor(Math.random() * 3) + 3 }).map(() => ({ x: (Math.random() - 0.5) * size, y: (Math.random() - 0.5) * size })),
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.1,
        alphaSpeed: (Math.random() - 0.5) * 0.005,
      };
    };
    const shards = Array.from({ length: 25 }).map(() => createShard());
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const shard of shards) {
        shard.x += shard.vx; shard.y += shard.vy;
        shard.alpha += shard.alphaSpeed;
        if (shard.alpha < 0.05) shard.alphaSpeed = Math.abs(shard.alphaSpeed);
        if (shard.alpha > 0.6) shard.alphaSpeed = -Math.abs(shard.alphaSpeed);
        if (shard.x < -150) shard.x = canvas.width + 150;
        if (shard.x > canvas.width + 150) shard.x = -150;
        if (shard.y < -150) shard.y = canvas.height + 150;
        if (shard.y > canvas.height + 150) shard.y = -150;
        ctx.save();
        ctx.translate(shard.x, shard.y);
        ctx.shadowColor = `rgba(${shard.color}, 0.9)`; ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(shard.points[0].x, shard.points[0].y);
        for (let i = 1; i < shard.points.length; i++) ctx.lineTo(shard.points[i].x, shard.points[i].y);
        ctx.closePath();
        ctx.fillStyle = `rgba(${shard.color}, ${shard.alpha * 0.15})`; ctx.fill();
        ctx.strokeStyle = `rgba(${shard.color}, ${shard.alpha * 0.9})`; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.restore();
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animationFrameId); };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none" style={{
        background: `radial-gradient(ellipse at 50% 50%, rgba(180, 0, 255, 0.12) 0%, rgba(100, 200, 255, 0.08) 50%, transparent 70%)`,
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