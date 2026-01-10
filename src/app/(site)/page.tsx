import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Services } from "@/components/sections/Services";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";

import { ContactCTA } from "@/components/sections/ContactCTA";
import ScrollProgress from "@/components/features/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Services />
      <FeaturedProjects />

      <ContactCTA />
    </>
  );
}
