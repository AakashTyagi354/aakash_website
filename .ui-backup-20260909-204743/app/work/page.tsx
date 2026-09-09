"use client";
import { motion } from "framer-motion";
import {
  ExternalLink, Github, ChevronRight,
  Shield, Zap, Brain, MessageSquare, FileText,
  Video, ShoppingBag, Bell, Server, GitBranch,
  Lock, RefreshCw, Layers, ArrowLeft, Database
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SERVICES = [
  { name: "discovery-server",   port: "8761", desc: "Eureka service registry",                          tag: "Infra" },
  { name: "gateway",            port: "8089", desc: "Spring Cloud Gateway · JWT auth · WebFlux",        tag: "Infra" },
  { name: "userservice",        port: "8111", desc: "Auth · OTP · JWT · refresh tokens",                tag: "Core"  },
  { name: "doctorservice",      port: "8010", desc: "Profiles · Redis cache · approval workflow",       tag: "Core"  },
  { name: "appointmentservice", port: "8012", desc: "Slots · booking · ZEGOCLOUD video tokens",         tag: "Core"  },
  { name: "paymentservice",     port: "8083", desc: "Razorpay integration · HMAC-SHA256 verify",        tag: "Core"  },
  { name: "documentservice",    port: "8091", desc: "AWS S3 · presigned URLs · Kafka events",           tag: "Core"  },
  { name: "aiservice",          port: "8095", desc: "All AI features · Groq · Voyage AI · pgvector",    tag: "AI"    },
  { name: "notificationservice",port: "8017", desc: "Kafka consumer · Gmail SMTP",                      tag: "Async" },
  { name: "productservice",     port: "8016", desc: "E-store product catalog",                          tag: "Store" },
  { name: "categoryservice",    port: "8015", desc: "Category + slug management",                       tag: "Store" },
  { name: "orderservice",       port: "8013", desc: "Cart · orders · checkout",                         tag: "Store" },
  { name: "common-lib",         port: "—",    desc: "Shared ApiResponse · exceptions · DTOs",           tag: "Lib"   },
];

const TAG_COLORS: Record<string, string> = {
  Infra: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  Core:  "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20",
  AI:    "bg-[#78355b]/10 text-[#78355b] dark:text-[#c4869f] border-[#78355b]/20",
  Async: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20",
  Store: "bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/20",
  Lib:   "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20",
};

const AI_FEATURES = [
  {
    icon: Brain,
    title: "AI Symptom Checker",
    endpoint: "POST /api/v1/ai/symptom-check",
    model: "Groq llama-3.1-8b-instant",
    color: "text-[#78355b]",
    bg: "bg-[#78355b]/5",
    border: "border-[#78355b]/20",
    details: [
      "Patient types symptoms in plain English",
      "Prompt uses a fixed specialization list matching platform doctor categories",
      "JSON response parsed → fallback to General Medicine on parse failure (never returns 500)",
      "Frontend auto-filters doctor listing based on returned specialization",
    ],
    decision: "Fixed specialization list prevents the LLM from inventing specialties that don't exist on the platform. Fallback to General Medicine ensures the endpoint is always usable even if Groq is degraded.",
  },
  {
    icon: FileText,
    title: "RAG Document Summarizer",
    endpoint: "GET /api/v1/ai/summarize/{userId}",
    model: "Voyage AI voyage-3-lite · pgvector · Groq LLaMA 3.1",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/5",
    border: "border-blue-500/20",
    details: [
      "Patient uploads PDF → documentservice saves to S3 → publishes Kafka event",
      "aiservice consumes event: downloads PDF → Apache PDFBox text extraction",
      "Fixed-size chunking: 500 chars, 100 char overlap",
      "Voyage AI voyage-3-lite embeds each chunk (512-dim), stored in pgvector via JdbcTemplate + ::vector cast",
      "21s Thread.sleep between chunks (Voyage free tier: 3 RPM)",
      "On doctor query: embed query → cosine similarity search → top-K chunks → Groq generates 3-point clinical summary",
    ],
    decision: "Fixed-size chunking chosen over semantic/agentic — medical documents are 1-5 pages, agentic chunking would have tripled API calls against the 3 RPM limit for zero measurable quality gain. JdbcTemplate used instead of Hibernate to bypass custom column type limitations with pgvector.",
  },
  {
    icon: MessageSquare,
    title: "MCP Booking Agent (ReAct)",
    endpoint: "POST /api/v1/ai/agent/chat",
    model: "Groq qwen3-32b",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/5",
    border: "border-emerald-500/20",
    details: [
      "5 tools: search_doctors · get_available_slots · book_appointment · get_my_appointments · create_payment_order",
      "ReAct loop: reason → call tool → observe result → reason again (max 10 iterations)",
      "Redis slot session injection: real doctorId + slotIds stored in Redis per userId, injected as SYSTEM message at position 1 before every LLM call",
      "400 correction loop: if LLM passes string slotId instead of integer, error injected back → forces re-fetch",
      "Floating chat widget in frontend (patients only)",
    ],
    decision: "LLM hallucination problem — qwen3-32b would invent slotId=123 in later turns because conversation history only carries text, not structured tool results. Redis injection gives the LLM ground truth IDs on every call, eliminating hallucinations. This was the hardest engineering problem in the project.",
  },
  {
    icon: Zap,
    title: "Post-Consultation AI Notes",
    endpoint: "Kafka: consultation-notes-ready",
    model: "Groq llama-3.1-8b-instant · temperature=0.3",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/5",
    border: "border-amber-500/20",
    details: [
      "Doctor types notes during video call (ConsultationNotesPanel — auto-saves every 30s to DRAFT status)",
      "Doctor clicks 'End Call & Save' → appointmentservice saves notes → publishes to consultation-notes-ready Kafka topic",
      "aiservice consumer picks up event: formats medications as numbered list (Drug | Dose | Freq | Route)",
      "buildPrompt() creates a 7-section contract: Consultation Summary · Diagnosis · Medications · Tests · Recovery · Follow-up · Disclaimer",
      "temperature=0.3: consistency over creativity — medical docs must be literal",
      "AI report saved back via Feign → AppointmentClient.updateAiReport()",
      "Patient sees report in MyConsultationReports between Upcoming/History sections",
    ],
    decision: "Kafka used (not Feign) because report generation takes 5-10 seconds. Direct call would freeze the doctor's End Call button for 10 seconds — unacceptable UX. Exceptions swallowed in consumer (not rethrown): notes are already saved in DB, AI report is enhancement not blocker. Rethrowing would freeze the partition and block every other patient's report.",
  },
];

const ENGINEERING_DECISIONS = [
  {
    icon: Lock,
    title: "Double-Booking Race Condition",
    problem: "Two patients could book the same slot simultaneously — both pass the AVAILABLE check before either writes BOOKED.",
    solution: "@Version on DoctorSlot entity. Hibernate generates: UPDATE doctor_slot SET status='BOOKED', version=2 WHERE id=5 AND version=1. Only one thread succeeds. The other gets ObjectOptimisticLockingFailureException → HTTP 409.",
    why: "Optimistic over pessimistic because true slot contention is rare. Pessimistic (SELECT FOR UPDATE) would queue all booking requests under load.",
  },
  {
    icon: RefreshCw,
    title: "JWT + Refresh Token Rotation",
    problem: "Access tokens that never expire are a security liability. But requiring re-login every 15 minutes breaks UX.",
    solution: "Access token (15 min) in Authorization header. Refresh token (7 days) in HttpOnly cookie stored in DB. On refresh: old token deleted, new token issued. Stolen refresh tokens become invalid after first legitimate use.",
    why: "HttpOnly cookie prevents XSS token theft. DB storage enables explicit revocation on logout. Rotation means a compromised token has a very limited attack window.",
  },
  {
    icon: Database,
    title: "Redis Cache-Aside + TTL (Defense in Depth)",
    problem: "Doctor listings hit the DB on every request. A single cache eviction failure would serve stale data indefinitely.",
    solution: "@Cacheable on GET /api/v1/doctor/all (doctors::all key) + @CacheEvict on any approval/rejection + 10-minute TTL as safety net.",
    why: "@CacheEvict alone: if Redis has a brief outage during approval, eviction fails silently → stale data forever. TTL alone: stale for up to 10 minutes after every state change. Together: immediate freshness + bounded staleness window.",
  },
  {
    icon: Zap,
    title: "Kafka for Async Notification Decoupling",
    problem: "If appointmentservice called notificationservice via Feign and the notification service was down, the booking would fail — two completely unrelated concerns sharing a failure surface.",
    solution: "appointmentservice publishes NotificationEvent to Kafka and returns immediately. notificationservice consumes when available. Kafka retains events during downtime.",
    why: "Temporal decoupling. Booking is a synchronous, critical path. Notification delivery is best-effort. They should have independent failure surfaces.",
  },
  {
    icon: Shield,
    title: "OTP via Redis (not PostgreSQL)",
    problem: "Email OTPs are ephemeral — they expire in 10 minutes, are one-time use, and need fast lookup.",
    solution: "Redis key: otp:{email} with 10-minute EXPIRE. On successful verification: key deleted immediately (one-time use). SecureRandom for generation (not java.util.Random).",
    why: "Redis native TTL eliminates the need for a cron cleanup job. Sub-millisecond reads. Zero schema overhead. PostgreSQL would be the wrong tool for ephemeral data.",
  },
  {
    icon: Server,
    title: "Spring Cloud Gateway (WebFlux, not MVC)",
    problem: "A gateway that blocks one thread per request would become a bottleneck under load — it's the single entry point for all 13 services.",
    solution: "Spring Cloud Gateway 5.0 built on Project Reactor (Netty). Non-blocking, event-loop-based. JwtAuthGatewayFilter validates JWT, injects X-User-Id and X-Roles headers. Downstream services read headers — they do NOT re-validate JWT.",
    why: "The gateway does almost nothing except validate and forward. Non-blocking I/O handles thousands of concurrent connections with a small thread pool. JWT validation at gateway = single point of trust, not repeated in every service.",
  },
];

const TECH_STACK = [
  { category: "Backend",           items: ["Java 21", "Spring Boot 4", "Spring Cloud Gateway 5.0", "Eureka", "OpenFeign", "Resilience4j", "Hibernate 7", "JPA", "Maven"] },
  { category: "AI & LLM",          items: ["Groq llama-3.1-8b-instant", "Groq qwen3-32b", "Voyage AI voyage-3-lite", "pgvector", "Spring AI", "Apache PDFBox"] },
  { category: "Messaging & Cache", items: ["Apache Kafka 3.x", "Redis 7.x", "Spring Kafka"] },
  { category: "Frontend",          items: ["Next.js 14 (App Router)", "TypeScript", "Redux Toolkit", "Tailwind CSS", "shadcn/ui", "Framer Motion"] },
  { category: "Infrastructure",    items: ["Docker", "Docker Compose", "GitHub Actions CI/CD", "Multi-arch builds (amd64 + arm64)", "AWS S3", "ZEGOCLOUD", "Razorpay"] },
  { category: "Database",          items: ["PostgreSQL (x9 separate DBs)", "pgvector extension", "Redis"] },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.07 } } };

