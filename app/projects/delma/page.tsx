"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, BookOpen } from "lucide-react";
import Link from "next/link";

const PROJECTS = [
  {
    index: "01",
    title: "Delma Health Platform",
    subtitle: "AI Healthcare · 13 Microservices",
    description:
      "Full-stack AI healthcare platform built from scratch. Spring Cloud Gateway handles JWT auth and routes to 13 independent services. Kafka decouples async flows — notification delivery, RAG document indexing, and AI report generation all run in the background without blocking the request thread.",
    highlights: [
      "RAG pipeline: Voyage AI embeddings (512-dim) → pgvector cosine search → Groq 3-point clinical summary",
      "MCP Booking Agent: ReAct pattern with 5 tools, Redis slot injection solves LLM hallucination",
      "Post-consultation AI notes: Kafka → Groq llama-3.1 → 7-section patient report, temperature=0.3",
      "Optimistic locking (@Version) prevents double-booking race condition → HTTP 409",
      "GitHub Actions CI/CD: multi-arch Docker builds (amd64 + arm64) → Docker Hub",
    ],
    tags: ["Spring Boot","Spring Cloud","Kafka","Redis","pgvector","Groq","Voyage AI","Next.js 14","Docker"],
    live: "https://delma.aakashtyagi.in",
    code: "https://github.com/AakashTyagi354/delma2.0_spring_microservice",
    caseStudy: "/work",
    featured: true,
  },
  {
    index: "02",
    title: "MindCraftAI",
    subtitle: "AI Tools Platform",
    description:
      "Platform integrating multiple generative AI capabilities — code generation, video creation, music generation, and image synthesis. Built with Next.js 14 and OpenAI APIs.",
    highlights: [
      "AI-powered code generation with syntax highlighting",
      "Video and music generation via OpenAI models",
      "Auth with Clerk, billing with Stripe",
    ],
    tags: ["Next.js","TypeScript","OpenAI","Tailwind","MySQL"],
    live: "https://mind-craft-f4u8lqqbo-aakashtyagi354.vercel.app/",
    code: "https://github.com/AakashTyagi354/MindCraftAi",
    caseStudy: null,
    featured: false,
  },
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-[1100px] mx-auto px-6 py-24">
      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.5 }} className="mb-14">
        <p className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[#78355b] mb-3">
          01 — Work
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground">Projects</h2>
        <p className="mt-3 text-muted-foreground max-w-[480px] leading-relaxed">
          Production-grade systems, not tutorial clones. Every project has real engineering decisions behind it.
        </p>
      </motion.div>

      <div className="flex flex-col gap-6">
        {PROJECTS.map((project, i) => (
          <motion.div key={project.title}
            initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.12 }}
            className={`border rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm card-hover
                        ${project.featured ? "border-[#78355b]/25" : "border-border/80"}`}
          >
            {project.featured && (
              <div className="bg-[#78355b]/08 border-b border-[#78355b]/15 px-6 py-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#78355b]" />
                <span className="font-mono-custom text-[10px] tracking-widest uppercase text-[#78355b]">
                  Featured
                </span>
              </div>
            )}
            <div className="p-6 md:p-8">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono-custom text-xs text-muted-foreground/50 tracking-widest">
                      {project.index}
                    </span>
                    <span className="font-mono-custom text-xs tracking-widest uppercase text-muted-foreground">
                      {project.subtitle}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-foreground mb-3">{project.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-5 max-w-[600px]">{project.description}</p>
                  <ul className="space-y-2 mb-6">
                    {project.highlights.map((h, hi) => (
                      <li key={hi} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-[#78355b] mt-1 flex-shrink-0">→</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="font-mono-custom text-[10px] px-2.5 py-1 rounded-full
                                                  border border-border/80 text-muted-foreground/70 bg-background/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-2 flex-shrink-0">
                  <a href={project.live} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#78355b] text-white
                                text-sm font-medium hover:bg-[#5e2947] transition-colors whitespace-nowrap">
                    <ExternalLink size={13} /> Live
                  </a>
                  <a href={project.code} target="_blank" rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border/80
                                text-sm text-muted-foreground hover:border-[#78355b]/40
                                hover:text-[#78355b] transition-colors whitespace-nowrap">
                    <Github size={13} /> Code
                  </a>
                  {project.caseStudy && (
                    <Link href={project.caseStudy}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border
                                     border-[#78355b]/30 text-sm text-[#78355b] hover:bg-[#78355b]/08
                                     transition-colors whitespace-nowrap font-medium">
                      <BookOpen size={13} /> Full Details
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.5, delay:0.3 }}
                  className="mt-8 flex justify-center">
        <a href="https://github.com/AakashTyagi354" target="_blank" rel="noopener noreferrer"
           className="flex items-center gap-2 font-mono-custom text-xs tracking-widest uppercase
                      text-muted-foreground hover:text-[#78355b] transition-colors">
          More on GitHub <ArrowUpRight size={13} />
        </a>
      </motion.div>
    </section>
  );
}