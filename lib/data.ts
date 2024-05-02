import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";

import project1 from "@/public/images/project1.png";
import project2 from "@/public/images/project2.png";
import rmtdevImg from "@/public/rmtdev.png";
import wordanalyticsImg from "@/public/wordanalytics.png";

export const links = [
  {
    name: "Home",
    hash: "#home",
  },
  {
    name: "About",
    hash: "#about",
  },
  {
    name: "Projects",
    hash: "#projects",
  },
  {
    name: "Skills",
    hash: "#skills",
  },
  {
    name: "Experience",
    hash: "#experience",
  },
  {
    name: "Contact",
    hash: "#contact",
  },
] as const;

export const experiencesData = [
  {
    title: "Graduated bootcamp",
    location: "Miami, FL",
    description:
      "I graduated after 6 months of studying. I immediately found a job as a front-end developer.",
    icon: React.createElement(LuGraduationCap),
    date: "2019",
  },
  {
    title: "Front-End Developer",
    location: "Orlando, FL",
    description:
      "I worked as a front-end developer for 2 years in 1 job and 1 year in another job. I also upskilled to the full stack.",
    icon: React.createElement(CgWorkAlt),
    date: "2019 - 2021",
  },
  {
    title: "Full-Stack Developer",
    location: "Houston, TX",
    description:
      "I'm now a full-stack developer working as a freelancer. My stack includes React, Next.js, TypeScript, Tailwind, Prisma and MongoDB. I'm open to full-time opportunities.",
    icon: React.createElement(FaReact),
    date: "2021 - present",
  },
] as const;

export const projectsData = [
  {
    title: "Delam",
    description:
      "Delma is your one-stop solution for online healthcare needs. From booking appointments with doctors to uploading lab test reports and purchasing medications.",
    tags: ["MERN", "Next.js", "Typescript", "Tailwind", "Redis", "Redux"],
    imageUrl: project1,
    live: "https://client-plum-nine.vercel.app",
    code: "https://github.com/AakashTyagi354/client",
  },
  {
    title: "MindCraftAI",
    description:
      "Developed a platform integrating various AI tools, including an AI-Powered Code Generation Tool, an AI-Driven Video, and Music Generation",
    tags: ["Nextjs", "TypeScript", "MySql", "Tailwind", "OpenAI"],
    imageUrl: project2,
    live: "https://mind-craft-f4u8lqqbo-aakashtyagi354.vercel.app/",
    code: "https://github.com/AakashTyagi354/MindCraftAi",
  },
  {
    title: "Word Analytics",
    description:
      "A public web app for quick analytics on text. It shows word count, character count and social media post limits.",
    tags: ["React", "Next.js", "SQL", "Tailwind", "Framer"],
    imageUrl: wordanalyticsImg,
    live: "https://client-plum-nine.vercel.app",
    code: "https://github.com/AakashTyagi354/client",
  },
] as const;

import html from "../public/images/html.png";
import js from "../public/images/js.png";
import java from "../public/images/java.png";
import tailwind from "../public/images/tailwind.png";
import docker from "../public/images/docker.png";
import ts from "../public/images/ts2.png";
import express from "../public/images/express.png";
import git from "../public/images/git.png";
import graphQL from "../public/images/grahpql.png";
import mongodb from "../public/images/mongodb.png";
import nodejs from "../public/images/nodejs.png";
import motion from "../public/images/motion.png";
import postgres from "../public/images/postgres.png";
import prisma from "../public/images/prisma3.svg";
import redis from "../public/images/redis2.png";
import redux from "../public/images/redux.png";
import python from "../public/images/python.png";
import nextjs from "../public/images/nextjs2.svg";
import css from "../public/images/css.png";
import react from "../public/images/react.png";

export const skillsData = [
  {
    title: "HTML",
    img: html,
  },
  {
    title: "CSS",
    img: css,
  },
  {
    title: "JavaScript",
    img: js,
  },
  {
    title: "TypeScript",
    img: ts,
  },
  {
    title: "Java",
    img: java,
  },
  {
    title: "React",
    img: react,
  },
  {
    title: "Next.js",
    img: nextjs,
  },
  {
    title: "Node.js",
    img: nodejs,
  },
  {
    title: "Git",
    img: git,
  },
  {
    title: "Tailwind",
    img: tailwind,
  },
  {
    title: "Prisma",
    img: prisma,
  },
  {
    title: "MongoDB",
    img: mongodb,
  },
  {
    title: "Redux",
    img: redux,
  },
  {
    title: "GraphQL",
    img: graphQL,
  },
  {
    title: "Express",
    img: express,
  },
  {
    title: "PostgreSQL",
    img: postgres,
  },
  {
    title: "Python",
    img: python,
  },
  {
    title: "Docker",
    img: docker,
  },
  {
    title: "Redis",
    img: redis,
  },
  {
    title: "Framer Motion",
    img: motion,
  },
];
