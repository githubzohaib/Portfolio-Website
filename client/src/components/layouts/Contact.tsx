import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg width="100%" height="100%" style={{ opacity: 0.06 }}>
        <defs>
          <pattern id="contact-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#60A5FA" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contact-grid)" />
      </svg>
      <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "800px", background: "radial-gradient(ellipse at center, rgba(37,99,235,0.09) 0%, rgba(124,58,237,0.04) 40%, transparent 70%)", filter: "blur(2px)" }} />
      <div style={{ position: "absolute", right: "5%", top: "15%", width: "340px", height: "340px", background: "radial-gradient(ellipse at center, rgba(34,211,238,0.06) 0%, transparent 70%)" }} />
      <div style={{ position: "absolute", left: "4%", bottom: "15%", width: "300px", height: "300px", background: "radial-gradient(ellipse at center, rgba(52,211,153,0.05) 0%, transparent 70%)" }} />
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

const contactLinks = [
  { label: "GitHub", handle: "githubzohaib", icon: "⬡", color: "#60A5FA", href: "https://github.com/githubzohaib" },
  { label: "LinkedIn", handle: "Zohaib Ali", icon: "◈", color: "#22D3EE", href: "https://www.linkedin.com/in/zohaib-ali-5251b328b/" },
  { label: "Email", handle: "zohaibaliwork@gmail.com", icon: "◉", color: "#7C3AED", href: "mailto:zohaibaliwork@gmail.com" },
];

function ContactLink({ item, index, inView }: { item: typeof contactLinks[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.a
      href={item.href}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.5 + index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "flex", alignItems: "center", gap: "14px", padding: "14px 18px", borderRadius: "12px", background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)", border: hovered ? `1px solid ${item.color}44` : "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", textDecoration: "none", transition: "all 0.25s ease", boxShadow: hovered ? `0 0 20px ${item.color}18` : "none" }}
    >
      <div style={{ width: "36px", height: "36px", borderRadius: "9px", background: `linear-gradient(135deg, ${item.color}22, ${item.color}0d)`, border: `1px solid ${item.color}33`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: hovered ? `0 0 12px ${item.color}44` : "none", transition: "box-shadow 0.25s ease" }}>
        <span style={{ fontFamily: "monospace", fontSize: "14px", color: item.color }}>{item.icon}</span>
      </div>
      <div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "2px" }}>{item.label}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: hovered ? "#F1F5F9" : "#64748B", transition: "color 0.25s ease" }}>{item.handle}</div>
      </div>
      <motion.span animate={{ x: hovered ? 4 : 0, opacity: hovered ? 1 : 0 }} transition={{ duration: 0.2 }} style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: item.color }}>→</motion.span>
    </motion.a>
  );
}

