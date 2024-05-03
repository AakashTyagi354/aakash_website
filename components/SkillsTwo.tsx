"use client";

import React from "react";

import { skillsData } from "@/lib/data";

import { motion } from "framer-motion";

import Image from "next/image";
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

export default function SkillsTwo() {
  return (
    <section
      id="skills"
      className=" w-[70%]  mx-auto  h-full flex flex-col items-center justify-center pt-[150px] md:pt-[100px]"
    >
      <div className="w-full">
        <p className=" text-2xl md:text-4xl text-gray-600 tracking-widest font-mono dark:text-[#E1E1E1]">
          My Skills
        </p>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-3  justify-center gap-2 text-lg text-gray-800 mt-16 ">
        {skillsData.map((skill, index) => (
          <motion.li
            className="border  h-[60px] w-[300px] rounded-md shadow-sm md:mx-8  mt-2 "
            key={index}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            custom={index}
          >
            <div className="flex items-center h-full gap-4">
              <Image
                src={skill.img}
                alt="html"
                height={40}
                width={40}
                className="ml-2"
              />
              <p className="text-[14px] tracking-wider text-gray-500 dark:text-[#A2A6A8]">
                {skill.title}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