export default function DelmaProjectPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
        <div className="max-w-[1100px] mx-auto px-6 pt-28 pb-16 relative z-10">

          <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4 }}>
            <button
              onClick={() => {
                if (window.history.length > 1) {
                  router.back();
                } else {
                  router.push("/");
                }
              }}
              className="inline-flex items-center gap-1.5 font-mono-custom text-xs
                         tracking-widest uppercase text-muted-foreground
                         hover:text-[#78355b] transition-colors mb-8 group"
            >
              <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#78355b] animate-pulse" />
              <span className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[#78355b]">
                Full Case Study
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-7xl text-foreground mb-4">
              Delma
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-light
                          max-w-[640px] leading-relaxed mb-8">
              AI-powered healthcare platform. 13 Spring Boot microservices.
              4 LLM features. Built from scratch.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {[
                ["13", "Microservices"],
                ["4",  "AI Features"],
                ["3",  "Kafka Topics"],
                ["9",  "Databases"],
                ["2",  "Arch Targets"],
              ].map(([val, lbl]) => (
                <div key={lbl}
                     className="border border-border/80 rounded-xl px-4 py-3
                                bg-card/50 backdrop-blur-sm text-center">
                  <p className="font-display text-2xl text-foreground leading-none mb-0.5">{val}</p>
                  <p className="font-mono-custom text-[10px] tracking-widest uppercase
                                text-muted-foreground">{lbl}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="https://delma.aakashtyagi.in" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#78355b]
                            text-white text-sm font-medium hover:bg-[#5e2947] transition-colors">
                <ExternalLink size={14} />
                Live Platform
              </a>
              <a href="https://github.com/AakashTyagi354/delma2.0_spring_microservice"
                 target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-5 py-2.5 rounded-xl border
                            border-border/80 text-sm text-muted-foreground
                            hover:border-[#78355b]/40 hover:text-[#78355b] transition-colors">
                <Github size={14} />
                Backend Repo
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-[1100px] mx-auto px-6 py-16 space-y-24">

        {/* ── SERVICES MAP ── */}
        <motion.section variants={stagger} initial="hidden"
                        whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="mb-10">
            <p className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[#78355b] mb-3">
              01 — Architecture
            </p>
            <h2 className="font-display text-4xl text-foreground">13 Services</h2>
            <p className="mt-2 text-muted-foreground max-w-[480px] leading-relaxed">
              Each service owns its data, scales independently, and fails without taking
              down the rest of the platform.
            </p>
          </motion.div>

          <motion.div variants={stagger}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SERVICES.map((svc) => (
              <motion.div key={svc.name} variants={fadeUp}
                          className="border border-border/80 rounded-xl p-4
                                     bg-card/50 backdrop-blur-sm card-hover">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono-custom text-sm font-medium text-foreground">
                    {svc.name}
                  </span>
                  <span className={`font-mono-custom text-[10px] px-2 py-0.5 rounded-full
                                    border ${TAG_COLORS[svc.tag]}`}>
                    {svc.tag}
                  </span>
                </div>
                <p className="font-mono-custom text-[10px] text-muted-foreground/50
                               tracking-wider mb-1.5">
                  :{svc.port}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{svc.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}
                      className="mt-6 border border-border/60 rounded-2xl p-5 bg-card/30">
            <p className="font-mono-custom text-[10px] tracking-widest uppercase
                           text-amber-600 dark:text-amber-400 mb-3">
              Kafka Topics
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { topic: "notification-topic",       desc: "Appointment confirmations, doctor approvals" },
                { topic: "document-uploaded",        desc: "Triggers RAG indexing in aiservice" },
                { topic: "consultation-notes-ready", desc: "Triggers AI report generation" },
              ].map((t) => (
                <div key={t.topic}
                     className="border border-amber-500/20 rounded-xl px-4 py-3 bg-amber-500/5">
                  <p className="font-mono-custom text-xs text-amber-700 dark:text-amber-400
                                 font-medium mb-0.5">
                    {t.topic}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* ── AI FEATURES ── */}
        <motion.section variants={stagger} initial="hidden"
                        whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="mb-10">
            <p className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[#78355b] mb-3">
              02 — AI Features
            </p>
            <h2 className="font-display text-4xl text-foreground">4 LLM-Powered Features</h2>
            <p className="mt-2 text-muted-foreground max-w-[480px] leading-relaxed">
              Each feature solves a real clinical problem.
              Each has specific engineering decisions worth explaining.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {AI_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div key={feature.title} variants={fadeUp}
                            className={`border rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm ${feature.border}`}>
                  {/* Header */}
                  <div className={`${feature.bg} border-b ${feature.border} px-6 py-4
                                   flex items-start justify-between gap-4 flex-wrap`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl border ${feature.border}
                                       flex items-center justify-center`}>
                        <Icon size={16} className={feature.color} />
                      </div>
                      <div>
                        <h3 className="font-display text-xl text-foreground">{feature.title}</h3>
                        <p className="font-mono-custom text-[10px] tracking-wider
                                       text-muted-foreground/70 mt-0.5">
                          {feature.endpoint}
                        </p>
                      </div>
                    </div>
                    <span className={`font-mono-custom text-[10px] px-3 py-1.5 rounded-full
                                      border ${feature.border} ${feature.color} bg-background/60`}>
                      {feature.model}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    <p className="font-mono-custom text-[10px] tracking-widest uppercase
                                   text-muted-foreground/60 mb-3">
                      How it works
                    </p>
                    <ul className="space-y-2 mb-6">
                      {feature.details.map((d, di) => (
                        <li key={di} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <span className={`${feature.color} mt-0.5 flex-shrink-0 font-mono-custom text-xs`}>
                            {String(di + 1).padStart(2, "0")}
                          </span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>

                    {/* FIX: was mixed quotes — now proper template literal */}
                    <div className={`border ${feature.border} rounded-xl p-4 ${feature.bg}`}>
                      <p className={`font-mono-custom text-[10px] tracking-widest uppercase mb-2 ${feature.color}`}>
                        Engineering decision
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.decision}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── PLATFORM FEATURES ── */}
        <motion.section variants={stagger} initial="hidden"
                        whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="mb-10">
            <p className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[#78355b] mb-3">
              03 — Platform Features
            </p>
            <h2 className="font-display text-4xl text-foreground">Core Platform</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: Video,
                title: "Video Consultations",
                color: "text-blue-500",
                points: [
                  "ZEGOCLOUD SDK with AES-256 per-session encryption",
                  "Appointment-scoped video tokens generated server-side",
                  "ConsultationNotesPanel for doctors (auto-saves every 30s)",
                  "Authorization check: only participants can get video token",
                ],
              },
              {
                icon: Shield,
                title: "Auth & Security",
                color: "text-emerald-500",
                points: [
                  "Email OTP verification — 6-digit, Redis TTL 10min, one-time use",
                  "JWT access (15min) + refresh rotation (7 days, HttpOnly cookie)",
                  "Refresh tokens stored in DB — explicit revocation on logout",
                  "Gateway-level JWT validation — X-User-Id/X-Roles header injection",
                ],
              },
              {
                icon: FileText,
                title: "Medical Documents",
                color: "text-amber-500",
                points: [
                  "Upload to AWS S3 — presigned URLs with 10-minute TTL",
                  "Access control: only the uploading patient + their assigned doctor",
                  "Kafka event on upload triggers RAG indexing in aiservice",
                  "Metadata stored in PostgreSQL, files in S3 (separation of concerns)",
                ],
              },
              {
                icon: ShoppingBag,
                title: "Medical E-Store",
                color: "text-purple-500",
                points: [
                  "Product catalog via productservice + categoryservice",
                  "Cart management and order lifecycle in orderservice",
                  "Razorpay payment with HMAC-SHA256 signature verification",
                  "Order confirmation via Kafka → notificationservice → email",
                ],
              },
              {
                icon: Bell,
                title: "Real-time Notifications",
                color: "text-red-500",
                points: [
                  "Kafka consumer in notificationservice (notification-topic)",
                  "Triggers on: booking confirmation, doctor approval, order updates",
                  "Gmail SMTP delivery + in-app notification persistence",
                  "Frontend: 5-minute module-level TTL cache (not useState — survives remounts)",
                ],
              },
              {
                icon: Layers,
                title: "Doctor Workflow",
                color: "text-teal-500",
                points: [
                  "Apply → pending review → admin approves via Feign chain (user→doctor→user)",
                  "Redis cache-aside on listings (@Cacheable + @CacheEvict + TTL)",
                  "Slot management: doctor creates availability windows",
                  "Doctor profile search by name or specialization",
                ],
              },
            ].map((feat) => {
              const Icon = feat.icon;
              return (
                <motion.div key={feat.title} variants={fadeUp}
                            className="border border-border/80 rounded-2xl p-5
                                       bg-card/50 backdrop-blur-sm card-hover">
                  <div className="flex items-center gap-2.5 mb-4">
                    <Icon size={16} className={feat.color} />
                    <h3 className="font-display text-lg text-foreground">{feat.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {feat.points.map((p, pi) => (
                      <li key={pi} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight size={12} className={`${feat.color} mt-0.5 flex-shrink-0`} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── ENGINEERING DECISIONS ── */}
        <motion.section variants={stagger} initial="hidden"
                        whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="mb-10">
            <p className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[#78355b] mb-3">
              04 — Engineering Decisions
            </p>
            <h2 className="font-display text-4xl text-foreground">Why I built it this way</h2>
            <p className="mt-2 text-muted-foreground max-w-[480px] leading-relaxed">
              Every non-obvious decision has a reason. These are the ones
              worth explaining to a senior engineer.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {ENGINEERING_DECISIONS.map((dec) => {
              const Icon = dec.icon;
              return (
                <motion.div key={dec.title} variants={fadeUp}
                            className="border border-border/80 rounded-2xl overflow-hidden
                                       bg-card/50 backdrop-blur-sm card-hover">
                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-2.5 mb-4">
                      <Icon size={16} className="text-[#78355b]" />
                      <h3 className="font-display text-xl text-foreground">{dec.title}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="border border-red-500/15 rounded-xl p-4 bg-red-500/5">
                        <p className="font-mono-custom text-[10px] tracking-widest uppercase
                                       text-red-500 mb-2">
                          Problem
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{dec.problem}</p>
                      </div>
                      <div className="border border-emerald-500/15 rounded-xl p-4 bg-emerald-500/5">
                        <p className="font-mono-custom text-[10px] tracking-widest uppercase
                                       text-emerald-600 dark:text-emerald-400 mb-2">
                          Solution
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{dec.solution}</p>
                      </div>
                      <div className="border border-[#78355b]/15 rounded-xl p-4 bg-[#78355b]/5">
                        <p className="font-mono-custom text-[10px] tracking-widest uppercase
                                       text-[#78355b] mb-2">
                          Why this approach
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{dec.why}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── TECH STACK ── */}
        <motion.section variants={stagger} initial="hidden"
                        whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={fadeUp} className="mb-10">
            <p className="font-mono-custom text-xs tracking-[0.2em] uppercase text-[#78355b] mb-3">
              05 — Stack
            </p>
            <h2 className="font-display text-4xl text-foreground">Full Tech Stack</h2>
          </motion.div>

          <motion.div variants={stagger}
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TECH_STACK.map((group) => (
              <motion.div key={group.category} variants={fadeUp}
                          className="border border-border/80 rounded-2xl p-5 bg-card/50 backdrop-blur-sm">
                <p className="font-mono-custom text-[10px] tracking-widest uppercase
                               text-muted-foreground/60 mb-3">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span key={item}
                          className="skill-pill font-mono-custom text-[11px] px-2.5 py-1
                                     rounded-full border border-border/80 text-muted-foreground
                                     bg-background/60">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── CI/CD ── */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border border-border/60 rounded-2xl p-6 md:p-8 bg-card/30 backdrop-blur-sm"
        >
          <div className="flex items-center gap-2.5 mb-6">
            <GitBranch size={16} className="text-[#78355b]" />
            <h3 className="font-display text-2xl text-foreground">CI/CD Pipeline</h3>
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono-custom text-xs text-muted-foreground">
            {[
              "Push to main",
              "→ GitHub Actions",
              "→ mvn clean install",
              "→ Docker Buildx (amd64 + arm64)",
              "→ Docker Hub (aakash354/delma-*)",
              "→ Hetzner CX31 (8GB RAM)",
            ].map((step, i) => (
              <span key={i}
                    className={`px-3 py-1.5 rounded-lg border ${
                      i === 0
                        ? "border-[#78355b]/30 bg-[#78355b]/5 text-[#78355b]"
                        : "border-border/60 bg-background/60"
                    }`}>
                {step}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Multi-arch builds mean the same image runs on both the Hetzner production
            server (amd64) and Apple Silicon development machines (arm64)
            without architecture-specific Dockerfiles.
          </p>
        </motion.section>

        {/* ── FOOTER CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start md:items-center
                     justify-between gap-6 pt-8 border-t border-border/40"
        >
          <div>
            <p className="font-display text-2xl text-foreground mb-1">Want to dig deeper?</p>
            <p className="text-muted-foreground text-sm">
              Full source code on GitHub. README covers every service in detail.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://delma.aakashtyagi.in" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#78355b]
                          text-white text-sm font-medium hover:bg-[#5e2947] transition-colors">
              <ExternalLink size={14} />
              Live Platform
            </a>
            <a href="https://github.com/AakashTyagi354/delma2.0_spring_microservice"
               target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 px-5 py-2.5 rounded-xl border
                          border-border/80 text-sm text-muted-foreground
                          hover:border-[#78355b]/40 hover:text-[#78355b] transition-colors">
              <Github size={14} />
              GitHub
            </a>
            <Link href="/#contact"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border
                             border-border/80 text-sm text-muted-foreground
                             hover:border-[#78355b]/40 hover:text-[#78355b] transition-colors">
              Get in touch
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}