import { Nav } from "@/components/nav";
import { Intro } from "@/components/intro";
import { Focus } from "@/components/focus";
import { Projects } from "@/components/projects";
import { ComingSoon } from "@/components/coming-soon";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Intro />
        <Focus />
        <Projects />
        <ComingSoon
          id="blog"
          eyebrow="Writing"
          title="Thoughts"
          note="Blog coming soon — notes on backend systems, distributed infra, and things I break along the way."
        />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
