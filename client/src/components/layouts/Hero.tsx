import { motion } from "framer-motion";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function HeroSection(): JSX.Element {
  return (
    <section
      className="relative min-h-screen w-full flex items-center overflow-hidden"
      style={{ backgroundColor: "#0F172A" }}
      aria-label="Hero"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 70% 50%, #2563EB22 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-24 flex flex-col lg:flex-row items-center gap-16 lg:gap-0">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium tracking-widest uppercase"
            style={{
              borderColor: "#2563EB44",
              backgroundColor: "#2563EB11",
              color: "#94A3B8",
              fontFamily: "Inter, sans-serif",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#22D3EE" }}
            />
            Available for opportunities
          </motion.div>

          <motion.h1
            {...fadeUp(0)}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "#E5E7EB",
              letterSpacing: "-0.03em",
            }}
          >
            I design and build{" "}
            <span style={{ color: "#2563EB" }}>scalable</span>{" "}
            software systems.
          </motion.h1>

          <motion.p
            {...fadeUp(0.1)}
            className="text-lg sm:text-xl mb-10 max-w-xl"
            style={{
              fontFamily: "Inter, sans-serif",
              color: "#94A3B8",
              lineHeight: 1.7,
            }}
          >
            Focused on performance, architecture, and real-world impact.
          </motion.p>

          <motion.div
            {...fadeUp(0.2)}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <button
              className="px-7 py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              style={{
                backgroundColor: "#2563EB",
                color: "#E5E7EB",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 0 20px #22D3EE44, 0 4px 24px #2563EB55";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
              aria-label="View Projects"
            >
              View Projects
            </button>

            <button
              className="px-7 py-3.5 rounded-lg font-semibold text-sm border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              style={{
                borderColor: "#2563EB55",
                color: "#94A3B8",
                backgroundColor: "transparent",
                fontFamily: "Inter, sans-serif",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.transform = "translateY(-2px)";
                el.style.borderColor = "#22D3EE88";
                el.style.color = "#E5E7EB";
                el.style.boxShadow = "0 0 16px #22D3EE22";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "#2563EB55";
                el.style.color = "#94A3B8";
                el.style.boxShadow = "none";
              }}
              aria-label="Download Resume"
            >
              Download Resume
            </button>
          </motion.div>
        </div>

        <div className="flex-1 flex items-center justify-center lg:justify-end">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px]">
            <motion.div
              animate={{ y: [0, -18, 0], rotate: [0, 4, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-full opacity-20"
              style={{
                background: "radial-gradient(ellipse at 40% 40%, #2563EB 0%, #0F172A 70%)",
                filter: "blur(2px)",
              }}
            />

            <motion.div
              animate={{ y: [0, 14, 0], rotate: [0, -6, 0], scale: [1, 1.04, 1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute inset-8 rounded-full opacity-30"
              style={{
                background: "radial-gradient(ellipse at 60% 60%, #22D3EE 0%, #2563EB 40%, transparent 70%)",
                filter: "blur(1px)",
              }}
            />

            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div
                className="w-full h-full rounded-full opacity-10"
                style={{
                  background: "conic-gradient(from 0deg, transparent 60%, #2563EB 80%, transparent 100%)",
                }}
              />
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-12 rounded-full"
              style={{ border: "1px solid #2563EB55" }}
            />

            <motion.div
              animate={{ scale: [1.08, 1, 1.08], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute inset-4 rounded-full"
              style={{ border: "1px solid #22D3EE33" }}
            />

            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-24 h-24 rounded-2xl flex items-center justify-center"
                style={{
                  backgroundColor: "#020617",
                  border: "1px solid #2563EB33",
                  boxShadow: "0 0 40px #2563EB22",
                }}
              >
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <rect x="6" y="6" width="12" height="12" rx="2" fill="#2563EB" opacity="0.9" />
                  <rect x="22" y="6" width="12" height="12" rx="2" fill="#22D3EE" opacity="0.6" />
                  <rect x="6" y="22" width="12" height="12" rx="2" fill="#22D3EE" opacity="0.4" />
                  <rect x="22" y="22" width="12" height="12" rx="2" fill="#2563EB" opacity="0.7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, #2563EB, #22D3EE, #2563EB, transparent)",
        }}
      />
    </section>
  );
}