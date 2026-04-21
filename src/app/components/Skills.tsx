"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShardBackground } from "./ShardBackground";

const categories = [
  {
    label: "Visualization & BI",
    color: "#FFC627",
    skills: [
      { name: "Tableau", level: 97 },
      { name: "Power BI", level: 82 },
      { name: "Tableau REST API", level: 78 },
    ],
  },
  {
    label: "Data Engineering",
    color: "#60a5fa",
    skills: [
      { name: "SQL / PostgreSQL", level: 94 },
      { name: "AWS Redshift", level: 85 },
      { name: "Snowflake", level: 78 },
      { name: "Azure Synapse", level: 72 },
      { name: "Amazon Athena", level: 74 },
      { name: "SSIS", level: 70 },
      { name: "DBT", level: 68 },
    ],
  },
  {
    label: "Automation & Scripting",
    color: "#34d399",
    skills: [
      { name: "Python", level: 90 },
      { name: "Alteryx", level: 88 },
      { name: "Selenium", level: 84 },
      { name: "Excel VBA / Macros", level: 88 },
      { name: "Google Apps Script", level: 72 },
      { name: "Gmail OAuth", level: 75 },
    ],
  },
  {
    label: "Cloud & DevOps",
    color: "#f472b6",
    skills: [
      { name: "AWS (Certified)", level: 82 },
      { name: "Git", level: 80 },
    ],
  },
];

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-zinc-300 text-sm font-medium">{name}</span>
        <span className="text-zinc-500 font-mono text-xs">{level}%</span>
      </div>
      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

export const Skills = () => {
  return (
    <section className="bg-[#121212] text-white py-24 px-8 md:px-24 relative z-20">
      <ShardBackground />
      <div className="max-w-7xl mx-auto relative z-10">

        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono tracking-[4px] text-zinc-500 uppercase">03 / Skills</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-16 text-right">
          Technical<br />
          <span style={{ color: "#FFC627" }}>Arsenal</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
              className="border border-zinc-800 bg-zinc-900/40 backdrop-blur-md rounded-2xl p-7"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: cat.color }} />
                <span className="font-mono text-xs tracking-widest uppercase" style={{ color: cat.color }}>
                  {cat.label}
                </span>
              </div>

              {cat.skills.map((skill, si) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  color={cat.color}
                  delay={si * 0.07}
                />
              ))}
            </motion.div>
          ))}
        </div>

        {/* Certifications strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 border border-yellow-400/20 bg-yellow-400/5 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-yellow-400/40 flex items-center justify-center text-yellow-400 font-black text-lg">
              ★
            </div>
            <div>
              <p className="text-white font-bold text-lg">AWS Certified Data Engineer – Associate</p>
              <p className="text-zinc-500 font-mono text-xs">Amazon Web Services · May 2025</p>
            </div>
          </div>
          <span className="px-4 py-1.5 border border-yellow-400/40 text-yellow-400 font-mono text-xs rounded-full">
            VERIFIED CERT
          </span>
        </motion.div>
      </div>
    </section>
  );
};