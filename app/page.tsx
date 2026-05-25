import Contact from "@/components/Contact";
import Info from "@/components/Info";
import Projects from "@/components/Projects";
import SkillsTwo from "@/components/SkillsTwo";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      <div className="w-full" id="home">
        <Info />
      </div>
      <div className="w-full" id="projects">
        <Projects />
      </div>
      <div className="w-full" id="skills">
        <SkillsTwo />
      </div>
      <div className="w-full" id="contact">
        <Contact />
      </div>
    </main>
  );
}