"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ParticleBackground } from "./ParticleBackground";

const experiences = [
  {
    role: "Business Intelligence and Data Analyst 2",
    company: "Arizona State University",
    location: "Mesa, AZ, United States",
    date: "July 2025 to Present",
    color: "#FFC627",
    tech: ["AWS Redshift", "SQL", "Tableau", "Alteryx", "Python", "Power Automate", "REST API", "SharePoint"],
    bullets: [
      "Built end-to-end automated reporting pipelines integrating Tableau Server REST API to programmatically export dashboard PDFs, delivered automatically via Gmail OAuth 2.0 to cross-functional stakeholders with zero manual effort.",
      "Designed and developed automated weekly enrollment reporting pipelines using Alteryx and Python, generating interactive HTML dashboards with KPI cards, Plotly visualizations, and filterable enrollment tables.",
      "Built and maintained Alteryx ETL pipelines automating data preparation for recurring reports, cutting manual effort by around 40% and keeping data consistent and reliable across departments.",
      "Used SQL including CTEs and window functions in PostgreSQL and AWS Redshift to pull, clean, and validate data for KPI dashboards, recurring reports, and ad-hoc analytical needs.",
      "Designed and maintained self-service Tableau dashboards for senior leadership to track KPIs, trends, and project progress, collaborating cross-functionally with business and IT teams to gather requirements and resolve data quality issues.",
    ],
  },
  {
    role: "Data Analyst",
    company: "Motorola Mobility",
    location: "Frisco, TX, United States",
    date: "September 2024 to July 2025",
    color: "#60a5fa",
    tech: ["Power BI", "SQL Server", "PostgreSQL", "Python", "Power Query", "Power Automate", "AWS Redshift", "Snowflake", "Alteryx", "Excel VBA"],
    bullets: [
      "Designed, developed, and optimized Power BI dashboards for real-time visualization of financial KPIs, improving reporting speed and executive visibility by 45%.",
      "Wrote and optimized complex SQL queries including CTEs and window functions across Snowflake, PostgreSQL, and AWS Redshift to support large-scale datasets and improve report performance.",
      "Optimized ETL pipeline performance by streamlining data movement across SQL Server, Snowflake, and AWS Redshift, reducing report refresh delays by 35%.",
      "Designed and maintained dimensional data models and data warehouse tables using Star and Snowflake schemas in SQL Server and AWS Redshift to support reliable, scalable financial reporting.",
      "Conducted trend analysis and supported business reviews by organizing, summarizing, and visualizing financial data, translating complex findings into clear actionable insights for cross-functional stakeholders.",
    ],
  },
  {
    role: "Data Analyst",
    company: "Zayo",
    location: "Paris, France",
    date: "June 2021 to February 2023",
    color: "#34d399",
    tech: ["Tableau", "SQL", "Alteryx", "Power Query", "Salesforce CRM", "AWS Redshift", "DBT Core", "Snowflake", "Amazon Athena", "AWS EMR"],
    bullets: [
      "Built real-time Tableau dashboards integrated with APIs to visualize KPIs, enabling faster business decisions and improving financial and operational reporting efficiency by 40%.",
      "Designed and developed advanced Tableau dashboards with complex calculated fields, dynamic parameters, and dimensional data models for performance tracking, sales forecasting, and customer churn analysis.",
      "Automated ETL data refresh and reporting workflows through Tableau Server, ensuring real-time KPI visibility and implementing data validation processes to ensure accuracy and traceability across all reports.",
      "Collected, cleaned, and analyzed large datasets from Salesforce and internal systems using SQL and Alteryx to generate actionable business insights for cross-functional stakeholders.",
      "Conducted ad-hoc data analysis using SQL and Tableau to support business cases and strategic decision-making, presenting findings to senior management in clear non-technical language.",
    ],
  },
  {
    role: "Data Analyst",
    company: "ICICI Bank",
    location: "Hyderabad, India",
    date: "August 2016 to June 2018",
    color: "#f472b6",
    tech: ["Excel VBA", "SQL", "MySQL", "Oracle SQL Developer", "MS Access", "PivotTables"],
    bullets: [
      "Collected, cleaned, and analyzed financial and customer data in Excel using PivotTables and charts to track loan performance, customer growth, and revenue trends for leadership reporting.",
      "Automated repetitive reporting tasks using Excel formulas, PivotTables, and VBA macros, reducing manual effort and significantly improving data processing efficiency across teams.",
      "Wrote SQL queries to extract data from relational databases and load into Excel for reporting, validating and reconciling data with senior analysts to ensure accuracy and integrity.",
      "Prepared weekly and monthly business reports and performed ad-hoc data analysis to support business decisions and stakeholder reviews across departments.",
      "Maintained Excel reporting templates and documentation, presenting data findings in clear non-technical language to cross-functional teams and ensuring standardized reporting processes.",
    ],
  },
];

function TenureBar({ date, color }: { date: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const getMonths = (d: string) => {
    if (d.includes("Present")) return 10;
    const parts = d.split(" to ");
    const months: Record<string, number> = {
      January: 1, February: 2, March: 3, April: 4, May: 5, June: 6,
      July: 7, August: 8, September: 9, October: 10, November: 11, December: 12,
    };
    const [sm, sy] = parts[0].split(" ");
    const [em, ey] = parts[1].split(" ");
    return (parseInt(ey) - parseInt(sy)) * 12 + (months[em] - months[sm]);
  };

  const months = getMonths(date);
  const pct = Math.min((months / 24) * 100, 100);

  return (
    <div ref={ref} className="flex items-center gap-2 mt-3">
      <span className="text-zinc-600 font-mono text-xs w-16 shrink-0">tenure</span>
      <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
      <span className="font-mono text-xs shrink-0" style={{ color }}>
        {months >= 12 ? `${Math.floor(months / 12)}y ${months % 12}m` : `${months}m`}
      </span>
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
                <div
                  className="absolute -left-10 top-5 w-3 h-3 rounded-full border-2 border-[#121212]"
                  style={{ background: exp.color }}
                />

                <div className="border border-zinc-800 bg-zinc-900/50 backdrop-blur-md rounded-2xl p-7 hover:border-zinc-600 transition-colors">

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
                  <ul className="space-y-2.5 mb-5">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-3 text-zinc-400 text-sm leading-relaxed">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: exp.color }} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="pt-4 border-t border-zinc-800">
                    <p className="text-zinc-600 font-mono text-xs mb-2 tracking-widest">TECHNOLOGIES</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span key={t} className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-zinc-700 text-zinc-500">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Tenure bar */}
                  <TenureBar date={exp.date} color={exp.color} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};