"use client";

import React from "react";

import { skillsData } from "@/lib/data";

import { motion } from "framer-motion";

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.05 * index,
    },
  }),
};

export default function Skills() {
  return (
    <section
      id="skills"
      className=" w-[60%] mx-auto  h-full flex flex-col items-center justify-center pt-[200px]"
    >
      <p className="text-4xl text-gray-600 tracking-widest font-mono">
        My Skills
      </p>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800 mt-16">
        {skillsData.map((skill, index) => (
          <motion.li
            className="bg-gray-100 borderBlack my-2  rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80"
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            {skill}
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
