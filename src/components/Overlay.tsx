"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Overlay = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.28, 0.36], [1, 1, 0, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.28, 0.36, 0.68, 0.76], [0, 1, 1, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.68, 0.76, 0.92, 1.0], [0, 1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.28], [0, -80]);
  const y2 = useTransform(scrollYProgress, [0.28, 0.68], [60, -60]);
  const y3 = useTransform(scrollYProgress, [0.68, 0.92], [60, -40]);
  const shadow = "2px 2px 8px rgba(0,0,0,1), 0 0 30px rgba(0,0,0,1), 0 0 60px rgba(0,0,0,0.8)";

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 pointer-events-none h-full w-full">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">

        <motion.div style={{ opacity: opacity1, y: y1 }} className="absolute text-center flex flex-col items-center justify-center w-full px-8">
          <h1 style={{ color: "#FFFFFF", fontSize: "clamp(48px, 10vw, 96px)", fontWeight: 900, letterSpacing: "-2px", textShadow: shadow, margin: 0, lineHeight: 1.1 }}>
            Ravi Teja
          </h1>
          <p style={{ color: "#FFC627", fontSize: "clamp(16px, 2.5vw, 28px)", fontWeight: 700, textShadow: shadow, margin: "16px 0 0 0" }}>
            Business Intelligence &amp; Data Analyst
          </p>
        </motion.div>

        <motion.div style={{ opacity: opacity2, y: y2 }} className="absolute flex flex-col justify-center px-12 md:px-24 w-full h-full max-w-7xl mx-auto">
          <h2 style={{ color: "#FFFFFF", fontSize: "clamp(24px, 4vw, 52px)", fontWeight: 900, textShadow: shadow, lineHeight: 1.3, maxWidth: "700px", margin: 0 }}>
            5 years. 4 industries.<br />
            Countless dashboards, pipelines, and automations.<br />
            <span style={{ color: "#FFC627", textShadow: shadow }}>Zero manual reports still standing.</span>
          </h2>
        </motion.div>

        <motion.div style={{ opacity: opacity3, y: y3 }} className="absolute flex flex-col items-end justify-center px-12 md:px-24 w-full h-full max-w-7xl mx-auto">
          <h2 style={{ color: "#FFFFFF", fontSize: "clamp(28px, 5vw, 72px)", fontWeight: 900, textShadow: shadow, lineHeight: 1.2, maxWidth: "650px", textAlign: "right", margin: 0 }}>
            Translating raw data<br />
            <span style={{ color: "#FFC627", textShadow: shadow }}>into decisions.</span>
          </h2>
        </motion.div>

      </div>
    </div>
  );
};