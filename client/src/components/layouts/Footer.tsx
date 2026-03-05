import { motion } from "framer-motion";
import { useState } from "react";

function IconMail() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.9 1.19h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 5.98 5.98l1.19-1.19a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconGithub() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

type ContactLinkProps = {
  icon: React.ReactNode;
  value: string;
  href: string;
};

function ContactLink({ icon, value, href }: ContactLinkProps) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        textDecoration: "none",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "12px",
        letterSpacing: "0.02em",
        color: hov ? "#94A3B8" : "#374151",
        transition: "color 0.2s",
      }}
    >
      <span style={{ color: hov ? "#60A5FA" : "#1F2937", transition: "color 0.2s" }}>
        {icon}
      </span>
      {value}
    </a>
  );
}

type SocialBtnProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
  hoverColor: string;
};

function SocialBtn({ icon, label, href, hoverColor }: SocialBtnProps) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        borderRadius: "9px",
        background: hov ? "rgba(255,255,255,0.04)" : "transparent",
        border: `1px solid ${hov ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`,
        color: hov ? hoverColor : "#2D3748",
        transition: "all 0.2s",
        textDecoration: "none",
      }}
    >
      {icon}
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="contact"
      style={{
        backgroundColor: "#060A12",
        position: "relative",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Top accent line */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.35) 30%, rgba(124,58,237,0.35) 70%, transparent)",
      }} />

      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "28px 32px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
      }}>

        {/* Left — name + copyright */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <span style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "14px",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            background: "linear-gradient(90deg, #fff 0%, #60A5FA 50%, #A78BFA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 10px rgba(96,165,250,0.3))",
          }}>
            Zohaib Ali
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            color: "#1F2937",
            letterSpacing: "0.04em",
          }}>
            <span style={{ color: "#2563EB" }}>©</span> {year} · All rights reserved
          </span>
        </motion.div>

        {/* Center — contact links */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <ContactLink
            icon={<IconMail />}
            value="zohaibaliwork@gmail.com"
            href="mailto:zohaibaliwork@gmail.com"
          />
          <div style={{ width: "1px", height: "14px", background: "rgba(255,255,255,0.06)" }} />
          <ContactLink
            icon={<IconPhone />}
            value="+92 336 2082383"
            href="tel:+923362082383"
          />
        </motion.div>

        {/* Right — social icons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <SocialBtn
            icon={<IconLinkedIn />}
            label="LinkedIn"
            href="https://linkedin.com/in/zohaibali"
            hoverColor="#0A84FF"
          />
          <SocialBtn
            icon={<IconGithub />}
            label="GitHub"
            href="https://github.com/githubzohaib"
            hoverColor="#E2E8F0"
          />
        </motion.div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.2) 50%, transparent)",
      }} />
    </footer>
  );
}