function FloatingInput({ label, type = "text", placeholder, value, onChange, multiline = false, delay, inView }: {
  label: string; type?: string; placeholder: string; value: string;
  onChange: (v: string) => void; multiline?: boolean; delay: number; inView: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const filled = value.length > 0;

  const sharedStyle: React.CSSProperties = {
    width: "100%",
    background: focused ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
    border: focused ? "1px solid rgba(96,165,250,0.55)" : filled ? "1px solid rgba(96,165,250,0.25)" : "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: multiline ? "42px 18px 16px" : "28px 18px 10px",
    color: "#F1F5F9",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    outline: "none",
    resize: "none" as const,
    boxShadow: focused ? "0 0 0 3px rgba(37,99,235,0.12), 0 4px 20px rgba(0,0,0,0.3)" : "0 2px 12px rgba(0,0,0,0.2)",
    transition: "all 0.25s ease",
    lineHeight: 1.6,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ position: "relative" }}
    >
      <motion.label
        animate={{ y: focused || filled ? 0 : 10, fontSize: focused || filled ? "10px" : "13px", color: focused ? "#60A5FA" : filled ? "#64748B" : "#334155" }}
        transition={{ duration: 0.2 }}
        style={{ position: "absolute", left: "18px", top: "12px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em", textTransform: "uppercase", pointerEvents: "none", zIndex: 2, display: "block" }}
      >
        {label}
      </motion.label>

      {focused && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: "absolute", inset: "-1px", borderRadius: "13px", background: "radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }}
        />
      )}

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ""}
          rows={5}
          style={{ ...sharedStyle, minHeight: "140px" }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={focused ? placeholder : ""}
          style={sharedStyle}
        />
      )}

      {focused && (
        <motion.div
          layoutId="focus-line"
          style={{ position: "absolute", bottom: "0", left: "10%", right: "10%", height: "2px", background: "linear-gradient(90deg, transparent, #2563EB, #22D3EE, transparent)", borderRadius: "999px" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={{ scaleX: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 40px", textAlign: "center", gap: "20px" }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 16 }}
        style={{ width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg, rgba(52,211,153,0.2), rgba(52,211,153,0.08))", border: "1px solid rgba(52,211,153,0.4)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(52,211,153,0.3)" }}
      >
        <motion.svg width="32" height="32" viewBox="0 0 32 32" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
        >
          <motion.path d="M 7 16 L 13 22 L 25 10" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.35, duration: 0.5 }}
          />
        </motion.svg>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div style={{ fontFamily: "'Sora', sans-serif", fontSize: "20px", fontWeight: 700, color: "#F1F5F9", letterSpacing: "-0.03em", marginBottom: "8px" }}>Message sent!</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "#64748B", lineHeight: 1.7, maxWidth: "280px" }}>
          Thanks for reaching out — I'll get back to you within <span style={{ color: "#94A3B8" }}>24 hours</span>.
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
        style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#34D399" }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#334155", letterSpacing: "0.08em" }}>response within 24h</span>
      </motion.div>
    </motion.div>
  );
}

export default function ContactSection(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!name || !email || !message) return;

  setSubmitting(true);
  await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, message }),
  });
  setSubmitting(false);
  setSubmitted(true);
};

  const canSubmit = name.trim() && email.trim() && message.trim();

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: "#060A12", fontFamily: "'DM Sans', 'Sora', sans-serif", paddingTop: "100px", paddingBottom: "110px" }}
      aria-label="Contact"
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
            get in touch
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ fontFamily: "'Sora', 'DM Sans', sans-serif", fontSize: "clamp(2rem,5vw,3.25rem)", fontWeight: 700, color: "#F1F5F9", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "16px" }}
          >
            Let's Build Something{" "}
            <span style={{ background: "linear-gradient(135deg, #2563EB 0%, #22D3EE 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Meaningful</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(0.9rem,2vw,1.05rem)", color: "#64748B", lineHeight: 1.8, maxWidth: "520px" }}
          >
            Whether it's a new role, an open-source collaboration, or a hard engineering problem —
            I'm always up for a <span style={{ color: "#94A3B8" }}>good conversation</span>.
          </motion.p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* LEFT */}
          <div className="flex-1 w-full min-w-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{ marginBottom: "36px" }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#334155", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
                <span>Connect</span>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(96,165,250,0.2), transparent)" }} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {contactLinks.map((item, i) => (
                  <ContactLink key={i} item={item} index={i} inView={inView} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              style={{ padding: "22px 24px", borderRadius: "16px", background: "rgba(13,17,23,0.85)", border: "1px solid rgba(52,211,153,0.15)", backdropFilter: "blur(16px)", boxShadow: "0 0 24px rgba(52,211,153,0.06)" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <motion.div animate={{ scale: [1, 1.35, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34D399", boxShadow: "0 0 10px #34D399", flexShrink: 0 }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#34D399", letterSpacing: "0.1em", textTransform: "uppercase" }}>Available for new roles</span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#64748B", lineHeight: 1.75, marginBottom: "14px" }}>
                Open to <span style={{ color: "#94A3B8" }}>Full Stack Developer</span> roles focused on distributed systems, platform engineering or developer tooling.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                {["Full Stack Developer", "Frontend Developer", "Developer", "Distributed Systems", "Platform Eng."].map((tag) => (
                  <span key={tag} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10.5px", color: "#64748B", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "6px", padding: "3px 9px", letterSpacing: "0.04em" }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full lg:w-auto"
            style={{ flexShrink: 0, width: "clamp(280px, 46vw, 520px)" }}
          >
            <div style={{ borderRadius: "20px", overflow: "hidden", background: "rgba(13,17,23,0.88)", border: "1px solid rgba(96,165,250,0.12)", backdropFilter: "blur(24px)", boxShadow: "0 0 0 1px rgba(96,165,250,0.05), 0 40px 80px rgba(0,0,0,0.55), 0 0 80px rgba(37,99,235,0.07)" }}>

              {/* Window chrome */}
              <div style={{ padding: "12px 18px", background: "#161B22", borderBottom: "1px solid #21262D", display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FF5F57" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#FFBD2E" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28C840" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#4B5563", marginLeft: "8px", letterSpacing: "0.05em" }}>message.send</span>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
                  <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2.2, repeat: Infinity }} style={{ width: "6px", height: "6px", borderRadius: "50%", background: submitted ? "#34D399" : "#60A5FA" }} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: submitted ? "#34D399" : "#60A5FA" }}>{submitted ? "sent" : "ready"}</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <SuccessState />
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", gap: "16px" }}
                  >
                    <FloatingInput label="Name" placeholder="Zohaib Ali" value={name} onChange={setName} delay={0.4} inView={inView} />
                    <FloatingInput label="Email" type="email" placeholder="zohaibaliwork@gmail.com" value={email} onChange={setEmail} delay={0.48} inView={inView} />
                    <FloatingInput label="Message" placeholder="Tell me about the project..." value={message} onChange={setMessage} multiline delay={0.56} inView={inView} />

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.65 }}
                    >
                      <motion.button
                        type="submit"
                        disabled={!canSubmit || submitting}
                        onMouseEnter={() => setBtnHovered(true)}
                        onMouseLeave={() => setBtnHovered(false)}
                        whileHover={canSubmit && !submitting ? { scale: 1.02, y: -2 } : {}}
                        whileTap={canSubmit && !submitting ? { scale: 0.97 } : {}}
                        style={{
                          width: "100%",
                          padding: "15px 32px",
                          borderRadius: "13px",
                          border: "none",
                          background: canSubmit ? "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)" : "rgba(255,255,255,0.05)",
                          color: canSubmit ? "#fff" : "#334155",
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "13px",
                          fontWeight: 600,
                          letterSpacing: "0.04em",
                          cursor: canSubmit && !submitting ? "pointer" : "not-allowed",
                          boxShadow: canSubmit && btnHovered ? "0 0 50px rgba(37,99,235,0.5), 0 0 100px rgba(124,58,237,0.2), 0 8px 32px rgba(0,0,0,0.4)" : canSubmit ? "0 0 30px rgba(37,99,235,0.3), 0 4px 20px rgba(0,0,0,0.35)" : "none",
                          transition: "background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease",
                          position: "relative",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                        }}
                      >
                        {canSubmit && (
                          <motion.span style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 100%)" }}
                            initial={{ opacity: 0 }} animate={{ opacity: btnHovered ? 1 : 0 }} transition={{ duration: 0.25 }} />
                        )}

                        <AnimatePresence mode="wait">
                          {submitting ? (
                            <motion.span key="loading" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                style={{ display: "inline-block", width: "14px", height: "14px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                              Sending...
                            </motion.span>
                          ) : (
                            <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "relative", display: "flex", alignItems: "center", gap: "8px" }}>
                              {canSubmit ? (
                                <>
                                  <motion.span animate={{ x: btnHovered ? 2 : 0 }} transition={{ duration: 0.2 }}>Send Message</motion.span>
                                  <motion.span animate={{ x: btnHovered ? 3 : 0, opacity: btnHovered ? 1 : 0.6 }} transition={{ duration: 0.2 }} style={{ fontSize: "14px" }}>→</motion.span>
                                </>
                              ) : "Fill in all fields"}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={inView ? { opacity: 1 } : {}}
                      transition={{ delay: 0.8 }}
                      style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}
                    >
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10.5px", color: "#1E3A5F", letterSpacing: "0.06em" }}>⚡</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10.5px", color: "#334155", letterSpacing: "0.06em" }}>Typically responds within 24 hours</span>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>

              <div style={{ height: "2px", background: "linear-gradient(90deg, transparent, #2563EB, #22D3EE, transparent)" }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1 }}
        style={{ marginTop: "80px", borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "36px", paddingLeft: "clamp(1.5rem,5vw,4rem)", paddingRight: "clamp(1.5rem,5vw,4rem)" }}
      >
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "linear-gradient(135deg, #2563EB22, #7C3AED11)", border: "1px solid rgba(96,165,250,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "monospace", fontSize: "12px", color: "#60A5FA" }}>⬡</span>
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: "#1E3A5F", letterSpacing: "0.06em" }}>Alex Chen · 2025</span>
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Projects", "Skills", "Resume", "Contact"].map((item) => (
              <a key={item} href="#" onClick={(e) => e.preventDefault()}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#334155", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s ease" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#60A5FA"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#334155"; }}
              >
                {item}
              </a>
            ))}
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#1E3A5F", letterSpacing: "0.06em" }}>Built with React + Framer Motion</span>
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, #1E3A5F 30%, #2563EB55 50%, #1E3A5F 70%, transparent 100%)" }} />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent 0%, #1E3A5F 30%, #2563EB55 50%, #1E3A5F 70%, transparent 100%)" }} />
    </section>
  );
}