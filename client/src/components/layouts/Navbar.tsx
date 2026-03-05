import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

// ─── Nav links ────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Hero",       href: "#hero" },
  { label: "About Me",   href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects" },
  { label: "Internship", href: "#internship" },
  { label: "Hackathon",  href: "#hackathon" },
];

// ─── Animated logo mark ──────────────────────────────────────────────────────
function LogoMark() {
  return (
    <a
      href="#hero"
      className="flex items-center gap-2.5 group select-none flex-shrink-0"
      aria-label="Home"
    >
      <div className="flex flex-col leading-none">
        <motion.span
          className="font-black"
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: "15px",
            letterSpacing: "-0.04em",
            background: "linear-gradient(90deg, #FFFFFF 0%, #60A5FA 45%, #A78BFA 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 12px rgba(96,165,250,0.45))",
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          Zohaib Ali
        </motion.span>
      </div>
    </a>
  );
}

// ─── Desktop Nav Link ─────────────────────────────────────────────────────────
interface NavLinkProps {
  label: string;
  href: string;
  isActive: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function NavLink({ label, href, isActive, onClick }: NavLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="relative px-1 py-1 group"
      style={{
        textDecoration: "none",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      <span
        className="relative z-10 text-xs transition-colors duration-200"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          letterSpacing: "0.04em",
          color: isActive ? "#E2E8F0" : "#4B5563",
          fontWeight: isActive ? "600" : "400",
          whiteSpace: "nowrap",
        }}
      >
        <span
          className="mr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          style={{ color: "#2563EB", fontSize: "10px" }}
        >
          ./
        </span>
        {label}
      </span>

      {/* Underline glow on hover */}
      <span
        className="absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
        style={{ background: "linear-gradient(90deg, #2563EB, #7C3AED)" }}
      />

      {/* Active dot */}
      {isActive && (
        <motion.span
          layoutId="activeNavDot"
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: "#60A5FA", boxShadow: "0 0 6px #60A5FA" }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </a>
  );
}

// ─── Get In Touch button ──────────────────────────────────────────────────────
interface ContactButtonProps {
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

function ContactButton({ onClick }: ContactButtonProps) {
  return (
    <motion.a
      href="#contact"
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className="relative px-4 py-2 rounded-lg text-xs font-semibold overflow-hidden group flex-shrink-0"
      style={{
        background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
        color: "#fff",
        fontFamily: "'JetBrains Mono', monospace",
        letterSpacing: "0.04em",
        boxShadow: "0 0 20px rgba(37,99,235,0.3), 0 2px 12px rgba(0,0,0,0.4)",
        textDecoration: "none",
        whiteSpace: "nowrap",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
      }}
    >
      <span
        className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }}
      />
      <span className="relative flex items-center gap-1.5">
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#34D399", boxShadow: "0 0 5px #34D399" }}
        />
        Get in touch
      </span>
    </motion.a>
  );
}

// ─── Mobile hamburger icon ────────────────────────────────────────────────────
interface HamburgerIconProps {
  open: boolean;
}

