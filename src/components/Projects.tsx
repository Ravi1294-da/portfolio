"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChartBackground } from "./ChartBackground";

const projects = [
  {
    id: 1,
    title: "Executive Reporting Dashboard",
    tags: ["Alteryx", "Python", "Tableau", "Gmail OAuth"],
    company: "ASU",
    companyColor: "#FFC627",
    impact: "100% automated",
    impactSub: "Zero manual reports",
    metric: 100,
    description:
      "Fully automated Alteryx + Python pipeline pulls live enrollment data, generates branded 3-page PDFs comparing CISA vs all ASU veteran students, downloads the Tableau dashboard, and emails everything to stakeholders via Gmail OAuth with zero human intervention.",
    filter: "Python",
  },
  {
    id: 2,
    title: "Automated Stakeholder Comms",
    tags: ["Python", "Excel", "Outlook", "GUI"],
    company: "ASU",
    companyColor: "#FFC627",
    impact: "1-click deploy",
    impactSub: "For non-technical staff",
    metric: 85,
    description:
      "Desktop GUI app lets non-technical staff select an Excel file and trigger a full workflow with one click, sending personalised pay emails to every faculty member and colour-coded Excel summary reports to each supervisor via Outlook.",
    filter: "Python",
  },
  {
    id: 3,
    title: "Web Scraping & Automation Bot",
    tags: ["Python", "Selenium", "Google Drive", "MFA"],
    company: "Pipeline",
    companyColor: "#60a5fa",
    impact: "Hands-free",
    impactSub: "Runs on schedule",
    metric: 90,
    description:
      "Selenium bot auto-logs into ASU's analytics portal, handles MFA, navigates filters, downloads the Master List, cleans & transforms data, and uploads directly to Google Drive, fully unattended.",
    filter: "Python",
  },
  {
    id: 4,
    title: "Advanced Tableau Dashboard Suite",
    tags: ["Tableau", "Calculated Fields", "Parameters"],
    company: "Tableau",
    companyColor: "#e879f9",
    impact: "Daily use",
    impactSub: "By leadership & teams",
    metric: 97,
    description:
      "Suite of high-impact Tableau dashboards with advanced calculated fields, dynamic parameters, and custom chart types far beyond standard bar charts. Replaced manual Excel reports with real-time interactive dashboards used daily across the organization.",
    filter: "Tableau",
  },
  {
    id: 5,
    title: "Complex SQL Query Engineering",
    tags: ["SQL", "PostgreSQL", "AWS Redshift"],
    company: "SQL",
    companyColor: "#34d399",
    impact: "Enterprise scale",
    impactSub: "Backbone of BI stack",
    metric: 94,
    description:
      "Designed and optimised complex queries across PostgreSQL and AWS Redshift. Built data models, tuned query performance, and created reusable views and stored procedures that became the backbone of enterprise BI reporting.",
    filter: "SQL",
  },
  {
    id: 6,
    title: "Excel Data Cleaning & Automation",
    tags: ["Excel", "VBA", "Power Query", "PivotTables"],
    company: "Excel",
    companyColor: "#fb923c",
    impact: "Hours saved",
    impactSub: "Per reporting cycle",
    metric: 88,
    description:
      "Transformed messy raw datasets into clean, analysis-ready data using Power Query, VBA Macros, and PivotTables. Built reusable cleaning templates that standardised data processes across teams.",
    filter: "Excel",
  },
];

const FILTERS = ["All", "Python", "Tableau", "SQL", "Excel"];

export const Projects = () => {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.filter === active);

  return (
    <section className="bg-[#121212] text-white py-24 px-8 md:px-24 relative z-20">
      <ChartBackground color="168, 85, 247" />
      <div className="max-w-7xl mx-auto relative z-10">

        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono tracking-[4px] text-zinc-500 uppercase">02 / Work</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
            Selected<br />
            <span style={{ color: "#FFC627" }}>Work</span>
          </h3>
          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-4 py-1.5 rounded-full text-sm font-mono border transition-all ${active === f
                  ? "bg-white text-black border-white"
                  : "border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -6 }}
                className="group relative border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-7 flex flex-col gap-5 hover:border-zinc-600 transition-colors overflow-hidden"
              >
                {/* Top: company badge + tags */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-zinc-700 text-zinc-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span
                    className="text-xs font-mono font-bold px-3 py-1 rounded-full shrink-0"
                    style={{
                      background: project.companyColor + "18",
                      color: project.companyColor,
                      border: `1px solid ${project.companyColor}40`,
                    }}
                  >
                    {project.company}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold tracking-tight text-white leading-snug">
                  {project.title}
                </h4>

                {/* Description */}
                <p className="text-zinc-400 text-sm leading-relaxed flex-1">
                  {project.description}
                </p>

                {/* Impact metric bar */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <div>
                      <span className="text-white font-bold text-sm">{project.impact}</span>
                      <span className="text-zinc-500 text-xs ml-2">{project.impactSub}</span>
                    </div>
                    <span className="font-mono text-xs" style={{ color: project.companyColor }}>
                      {project.metric}%
                    </span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${project.metric}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: project.companyColor }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};