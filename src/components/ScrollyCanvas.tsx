"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export const ScrollyCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const FRAME_COUNT = 120; // 0 to 119

  useEffect(() => {
    // Preload images
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    let isCancelled = false;
    
    for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        const frameIndex = i.toString().padStart(3, '0');
        img.src = `/sequence/frame_${frameIndex}_delay-0.066s.png`;
        img.onload = () => {
            if (isCancelled) return;
            loadedCount++;
            if (loadedCount === FRAME_COUNT) {
                 setImages(loadedImages);
                 renderFrame(0, loadedImages); // Initial render
            }
        };
        loadedImages.push(img);
    }
    
    return () => {
        isCancelled = true;
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useMotionValueEvent(frameIndex, "change", (latest) => {
    if (images.length === FRAME_COUNT) {
       renderFrame(Math.floor(latest), images);
    }
  });

  const renderFrame = (index: number, imgArray: HTMLImageElement[]) => {
     if (!canvasRef.current) return;
     const ctx = canvasRef.current.getContext('2d');
     if (!ctx) return;
     
     const img = imgArray[index];
     if (!img) return;
     
     // Object fit cover logic
     const canvas = canvasRef.current;
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;

     const hRatio = canvas.width / img.width;
     const vRatio = canvas.height / img.height;
     const ratio  = Math.max(hRatio, vRatio);
     const centerShift_x = (canvas.width - img.width * ratio) / 2;
     const centerShift_y = (canvas.height - img.height * ratio) / 2;  

     ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.drawImage(img, 0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
  };

  useEffect(() => {
    const handleResize = () => {
       if (images.length === FRAME_COUNT) {
         renderFrame(Math.floor(frameIndex.get()), images);
       }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="h-[500vh] bg-[#121212] relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
         <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
};
