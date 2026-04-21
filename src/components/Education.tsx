"use client";
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { DNABackground } from "./DNABackground";

export const Education = () => {
  return (
    <section className="bg-[#121212] text-white py-24 px-8 md:px-24 relative z-20">
      <DNABackground color="160, 200, 255" />
      <div className="max-w-4xl mx-auto text-center relative z-10">

        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono tracking-[4px] text-zinc-500 uppercase">05 / Education</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-16 text-center">
          Education
        </h3>

        <motion.div
          whileHover={{ y: -5 }}
          className="border border-zinc-700 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-10 shadow-xl flex flex-col items-start hover:border-zinc-400 transition-colors text-left"
        >
          <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-6 border border-zinc-600">
            <GraduationCap className="text-white" />
          </div>
          <h4 className="text-xl text-zinc-300 font-mono font-bold mb-2">May 2024</h4>
          <p className="text-3xl font-bold tracking-tight text-white mb-2">MS in Business Analytics</p>
          <p className="text-zinc-300 font-semibold text-lg mb-4">Lewis University, Romeoville, IL</p>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Coursework: Business Analytics, Data Analytics, Probability and Statistics, Database Systems,
            Web Data Management, Data Science Project Management, Analytical Thinking.
          </p>
          <p className="text-zinc-500 text-sm mt-2">
            Key Projects: Developed Tableau dashboards with real-time data pipelines and implemented automation to optimize reporting.
          </p>
        </motion.div>

      </div>
    </section>
  );
};