import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" style={{ opacity: 0.06 }}>
        <defs>
          <pattern id="resume-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#resume-grid)" />
      </svg>
      <div style={{ position: "absolute", left: "30%", top: "50%", transform: "translate(-50%,-50%)", width: "700px", height: "700px", background: "radial-gradient(ellipse at center, rgba(37,99,235,0.09) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)", filter: "blur(2px)" }} />
      <div style={{ position: "absolute", right: "5%", top: "20%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", left: "5%", bottom: "10%", width: "300px", height: "300px", background: "radial-gradient(ellipse at center, rgba(52,211,153,0.06) 0%, transparent 70%)" }} />
    </div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.4 + 0.1,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.id % 3 === 0 ? "#60A5FA" : p.id % 3 === 1 ? "#34D399" : "#7C3AED", opacity: p.opacity }}
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [p.opacity, p.opacity * 0.3, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

const experience = [
  {
    role: "Staff Engineer",
    company: "Meridian Systems",
    period: "2022 — Present",
    description: "Led architecture of a distributed telemetry platform processing 2.4M events/sec. Grew engineering team from 4 to 14.",
    color: "#60A5FA",
    tags: ["Go", "Kubernetes", "Rust"],
  },
  {
    role: "Senior Engineer",
    company: "Volta Cloud",
    period: "2020 — 2022",
    description: "Built edge-deployed API gateway serving 50M+ daily requests. Reduced cold-start latency by 94% via V8 isolates.",
    color: "#22D3EE",
    tags: ["TypeScript", "Node.js", "AWS"],
  },
  {
    role: "Software Engineer",
    company: "Axiom Labs",
    period: "2018 — 2020",
    description: "Delivered real-time anomaly detection pipeline. Owned PostgreSQL schema migration tooling adopted across 6 teams.",
    color: "#34D399",
    tags: ["Python", "PostgreSQL", "Redis"],
  },
  {
    role: "Junior Engineer",
    company: "Forge Digital",
    period: "2016 — 2018",
    description: "Shipped internal React component library used across 12 products. Introduced E2E test coverage from 0 to 84%.",
    color: "#7C3AED",
    tags: ["React", "TypeScript", "Jest"],
  },
];

const domains = [
  { label: "Distributed Systems", icon: "⬡", color: "#60A5FA" },
  { label: "Platform Engineering", icon: "◈", color: "#22D3EE" },
  { label: "API Design", icon: "◧", color: "#34D399" },
  { label: "Performance Eng.", icon: "⬟", color: "#F59E0B" },
  { label: "Developer Tooling", icon: "◉", color: "#7C3AED" },
  { label: "Cloud Infrastructure", icon: "⬠", color: "#F87171" },
];

function StatPill({ value, label, color, delay, inView }: { value: string; label: string; color: string; delay: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ padding: "20px 24px", borderRadius: "14px", background: `rgba(13,17,23,0.85)`, border: `1px solid ${color}33`, backdropFilter: "blur(16px)", boxShadow: `0 0 24px ${color}18, 0 8px 32px rgba(0,0,0,0.4)`, textAlign: "center" }}
    >
      <div style={{ fontFamily: "'Sora', monospace", fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 700, color, letterSpacing: "-0.05em", lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12.5px", color: "#64748B", marginTop: "6px", lineHeight: 1.4 }}>{label}</div>
    </motion.div>
  );
}

function TimelineItem({ item, index, inView }: { item: typeof experience[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, x: -28 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", gap: "0", position: "relative" }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "24px", flexShrink: 0 }}>
        <motion.div
          animate={{ boxShadow: hovered ? `0 0 20px ${item.color}88` : `0 0 8px ${item.color}44` }}
          transition={{ duration: 0.25 }}
          style={{ width: "14px", height: "14px", borderRadius: "50%", background: item.color, border: `2px solid ${item.color}66`, marginTop: "4px", flexShrink: 0 }}
        />
        {index < experience.length - 1 && (
          <div style={{ width: "1px", flex: 1, marginTop: "8px", background: `linear-gradient(to bottom, ${item.color}44, rgba(255,255,255,0.04))`, minHeight: "48px" }} />
        )}
      </div>

      <div
        style={{ flex: 1, padding: "18px 20px", borderRadius: "14px", marginBottom: index < experience.length - 1 ? "16px" : "0", background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", border: hovered ? `1px solid ${item.color}44` : "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", transition: "all 0.25s ease", boxShadow: hovered ? `0 0 24px ${item.color}18` : "none" }}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "15px", fontWeight: 700, color: hovered ? "#22D3EE" : "#F1F5F9", letterSpacing: "-0.03em", transition: "color 0.25s ease" }}>{item.role}</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: item.color, marginTop: "2px", letterSpacing: "0.02em" }}>{item.company}</div>
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#334155", letterSpacing: "0.06em", paddingTop: "2px", whiteSpace: "nowrap" }}>{item.period}</span>
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#64748B", lineHeight: 1.7, marginBottom: "12px" }}>{item.description}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {item.tags.map((tag) => (
            <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10.5px", color: "#64748B", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", padding: "3px 9px", letterSpacing: "0.04em" }}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ResumeCard({ inView }: { inView: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-4, 4]), { stiffness: 180, damping: 22 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }, [mx, my]);

  const handleMouseLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  const resumeLines = [
    { label: "Alex Chen", value: "", accent: "#F1F5F9", size: "18px", weight: 700, mono: false },
    { label: "Staff Engineer · Distributed Systems", value: "", accent: "#60A5FA", size: "11px", weight: 400, mono: true },
    { label: "────────────────────────────", value: "", accent: "#1E3A5F", size: "10px", weight: 400, mono: true },
    { label: "Experience", value: "8 yrs", accent: "#94A3B8", size: "11.5px", weight: 600, mono: false },
    { label: "Projects Shipped", value: "47", accent: "#94A3B8", size: "11.5px", weight: 600, mono: false },
    { label: "Open Source Stars", value: "3.2K", accent: "#94A3B8", size: "11.5px", weight: 600, mono: false },
    { label: "────────────────────────────", value: "", accent: "#1E3A5F", size: "10px", weight: 400, mono: true },
    { label: "Go · Rust · TypeScript", value: "", accent: "#34D399", size: "11px", weight: 400, mono: true },
    { label: "Kubernetes · PostgreSQL · Redis", value: "", accent: "#60A5FA", size: "11px", weight: 400, mono: true },
    { label: "AWS · Terraform · Prometheus", value: "", accent: "#7C3AED", size: "11px", weight: 400, mono: true },
    { label: "────────────────────────────", value: "", accent: "#1E3A5F", size: "10px", weight: 400, mono: true },
    { label: "alex@chen.dev · github.com/alexchen", value: "", accent: "#334155", size: "10px", weight: 400, mono: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.75, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 900 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
      >
        <div style={{ borderRadius: "20px", overflow: "hidden", background: "rgba(13,17,23,0.92)", border: "1px solid rgba(96,165,250,0.15)", backdropFilter: "blur(24px)", boxShadow: "0 0 0 1px rgba(96,165,250,0.06), 0 40px 80px rgba(0,0,0,0.6), 0 0 80px rgba(37,99,235,0.08)" }}>

          <div style={{ padding: "12px 18px", background: "#161B22", borderBottom: "1px solid #21262D", display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F57" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28C840" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#4B5563", marginLeft: "8px", letterSpacing: "0.05em" }}>resume.pdf</span>
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
              <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity }} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34D399" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#34D399" }}>ready</span>
            </div>
          </div>

          <div style={{ padding: "28px 28px 24px", background: "linear-gradient(180deg, rgba(22,27,34,0.6) 0%, transparent 100%)" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "linear-gradient(135deg, #2563EB22, #7C3AED11)", border: "1px solid rgba(96,165,250,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "20px", color: "#60A5FA" }}>⬡</span>
            </div>

            {resumeLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -6 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.06, duration: 0.3 }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: line.size === "10px" ? "10px" : "7px" }}
              >
                <span style={{ fontFamily: line.mono ? "'JetBrains Mono', monospace" : "'DM Sans', sans-serif", fontSize: line.size, fontWeight: line.weight, color: line.accent, letterSpacing: line.mono ? "0.04em" : "-0.01em" }}>{line.label}</span>
                {line.value && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", fontWeight: 700, color: "#F1F5F9" }}>{line.value}</span>}
              </motion.div>
            ))}
          </div>

          <div style={{ margin: "0 24px 24px", borderRadius: "10px", overflow: "hidden", background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.15)" }}>
            {[
              { label: "Systems Design", pct: 95, color: "#60A5FA" },
              { label: "Backend Engineering", pct: 92, color: "#34D399" },
              { label: "Infrastructure", pct: 88, color: "#7C3AED" },
              { label: "Frontend", pct: 74, color: "#22D3EE" },
            ].map((skill, si) => (
              <div key={si} style={{ padding: "10px 14px", borderBottom: si < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#64748B", letterSpacing: "0.06em" }}>{skill.label}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: skill.color }}>{skill.pct}%</span>
                </div>
                <div style={{ height: "3px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.pct}%` } : {}}
                    transition={{ duration: 1, delay: 0.8 + si * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ height: "100%", borderRadius: "999px", background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: "0 24px 28px" }}>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["Available Q3 2025", "Remote-first", "Open to relocation"].map((tag) => (
                <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#64748B", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", padding: "3px 9px", letterSpacing: "0.04em" }}>{tag}</span>
              ))}
            </div>
          </div>

          <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #2563EB, #22D3EE, transparent)" }} />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ResumeSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [dlHovered, setDlHovered] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#060A12", fontFamily: "'DM Sans', 'Sora', sans-serif", paddingTop: "100px", paddingBottom: "110px" }}
      aria-label="Resume"
    >
      <GridBackground />
      <ParticleField />

      <div
        className="absolute pointer-events-none transition-all duration-700"
        style={{ width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)", left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: "translate(-50%,-50%)", zIndex: 0 }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto" style={{ paddingLeft: "clamp(1.5rem,5vw,4rem)", paddingRight: "clamp(1.5rem,5vw,4rem)" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full"
            style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)", color: "#93C5FD", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
            <motion.span animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full" style={{ background: "#34D399", boxShadow: "0 0 8px #34D399" }} />
            résumé
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: "'Sora', 'DM Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", fontWeight: 700, color: "#F1F5F9", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "16px" }}
          >
            Experience &{" "}
            <span style={{ background: "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Background</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", color: "#64748B", lineHeight: 1.8, maxWidth: "520px", marginBottom: "36px" }}
          >
            Eight years building systems that{" "}
            <span style={{ color: "#94A3B8" }}>scale, survive and ship</span> — from early-stage
            startups to platforms handling billions of events a day.
          </motion.p>

          {/* Stats row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 160px), 1fr))", gap: "14px", width: "100%", maxWidth: "680px" }}>
            <StatPill value="8 yrs" label="Industry experience" color="#60A5FA" delay={0.25} inView={inView} />
            <StatPill value="47" label="Projects shipped" color="#34D399" delay={0.33} inView={inView} />
            <StatPill value="3.2K" label="Open source stars" color="#22D3EE" delay={0.41} inView={inView} />
            <StatPill value="4" label="Companies scaled" color="#7C3AED" delay={0.49} inView={inView} />
          </div>
        </motion.div>

        {/* Main two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* LEFT: Timeline + Domains */}
          <div className="flex-1 w-full min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="mb-8"
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#334155", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "24px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span>Work History</span>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(96,165,250,0.2), transparent)" }} />
              </div>

              {experience.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} inView={inView} />
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.5 }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#334155", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "18px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span>Core Domains</span>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(96,165,250,0.2), transparent)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 190px), 1fr))", gap: "10px" }}>
                {domains.map((d, i) => (
                  <motion.div
                    key={d.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.55 + i * 0.07, type: "spring", stiffness: 300 }}
                    whileHover={{ scale: 1.03, y: -2 }}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "11px 14px", borderRadius: "10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(10px)", cursor: "default", transition: "border-color 0.25s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${d.color}44`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)"; }}
                  >
                    <span style={{ fontSize: "15px", color: d.color, filter: `drop-shadow(0 0 6px ${d.color}66)` }}>{d.icon}</span>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#94A3B8", fontWeight: 500 }}>{d.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Resume card + download */}
          <div className="w-full lg:w-auto" style={{ flexShrink: 0, width: "clamp(280px, 38vw, 400px)" }}>
            <div className="w-full">
              <ResumeCard inView={inView} />

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{ marginTop: "20px" }}
              >
                <motion.button
                  onMouseEnter={() => setDlHovered(true)}
                  onMouseLeave={() => setDlHovered(false)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    padding: "15px 32px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
                    border: "none",
                    color: "#fff",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "13px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    cursor: "pointer",
                    boxShadow: dlHovered
                      ? "0 0 50px rgba(37,99,235,0.55), 0 0 100px rgba(124,58,237,0.25), 0 8px 32px rgba(0,0,0,0.4)"
                      : "0 0 30px rgba(37,99,235,0.35), 0 4px 24px rgba(0,0,0,0.4)",
                    transition: "box-shadow 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <motion.span
                    style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 100%)" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: dlHovered ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  />
                  <motion.span
                    animate={{ y: dlHovered ? [0, -2, 0] : 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    style={{ fontSize: "16px", position: "relative" }}
                  >
                    ↓
                  </motion.span>
                  <span style={{ position: "relative" }}>Download Resume</span>
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.85 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "12px" }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34D399" }}
                  />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10.5px", color: "#334155", letterSpacing: "0.08em" }}>
                    PDF · Updated Jan 2025 · 2 pages
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, #1E3A5F 30%, #2563EB55 50%, #1E3A5F 70%, transparent 100%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, #1E3A5F 30%, #2563EB55 50%, #1E3A5F 70%, transparent 100%)" }} />
    </section>
  );
}