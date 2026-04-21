"use client";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const FRAMES = [
  "frame_060","frame_061","frame_062","frame_063","frame_064",
  "frame_065","frame_066","frame_067","frame_068","frame_069","frame_070",
];
const FRAME_COUNT = FRAMES.length;

export const ScrollyCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isFirstLoaded, setIsFirstLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => { setIsMobile(window.innerWidth < 768); }, []);

  const getFramePath = (name: string) => `/sequence3/${name}_delay-0.066s.webp`;

  const renderFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
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

  useEffect(() => {
    if (isMobile !== false) return;
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = imgs;
    let cancelled = false;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = getFramePath(FRAMES[i]);
      imgs[i] = img;
      img.onload = () => {
        if (cancelled) return;
        if (i === 0) { setTimeout(() => renderFrame(0), 16); setIsFirstLoaded(true); }
      };
    }
    return () => { cancelled = true; };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile !== true) return;
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.addEventListener("canplay", () => { setIsFirstLoaded(true); video.pause(); }, { once: true });
  }, [isMobile]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (isMobile !== false) return;
    const index = Math.min(Math.floor(latest), FRAME_COUNT - 1);
    const img = imagesRef.current[index];
    if (img?.complete && img.naturalWidth > 0) { renderFrame(index); return; }
    for (let offset = 1; offset < 10; offset++) {
      const fallback = imagesRef.current[Math.max(0, index - offset)];
      if (fallback?.complete && fallback.naturalWidth > 0) { renderFrame(Math.max(0, index - offset)); break; }
    }
  });

  useEffect(() => {
    if (isMobile !== true) return;
    const unsub = scrollYProgress.on("change", (v) => {
      const video = videoRef.current;
      if (!video || !video.duration) return;
      video.currentTime = v * video.duration;
    });
    return () => unsub();
  }, [isMobile, scrollYProgress]);

  useEffect(() => {
    if (isMobile !== false) return;
    const handleResize = () => renderFrame(Math.min(Math.floor(frameIndex.get()), FRAME_COUNT - 1));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [frameIndex, isMobile]);

  if (isMobile === null) return (
    <div ref={containerRef} className="h-[300vh] bg-[#121212] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#121212]">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className="h-[300vh] bg-[#121212] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {isMobile === false && <canvas ref={canvasRef} className="w-full h-full block" />}
        {isMobile === true && <video ref={videoRef} src="/animation.mp4" className="w-full h-full object-cover" playsInline muted preload="auto" />}
        {!isFirstLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#121212]">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
};
