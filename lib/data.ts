import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { LuGraduationCap } from "react-icons/lu";
import { FaServer } from "react-icons/fa";

import project1 from "@/public/images/project1.png";
import project2 from "@/public/images/project2.png";

// ─────────────────────────────────────────────────────────────
// NAV LINKS
// ─────────────────────────────────────────────────────────────
export const links = [
  { name: "Home",     hash: "#home"     },
  { name: "Skills",   hash: "#skills"   },
  { name: "Projects", hash: "#projects" },
  { name: "Contact",  hash: "#contact"  },
] as const;

// ─────────────────────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────────────────────
export const experiencesData = [
  {
    title: "B.Tech — Computer Science",
    location: "India",
    description:
      "Graduated with a CS degree. Smart India Hackathon finalist. Maharashtra Innovation Challenge district winner.",
    icon: React.createElement(LuGraduationCap),
    date: "2024",
  },
  {
    title: "Specialist Programmer",
    location: "Infosys · Pune",
    description:
      "Working as a Specialist Programmer. 1.5 years Spring Boot experience building backend systems.",
    icon: React.createElement(CgWorkAlt),
    date: "2024 – present",
  },
  {
    title: "Building Delma",
    location: "Side Project",
    description:
      "13 Spring Boot microservices, RAG pipeline (pgvector + Voyage AI), MCP booking agent (ReAct), post-consultation AI report generation via Groq.",
    icon: React.createElement(FaServer),
    date: "2024 – present",
  },
] as const;

// ─────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────
export const projectsData = [
  {
    title: "Delma",
    description:
      "AI healthcare platform. 13 Spring Boot microservices — Spring Cloud Gateway, Eureka, Kafka, Redis, pgvector. RAG document summarization, MCP booking agent (ReAct), post-consultation AI report generation via Groq. CI/CD with GitHub Actions multi-arch Docker builds.",
    tags: [
      "Spring Boot",
      "Kafka",
      "Redis",
      "pgvector",
      "Groq",
      "Next.js 14",
      "TypeScript",
      "Docker",
    ],
    imageUrl: project1,
    live: "https://delma.aakashtyagi.in",
    code: "https://github.com/AakashTyagi354/delma2.0_spring_microservice",
  },
  {
    title: "MindCraftAI",
    description:
      "Platform integrating multiple AI tools — AI-powered code generation, video and music generation. Built with Next.js 14, TypeScript, and OpenAI APIs.",
    tags: ["Next.js", "TypeScript", "OpenAI", "Tailwind", "MySQL"],
    imageUrl: project2,
    live: "https://mind-craft-f4u8lqqbo-aakashtyagi354.vercel.app/",
    code: "https://github.com/AakashTyagi354/MindCraftAi",
  },
] as const;

// ─────────────────────────────────────────────────────────────
// SKILLS
// Grouped by domain — matches actual resume line
// ─────────────────────────────────────────────────────────────
import java    from "../public/images/java.png";
import js      from "../public/images/js.png";
import ts      from "../public/images/ts2.png";
import react   from "../public/images/react.png";
import nextjs  from "../public/images/nextjs2.svg";
import redux   from "../public/images/redux.png";
import tailwind from "../public/images/tailwind.png";
import docker  from "../public/images/docker.png";
import git     from "../public/images/git.png";
import postgres from "../public/images/postgres.png";
import redis   from "../public/images/redis2.png";
import nodejs  from "../public/images/nodejs.png";
import html    from "../public/images/html.png";
import css     from "../public/images/css.png";

export const skillsData = [
  // Languages
  { title: "Java",        img: java,      category: "Backend"  },
  { title: "TypeScript",  img: ts,        category: "Frontend" },
  { title: "JavaScript",  img: js,        category: "Frontend" },

  // Backend
  { title: "Spring Boot", img: java,      category: "Backend"  },
  { title: "Node.js",     img: nodejs,    category: "Backend"  },

  // Frontend
  { title: "Next.js 14",  img: nextjs,    category: "Frontend" },
  { title: "React",       img: react,     category: "Frontend" },
  { title: "Redux",       img: redux,     category: "Frontend" },
  { title: "Tailwind",    img: tailwind,  category: "Frontend" },

  // Database & Cache
  { title: "PostgreSQL",  img: postgres,  category: "Database" },
  { title: "Redis",       img: redis,     category: "Database" },

  // DevOps
  { title: "Docker",      img: docker,    category: "DevOps"   },
  { title: "Git",         img: git,       category: "DevOps"   },

  // Web basics
  { title: "HTML",        img: html,      category: "Frontend" },
  { title: "CSS",         img: css,       category: "Frontend" },
];