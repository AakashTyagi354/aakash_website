import Info from "@/components/Info";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4">
      <div className="w-full h-[700px] pt-[150px]   " id="home">
        <Info />
      </div>
      <div className="w-full h-[700px]   " id="skills">
        <Skills />
      </div>
    </main>
  );
}
