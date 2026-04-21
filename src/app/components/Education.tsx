"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { DNABackground } from "./DNABackground";

export const Education = () => {
  return (
    <section className="bg-[#121212] text-white py-24 px-8 md:px-24 relative z-20">
      <DNABackground color="160, 200, 255" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 border-b border-zinc-800 pb-8 text-center text-zinc-100">
            Education & Certifications
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
           <motion.div 
             whileHover={{ y: -5 }}
             className="border border-zinc-700 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-8 shadow-xl flex flex-col items-start hover:border-zinc-400 transition-colors"
           >
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-6 border border-zinc-600">
                  <GraduationCap className="text-white" />
              </div>
              <h4 className="text-xl text-zinc-300 font-mono font-bold mb-2">May 2024</h4>
              <p className="text-2xl font-bold tracking-tight text-white">MS in Business Analytics</p>
              <p className="text-zinc-300 font-semibold mt-2 text-lg">Lewis University</p>
           </motion.div>

           <motion.div 
             whileHover={{ y: -5 }}
             className="border border-zinc-700 bg-zinc-900/50 backdrop-blur-md rounded-3xl p-8 shadow-xl flex flex-col items-start hover:border-zinc-400 transition-colors"
           >
              <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mb-6 border border-zinc-600">
                  <Award className="text-yellow-400 w-6 h-6" />
              </div>
              <h4 className="text-xl text-zinc-300 font-mono font-bold mb-2">May 2025</h4>
              <p className="text-2xl font-bold tracking-tight text-white">AWS Certified Data Engineer – Associate</p>
              <p className="text-zinc-300 font-semibold mt-2 text-lg">Amazon Web Services</p>
           </motion.div>
        </div>
      </div>
    </section>
  );
};