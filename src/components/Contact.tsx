"use client";

import { motion } from "framer-motion";
import { Mail, Phone, ExternalLink, ArrowUpRight } from "lucide-react";
import { DataStreamBackground } from "./DataStreamBackground";

export const Contact = () => {
   return (
      <footer className="bg-black text-white py-24 px-8 md:px-24 border-t border-zinc-900 relative z-20">
         <DataStreamBackground color="248, 113, 113" />
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end relative z-10">
            <div className="mb-12 md:mb-0 max-w-lg">
               <h3 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">Let's Talk.</h3>
               <p className="text-xl text-zinc-300 font-medium">
                  I&apos;m always open to discussing data pipelines, BI architecture, or opportunities to automate workflows.
               </p>
            </div>

            <div className="flex flex-col space-y-6 md:items-end text-lg font-mono">
               <a href="mailto:vraviteja433@gmail.com" className="group flex items-center space-x-3 text-white hover:text-red-400 transition-colors font-bold">
                  <Mail className="w-6 h-6" />
                  <span>vraviteja433@gmail.com</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
               </a>
               <a href="tel:815-763-2390" className="group flex items-center space-x-3 text-white hover:text-red-400 transition-colors font-bold">
                  <Phone className="w-6 h-6" />
                  <span>815-763-2390</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
               </a>
               <a href="https://linkedin.com/in/ravi-teja-linkdin/" target="_blank" rel="noopener noreferrer" className="group flex items-center space-x-3 text-white hover:text-red-400 transition-colors font-bold">
                  <ExternalLink className="w-6 h-6" />
                  <span>linkedin.com/in/ravi-teja-linkdin/</span>
                  <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
               </a>
            </div>
         </div>
      </footer>
   );
};
