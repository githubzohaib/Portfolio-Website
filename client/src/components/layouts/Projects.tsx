import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" style={{ opacity: 0.06 }}>
        <defs>
          <pattern id="projects-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#projects-grid)" />
      </svg>
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "800px",
          background: "radial-gradient(ellipse at center, rgba(37,99,235,0.09) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: "8%",
          top: "15%",
          width: "320px",
          height: "320px",
          background: "radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: "3%",
          bottom: "15%",
          width: "380px",
          height: "380px",
          background: "radial-gradient(ellipse at center, rgba(52,211,153,0.06) 0%, transparent 70%)",
        }}
      />
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
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.id % 3 === 0 ? "#60A5FA" : p.id % 3 === 1 ? "#34D399" : "#7C3AED",
            opacity: p.opacity,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [p.opacity, p.opacity * 0.3, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

const projects = [
  {
    name: "NexusDB",
    description: "Distributed time-series database handling 2.4M writes/sec with sub-4ms P99 latency across 12 shards.",
    gradient: "linear-gradient(135deg, #0F2027 0%, #1a1a2e 40%, #16213e 100%)",
    accent: "#60A5FA",
    accentGlow: "rgba(96,165,250,0.3)",
    tags: ["Go", "Rust", "Kubernetes", "gRPC"],
    icon: "⬡",
  },
  {
    name: "Velox API",
    description: "Edge-deployed GraphQL gateway reducing cold starts by 94% and serving 50M+ daily requests globally.",
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 40%, #2d1b69 100%)",
    accent: "#7C3AED",
    accentGlow: "rgba(124,58,237,0.3)",
    tags: ["TypeScript", "Node.js", "Redis", "AWS"],
    icon: "◈",
  },
  {
    name: "Strata UI",
    description: "Open-source React component library adopted by 3,400+ devs with zero-runtime CSS-in-TS architecture.",
    gradient: "linear-gradient(135deg, #001a1a 0%, #003333 40%, #004d4d 100%)",
    accent: "#22D3EE",
    accentGlow: "rgba(34,211,238,0.3)",
    tags: ["React", "TypeScript", "Tailwind", "Vitest"],
    icon: "◧",
  },
  {
    name: "Chronos ML",
    description: "Real-time anomaly detection pipeline processing telemetry streams with <200ms inference latency.",
    gradient: "linear-gradient(135deg, #0a1a0a 0%, #0d2b0d 40%, #1a3a1a 100%)",
    accent: "#34D399",
    accentGlow: "rgba(52,211,153,0.3)",
    tags: ["Python", "Go", "Kafka", "PostgreSQL"],
    icon: "⬟",
  },
  {
    name: "Orbital Auth",
    description: "Zero-trust identity platform issuing 8M+ JWT tokens daily with hardware-backed key attestation.",
    gradient: "linear-gradient(135deg, #1a0a00 0%, #2d1500 40%, #3d1f00 100%)",
    accent: "#F59E0B",
    accentGlow: "rgba(245,158,11,0.3)",
    tags: ["Go", "Redis", "Docker", "Terraform"],
    icon: "⬠",
  },
  {
    name: "Pulsar Infra",
    description: "GitOps-driven platform engineering toolkit slashing deployment cycles from 45 min to under 3 minutes.",
    gradient: "linear-gradient(135deg, #1a001a 0%, #2d002d 40%, #3d003d 100%)",
    accent: "#F87171",
    accentGlow: "rgba(248,113,113,0.3)",
    tags: ["Kubernetes", "Terraform", "Go", "Prometheus"],
    icon: "◉",
  },
];

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 200, damping: 22 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mx, my]
  );

  const handleMouseLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }, [mx, my]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 900,
        }}
        animate={{ y: [0, -5, 0] }}
        transition={{
          y: {
            duration: 4.5 + index * 0.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          },
        }}
      >
        <div
          style={{
            background: "rgba(13,17,23,0.85)",
            border: hovered
              ? `1px solid ${project.accent}55`
              : "1px solid rgba(96,165,250,0.1)",
            borderRadius: "18px",
            overflow: "hidden",
            backdropFilter: "blur(20px)",
            boxShadow: hovered
              ? `0 0 40px ${project.accentGlow}, 0 20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)`
              : "0 4px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
            transition: "border 0.25s ease, box-shadow 0.25s ease",
          }}
        >
          <div
            style={{
              position: "relative",
              height: "180px",
              background: project.gradient,
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                position: "absolute",
                inset: 0,
                background: project.gradient,
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `radial-gradient(ellipse at 30% 40%, ${project.accentGlow} 0%, transparent 65%)`,
                opacity: 0.7,
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(255,255,255,0.015) 30px, rgba(255,255,255,0.015) 31px), repeating-linear-gradient(90deg, transparent, transparent 30px, rgba(255,255,255,0.015) 30px, rgba(255,255,255,0.015) 31px)`,
              }}
            />

            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "52px",
                color: project.accent,
                opacity: hovered ? 0.15 : 0.25,
                transition: "opacity 0.25s ease",
                fontFamily: "monospace",
                userSelect: "none",
                filter: `drop-shadow(0 0 20px ${project.accent})`,
              }}
            >
              {project.icon}
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "12px",
                left: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  color: project.accent,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  background: `${project.accentGlow}`,
                  border: `1px solid ${project.accent}44`,
                  borderRadius: "6px",
                  padding: "3px 8px",
                  backdropFilter: "blur(8px)",
                }}
              >
                {project.tags[0]}
              </span>
            </div>

            <motion.div
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(6,10,18,0.75)",
                backdropFilter: "blur(4px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
              }}
            >
              <motion.a
                href="#"
                onClick={(e) => e.preventDefault()}
                animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#fff",
                  background: `linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)`,
                  padding: "9px 18px",
                  borderRadius: "9px",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  boxShadow: "0 0 20px rgba(37,99,235,0.4)",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
              >
                Live Demo →
              </motion.a>
              <motion.a
                href="#"
                onClick={(e) => e.preventDefault()}
                animate={{ y: hovered ? 0 : 16, opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.25, delay: 0.1 }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#94A3B8",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  padding: "9px 18px",
                  borderRadius: "9px",
                  textDecoration: "none",
                  letterSpacing: "0.04em",
                  backdropFilter: "blur(8px)",
                  display: "inline-block",
                  whiteSpace: "nowrap",
                }}
              >
                GitHub
              </motion.a>
            </motion.div>
          </div>

          <div style={{ padding: "20px 22px 22px" }}>
            <h3
              style={{
                fontFamily: "'Sora', 'DM Sans', sans-serif",
                fontSize: "16px",
                fontWeight: 700,
                color: hovered ? "#22D3EE" : "#F1F5F9",
                letterSpacing: "-0.03em",
                marginBottom: "8px",
                transition: "color 0.25s ease",
              }}
            >
              {project.name}
            </h3>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                color: "#64748B",
                lineHeight: 1.7,
                marginBottom: "16px",
              }}
            >
              {project.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {project.tags.map((tag) => (
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
          </div>

          <div
            style={{
              height: "2px",
              background: hovered
                ? `linear-gradient(90deg, transparent, ${project.accent}, transparent)`
                : "transparent",
              transition: "background 0.3s ease",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
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
      aria-label="Projects"
    >
      <GridBackground />
      <ParticleField />

      <div
        className="absolute pointer-events-none transition-all duration-700"
        style={{
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)",
          left: `${mousePos.x * 100}%`,
          top: `${mousePos.y * 100}%`,
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      />

      <div
        className="relative z-10 w-full max-w-7xl mx-auto"
        style={{ paddingLeft: "clamp(1.5rem, 5vw, 4rem)", paddingRight: "clamp(1.5rem, 5vw, 4rem)" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col items-center text-center mb-16"
        >
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
            projects
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              fontFamily: "'Sora', 'DM Sans', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 700,
              color: "#F1F5F9",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Selected{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Work
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              color: "#64748B",
              lineHeight: 1.8,
              maxWidth: "520px",
            }}
          >
            A selection of systems built for{" "}
            <span style={{ color: "#94A3B8" }}>scale, speed and reliability</span> — each one
            shipped to production and battle-tested under real load.
          </motion.p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
            gap: "20px",
          }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} inView={inView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex justify-center mt-14"
        >
          <motion.a
            href="#"
            onClick={(e) => e.preventDefault()}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "13px",
              fontWeight: 600,
              color: "#94A3B8",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.09)",
              padding: "12px 28px",
              borderRadius: "12px",
              textDecoration: "none",
              letterSpacing: "0.04em",
              backdropFilter: "blur(10px)",
              transition: "border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(96,165,250,0.4)";
              el.style.color = "#E2E8F0";
              el.style.boxShadow = "0 0 24px rgba(96,165,250,0.12)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = "rgba(255,255,255,0.09)";
              el.style.color = "#94A3B8";
              el.style.boxShadow = "none";
            }}
          >
            <span>View all projects on GitHub</span>
            <span style={{ color: "#60A5FA" }}>→</span>
          </motion.a>
        </motion.div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #1E3A5F 30%, #2563EB55 50%, #1E3A5F 70%, transparent 100%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #1E3A5F 30%, #2563EB55 50%, #1E3A5F 70%, transparent 100%)",
        }}
      />
    </section>
  );
}