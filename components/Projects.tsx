"use client";
import { useState } from "react";
import { projectsData } from "@/lib/data";

import React from "react";
import Project from "./Project";
import { BiSearch } from "react-icons/bi";

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter projects based on search query
  const filteredProjects = projectsData.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="scroll-mt-28 mb-28 w-[75%] mx-auto mt-52">
  
      <p className="text-4xl pl-[12px] text-gray-600 tracking-widest font-mono">
        My Projects
      </p>
      <div className="my-12 flex justify-end">
        <div className="flex items-center gap-2 border h-10 w-[40%]">
          <BiSearch size={22} className="ml-2" />
          <input
            type="text"
            placeholder="search..."
            className="outline-none bg-inherit text-white w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-4   ">
        {filteredProjects.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
