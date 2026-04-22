"use client";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Research from "@/components/Research";
import Achievements from "@/components/Achievements";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const SpaceCanvas = dynamic(() => import("@/components/SpaceCanvas"), { ssr: false });
const Cursor = dynamic(() => import("@/components/Cursor"), { ssr: false });
const Preloader = dynamic(() => import("@/components/Preloader"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const ProgressBar = dynamic(() => import("@/components/ProgressBar"), { ssr: false });

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <ProgressBar />
      <SpaceCanvas />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Research />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
