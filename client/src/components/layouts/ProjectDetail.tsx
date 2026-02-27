import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" style={{ opacity: 0.06 }}>
        <defs>
          <pattern id="detail-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#detail-grid)" />
      </svg>
      <div style={{ position: "absolute", left: "50%", top: "20%", transform: "translate(-50%,-50%)", width: "900px", height: "900px", background: "radial-gradient(ellipse at center, rgba(37,99,235,0.09) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)", filter: "blur(2px)" }} />
      <div style={{ position: "absolute", right: "5%", bottom: "20%", width: "400px", height: "400px", background: "radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", left: "3%", top: "40%", width: "350px", height: "350px", background: "radial-gradient(ellipse at center, rgba(52,211,153,0.05) 0%, transparent 70%)" }} />
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

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-5"
      style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)", color: "#93C5FD", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
      <motion.span animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }}
        className="w-2 h-2 rounded-full" style={{ background: "#34D399", boxShadow: "0 0 8px #34D399" }} />
      {children}
    </div>
  );
}

function SectionHeading({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <h2 style={{ fontFamily: "'Sora', 'DM Sans', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", fontWeight: 700, color: "#F1F5F9", letterSpacing: "-0.04em", lineHeight: 1.15, marginBottom: "20px" }}>
      {children}
      {accent && (
        <span style={{ background: "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {" "}{accent}
        </span>
      )}
    </h2>
  );
}

function ProseBlock({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)", color: "#64748B", lineHeight: 1.85, maxWidth: "680px" }}>
      {children}
    </p>
  );
}

const architectureNodes = [
  { id: "client", label: "Client", x: 10, y: 42, color: "#22D3EE", size: 52 },
  { id: "gateway", label: "API Gateway", x: 30, y: 42, color: "#60A5FA", size: 60 },
  { id: "auth", label: "Auth", x: 50, y: 18, color: "#7C3AED", size: 48 },
  { id: "core", label: "Core Service", x: 50, y: 55, color: "#2563EB", size: 68 },
  { id: "cache", label: "Redis", x: 70, y: 28, color: "#F87171", size: 48 },
  { id: "db", label: "PostgreSQL", x: 70, y: 68, color: "#34D399", size: 52 },
  { id: "queue", label: "Queue", x: 88, y: 48, color: "#F59E0B", size: 48 },
];

const architectureEdges = [
  { from: "client", to: "gateway" },
  { from: "gateway", to: "auth" },
  { from: "gateway", to: "core" },
  { from: "core", to: "cache" },
  { from: "core", to: "db" },
  { from: "core", to: "queue" },
];

function ArchDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [pulsePhase, setPulsePhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPulsePhase((p) => (p + 1) % architectureEdges.length), 900);
    return () => clearInterval(id);
  }, []);

  const getNode = (id: string) => architectureNodes.find((n) => n.id === id)!;

  return (
    <div style={{ position: "relative", width: "100%", paddingTop: "52%", borderRadius: "16px", overflow: "hidden", background: "rgba(13,17,23,0.9)", border: "1px solid rgba(96,165,250,0.12)", backdropFilter: "blur(20px)", boxShadow: "0 0 60px rgba(37,99,235,0.1), 0 20px 60px rgba(0,0,0,0.5)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 29px,rgba(255,255,255,0.02) 29px,rgba(255,255,255,0.02) 30px),repeating-linear-gradient(90deg,transparent,transparent 29px,rgba(255,255,255,0.02) 29px,rgba(255,255,255,0.02) 30px)" }} />

      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
        {architectureEdges.map((edge, i) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          const active = pulsePhase === i;
          return (
            <g key={i}>
              <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="rgba(96,165,250,0.12)" strokeWidth="0.4" />
              {active && (
                <motion.circle r="0.8" fill="#60A5FA"
                  initial={{ offsetDistance: "0%" } as never}
                  animate={{ offsetDistance: "100%" } as never}
                  style={{ offsetPath: `path('M ${from.x} ${from.y} L ${to.x} ${to.y}')` } as never}
                  transition={{ duration: 0.85, ease: "easeInOut" }}
                  opacity={0.9}
                />
              )}
            </g>
          );
        })}
      </svg>

      {architectureNodes.map((node, i) => (
        <motion.div
          key={node.id}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 260, damping: 18 }}
          onMouseEnter={() => setActiveNode(node.id)}
          onMouseLeave={() => setActiveNode(null)}
          style={{
            position: "absolute",
            left: `${node.x}%`,
            top: `${node.y}%`,
            transform: "translate(-50%, -50%)",
            width: node.size,
            height: node.size,
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 35%, ${node.color}22, ${node.color}09)`,
            border: `1.5px solid ${activeNode === node.id ? node.color + "aa" : node.color + "44"}`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            cursor: "default",
            boxShadow: activeNode === node.id ? `0 0 24px ${node.color}55, 0 0 8px ${node.color}33` : `0 0 12px ${node.color}22`,
            transition: "border-color 0.2s ease, box-shadow 0.2s ease",
            zIndex: 2,
          }}
        >
          <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "8px", color: node.color, fontWeight: 700, letterSpacing: "0.03em", textAlign: "center", lineHeight: 1.3, display: "block" }}>
              {node.label}
            </span>
          </motion.div>
          <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
            style={{ position: "absolute", inset: "-4px", borderRadius: "50%", border: `1px solid ${node.color}22` }} />
        </motion.div>
      ))}

      <div style={{ position: "absolute", bottom: "14px", right: "16px", fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#334155", letterSpacing: "0.08em" }}>
        architecture.diagram
      </div>
    </div>
  );
}

function StatCard({ value, label, color, delay }: { value: string; label: string; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ background: "rgba(13,17,23,0.85)", border: `1px solid ${color}33`, borderRadius: "14px", padding: "22px 24px", backdropFilter: "blur(16px)", boxShadow: `0 0 24px ${color}18, 0 8px 32px rgba(0,0,0,0.4)` }}>
      <div style={{ fontFamily: "'Sora', monospace", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 700, color, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: "6px" }}>
        {value}
      </div>
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12.5px", color: "#64748B", lineHeight: 1.5 }}>
        {label}
      </div>
    </motion.div>
  );
}

function LearningCard({ number, title, body, delay }: { number: string; title: string; body: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", gap: "20px", padding: "22px 24px", borderRadius: "14px", background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", border: hovered ? "1px solid rgba(96,165,250,0.25)" : "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", transition: "all 0.25s ease", boxShadow: hovered ? "0 0 24px rgba(37,99,235,0.1)" : "none" }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#2563EB", fontWeight: 700, minWidth: "28px", paddingTop: "2px" }}>{number}</span>
      <div>
        <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "15px", fontWeight: 600, color: hovered ? "#22D3EE" : "#F1F5F9", letterSpacing: "-0.02em", marginBottom: "6px", transition: "color 0.25s ease" }}>{title}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "#64748B", lineHeight: 1.7 }}>{body}</div>
      </div>
    </motion.div>
  );
}

export default function ProjectDetail(): JSX.Element {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const tech = ["Go", "TypeScript", "PostgreSQL", "Redis", "Kubernetes", "gRPC", "Terraform", "Prometheus"];

  return (
    <div style={{ backgroundColor: "#060A12", minHeight: "100vh", fontFamily: "'DM Sans', 'Sora', sans-serif", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <GridBackground />
        <ParticleField />

        <div className="absolute pointer-events-none transition-all duration-700"
          style={{ width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(circle, rgba(96,165,250,0.07) 0%, transparent 70%)", left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`, transform: "translate(-50%,-50%)", zIndex: 0 }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity, position: "relative", zIndex: 10, width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "clamp(1.5rem,5vw,4rem)", paddingTop: "120px", paddingBottom: "80px" }}>

          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-8"
            style={{ background: "rgba(96,165,250,0.08)", border: "1px solid rgba(96,165,250,0.2)", color: "#93C5FD", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: "'JetBrains Mono', monospace" }}>
            <motion.span animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full" style={{ background: "#34D399", boxShadow: "0 0 8px #34D399" }} />
            case study
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: "'Sora', 'DM Sans', sans-serif", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 700, color: "#F1F5F9", letterSpacing: "-0.045em", lineHeight: 1.05, marginBottom: "20px", maxWidth: "780px" }}>
            Nexus
            <span style={{ background: "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>DB</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2.2vw, 1.25rem)", color: "#64748B", lineHeight: 1.75, maxWidth: "600px", marginBottom: "36px" }}>
            A distributed time-series database engineered from the ground up to handle{" "}
            <span style={{ color: "#94A3B8" }}>2.4 million writes per second</span>{" "}
            with sub-4ms P99 latency across twelve autonomous shards.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="flex flex-wrap gap-2 mb-16">
            {tech.map((t, i) => (
              <motion.span key={t} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.06, type: "spring", stiffness: 300 }}
                whileHover={{ scale: 1.08, y: -1 }}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#64748B", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "5px 12px", letterSpacing: "0.04em", cursor: "default" }}>
                {t}
              </motion.span>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
            style={{ width: "100%", borderRadius: "20px", overflow: "hidden", position: "relative", background: "linear-gradient(135deg, #0D1117 0%, #0f1923 40%, #0d1a2e 100%)", border: "1px solid rgba(96,165,250,0.12)", boxShadow: "0 0 0 1px rgba(96,165,250,0.06), 0 40px 80px -20px rgba(0,0,0,0.8), 0 0 120px rgba(37,99,235,0.08)" }}>
            <div style={{ paddingTop: "42%", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 39px,rgba(96,165,250,0.03) 39px,rgba(96,165,250,0.03) 40px),repeating-linear-gradient(90deg,transparent,transparent 39px,rgba(96,165,250,0.03) 39px,rgba(96,165,250,0.03) 40px)" }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 40% 50%, rgba(37,99,235,0.15) 0%, rgba(124,58,237,0.06) 40%, transparent 70%)" }} />
              <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }}
                  style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(2rem, 6vw, 5rem)", color: "#60A5FA", letterSpacing: "-0.04em", fontWeight: 700, filter: "drop-shadow(0 0 30px rgba(96,165,250,0.5))" }}>
                  ⬡
                </motion.div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#334155", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: "12px" }}>
                  nexusdb — distributed core
                </div>
              </div>
              <div style={{ position: "absolute", bottom: "16px", right: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                <motion.div animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34D399", boxShadow: "0 0 10px #34D399" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#34D399" }}>live in production</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, #1E3A5F 30%, #2563EB55 50%, #1E3A5F 70%, transparent 100%)" }} />
      </section>

      {/* ── CONTENT ── */}
      <div style={{ position: "relative" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, #060A12 0%, #060A12 100%)" }} />

        <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "clamp(1.5rem,5vw,4rem)" }}>

          {/* 1. PROBLEM */}
          <section style={{ paddingTop: "100px", paddingBottom: "80px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <RevealSection>
              <SectionLabel>01 — problem</SectionLabel>
              <SectionHeading accent="Statement">The</SectionHeading>
              <ProseBlock>
                Existing time-series solutions collapsed under our ingest rate.{" "}
                <span style={{ color: "#94A3B8" }}>InfluxDB saturated at 400K writes/sec</span>, Timescale
                required vertical scaling that became cost-prohibitive, and every off-the-shelf option
                introduced unacceptable P99 tail latency spikes that cascaded into SLA breaches.
                We needed something built for our load profile — not adapted to it.
              </ProseBlock>
            </RevealSection>

            <RevealSection delay={0.15}>
              <div style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 240px), 1fr))", gap: "16px" }}>
                {[
                  { label: "Peak ingest before", value: "400K/s", sub: "previous limit" },
                  { label: "P99 tail spikes", value: "340ms", sub: "under old stack" },
                  { label: "Infra cost monthly", value: "$28K", sub: "vertical scaling" },
                ].map((item, i) => (
                  <div key={i} style={{ padding: "20px 22px", borderRadius: "14px", background: "rgba(248,113,113,0.04)", border: "1px solid rgba(248,113,113,0.15)", backdropFilter: "blur(12px)" }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#64748B", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>{item.label}</div>
                    <div style={{ fontFamily: "'Sora', monospace", fontSize: "2rem", fontWeight: 700, color: "#F87171", letterSpacing: "-0.04em" }}>{item.value}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#4B5563", marginTop: "4px" }}>{item.sub}</div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </section>

          {/* 2. ARCHITECTURE */}
          <section style={{ paddingTop: "100px", paddingBottom: "80px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <RevealSection>
              <SectionLabel>02 — architecture</SectionLabel>
              <SectionHeading accent="Design">System</SectionHeading>
              <ProseBlock>
                A write-optimised LSM-tree storage engine written in Go with a Rust FFI layer for the
                hot path. Consistent hashing distributes shards with a{" "}
                <span style={{ color: "#94A3B8" }}>virtual node replication factor of three</span>.
                A custom binary protocol over gRPC replaces REST at the ingest boundary, cutting
                serialisation overhead by 68%.
              </ProseBlock>
            </RevealSection>

            <RevealSection delay={0.2}>
              <div style={{ marginTop: "40px" }}>
                <ArchDiagram />
              </div>
            </RevealSection>

            <RevealSection delay={0.3}>
              <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: "14px" }}>
                {[
                  { title: "Write Path", body: "WAL → memtable → SSTable flush with background compaction. Zero copy between network and storage.", color: "#60A5FA" },
                  { title: "Read Path", body: "Bloom filter per SSTable level eliminates 99.2% of unnecessary disk seeks on cold reads.", color: "#7C3AED" },
                  { title: "Consensus", body: "Raft-based leader election with pre-vote phase prevents spurious leader changes during network partitions.", color: "#34D399" },
                ].map((item, i) => (
                  <div key={i} style={{ padding: "20px 22px", borderRadius: "14px", background: "rgba(13,17,23,0.85)", border: `1px solid ${item.color}22`, backdropFilter: "blur(16px)" }}>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "14px", fontWeight: 600, color: item.color, marginBottom: "8px", letterSpacing: "-0.02em" }}>{item.title}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#64748B", lineHeight: 1.7 }}>{item.body}</div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </section>

          {/* 3. SOLUTION */}
          <section style={{ paddingTop: "100px", paddingBottom: "80px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <RevealSection>
              <SectionLabel>03 — solution</SectionLabel>
              <SectionHeading accent="Implementation">Technical</SectionHeading>
              <ProseBlock>
                The ingest gateway batches incoming writes into 512-byte micro-batches and pipelines
                them through a lock-free ring buffer before WAL commit. A SIMD-accelerated compression
                pass using Zstandard level 3 runs on the memtable flush thread, achieving{" "}
                <span style={{ color: "#94A3B8" }}>4.1× compression ratio</span> with negligible CPU overhead.
                Kubernetes operators manage shard rebalancing automatically on node failure.
              </ProseBlock>
            </RevealSection>

            <RevealSection delay={0.2}>
              <div style={{ marginTop: "44px", borderRadius: "16px", overflow: "hidden", background: "rgba(13,17,23,0.9)", border: "1px solid rgba(96,165,250,0.1)", backdropFilter: "blur(20px)" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "#161B22", display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F57" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28C840" }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#4B5563", marginLeft: "8px" }}>ingest_handler.go</span>
                  <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                    <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34D399" }} />
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#34D399" }}>compiling</span>
                  </div>
                </div>
                <div style={{ padding: "24px 28px", overflowX: "auto" }}>
                  {[
                    [{ t: "func ", c: "#7C3AED" }, { t: "IngestBatch", c: "#60A5FA" }, { t: "(ctx ", c: "#E2E8F0" }, { t: "context.Context", c: "#34D399" }, { t: ", batch []", c: "#E2E8F0" }, { t: "Point", c: "#34D399" }, { t: ") ", c: "#E2E8F0" }, { t: "error", c: "#F87171" }, { t: " {", c: "#E2E8F0" }],
                    [{ t: "  rb ", c: "#E2E8F0" }, { t: ":= ", c: "#7C3AED" }, { t: "ringbuf.", c: "#E2E8F0" }, { t: "Acquire", c: "#60A5FA" }, { t: "(", c: "#E2E8F0" }, { t: "len", c: "#7C3AED" }, { t: "(batch))", c: "#E2E8F0" }],
                    [{ t: "  defer ", c: "#7C3AED" }, { t: "rb.", c: "#E2E8F0" }, { t: "Release", c: "#60A5FA" }, { t: "()", c: "#E2E8F0" }],
                    [{ t: "  compressed ", c: "#E2E8F0" }, { t: ":= ", c: "#7C3AED" }, { t: "zstd.", c: "#E2E8F0" }, { t: "EncodeLevel", c: "#60A5FA" }, { t: "(rb, ", c: "#E2E8F0" }, { t: "3", c: "#FCD34D" }, { t: ")", c: "#E2E8F0" }],
                    [{ t: "  return ", c: "#7C3AED" }, { t: "wal.", c: "#E2E8F0" }, { t: "Commit", c: "#60A5FA" }, { t: "(ctx, compressed)", c: "#E2E8F0" }],
                    [{ t: "}", c: "#E2E8F0" }],
                  ].map((line, li) => (
                    <motion.div key={li} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + li * 0.07 }}
                      style={{ display: "flex", alignItems: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", lineHeight: "1.9" }}>
                      <span style={{ color: "#2D3748", marginRight: "20px", fontSize: "11px", minWidth: "16px", textAlign: "right", userSelect: "none" }}>{li + 1}</span>
                      <span>{line.map((tok, ti) => <span key={ti} style={{ color: tok.c }}>{tok.t}</span>)}</span>
                    </motion.div>
                  ))}
                </div>
                <div style={{ padding: "8px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "#1C2128", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#4B5563" }}>Go 1.22</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#34D399" }}>✓ No errors</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#4B5563" }}>UTF-8</span>
                </div>
              </div>
            </RevealSection>
          </section>

          {/* 4. RESULTS */}
          <section style={{ paddingTop: "100px", paddingBottom: "80px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <RevealSection>
              <SectionLabel>04 — results</SectionLabel>
              <SectionHeading accent="Impact">Measurable</SectionHeading>
              <ProseBlock>
                After a staged rollout across three datacentres, NexusDB hit steady-state metrics
                that exceeded every target. Infra costs dropped while throughput ceiling rose by 6×
                — the system has been running without a single unplanned outage for{" "}
                <span style={{ color: "#94A3B8" }}>14 months</span>.
              </ProseBlock>
            </RevealSection>

            <RevealSection delay={0.15}>
              <div style={{ marginTop: "44px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 200px), 1fr))", gap: "16px" }}>
                <StatCard value="2.4M/s" label="Peak write throughput" color="#34D399" delay={0} />
                <StatCard value="4.2ms" label="P99 ingest latency" color="#60A5FA" delay={0.08} />
                <StatCard value="99.98%" label="12-month uptime" color="#22D3EE" delay={0.16} />
                <StatCard value="−61%" label="Infrastructure cost" color="#F59E0B" delay={0.24} />
                <StatCard value="4.1×" label="Compression ratio" color="#7C3AED" delay={0.32} />
                <StatCard value="0" label="Unplanned outages" color="#34D399" delay={0.4} />
              </div>
            </RevealSection>
          </section>

          {/* 5. KEY LEARNINGS */}
          <section style={{ paddingTop: "100px", paddingBottom: "120px" }}>
            <RevealSection>
              <SectionLabel>05 — learnings</SectionLabel>
              <SectionHeading accent="Learnings">Key</SectionHeading>
              <ProseBlock>
                Six months of building, benchmarking and debugging a custom storage engine distilled
                hard-won lessons that changed how the whole team thinks about systems design.
              </ProseBlock>
            </RevealSection>

            <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { title: "Lock-free isn't free", body: "Atomic CAS loops consume CPU cycles under high contention. Benchmark with real load shapes before choosing lock-free over a simple mutex." },
                { title: "WAL is your source of truth — treat it like one", body: "Every optimisation that bypassed the WAL for speed introduced subtle durability bugs. We reverted them all. Correctness before performance." },
                { title: "Compression pays double", body: "Zstandard reduced both disk I/O and network traffic between nodes — two wins from one pass. Compress at the right layer and the savings compound." },
                { title: "Kubernetes operators are worth the investment", body: "Building a CRD-based operator for shard management was a 3-week investment that eliminated an entire class of on-call incidents going forward." },
                { title: "Observability is a first-class feature", body: "We shipped Prometheus metrics and structured trace IDs before the first beta deployment. It cut mean time to root cause from hours to minutes." },
              ].map((item, i) => (
                <LearningCard key={i} number={`0${i + 1}`} title={item.title} body={item.body} delay={i * 0.07} />
              ))}
            </div>

            <RevealSection delay={0.4}>
              <div style={{ marginTop: "60px", display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
                <motion.a href="#" onClick={(e) => e.preventDefault()}
                  whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600, color: "#fff", background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)", padding: "13px 28px", borderRadius: "12px", textDecoration: "none", letterSpacing: "0.03em", boxShadow: "0 0 30px rgba(37,99,235,0.35)", whiteSpace: "nowrap" as const }}>
                  Live Demo →
                </motion.a>
                <motion.a href="#" onClick={(e) => e.preventDefault()}
                  whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600, color: "#94A3B8", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", padding: "13px 28px", borderRadius: "12px", textDecoration: "none", letterSpacing: "0.03em", backdropFilter: "blur(10px)", whiteSpace: "nowrap" as const }}>
                  View on GitHub
                </motion.a>
                <motion.a href="#" onClick={(e) => e.preventDefault()}
                  whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.97 }}
                  style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 600, color: "#60A5FA", background: "transparent", padding: "13px 0", borderRadius: "12px", textDecoration: "none", letterSpacing: "0.03em", whiteSpace: "nowrap" as const }}>
                  ← Back to Projects
                </motion.a>
              </div>
            </RevealSection>
          </section>
        </div>
      </div>

      <div className="relative" style={{ background: "#060A12", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "clamp(1.5rem,5vw,4rem)", paddingTop: "40px", paddingBottom: "40px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "16px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#2D3748", letterSpacing: "0.08em" }}>nexusdb — case study</span>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Overview", "Architecture", "Results"].map((item) => (
              <a key={item} href="#" onClick={(e) => e.preventDefault()} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#334155", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" }}>{item}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}