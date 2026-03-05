import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// Navigation Links
// ─────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Internships", href: "#internship" },
  { label: "Hackathons", href: "#hackathon" },
  { label: "Contact", href: "#contact" },
];

// ─────────────────────────────────────────────
// Brand Logo
// ─────────────────────────────────────────────
function LogoMark({ onClick }: { onClick: (e: React.MouseEvent, href: string) => void }) {
  return (
    <a
      href="#hero"
      onClick={(e) => onClick(e, "#hero")}
      className="flex items-center gap-3 select-none"
      style={{ textDecoration: "none" }}
    >
      <motion.div
        whileHover={{ rotate: 12, scale: 1.08 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-9 h-9 rounded-lg flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg,#2563EB,#7C3AED)",
          fontFamily: "JetBrains Mono",
          fontWeight: 700,
          color: "#fff",
          fontSize: "14px",
        }}
      >
        ZA
      </motion.div>

      <span
        className="hidden sm:block"
        style={{
          fontFamily: "Sora",
          fontSize: "15px",
          fontWeight: 600,
          background: "linear-gradient(90deg,#FFFFFF,#60A5FA,#A78BFA)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Zohaib Ali
      </span>
    </a>
  );
}

// ─────────────────────────────────────────────
// Nav Link
// ─────────────────────────────────────────────
function NavLink({
  label,
  href,
  active,
  onClick,
}: {
  label: string;
  href: string;
  active: boolean;
  onClick: (e: React.MouseEvent, href: string) => void;
}) {
  return (
    <a
      href={href}
      onClick={(e) => onClick(e, href)}
      className="relative text-xs"
      style={{
        fontFamily: "JetBrains Mono",
        color: active ? "#E2E8F0" : "#64748B",
        textDecoration: "none",
      }}
    >
      {label}

      {active && (
        <motion.div
          layoutId="navIndicator"
          className="absolute -bottom-1 left-0 right-0 h-[2px]"
          style={{
            background: "linear-gradient(90deg,#2563EB,#7C3AED)",
          }}
        />
      )}
    </a>
  );
}

// ─────────────────────────────────────────────
// Contact Button
// ─────────────────────────────────────────────
function ContactButton({
  onClick,
}: {
  onClick: (e: React.MouseEvent, href: string) => void;
}) {
  return (
    <motion.a
      href="#contact"
      onClick={(e) => onClick(e, "#contact")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2 rounded-lg text-xs"
      style={{
        fontFamily: "JetBrains Mono",
        background: "linear-gradient(135deg,#2563EB,#7C3AED)",
        color: "#fff",
        textDecoration: "none",
      }}
    >
      Get in touch
    </motion.a>
  );
}

// ─────────────────────────────────────────────
// Hamburger
// ─────────────────────────────────────────────
function Hamburger({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col gap-1 w-5">
      <motion.span
        animate={open ? { rotate: 45, y: 5 } : {}}
        className="h-[2px] bg-slate-300"
      />
      <motion.span
        animate={open ? { opacity: 0 } : {}}
        className="h-[2px] bg-slate-300"
      />
      <motion.span
        animate={open ? { rotate: -45, y: -5 } : {}}
        className="h-[2px] bg-slate-300"
      />
    </div>
  );
}

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────
export default function Navbar() {
  const [active, setActive] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  // highlight active section
  useEffect(() => {
    const sections = NAV_LINKS.map((s) => s.href.replace("#", ""));

    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(id);
          }
        },
        { rootMargin: "-40% 0px -50% 0px" }
      );

      observer.observe(el);
      return observer;
    });

    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // smooth scroll
 const handleClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);

    const id = href.replace("#", "");
    const el = document.getElementById(id);

    if (!el) return;

    const y =
      el.getBoundingClientRect().top +
      window.pageYOffset -
      70;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setActive(id);
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          backdropFilter: "blur(20px)",
          background: "rgba(6,10,18,0.7)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center px-6 h-[64px]">
          
          <LogoMark onClick={handleClick} />

          {/* Desktop Nav */}
          <div className="hidden lg:flex gap-8 mx-auto">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                label={link.label}
                href={link.href}
                active={active === link.href.replace("#", "")}
                onClick={handleClick}
              />
            ))}
          </div>

          {/* Right */}
          <div className="ml-auto flex items-center gap-3">

            {/* desktop CTA */}
            <div className="hidden lg:block">
              <ContactButton onClick={handleClick} />
            </div>

            {/* hamburger */}
            <button
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Hamburger open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div
            className="lg:hidden px-6 pb-6 flex flex-col gap-4"
            style={{
              background: "rgba(6,10,18,0.95)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-sm"
                style={{
                  fontFamily: "JetBrains Mono",
                  color: "#E2E8F0",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            ))}

            <ContactButton onClick={handleClick} />
          </div>
        )}
      </nav>

      <div style={{ height: 70 }} />
    </>
  );
}