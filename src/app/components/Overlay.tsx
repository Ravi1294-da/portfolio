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
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 text-white drop-shadow-2xl">
              Ravi Teja
            </h1>
            <p className="text-xl md:text-3xl font-bold"
               style={{ color: '#FFC627' }}>
              Business Intelligence & Data Analyst
            </p>
        </motion.div>

        <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute flex flex-col justify-center px-12 md:px-24 w-full h-full max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-3xl drop-shadow-lg leading-snug text-white">
              5 years. 4 industries. <br/>
              Countless dashboards, pipelines, and automations.<br/>
              <span className="mt-2 block" style={{ color: '#FFC627' }}>Zero manual reports still standing.</span>
            </h2>
        </motion.div>

        <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute flex flex-col items-end justify-center px-12 md:px-24 w-full h-full max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter max-w-3xl text-right drop-shadow-lg text-white">
              Translating raw data <br/>
              <span style={{ color: '#FFC627' }}>into decisions.</span>
            </h2>
        </motion.div>

      </div>
    </div>
  );
};