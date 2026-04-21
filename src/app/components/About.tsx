"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GeometricBackground } from "./GeometricBackground";

const stats = [
  { value: 5, suffix: "+", label: "Years Experience", sub: "Across BI & Analytics" },
  { value: 4, suffix: "", label: "Industries", sub: "Finance · Telecom · Tech · Education" },
  { value: 50, suffix: "+", label: "Dashboards Built", sub: "Used daily by leadership" },
  { value: 100, suffix: "%", label: "Reports Automated", sub: "Zero manual effort remaining" },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1400;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export const About = () => {
  return (
    <section className="bg-[#121212] text-white py-24 px-8 md:px-24 relative z-20">
      <GeometricBackground />
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono tracking-[4px] text-zinc-500 uppercase">01 / About</span>
          <div className="flex-1 h-px bg-zinc-800" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left: headline + bio */}
          <div>
            <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
              I turn messy data<br />
              <span style={{ color: "#FFC627" }}>into clarity.</span>
            </h3>
            <p className="text-zinc-400 text-lg leading-relaxed mb-6">
              5+ years designing end-to-end BI solutions — from raw SQL to boardroom dashboards.
              My automations run silently in the background, eliminating hours of manual work
              and keeping leadership informed without anyone lifting a finger.
            </p>
            <p className="text-zinc-500 text-base leading-relaxed">
              Currently at <span className="text-zinc-300 font-semibold">Arizona State University</span> where
              my Tableau dashboards are used daily across departments and my Python pipelines
              handle everything from enrollment reporting to stakeholder communications.
            </p>

            {/* Divider quote */}
            <div className="mt-10 pl-5 border-l-2 border-yellow-400/60">
              <p className="text-zinc-300 text-lg italic font-medium">
                "If I have to do it twice, I automate it."
              </p>
            </div>
          </div>

          {/* Right: KPI stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="relative border border-zinc-800 bg-zinc-900/60 backdrop-blur-md rounded-2xl p-6 overflow-hidden group hover:border-zinc-600 transition-colors"
              >
                {/* Subtle corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{
                    background: "radial-gradient(circle at top right, #FFC627, transparent 70%)",
                  }}
                />
                <div
                  className="text-4xl md:text-5xl font-black tracking-tighter mb-1"
                  style={{ color: "#FFC627" }}
                >
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white font-bold text-base mb-1">{stat.label}</div>
                <div className="text-zinc-500 font-mono text-xs">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom: tool logos as a trust strip */}
        <div className="mt-16 pt-8 border-t border-zinc-800">
          <p className="text-zinc-600 font-mono text-xs tracking-widest uppercase mb-6">Core Stack</p>
          <div className="flex flex-wrap gap-3">
            {["Tableau", "Python", "SQL", "Alteryx", "AWS Redshift", "Power BI", "Selenium", "DBT"].map((tool) => (
              <span
                key={tool}
                className="px-4 py-1.5 border border-zinc-700 rounded-full text-sm text-zinc-400 font-mono hover:border-yellow-400/50 hover:text-yellow-400 transition-colors cursor-default"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};