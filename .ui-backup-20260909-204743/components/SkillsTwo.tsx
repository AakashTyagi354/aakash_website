"use client";
import { motion } from "framer-motion";

const SKILL_GROUPS = [
  {
    category: "Backend",
    color: "text-blue-500 dark:text-blue-400",
    dot: "bg-blue-500",
    skills: [
      "Java 21", "Spring Boot 4", "Spring Cloud Gateway",
      "Eureka", "OpenFeign", "Resilience4j",
      "Hibernate 7", "JPA", "REST APIs", "Node.js",
    ],
  },
  {
    category: "AI & LLM",
    color: "text-[#78355b] dark:text-[#c4869f]",
    dot: "bg-[#78355b]",
    skills: [
      "Groq", "Voyage AI", "pgvector", "Spring AI",
      "RAG Pipelines", "MCP Agent (ReAct)",
      "Agentic Workflows", "Prompt Engineering",
      "llama-3.1", "qwen3-32b",
    ],
  },
  {
    category: "Frontend",
    color: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    skills: [
      "Next.js 14", "React.js", "TypeScript",
      "Redux Toolkit", "Tailwind CSS", "JavaScript",
      "Framer Motion", "HTML5", "CSS3",
    ],
  },
  {
    category: "Infra & DevOps",
    color: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    skills: [
      "Apache Kafka", "Redis", "PostgreSQL",
      "pgvector", "AWS S3", "Docker",
      "Docker Compose", "GitHub Actions CI/CD",
      "Kubernetes", "Maven", "Oracle DB", "Git",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SkillsTwo() {
  return (
    <section
      id="skills"
      className="max-w-[1100px] mx-auto px-6 py-24"
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-14"
      >
        <p className="font-mono-custom text-xs tracking-[0.2em] uppercase
                      text-[#78355b] mb-3">
          02 — Capabilities
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-foreground">
          Skills & Stack
        </h2>
        <p className="mt-3 text-muted-foreground max-w-[480px] leading-relaxed">
          Everything I use to ship — from JVM internals to LLM prompt engineering.
        </p>
      </motion.div>

      {/* Skill groups grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_GROUPS.map((group, gi) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: gi * 0.1 }}
            className="border border-border/80 rounded-2xl p-6
                       bg-card/50 backdrop-blur-sm card-hover"
          >
            {/* Category header */}
            <div className="flex items-center gap-2 mb-5">
              <span className={`w-2 h-2 rounded-full ${group.dot}`} />
              <span className={`font-mono-custom text-xs tracking-widest
                               uppercase font-medium ${group.color}`}>
                {group.category}
              </span>
            </div>

            {/* Pills */}
            <motion.div
              className="flex flex-wrap gap-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {group.skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={itemVariants}
                  className="skill-pill font-mono-custom text-[11px] tracking-wider
                             px-3 py-1.5 rounded-full border border-border/80
                             text-muted-foreground bg-background/60"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Currently learning strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 border border-border/60 rounded-2xl p-5
                   bg-card/30 flex flex-wrap items-center gap-3"
      >
        <span className="font-mono-custom text-[10px] tracking-widest
                         uppercase text-muted-foreground/60 mr-2">
          Also know
        </span>
        {["Kubernetes (learning)", "k6 Load Testing", "Multi-arch Docker (amd64+arm64)",
          "Optimistic Locking (@Version)", "JWT + Refresh Token Rotation",
          "ZEGOCLOUD Video", "Razorpay HMAC Verification"].map((item) => (
          <span
            key={item}
            className="font-mono-custom text-[11px] text-muted-foreground/70
                       border border-border/40 px-3 py-1 rounded-full"
          >
            {item}
          </span>
        ))}
      </motion.div>

    </section>
  );
}