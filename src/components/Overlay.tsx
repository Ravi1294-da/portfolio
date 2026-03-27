"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Overlay = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [1, 1, 0, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.5, 0.6], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.8, 0.9], [0, 1, 1, 0]);

  const y1 = useTransform(scrollYProgress, [0, 0.1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.5], [100, -100]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.8], [100, -100]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none h-full w-full">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center text-white p-8 overflow-hidden">
        
        <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute text-center flex flex-col items-center justify-center w-full">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4">My Name</h1>
            <p className="text-xl md:text-3xl text-zinc-400 font-medium">Creative Developer.</p>
            <div className="mt-8 px-6 py-3 bg-gradient-to-r from-yellow-300 to-yellow-500 text-black font-bold rounded-full text-lg pointer-events-auto cursor-pointer flex items-center shadow-lg hover:scale-105 transition-transform hidden">
              Nano Banana Component
            </div>
        </motion.div>

        <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute flex flex-col justify-center px-12 md:px-24 w-full h-full max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter max-w-3xl drop-shadow-lg">I build dynamic digital experiences.</h2>
        </motion.div>

        <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute flex flex-col items-end justify-center px-12 md:px-24 w-full h-full max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter max-w-3xl text-right drop-shadow-lg">Bridging design and engineering.</h2>
        </motion.div>

      </div>
    </div>
  );
};
