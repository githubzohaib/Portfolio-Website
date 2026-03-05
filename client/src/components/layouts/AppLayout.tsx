import { motion } from "framer-motion";
import Hero from "./Hero";
import AboutMe from "./AboutMe";
import Services from "./Skills";
import Projects from "./Projects";
import Internship from "./Internship";
import HackExp from "./HackExp";
import Contact from "./Contact";
import Footer from  "./Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">

      <section id="hero">
        <Hero />
      </section>

      <section id="about">
        <AboutMe />
      </section>

      <section id="experience">
        <Services />
      </section>

      <section id="projects">
        <Projects />
      </section>

      <section id="internship">
        <Internship />
      </section>

      <section id="hackathon">
        <HackExp />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />

    </div>
  );
};

export default LandingPage;