"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BiCode, BiDownArrow, BiDownload } from "react-icons/bi";
import { BsArrowRight, BsGithub, BsLinkedin, BsMailbox } from "react-icons/bs";
import { CgMail } from "react-icons/cg";
import { FaGitSquare } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { HiDownload } from "react-icons/hi";

export default function Intro() {
  return (
    <section className="my-24 max-w-[60rem] h-[600px] text-center sm:mb-0">
      <motion.p
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-10 mt-12 px-4 font-medium"
      >
        <p className="italic text-[20px] text-gray-700">
          <span className="text-4xl">I&apos;m Aakash Tyagi</span>. As a recent
          2024 graduate, I&apos;m eager to apply my expertise in the MERN stack,
          including TypeScript and Next.js 14, to an entry-level role. My solid
          foundation in data structures and algorithms, coupled with hands-on
          experience, enables me to develop efficient solutions. I&apos;ve
          demonstrated my problem-solving skills through participation in
          hackathons, including the Smart India Hackathon, where we were
          finalists, and the Maharashtra Innovation Challenge, where we emerged
          as winners at the district level.
        </p>
      </motion.p>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.1,
        }}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 px-4 text-lg font-medium flex-wrap"
      >
        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          download
        >
          Download CV{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </a>
        <a
          className="group bg-white text-white border border-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          download
        >
          Contact Us{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition" />
        </a>
        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          download
        >
          LinkedIn{" "}
          <FaLinkedinIn className="opacity-60 group-hover:translate-y-1 transition" />
        </a>
      </motion.div>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.1,
        }}
        className="flex mt-4 sm:mt-8 flex-col sm:flex-row justify-center items-center gap-4 px-4 text-lg font-medium flex-wrap"
      >
        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          href="/CV.pdf"
          download
        >
          GitHub{" "}
          <BsGithub className="opacity-60 group-hover:translate-y-1 transition" />
        </a>
        <a
          className="group bg-white px-7 py-3 flex items-center gap-2 rounded-full outline-none focus:scale-110 hover:scale-110 active:scale-105 transition cursor-pointer borderBlack dark:bg-white/10"
          href="/CV.pdf"
          download
        >
          Leetcode{" "}
          <BiCode className="opacity-60 group-hover:translate-y-1 transition" />
        </a>
      </motion.div>
    </section>
  );
}
