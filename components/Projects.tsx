"use client"
import { useState } from "react";
import { projectsData } from "@/lib/data";
import SectionHeading from "./SectionHeading";
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
    <section id="projects" className="scroll-mt-28 mb-28 w-[85%] mx-auto mt-52">
      <SectionHeading>My projects</SectionHeading>
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
      <div className="flex flex-wrap gap-8">
        {filteredProjects.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
