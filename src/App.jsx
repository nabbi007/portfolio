import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import { useSmoothScroll } from "./hooks/useSmoothScroll";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  // smooth scroll only starts once the deploy loader finishes
  useSmoothScroll(loaded);

  // lock the page while the loader plays
  useEffect(() => {
    document.body.style.overflow = loaded ? "" : "hidden";
    if (loaded) window.scrollTo(0, 0);
  }, [loaded]);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />

      <Nav ready={loaded} />

      <main>
        <Hero ready={loaded} />
        <About />
        <Skills />
        <Work />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
