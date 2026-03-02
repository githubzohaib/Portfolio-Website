import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
interface Hackathon {
  id: number;
  year: string;
  title: string;
  role: string;
  org: string;
  location: string;
  color: string;
  accentBg: string;
  icon: string;
  tagline: string;
  highlights: string[];
  tags: string[];
  badge: string;
  badgeColor: string;
}

interface StatItem {
  value: string;
  label: string;
  color: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

// ── Background ─────────────────────────────────────────────────────────────
function GridBackground(): JSX.Element {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" style={{ opacity: 0.06 }}>
        <defs>
          <pattern id="exp-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#exp-grid)" />
      </svg>
      <div style={{ position: "absolute", left: "50%", top: "25%", transform: "translate(-50%,-50%)", width: "800px", height: "800px", background: "radial-gradient(ellipse at center, rgba(37,99,235,0.09) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)", filter: "blur(2px)" }} />
      <div style={{ position: "absolute", right: "4%", bottom: "20%", width: "360px", height: "360px", background: "radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", left: "4%", top: "50%", width: "320px", height: "320px", background: "radial-gradient(ellipse at center, rgba(52,211,153,0.05) 0%, transparent 70%)" }} />
    </div>
  );
}

function ParticleField(): JSX.Element {
  const particles: Particle[] = Array.from({ length: 40 }, (_, i) => ({
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
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? "#60A5FA" : p.id % 3 === 1 ? "#34D399" : "#7C3AED",
            opacity: p.opacity,
          }}
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10], opacity: [p.opacity, p.opacity * 0.3, p.opacity] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const hackathons: Hackathon[] = [
  {
    id: 0,
    year: "2026",
    title: "IBA Hackathon",
    role: "Full Stack Developer",
    org: "Institute of Business Administration",
    location: "Karachi, Pakistan",
    color: "#22D3EE",
    accentBg: "rgba(34,211,238,0.1)",
    icon: "⬡",
    tagline: "Service Marketplace Platform",
    highlights: [
      "Architected a three-role platform (Admin / Seeker / Provider) with secure JWT-based auth and role-based access control",
      "Built real-time chat between seekers and providers using WebSockets for instant communication",
      "Integrated H3 geospatial indexing for radius-based, location-aware service discovery",
      "Designed scalable backend architecture focused on performance and real-time communication",
    ],
    tags: ["React.js", "Node.js", "WebSockets", "H3 Geo", "MongoDB", "RBAC"],
    badge: "IBA · 2026",
    badgeColor: "#22D3EE",
  },
  {
    id: 1,
    year: "2025",
    title: "CodeSphere Hackathon",
    role: "Full Stack Developer",
    org: "NED University",
    location: "Karachi, Pakistan",
    color: "#34D399",
    accentBg: "rgba(52,211,153,0.1)",
    icon: "◈",
    tagline: "AgriTech Solution",
    highlights: [
      "Collaborated cross-functionally on a technology-driven solution tackling real agricultural challenges",
      "Led frontend development and contributed to backend logic and overall system design",
      "Delivered a fully functional prototype under intense time constraints and presented to expert judges",
      "Applied agile thinking and rapid prototyping to iterate quickly across a compressed timeline",
    ],
    tags: ["React.js", "Express.js", "Team Leadership", "Rapid Prototyping", "System Design"],
    badge: "NED · 2025",
    badgeColor: "#34D399",
  },
  {
    id: 2,
    year: "2024",
    title: "SMEC Hackathon",
    role: "Full Stack Developer",
    org: "Sir Syed University",
    location: "Karachi, Pakistan",
    color: "#7C3AED",
    accentBg: "rgba(124,58,237,0.1)",
    icon: "◉",
    tagline: "Textile Industry Operations",
    highlights: [
      "Developed a solution targeting operational inefficiencies in the textile industry",
      "Applied structured problem analysis, feasibility evaluation, and collaborative development practices",
      "Strengthened rapid-prototyping abilities and solution-design intuition under competitive conditions",
      "Gained hands-on experience presenting technical solutions to an industry-expert panel",
    ],
    tags: ["Problem Analysis", "Full Stack", "Feasibility Study", "Prototyping", "Collaboration"],
    badge: "Sir Syed · 2024",
    badgeColor: "#7C3AED",
  },
];

const stats: StatItem[] = [
  { value: "3", label: "Hackathons competed", color: "#22D3EE" },
  // { value: "3", label: "Universities represented", color: "#34D399" },
  { value: "6+", label: "Technologies used", color: "#7C3AED" },
  { value: "Top", label: "Performer each time", color: "#F59E0B" },
];

// ── Center Scrolling Timeline (exact pattern from AchievementsSection) ─────
function ScrollingTimeline({ children }: { children: React.ReactNode }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 15%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <div
      ref={ref}
      className="hidden lg:block"
      style={{
        position: "absolute",
        left: "50%",
        top: 0,
        bottom: 0,
        transform: "translateX(-50%)",
        width: "2px",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      {/* Ghost track */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(96,165,250,0.08)", borderRadius: "999px" }} />
      {/* Scroll-driven fill */}
      <motion.div
        style={{
          scaleY,
          transformOrigin: "top",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(to bottom, #2563EB, #22D3EE, #7C3AED)",
          borderRadius: "999px",
          boxShadow: "0 0 12px rgba(37,99,235,0.6), 0 0 32px rgba(37,99,235,0.25)",
        }}
      />
      {children}
    </div>
  );
}

// ── Timeline Dot (positioned along center line) ────────────────────────────
function TimelineDot({ index, color }: { index: number; color: string }): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ delay: index * 0.08 + 0.1, type: "spring", stiffness: 300, damping: 18 }}
      style={{
        position: "absolute",
        top: `${(index / (hackathons.length - 1)) * 100}%`,
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
    >
      <motion.div
        animate={{
          boxShadow: [
            `0 0 0px ${color}00`,
            `0 0 18px ${color}88`,
            `0 0 0px ${color}00`,
          ],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.3, ease: "easeInOut" }}
        style={{
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: color,
          border: "2px solid #060A12",
          position: "relative",
        }}
      >
        {/* Outer ring */}
        <div style={{ position: "absolute", inset: "-6px", borderRadius: "50%", border: `1px solid ${color}33` }} />
      </motion.div>
    </motion.div>
  );
}

// ── Card ───────────────────────────────────────────────────────────────────
function HackathonCard({
  item,
  index,
  side,
}: {
  item: Hackathon;
  index: number;
  side: "left" | "right";
}): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === "left" ? -40 : 40, y: 16 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ width: "100%" }}
    >
      <motion.div
        animate={{
          y: hovered ? -4 : 0,
          boxShadow: hovered
            ? `0 0 40px ${item.color}28, 0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`
            : "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
        transition={{ duration: 0.25 }}
        style={{
          background: "rgba(13,17,23,0.88)",
          border: hovered ? `1px solid ${item.color}55` : "1px solid rgba(96,165,250,0.1)",
          borderRadius: "16px",
          padding: "22px 24px",
          backdropFilter: "blur(20px)",
          transition: "border-color 0.25s ease",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hover radial glow — mirrors from the center line side */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at ${side === "left" ? "90%" : "10%"} 0%, ${item.color}14 0%, transparent 65%)`,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Icon */}
            <div
              style={{
                width: "38px", height: "38px", borderRadius: "10px", flexShrink: 0,
                background: `linear-gradient(135deg, ${item.color}22, ${item.color}0d)`,
                border: `1px solid ${item.color}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: hovered ? `0 0 14px ${item.color}44` : "none",
                transition: "box-shadow 0.25s ease",
              }}
            >
              <span style={{ fontFamily: "monospace", fontSize: "16px", color: item.color }}>{item.icon}</span>
            </div>

            {/* Title block */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    color: item.color,
                    background: item.accentBg,
                    border: `1px solid ${item.color}33`,
                    borderRadius: "5px",
                    padding: "2px 7px",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase" as const,
                  }}
                >
                  {item.badge}
                </span>
              </div>
              <h3
                style={{
                  fontFamily: "'Sora', 'DM Sans', sans-serif",
                  fontSize: "15px",
                  fontWeight: 700,
                  color: hovered ? "#22D3EE" : "#F1F5F9",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.25,
                  transition: "color 0.25s ease",
                }}
              >
                {item.title}
              </h3>
            </div>
          </div>
        </div>

        {/* Org */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            color: item.color,
            marginBottom: "4px",
            letterSpacing: "0.04em",
            opacity: 0.8,
          }}
        >
          {item.role} · {item.org}
        </div>

        {/* Tagline */}
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#94A3B8", fontStyle: "italic", marginBottom: "12px" }}>
          {item.tagline}
        </div>

        {/* Highlights */}
        <div style={{ marginBottom: "14px" }}>
          {item.highlights.slice(0, expanded ? item.highlights.length : 2).map((h, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.28 }}
              style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "7px" }}
            >
              <span style={{ color: item.color, fontSize: "13px", marginTop: "2px", flexShrink: 0 }}>▸</span>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#64748B", lineHeight: 1.75, margin: 0 }}>{h}</p>
            </motion.div>
          ))}
          {item.highlights.length > 2 && (
            <button
              onClick={(e: React.MouseEvent) => { e.stopPropagation(); setExpanded(!expanded); }}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10.5px",
                color: item.color,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "4px 0",
                letterSpacing: "0.04em",
                opacity: 0.75,
              }}
            >
              {expanded ? "▴ show less" : `▾ +${item.highlights.length - 2} more`}
            </button>
          )}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10.5px",
                color: "#64748B",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "6px",
                padding: "3px 9px",
                letterSpacing: "0.04em",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom glow */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: "2px",
            background: hovered ? `linear-gradient(90deg, transparent, ${item.color}, transparent)` : "transparent",
            transition: "background 0.3s ease",
            borderRadius: "0 0 16px 16px",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────
