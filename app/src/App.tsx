import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Navbar from "@/components/Navbar";
import AuroraBackground from "@/sections/AuroraBackground";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Skills from "@/sections/Skills";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Tools from "@/sections/Tools";
import Certifications from "@/sections/Certifications";
import Contact from "@/sections/Contact";
import Admin from "@/pages/Admin";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [loaded]);

  return (
    <main className="relative z-10">
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Tools />
      <Certifications />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <>
      <AuroraBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
