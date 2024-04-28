import { FaGithub, FaLinkedinIn } from "react-icons/fa";

import { FaCode } from "react-icons/fa";


import { FaTwitter } from "react-icons/fa";
export default function Info() {
  return (
    <div className="flex pt-[100px]  h-full w-[70%] mx-auto flex-col " >
      <div className="flex items-center w-full ">
        <p className="text-2xl md:text-4xl text-gray-600 tracking-widest font-mono">
          I AM AAKASH TYAGI
        </p>
      </div>
      <p className=" mt-6 tracking-wide text-gray-500 ">
        As a 2024 graduate eager to kickstart my career, I bring hands-on
        experience in some of the latest technologies like the{" "}
        <span className="font-bold text-gray-900">MERN stack</span> , where I have
        used
        <span className="font-bold text-gray-900"> TypeScript</span> and{" "}
        <span className="font-bold text-gray-900">Next.js 14 </span>
        to build modern web applications. My foundation in data structures and
        algorithms is strong, giving me a solid understanding of how to solve
        complex problems efficiently.
      </p>
      <p className="mt-4 tracking-wide text-gray-500 ">
        Additionally, I have actively participated in hackathons to apply my
        skills in real-world scenarios. Notably, my team was a finalist in the
        <span className="font-bold text-gray-900"> Smart India Hackathon</span>,
        showcasing our ability to innovate and collaborate effectively under
        pressure. We also clinched victory in the
        <span className="font-bold text-gray-900">
          {" "}
          Maharashtra Innovation Challenge
        </span>{" "}
        at the district level, demonstrating our commitment to solving local
        challenges through technology.
      </p>
      <p className="mt-4 tracking-wide text-gray-500 ">
        I am excited to leverage my skills and experiences to contribute
        positively to a dynamic team and make meaningful contributions to
        innovative projects.
      </p>
      <div className="flex gap-10 mt-8 items-center h-[50px] ">
        <a
          href="https://www.linkedin.com/in/aakash-tyagi-274228206/"
          target="_blank"
        >
          <FaLinkedinIn size={25} className="cursor-pointer text-gray-600" />
        </a>
        <a href="https://leetcode.com/Aakash_Tyagi" target="_blank">
          <FaCode size={25} className="cursor-pointer text-gray-600" />
        </a>
        <a
          href="https://www.linkedin.com/in/aakash-tyagi-274228206/"
          target="_blank"
        >
          <FaTwitter size={25} className="cursor-pointer text-gray-600" />
        </a>
        <a href="https://github.com/AakashTyagi354" target="_blank">
          <FaGithub size={25} className="cursor-pointer text-gray-600" />
        </a>
      </div>
    </div>
  );
}
