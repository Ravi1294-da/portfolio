"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  { id: 1, title: "Nano Banana", category: "E-Commerce", year: "2024" },
  { id: 2, title: "Aetherial", category: "Web3", year: "2023" },
  { id: 3, title: "Quantum Frame", category: "Motion", year: "2023" },
];

export const Projects = () => {
  return (
    <section className="min-h-screen bg-[#121212] text-white py-24 px-8 md:px-24 relative z-20">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-16 border-b border-zinc-800 pb-8">
            Selected Work
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div 
              key={project.id}
              whileHover={{ y: -10 }}
              className="group relative h-[450px] border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl rounded-3xl p-8 flex flex-col justify-between overflow-hidden cursor-pointer hover:border-zinc-500 transition-colors shadow-2xl"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out" />
               <div className="flex justify-between items-start z-10 relative">
                 <p className="text-zinc-400 font-mono text-sm uppercase tracking-wider">{project.category}</p>
                 <div className="w-10 h-10 rounded-full border border-zinc-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                     <ArrowUpRight className="w-5 h-5" />
                 </div>
               </div>
               <div className="z-10 relative">
                  <h4 className="text-4xl font-bold mb-3 tracking-tight">{project.title}</h4>
                  <p className="text-zinc-500 font-mono text-sm border border-zinc-800 w-fit px-3 py-1 rounded-full bg-zinc-900/80">{project.year}</p>
               </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
