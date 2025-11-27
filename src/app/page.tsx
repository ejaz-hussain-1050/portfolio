import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Experiences } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { getPortfolioData } from "@/lib/data";

export default async function Home() {
  const data = await getPortfolioData();

  return (
    <main className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <About skills={data.skills} />
      <Experiences experiences={data.experiences} />
      <Projects projects={data.projects} />
      <Contact />
      <Footer />
    </main>
  );
}
