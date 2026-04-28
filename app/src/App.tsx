import { useEffect, useState, useCallback } from "react";
import { Routes, Route } from "react-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import Navbar from "@/components/Navbar";
import LoadingScreen from "./sections/LoadingScreen";
import CustomCursor from "./sections/CustomCursor";
import Hero from "./sections/Hero";
import Work from "./sections/Work";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const [heroIntensity, setHeroIntensity] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.create({
      trigger: "#hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => setHeroIntensity(Math.max(0.2, 1 - self.progress * 0.8)),
    });

    return () => { lenis.destroy(); };
  }, [loaded]);

  const handleLoadingComplete = useCallback(() => setLoaded(true), []);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadingComplete} />}
      <CustomCursor />
      <main className="relative">
        <Hero intensity={heroIntensity} />
        <Work />
        <About />
        <Skills />
        <Contact />
      </main>
    </>
  );
}

export default function App() {
  return (
    <>
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
