import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] },
});

export default function AboutMe(): JSX.Element {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const animate = isInView ? "animate" : "initial";

  return (
    <section
      ref={ref}
      aria-label="About Me"
      className="w-full py-24 sm:py-32"
      style={{ backgroundColor: "#0F172A" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium tracking-widest uppercase"
              style={{
                borderColor: "#2563EB44",
                backgroundColor: "#2563EB0D",
                color: "#94A3B8",
                fontFamily: "Inter, sans-serif",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "#22D3EE" }}
              />
              About Me
            </motion.div>

            <motion.h2
              {...fadeUp(0.1)}
              animate={animate === "animate" ? fadeUp(0.1).animate : fadeUp(0.1).initial}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#E5E7EB",
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }}
            >
              Crafting systems that{" "}
              <span style={{ color: "#2563EB" }}>scale</span> and{" "}
              <span style={{ color: "#2563EB" }}>last</span>.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-base sm:text-lg mb-5 max-w-xl"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#94A3B8",
                lineHeight: 1.75,
              }}
            >
              I'm a software engineer who enjoys building scalable, user-focused systems with clean architecture and thoughtful design.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 28 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
              transition={{ duration: 0.65, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-base sm:text-lg mb-8 max-w-xl"
              style={{
                fontFamily: "Inter, sans-serif",
                color: "#94A3B8",
                lineHeight: 1.75,
              }}
            >
              I focus on writing maintainable code, optimizing performance, and turning complex problems into simple, reliable solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border max-w-xl w-full"
              style={{
                borderColor: "#1E293B",
                backgroundColor: "#020617",
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#2563EB1A" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="3" fill="#22D3EE" opacity="0.9" />
                  <circle cx="8" cy="8" r="6.5" stroke="#2563EB" strokeWidth="1" opacity="0.5" />
                </svg>
              </div>
              <p
                className="text-sm"
                style={{
                  fontFamily: "Inter, sans-serif",
                  color: "#94A3B8",
                  lineHeight: 1.6,
                }}
              >
                Currently exploring modern frontend architecture and system design.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="mt-10 flex flex-wrap gap-6 items-center justify-center lg:justify-start"
            >
              {[
                { label: "Years Experience", value: "5+" },
                { label: "Projects Shipped", value: "30+" },
                { label: "Systems Designed", value: "12+" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center lg:items-start">
                  <span
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "#E5E7EB",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-xs mt-0.5"
                    style={{
                      fontFamily: "Inter, sans-serif",
                      color: "#94A3B8",
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex-1 flex items-center justify-center lg:justify-end order-1 lg:order-2 w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-sm lg:max-w-none"
              style={{ maxWidth: "420px" }}
            >
              <div
                className="absolute -inset-4 rounded-2xl opacity-20 blur-2xl"
                style={{ backgroundColor: "#2563EB" }}
                aria-hidden="true"
              />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative group"
              >
                <div
                  className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
                  style={{ backgroundColor: "#22D3EE22" }}
                  aria-hidden="true"
                />

                <div
                  className="relative rounded-2xl overflow-hidden w-full"
                  style={{
                    border: "1px solid #1E293B",
                    backgroundColor: "#020617",
                    aspectRatio: "4/5",
                    transition: "box-shadow 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 0 32px #22D3EE22, 0 0 80px #2563EB22";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=840&q=80&auto=format&fit=crop"
                    alt="Software engineer working at a desk with code on screen"
                    className="w-full h-full object-cover opacity-80"
                    style={{ transition: "opacity 0.4s ease" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = "0.8";
                    }}
                  />

                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, #020617 0%, transparent 50%)",
                    }}
                    aria-hidden="true"
                  />

                  <div
                    className="absolute bottom-0 left-0 right-0 p-5"
                  >
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{
                        backgroundColor: "#0F172ACC",
                        border: "1px solid #1E293B",
                        color: "#94A3B8",
                        fontFamily: "Inter, sans-serif",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: "#22D3EE" }}
                      />
                      Open to new opportunities
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -6, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-4 w-16 h-16 rounded-xl flex items-center justify-center"
                style={{
                  backgroundColor: "#020617",
                  border: "1px solid #1E293B",
                  boxShadow: "0 0 24px #2563EB22",
                }}
                aria-hidden="true"
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect x="4" y="4" width="8" height="8" rx="1.5" fill="#2563EB" opacity="0.9" />
                  <rect x="16" y="4" width="8" height="8" rx="1.5" fill="#22D3EE" opacity="0.6" />
                  <rect x="4" y="16" width="8" height="8" rx="1.5" fill="#22D3EE" opacity="0.4" />
                  <rect x="16" y="16" width="8" height="8" rx="1.5" fill="#2563EB" opacity="0.7" />
                </svg>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute -bottom-4 -left-4 px-4 py-2.5 rounded-xl"
                style={{
                  backgroundColor: "#020617",
                  border: "1px solid #1E293B",
                  boxShadow: "0 0 24px #2563EB22",
                }}
                aria-hidden="true"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#22D3EE" }}
                  />
                  <span
                    className="text-xs font-medium"
                    style={{ color: "#E5E7EB", fontFamily: "Inter, sans-serif" }}
                  >
                    Full-Stack Engineer
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}