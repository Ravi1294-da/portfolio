import { ScrollyCanvas } from "@/components/ScrollyCanvas"
import { Overlay } from "@/components/Overlay"
import { About } from "@/components/About"
import { Projects } from "@/components/Projects"
import { Skills } from "@/components/Skills"
import { Experience } from "@/components/Experience"
import { Education } from "@/components/Education"
import { Contact } from "@/components/Contact"

export default function Home() {
  return (
    <main className="bg-[#121212]">
      <div className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <Contact />
    </main>
  )
}