import Contact from "@/components/Contact";
import Info from "@/components/Info";
import Projects from "@/components/Projects";

import SkillsTwo from "@/components/SkillsTwo";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <div className="w-full h-[1200] md:h-[700px] pt-[50px] md:pt-[150px]" id="home">
        <Info />
      </div>
      <div className="w-full h-[1600px] md:h-[900px]   " id="skills">
        <SkillsTwo />
      </div>
      <div className="w-full h-[1200px]  " id="projects">
        <Projects />
      </div>
      <div className="w-full h-[850px]  " id="contact">
        <Contact />
      </div>
    </main>
  );
}
