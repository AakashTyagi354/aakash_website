"use client";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink, ArrowRight } from "lucide-react";

const STATS = [
  { value: "13",        label: "Microservices"     },
  { value: "4",         label: "AI Features"       },
  { value: "1.5yr",     label: "Spring Boot"       }
];

const TECH_MARQUEE = [
  "Spring Boot", "Kafka", "Redis", "pgvector", "Groq",
  "Next.js 14", "Docker", "Voyage AI", "RAG", "MCP Agent",
  "Spring Cloud", "PostgreSQL", "Kubernetes", "TypeScript",
];

export default function Info() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center
                        pt-[72px] overflow-hidden">

      {/* Dot grid bg */}
      <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />

      {/* Large decorative name watermark */}
      <div className="absolute right-[-60px] top-[120px] select-none pointer-events-none
                      hidden lg:block">
        <p className="font-display text-[180px] leading-none
                      text-foreground/[0.03] dark:text-white/[0.03]
                      font-normal tracking-tight">
          Aakash.
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-[1100px] mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16 items-start">

          {/* Left column */}
          <div>
            {/* Role badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-[#78355b] animate-pulse" />
              <span className="font-mono-custom text-xs tracking-[0.2em] uppercase
                               text-muted-foreground">
                Specialist Programmer · Infosys · Pune
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-[52px] md:text-[72px] leading-[1.05]
                         text-foreground mb-2"
            >
              Aakash
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="font-display text-[52px] md:text-[72px] leading-[1.05]
                         gradient-text mb-8"
            >
              Tyagi.
            </motion.h1>

            {/* Descriptor line */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="text-lg md:text-xl text-muted-foreground font-light
                         leading-relaxed max-w-[540px] mb-6"
            >
              Backend-heavy full stack engineer building{" "}
              <span className="text-foreground font-medium">
                distributed systems
              </span>{" "}
              and{" "}
              <span className="text-foreground font-medium">
                AI-powered products
              </span>
              .
            </motion.p>

            {/* Delma callout */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.36 }}
              className="border border-border/80 rounded-xl p-4 mb-8 max-w-[560px]
                         bg-card/50 backdrop-blur-sm card-hover"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono-custom text-[10px] tracking-widest
                                     uppercase text-[#78355b]">
                      Featured Project
                    </span>
                  </div>
                  <p className="font-display text-xl text-foreground mb-1">
                    Delma Health Platform
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    13 Spring Boot microservices · RAG pipeline (pgvector + Voyage AI) ·
                    MCP booking agent (ReAct) · Post-consultation AI report generation via Groq
                  </p>
                </div>
                <a
                  href="https://delma.aakashtyagi.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 p-2 rounded-lg border border-border/60
                             hover:border-[#78355b]/40 hover:text-[#78355b]
                             text-muted-foreground transition-all"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {["Spring Cloud", "Kafka", "Redis", "pgvector", "Groq", "Next.js 14", "Docker"].map((t) => (
                  <span
                    key={t}
                    className="font-mono-custom text-[10px] px-2 py-0.5
                               bg-[#78355b]/08 text-[#78355b] dark:text-[#c4869f]
                               border border-[#78355b]/20 rounded-full"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.44 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <a
                href="#projects"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                           bg-[#78355b] text-white text-sm font-medium
                           hover:bg-[#5e2947] transition-colors"
              >
                View Work
                <ArrowRight size={14} />
              </a>
              <a
                href="https://github.com/AakashTyagi354"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                           border border-border/80 text-sm text-muted-foreground
                           hover:border-[#78355b]/40 hover:text-[#78355b]
                           transition-colors"
              >
                <Github size={14} />
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/aakash-tyagi-274228206/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg
                           border border-border/80 text-sm text-muted-foreground
                           hover:border-[#78355b]/40 hover:text-[#78355b]
                           transition-colors"
              >
                <Linkedin size={14} />
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right column — stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden lg:flex flex-col gap-3 pt-4"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="border border-border/80 rounded-xl p-5 bg-card/50
                           backdrop-blur-sm card-hover"
              >
                <p className="font-display text-3xl text-foreground mb-0.5">
                  {stat.value}
                </p>
                <p className="font-mono-custom text-[11px] tracking-widest
                               uppercase text-muted-foreground">
                  {stat.label}
                </p>
              </motion.div>
            ))}

            {/* Targeting badge */}
            {/* <div className="border border-border/80 rounded-xl p-4 bg-card/50
                            backdrop-blur-sm mt-1">
              <p className="font-mono-custom text-[10px] tracking-widest
                             uppercase text-muted-foreground mb-2">
                Targeting
              </p>
              <div className="flex flex-col gap-1">
                {["Juspay", "Innovaccer", "Cashfree", "Setu"].map((co) => (
                  <span key={co}
                        className="text-sm text-foreground/70 font-light">
                    {co}
                  </span>
                ))}
              </div>
            </div> */}
          </motion.div>

        </div>
      </div>

      {/* Tech marquee strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative w-full overflow-hidden border-y border-border/40
                   bg-card/30 backdrop-blur-sm mt-8 py-3"
      >
        <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((tech, i) => (
            <span key={i}
                  className="font-mono-custom text-[11px] tracking-widest
                             uppercase text-muted-foreground/60 mx-6">
              {tech}
              <span className="mx-6 text-[#78355b]/40">·</span>
            </span>
          ))}
        </div>
      </motion.div>

    </section>
  );
}