function HamburgerIcon({ open }: HamburgerIconProps) {
  return (
    <div className="flex flex-col justify-center gap-1.5 w-5 h-5">
      <motion.span
        animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        className="block h-px rounded-full origin-center"
        style={{ background: "#94A3B8" }}
        transition={{ duration: 0.25 }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        className="block h-px rounded-full"
        style={{ background: "#94A3B8" }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        className="block h-px rounded-full origin-center"
        style={{ background: "#94A3B8" }}
        transition={{ duration: 0.25 }}
      />
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────
export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Track scroll for glass intensity
  useEffect(() => {
    const unsub = scrollY.on("change", (v) => setScrolled(v > 20));
    return unsub;
  }, [scrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Intersection observer to highlight active section
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // ─── Smooth scroll helper ─────────────────────────────────────────────────
  const smoothScrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      window.location.hash = href;
    }
  };

  // ─── Unified click handler ────────────────────────────────────────────────
  const handleNavClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string
) => {
  e.preventDefault();
  setMobileOpen(false);
  setTimeout(() => smoothScrollTo(href), 60);
};

  return (
    <>
      {/* ── Sticky Navbar ─────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          background: scrolled ? "rgba(6,10,18,0.75)" : "rgba(6,10,18,0.45)",
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          borderBottom: scrolled
            ? "1px solid rgba(96,165,250,0.12)"
            : "1px solid rgba(255,255,255,0.04)",
          boxShadow: scrolled
            ? "0 4px 32px rgba(0,0,0,0.5), 0 1px 0 rgba(96,165,250,0.08)"
            : "none",
          transition: "background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease",
        }}
        aria-label="Primary navigation"
      >
        {/* Subtle top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(37,99,235,0.6) 30%, rgba(124,58,237,0.6) 60%, transparent 100%)",
            opacity: scrolled ? 1 : 0.4,
            transition: "opacity 0.35s ease",
          }}
        />

        {/* ── Top bar ─────────────────────────────────────────────────── */}
        <div
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-16"
          style={{
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo – always visible, never shrinks */}
          <LogoMark />

          {/*
            ── Desktop nav links ──────────────────────────────────────────
            Breakpoint: xl (1280px+)
            Nest Hub is 1024px → falls into hamburger. This prevents the
            "About Me" wrapping bug entirely.
          */}
          <nav
            className="hidden xl:flex items-center gap-5"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
            }}
          >
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                label={link.label}
                href={link.href}
                isActive={activeSection === link.href.replace("#", "")}
                onClick={(e) => handleNavClick(e, link.href)}
              />
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* CTA – desktop only (xl+) */}
            <div className="hidden xl:block">
              <ContactButton onClick={(e) => handleNavClick(e, "#contact")} />
            </div>

            {/*
              Hamburger – shown on everything below xl.
              This covers: phones, tablets, Nest Hub (1024px), Nest Hub Max (1280px-1px).
            */}
            <button
              className="xl:hidden p-2 rounded-lg transition-colors duration-150"
              style={{
                background: mobileOpen ? "rgba(96,165,250,0.08)" : "transparent",
                border: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                lineHeight: 0,
              }}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* ── Dropdown menu (phones, tablets, Nest Hub) ─────────────────── */}
        <motion.div
          initial={false}
          animate={{ height: mobileOpen ? "auto" : 0, opacity: mobileOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            overflow: "hidden",
            borderTop: mobileOpen ? "1px solid rgba(255,255,255,0.05)" : "none",
          }}
          className="xl:hidden"
        >
          <div
            className="px-4 sm:px-6 py-4 flex flex-col gap-1"
            style={{ background: "rgba(6,10,18,0.97)" }}
          >
            {NAV_LINKS.map((link, i) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                /*
                  Use plain <a> (not motion.a) so touch events fire reliably.
                  motion.a can swallow touch taps on some mobile browsers.
                */
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-150"
                  style={{
                    textDecoration: "none",
                    background: isActive ? "rgba(37,99,235,0.12)" : "transparent",
                    border: isActive
                      ? "1px solid rgba(96,165,250,0.2)"
                      : "1px solid transparent",
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                    touchAction: "manipulation",
                    userSelect: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px",
                      color: "#2563EB",
                      minWidth: "16px",
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "13px",
                      letterSpacing: "0.04em",
                      color: isActive ? "#E2E8F0" : "#94A3B8",
                      fontWeight: isActive ? "600" : "400",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {link.label}
                  </span>

                  {isActive && (
                    <span
                      className="ml-auto flex-shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ background: "#60A5FA", boxShadow: "0 0 6px #60A5FA" }}
                    />
                  )}
                </a>
              );
            })}

            {/* "Get in touch" CTA inside the menu */}
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="mt-3 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold"
              style={{
                background: "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
                color: "#fff",
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.06em",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(37,99,235,0.25)",
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                touchAction: "manipulation",
                userSelect: "none",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ background: "#34D399", boxShadow: "0 0 5px #34D399" }}
              />
              Get in touch
            </a>
          </div>
        </motion.div>
      </motion.nav>

      {/* Spacer so page content isn't hidden under the fixed navbar */}
      <div style={{ height: "60px" }} aria-hidden="true" />
    </>
  );
}