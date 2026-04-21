"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export const ScrollyCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const FRAME_COUNT = 120;

  // Detect mobile ONCE on mount
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const getFramePath = (i: number) => {
    const idx = i.toString().padStart(3, '0');
    return `/sequence/frame_${idx}_delay-0.066s.webp`;
  };

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio = Math.max(hRatio, vRatio);
    const cx = (canvas.width - img.width * ratio) / 2;
    const cy = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, cx, cy, img.width * ratio, img.height * ratio);
  };

  // LAPTOP ONLY: load image sequence
  useEffect(() => {
    if (isMobile !== false) return;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = imgs;
    let cancelled = false;
    const first = new Image();
    first.src = getFramePath(0);
    first.onload = () => {
      if (cancelled) return;
      imgs[0] = first;
      setIsFirstLoaded(true);
      setTimeout(() => renderFrame(0), 30);
    };
    imgs[0] = first;
    for (let i = 1; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      imgs[i] = img;
    }
    return () => { cancelled = true; };
  }, [isMobile]);

  // MOBILE ONLY: prepare video
  useEffect(() => {
    if (isMobile !== true) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.addEventListener('canplay', () => {
      setIsFirstLoaded(true);
      video.pause();
    }, { once: true });
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  // LAPTOP ONLY: scrub image frames on scroll
  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isMobile !== false) return;
    const index = Math.min(Math.floor(latest), FRAME_COUNT - 1);
    const img = imagesRef.current[index];
    if (img?.complete && img.naturalWidth > 0) {
      renderFrame(index);
    }
  });

  // MOBILE ONLY: scrub video on scroll
  useEffect(() => {
    if (isMobile !== true) return;
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      video.currentTime = v * video.duration;
    });
    return () => unsubscribe();
  }, [isMobile, scrollYProgress]);

  // LAPTOP ONLY: handle resize
  useEffect(() => {
    if (isMobile !== false) return;
    const handleResize = () => {
      const index = Math.min(Math.floor(frameIndex.get()), FRAME_COUNT - 1);
      renderFrame(index);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [frameIndex, isMobile]);

  // Don't render until we know if mobile or not
  if (isMobile === null) {
    return (
      <div ref={containerRef} className="h-[500vh] bg-[#121212] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#121212]">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="h-[500vh] bg-[#121212] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* LAPTOP: canvas with image sequence */}
        {isMobile === false && (
          <canvas ref={canvasRef} className="w-full h-full block" />
        )}

        {/* MOBILE: video scrubbing */}
        {isMobile === true && (
          <video
            ref={videoRef}
            src="/animation.mp4"
            className="w-full h-full object-cover"
            playsInline
            muted
            preload="auto"
          />
        )}

        {!isFirstLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#121212]">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};