export default function ExperienceSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handler = (e: MouseEvent): void =>
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{
        backgroundColor: "#060A12",
        fontFamily: "'DM Sans', 'Sora', sans-serif",
        paddingTop: "100px",
        paddingBottom: "110px",
      }}
      aria-label="Hackathon Experience"
    >
      <GridBackground />
      <ParticleField />

      {/* Mouse-follow glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "700px", height: "700px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)",
          left: `${mousePos.x * 100}%`, top: `${mousePos.y * 100}%`,
          transform: "translate(-50%,-50%)",
          zIndex: 0,
          transition: "left 0.7s ease, top 0.7s ease",
        }}
      />

      <div
        className="relative z-10 w-full max-w-7xl mx-auto"
        style={{ paddingLeft: "clamp(1.5rem,5vw,4rem)", paddingRight: "clamp(1.5rem,5vw,4rem)" }}
      >

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center mb-20"
        >
          {/* Pill */}
          <div
            className="mb-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(96,165,250,0.08)",
              border: "1px solid rgba(96,165,250,0.2)",
              color: "#93C5FD",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{ background: "#34D399", boxShadow: "0 0 8px #34D399" }}
            />
            hackathon experience
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: "'Sora', 'DM Sans', sans-serif",
              fontSize: "clamp(2rem,5vw,3.25rem)",
              fontWeight: 700,
              color: "#F1F5F9",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Built Under Pressure,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Shipped to Win
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.9rem,2vw,1.05rem)",
              color: "#64748B",
              lineHeight: 1.8,
              maxWidth: "520px",
            }}
          >
            Competitive hackathons across Karachi's top universities — tight deadlines met{" "}
            <span style={{ color: "#94A3B8" }}>full-stack engineering</span> and creative problem-solving.
          </motion.p>
        </motion.div>

        {/* ── DESKTOP: Alternating center timeline (lg+) ── */}
        <div
          className="hidden lg:block relative"
          style={{ minHeight: `${hackathons.length * 220}px` }}
        >
          {/* The scroll-driven center line + pulsing dots */}
          <ScrollingTimeline>
            {hackathons.map((item, i) => (
              <TimelineDot key={i} index={i} color={item.color} />
            ))}
          </ScrollingTimeline>

          {/* Alternating cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
            {hackathons.map((item, i) => {
              const side: "left" | "right" = i % 2 === 0 ? "left" : "right";
              return (
                <div
                  key={i}
                  style={{ display: "grid", gridTemplateColumns: "1fr 48px 1fr", alignItems: "center", gap: "0" }}
                >
                  {side === "left" ? (
                    <>
                      {/* Card left */}
                      <div style={{ paddingRight: "40px" }}>
                        <HackathonCard item={item} index={i} side="left" />
                      </div>
                      {/* Center gap (line lives in ScrollingTimeline overlay) */}
                      <div />
                      {/* Year + location right */}
                      <div style={{ paddingLeft: "40px" }}>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.08 + 0.25 }}
                          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: item.color, letterSpacing: "0.1em", opacity: 0.65 }}
                        >
                          {item.year}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.08 + 0.32 }}
                          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#475569", marginTop: "4px" }}
                        >
                          {item.location}
                        </motion.div>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Year + location left */}
                      <div style={{ paddingRight: "40px", textAlign: "right" }}>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.08 + 0.25 }}
                          style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: item.color, letterSpacing: "0.1em", opacity: 0.65 }}
                        >
                          {item.year}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: i * 0.08 + 0.32 }}
                          style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#475569", marginTop: "4px" }}
                        >
                          {item.location}
                        </motion.div>
                      </div>
                      {/* Center gap */}
                      <div />
                      {/* Card right */}
                      <div style={{ paddingLeft: "40px" }}>
                        <HackathonCard item={item} index={i} side="right" />
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MOBILE: Left-aligned timeline (< lg) ── */}
        <div className="lg:hidden relative">
          {/* Mobile vertical line */}
          <div
            style={{ position: "absolute", left: "20px", top: 0, bottom: 0, width: "2px", background: "rgba(96,165,250,0.08)", borderRadius: "999px" }}
          >
            <motion.div
              style={{
                position: "absolute", top: 0, left: 0, right: 0,
                background: "linear-gradient(to bottom, #2563EB, #22D3EE, #7C3AED)",
                borderRadius: "999px",
                boxShadow: "0 0 10px rgba(37,99,235,0.5)",
              }}
              initial={{ height: "0%" }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingLeft: "52px" }}>
            {hackathons.map((item, i) => (
              <div key={i} style={{ position: "relative" }}>
                {/* Mobile dot */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 + 0.1, type: "spring", stiffness: 300, damping: 18 }}
                  style={{
                    position: "absolute", left: "-40px", top: "22px",
                    width: "12px", height: "12px", borderRadius: "50%",
                    background: item.color, border: "2px solid #060A12", zIndex: 2,
                  }}
                >
                  <motion.div
                    animate={{ boxShadow: [`0 0 0px ${item.color}00`, `0 0 14px ${item.color}88`, `0 0 0px ${item.color}00`] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.25 }}
                    style={{ position: "absolute", inset: 0, borderRadius: "50%" }}
                  />
                </motion.div>

                {/* Year label */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10.5px",
                    color: item.color,
                    letterSpacing: "0.1em",
                    opacity: 0.7,
                    marginBottom: "6px",
                  }}
                >
                  {item.year} · {item.location}
                </motion.div>

                <HackathonCard item={item} index={i} side="right" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            marginTop: "80px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 180px), 1fr))",
            gap: "14px",
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                padding: "20px 22px",
                borderRadius: "14px",
                background: "rgba(13,17,23,0.85)",
                border: `1px solid ${s.color}33`,
                backdropFilter: "blur(16px)",
                boxShadow: `0 0 20px ${s.color}14, 0 8px 32px rgba(0,0,0,0.4)`,
                textAlign: "center",
              }}
            >
              <div style={{ fontFamily: "'Sora', monospace", fontSize: "clamp(1.6rem,3.5vw,2.2rem)", fontWeight: 700, color: s.color, letterSpacing: "-0.05em", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12.5px", color: "#64748B", marginTop: "6px", lineHeight: 1.4 }}>
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Section border lines — exact same as AchievementsSection */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, #1E3A5F 30%, #2563EB55 50%, #1E3A5F 70%, transparent 100%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, #1E3A5F 30%, #2563EB55 50%, #1E3A5F 70%, transparent 100%)" }} />
    </section>
  );
}