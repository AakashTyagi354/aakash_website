"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsArrowRight, BsLinkedin } from "react-icons/bs";
import { FaGitSquare } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";

export default function Intro() {
  return (
    <section className="mb-28 max-w-[50rem] text-center sm:mb-0">
      <div className="flex items-center justify-center">Photo</div>
      <motion.p
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-10 mt-4 px-4 text-2xl font-medium sm:text-4xl"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt veniam
        nobis reprehenderit ut officiis, aliquid sit accusamus animi nam
        voluptatum enim qui cumque facilis.
      </motion.p>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: 0.1,
        }}
        className="flex flex-col sm:flex-row justify-center items-center gap-2 px-4 text-lg font-medium"
      >
        <Link
          href={"#contact"}
          className="group bg-gray-900 text-white px-7 py-3 flex items-center gap-2 rounded-full outline-none hover:focus:scale-110 hover:bg-gray-950 active:scale-105 transition-all"
        >
          Contact me
          <BsArrowRight className="opacity-75 group-hover:translate-x-1 transition-alls" />
        </Link>
        <a
          href="/CV.pdf"
          download
          className="group bg-white  px-7 py-3 flex items-center gap-2 rounded-full outline-none hover:focus:scale-110 active:scale-105 transition-all border border-black/10"
        >
          Download CV{" "}
          <HiDownload className="opacity-60 group-hover:translate-y-1 transition-all" />{" "}
        </a>
        <a
          target="_blank"
          className="bg-white  p-4 text-gray-700 flex items-center gap-2 rounded-full hover:scale-[1.15] hover:text-gray-950 hover:focus:scale-110 cursor-pointer active:scale-105 transition-all border border-black/10"
        >
          <BsLinkedin />
        </a>
        <a
          target="_blank"
          className="bg-white  p-4 text-gray-700 text-[1.3rem] flex items-center gap-2  hover:scale-[1.15] hover:text-gray-950 rounded-full cursor-pointer hover:focus:scale-110 active:scale-105 transition-all border border-black/10"
        >
          <FaGitSquare />
        </a>
      </motion.div>
    </section>
  );
}
