"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ParticleBackground } from "./ParticleBackground";

const experiences = [
  {
    role: "BI & Data Analyst 2",
    company: "Arizona State University",
    location: "Tempe, AZ",
    date: "Jul 2025 – Present",
    tenure: "Current",
    tenureMonths: 10,
    color: "#FFC627",
    bullets: [
      "Built automated Alteryx + Python pipeline delivering branded enrollment PDF reports via Gmail OAuth",
      "Designed Tableau dashboards used daily by leadership across multiple departments",
      "Created Selenium bot for hands-free MFA portal access and Google Drive data upload",
      "Developed desktop GUI app enabling 1-click stakeholder email workflows",
    ],
    stack: ["Tableau", "Alteryx", "Python", "Selenium", "SQL"],
  },
  {
    role: "Data Analyst",
    company: "Motorola Mobility",
    location: "Chicago, IL",
    date: "Sep 2024 – Jul 2025",
    tenure: "10 mo",
    tenureMonths: 10,
    color: "#60a5fa",
    bullets: [
      "Delivered BI dashboards and reporting solutions for supply chain and operations teams",
      "Built SQL data models on AWS Redshift to power cross-functional analytics",
      "Reduced report generation time through optimised stored procedures and views",
    ],
    stack: ["SQL", "AWS Redshift", "Power BI", "Python"],
  },
  {
    role: "Data Analyst",
    company: "Zayo Group",
    location: "Paris, France",
    date: "Jun 2021 – Feb 2023",
    tenure: "1 yr 8 mo",
    tenureMonths: 20,
    color: "#34d399",
    bullets: [
      "Designed end-to-end BI solutions for telecom infrastructure reporting",
      "Built complex SQL queries across PostgreSQL powering enterprise analytics",
      "Automated Excel reporting with VBA macros, saving hours per cycle",
    ],
    stack: ["SQL", "PostgreSQL", "Tableau", "Excel VBA"],
  },
  {
    role: "Data Analyst",
    company: "ICICI Bank",
    location: "India",
    date: "Aug 2016 – Jun 2018",
    tenure: "1 yr 10 mo",
    tenureMonths: 22,
    color: "#f472b6",
    bullets: [
      "Built financial reporting dashboards and automated data pipelines for banking operations",
      "Designed SSIS ETL workflows to integrate data from multiple banking systems",
      "Delivered Excel and SQL-based analytics for risk and compliance reporting",
    ],
    stack: ["SQL", "SSIS", "Excel", "Tableau"],
  },
];

function TenureBar({ months, color }: { months: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const max = 24;
  const pct = Math.min((months / max) * 100, 100);

  return (
    <div ref={ref} className="flex items-center gap-2 mt-3">
      <span className="text-zinc-600 font-mono text-xs w-12 shrink-0">tenure</span>
      <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="font-mono text-xs shrink-0" style={{ color }}>{experiences.find(e => e.tenureMonths === months && e.color === color)?.tenure ?? ""}</span>
    </div>
  );
}

export const Experience = () => {
  return (
    <section className="bg-[#121212] text-white py-24 px-8 md:px-24 relative z-20">
      <ParticleBackground color="59, 130, 246" />
      <div className="max-w-5xl mx-auto relative z-10">

        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono tracking-[4px] text-zinc-500 uppercase">04 / Experience</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-16 leading-none">
          Where I've<br />
          <span style={{ color: "#FFC627" }}>delivered.</span>
        </h3>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-zinc-700 to-transparent" />

          <div className="space-y-10 pl-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-10 top-5 w-3 h-3 rounded-full border-2 border-[#121212]"
                  style={{ background: exp.color }}
                />

                <div className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-md rounded-2xl p-7 hover:border-zinc-600 transition-colors group">

                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-5">
                    <div>
                      <h4 className="text-xl font-bold text-white tracking-tight">{exp.role}</h4>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-zinc-200 font-semibold">{exp.company}</span>
                        <span className="text-zinc-600 text-sm">·</span>
                        <span className="text-zinc-500 text-sm">{exp.location}</span>
                      </div>
                    </div>
                    <span
                      className="text-xs font-mono px-3 py-1.5 rounded-full shrink-0 h-fit"
                      style={{
                        background: exp.color + "18",
                        color: exp.color,
                        border: `1px solid ${exp.color}40`,
                      }}
                    >
                      {exp.date}
                    </span>
                  </div>

                  {/* Bullets */}
                  <ul className="space-y-2 mb-5">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: exp.color }} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Stack pills */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {exp.stack.map((s) => (
                      <span key={s} className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-zinc-700 text-zinc-500">
                        {s}
                      </span>
                    ))}
                  </div>

                  {/* Tenure bar */}
                  <TenureBar months={exp.tenureMonths} color={exp.color} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};