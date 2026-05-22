import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail } from "lucide-react";
import InteractiveBackground from "./components/InteractiveBackground";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";
import Preloader from "./components/Preloader";

export default function App() {
  const [activeTab, setActiveTab] = useState("Concept");
  const [time, setTime] = useState("");

  const tabs = ["Concept", "Craft", "Archive", "Ethos", "Contact"];

  // Handle live digital clock inside the hero section
  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString("en-GB", { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Precise Scroll Spy to synchronize navbar states based on active viewport section
  useEffect(() => {
    const sections = ["concept", "craft", "archive", "ethos", "contact"];
    
    // rootMargin offset helps trigger section transition exactly at screen midpoints
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const mappedTab = id === "concept" ? "Concept" : 
                            id === "craft" ? "Craft" :
                            id === "archive" ? "Archive" :
                            id === "ethos" ? "Ethos" :
                            id === "contact" ? "Contact" : null;
          if (mappedTab) {
            setActiveTab(mappedTab);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll handler
  const handleScroll = (id: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getAnimationProps = (delay: number) => ({
    initial: { opacity: 0, y: 30, filter: "blur(8px)" },
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <SmoothScroll>
      <Preloader />
      <InteractiveBackground />
      <CustomCursor />

      <div className="relative min-h-screen bg-[#080a0c] text-foreground selection:bg-white/20 font-sans flex flex-col overflow-x-hidden">
        
        {/* 1. CONCEPT (Hero Landing Section) */}
        <div
          id="concept"
          className="relative z-[10] min-h-screen w-full flex flex-col justify-between overflow-hidden"
        >
          {/* Cinematic Overlay Gradient */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/20 via-transparent to-black/60 z-10"></div>

          {/* Fullscreen Animated GIF Background */}
          <img
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-45 select-none mix-blend-screen"
            src="https://i.pinimg.com/originals/66/ad/8a/66ad8a8b3cf59cee451e53ec45ad76c3.gif"
            alt="Aevorn Cinematic Background"
            referrerPolicy="no-referrer"
          />

          {/* Glassmorphic Navigation Bar */}
          <nav className="relative w-full z-50">
            <div className="flex flex-row justify-between items-center px-6 sm:px-12 py-8 max-w-7xl mx-auto w-full">
              {/* Logo */}
              <a
                href="#concept"
                onClick={(e) => {
                  setActiveTab("Concept");
                  handleScroll("concept", e);
                }}
                className="text-3xl tracking-tight font-light text-[#f5f5f5] select-none"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Aevorn<sup className="text-xs align-super font-normal text-muted-foreground/60 ml-px">™</sup>
              </a>

              {/* Navigation links with Smooth Scroll & Pill Animations */}
              <div className="hidden md:flex gap-3 items-center bg-white/[0.015] border border-white/[0.05] rounded-full px-4 py-2 backdrop-blur-md">
                {tabs.map((tab) => {
                  const targetId = tab.toLowerCase();
                  const isTabActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={(e) => {
                        setActiveTab(tab);
                        handleScroll(targetId, e);
                      }}
                      className={`text-xs tracking-[0.1em] uppercase font-mono py-1.5 px-3.5 rounded-full transition-all duration-300 relative cursor-pointer ${
                        isTabActive
                          ? "text-[#080a0c] bg-[#f5f5f5] font-semibold"
                          : "text-[#f5f5f5] opacity-75 hover:opacity-100 hover:bg-[#f5f5f5]/90 hover:text-[#080a0c]"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>

              {/* Enter the World CTA Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => handleScroll("aevorn-world", e)}
                  className="liquid-glass rounded-full px-7 py-2.5 text-xs font-medium text-[#f5f5f5] tracking-widest uppercase hover:scale-[1.03] transition-transform duration-300 cursor-pointer text-center"
                >
                  Enter the World
                </button>
              </div>
            </div>
          </nav>

        {/* Hero Content Area */}
        <main className="relative z-10 flex-grow flex flex-col items-center justify-center text-center px-6 max-w-7xl mx-auto w-full">
          {/* Radial Gradient Wrapping Area for Title Visibility */}
          <div
            className="flex flex-col items-center justify-center text-center max-w-5xl"
            style={{
              background: "radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, transparent 75%)",
              padding: "48px 64px",
              borderRadius: "24px",
            }}
          >
            {/* Cinematic Main Heading */}
            <h1
              className="text-5xl sm:text-6xl md:text-[108px] leading-[0.88] tracking-[-0.04em] font-light text-[#f5f5f5] animate-ascend select-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              <span className="text-gray-500 italic opacity-85 inline-block mr-3">Stillness</span> is the <br className="hidden md:block" /> new speed.
            </h1>

            {/* Ambient Subtext */}
            <p className="text-gray-300 font-body text-base sm:text-lg md:text-xl max-w-xl mt-12 leading-relaxed tracking-wide font-light animate-ascend-delay">
              Aevorn is built for those who create with intention. <br className="hidden sm:block" /> A quiet space in a loud world — where your best <br className="hidden sm:block" /> thinking finds room to breathe.
            </p>

            {/* Step Inside Button */}
            <div className="animate-ascend-delay-2">
              <button
                onClick={(e) => handleScroll("aevorn-world", e)}
                className="liquid-glass rounded-full px-16 py-5 text-sm font-medium text-[#f5f5f5] mt-16 tracking-[0.25em] uppercase hover:scale-[1.03] cursor-pointer transition-transform duration-300"
              >
                Step Inside
              </button>
            </div>
          </div>
        </main>

        {/* Minimal Hero Bottom Section (Corner Credit Removed, Clock Bottom Centered with higher z-index) */}
        <footer className="relative w-full max-w-7xl mx-auto px-6 sm:px-12 pb-10 pt-8 border-t border-white/[0.03] flex justify-between items-center text-xs text-muted-foreground font-mono">
          <div className="w-1/3 hidden sm:block"></div>
          
          {/* Live Digital Clock centered (z-30 keeps it crisp and above the transition mask) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="liquid-glass rounded-full px-5 py-2 font-body text-xs tracking-[0.2em] text-white/70">
              {time || "12:00:00"}
            </div>
          </div>

          <div className="text-right text-[10px] text-gray-500/50 uppercase tracking-wider w-full sm:w-1/3 selection:bg-transparent">
            Scroll to Enter
          </div>
        </footer>
      </div>


      {/* 2. Entering the World Segment (id="aevorn-world") */}
      <div
        id="aevorn-world"
        className="relative z-[9] bg-[#08090a] px-8 md:px-16 lg:px-20 pt-28 pb-32 flex flex-col min-h-screen justify-center overflow-hidden"
      >
        {/* Fullscreen Video Background for Ethos Room */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-20 select-none mix-blend-screen"
          src="https://files.catbox.moe/4mme6j.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        {/* Content Container */}
        <div className="max-w-7xl mx-auto w-full relative z-10">
          {/* Top of Section: Ethos Intro (No prefix '//' to maintain absolute cleanliness) */}
          <div className="text-left">
            <motion.p
              {...getAnimationProps(0)}
              className="text-xs font-body tracking-[0.3em] uppercase text-white/40 mb-8"
            >
              The Aevorn Ethos
            </motion.p>

            <motion.h2
              {...getAnimationProps(0.15)}
              className="text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px] text-white font-light"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Depth over <br />
              <span className="text-white/30 italic">distraction.</span>
            </motion.h2>

            <motion.p
              {...getAnimationProps(0.3)}
              className="mt-8 max-w-xl text-base text-white/50 font-body font-light leading-relaxed"
            >
              In a world optimized for noise, Aevorn is built for signal. Every tool, every surface, every interaction is designed to protect your focus and amplify your intent.
            </motion.p>
          </div>

          {/* Three Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20">
            {/* Card 1 — Deep Focus */}
            <motion.div
              {...getAnimationProps(0.45)}
              className="liquid-glass-strong rounded-[1.25rem] p-7 min-h-[340px] flex flex-col relative overflow-hidden group"
            >
              {/* Autoplayed Video Background */}
              <video
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-105"
                src="https://files.catbox.moe/xskqsf.mp4"
                autoPlay
                loop
                muted
                playsInline
              />

              <div className="relative z-10 flex flex-col h-full justify-between items-start">
                <div className="flex flex-wrap gap-1.5">
                  {["Flow State", "Zero Noise", "Present"].map((pill) => (
                    <span
                      key={pill}
                      className="liquid-glass rounded-full px-3 py-1 text-[10px] tracking-wider text-white/50 font-mono"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
                <div className="mt-28">
                  <h3
                    className="text-4xl text-white tracking-[-1px] leading-none italic font-light font-heading"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Deep Focus
                  </h3>
                  <p className="mt-4 text-sm text-white/50 font-body font-light leading-snug max-w-[30ch]">
                    An environment engineered to eliminate distraction. Your mind finds its edge and holds it.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2 — Structured Flow */}
            <motion.div
              {...getAnimationProps(0.6)}
              className="liquid-glass-strong rounded-[1.25rem] p-7 min-h-[340px] flex flex-col relative overflow-hidden group"
            >
              {/* Autoplayed Video Background */}
              <video
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-105"
                src="https://files.catbox.moe/n8o6qe.mp4"
                autoPlay
                loop
                muted
                playsInline
              />

              <div className="relative z-10 flex flex-col h-full justify-between items-start">
                <div className="flex flex-wrap gap-1.5">
                  {["Rhythm", "Clarity", "Momentum"].map((pill) => (
                    <span
                      key={pill}
                      className="liquid-glass rounded-full px-3 py-1 text-[10px] tracking-wider text-white/50 font-mono"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
                <div className="mt-28">
                  <h3
                    className="text-4xl text-white tracking-[-1px] leading-none italic font-light font-heading"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Structured Flow
                  </h3>
                  <p className="mt-4 text-sm text-white/50 font-body font-light leading-snug max-w-[30ch]">
                    Move through your work with purpose. Aevorn adapts to your pace — never ahead, never behind.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 3 — Ambient Space */}
            <motion.div
              {...getAnimationProps(0.75)}
              className="liquid-glass-strong rounded-[1.25rem] p-7 min-h-[340px] flex flex-col relative overflow-hidden group"
            >
              {/* Autoplayed Video Background */}
              <video
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-105"
                src="https://files.catbox.moe/ksi9io.mp4"
                autoPlay
                loop
                muted
                playsInline
              />

              <div className="relative z-10 flex flex-col h-full justify-between items-start">
                <div className="flex flex-wrap gap-1.5">
                  {["Texture", "Warmth", "Presence"].map((pill) => (
                    <span
                      key={pill}
                      className="liquid-glass rounded-full px-3 py-1 text-[10px] tracking-wider text-white/50 font-mono"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
                <div className="mt-28">
                  {/* Clean display font heading */}
                  <h3
                    className="text-4xl text-white tracking-[-1px] leading-none italic font-light font-heading"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Ambient Space
                  </h3>
                  <p className="mt-4 text-sm text-white/50 font-body font-light leading-snug max-w-[30ch]">
                    Spaces that breathe with you. Visual calm that signals your brain: this is where good work happens.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Transition Band: Aevorn-World and Craft */}
      <div className="section-transition" />

      {/* 3. CRAFT SECTION */}
      <div
        id="craft"
        className="relative z-[8] min-h-screen bg-[#08090a] flex flex-col justify-center items-center text-center px-[48px] overflow-hidden"
      >
        {/* Fullscreen Background Video for Craft Section */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-20 select-none mix-blend-screen"
          src="https://files.catbox.moe/dcytot.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          <motion.p
            {...getAnimationProps(0)}
            className="text-xs font-body tracking-[0.3em] uppercase text-white/30 mb-6"
          >
            The Craft
          </motion.p>
          <motion.h2
            {...getAnimationProps(0.15)}
            className="text-6xl md:text-7xl text-white font-normal leading-[0.9] tracking-[-2px] italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Made with intention.
          </motion.h2>
          <motion.p
            {...getAnimationProps(0.3)}
            className="mt-8 max-w-lg text-base text-white/40 font-body leading-relaxed font-light"
          >
            Every decision on this page — the spacing, the timing, the silence between elements — was made deliberately. Craft is not decoration. It is discipline.
          </motion.p>
        </div>
      </div>

      {/* Transition Band: Craft and Archive */}
      <div className="section-transition" />

      {/* 4. ARCHIVE SECTION */}
      <div
        id="archive"
        className="relative z-[7] min-h-screen bg-[#08090a] flex flex-col justify-center items-center text-center px-[48px] overflow-hidden"
      >
        {/* Fullscreen Background Video for Archive Section */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-20 select-none mix-blend-screen"
          src="https://files.catbox.moe/40fz4x.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          <motion.p
            {...getAnimationProps(0)}
            className="text-xs font-body tracking-[0.3em] uppercase text-white/30 mb-6"
          >
            Archive
          </motion.p>
          <motion.h2
            {...getAnimationProps(0.15)}
            className="text-6xl md:text-7xl text-white font-normal leading-[0.9] tracking-[-2px] italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A library of thought.
          </motion.h2>
          <motion.p
            {...getAnimationProps(0.3)}
            className="mt-8 max-w-lg text-base text-white/40 font-body leading-relaxed font-light"
          >
            Coming soon. A curated collection of essays, processes, and ideas from the Aevorn studio. Slow reading for fast minds.
          </motion.p>
        </div>
      </div>

      {/* Transition Band: Archive and Ethos */}
      <div className="section-transition" />

      {/* 5. ETHOS SECTION */}
      <div
        id="ethos"
        className="relative z-[6] min-h-screen bg-[#08090a] flex flex-col justify-center items-center text-center px-[48px] overflow-hidden"
      >
        {/* Fullscreen Background Video for Ethos Section */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-20 select-none mix-blend-screen"
          src="https://files.catbox.moe/6ggq9k.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          <motion.p
            {...getAnimationProps(0)}
            className="text-xs font-body tracking-[0.3em] uppercase text-white/30 mb-6"
          >
            Our Ethos
          </motion.p>
          <motion.h2
            {...getAnimationProps(0.15)}
            className="text-6xl md:text-7xl text-white font-normal leading-[0.9] tracking-[-2px] italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Depth over distraction.
          </motion.h2>
          <motion.p
            {...getAnimationProps(0.3)}
            className="mt-8 max-w-lg text-base text-white/40 font-body leading-relaxed font-light"
          >
            We believe the most important work happens in quiet. Aevorn exists to protect that quiet — and give it shape.
          </motion.p>
        </div>
      </div>

      {/* Transition Band: Ethos and Contact */}
      <div className="section-transition" />

      {/* 6. CONTACT SECTION */}
      <div
        id="contact"
        className="relative z-[5] min-h-screen bg-[#08090a] flex flex-col justify-center items-center text-center px-[48px] overflow-hidden"
      >
        {/* Fullscreen Background Video for Contact Section */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-20 select-none mix-blend-screen"
          src="https://files.catbox.moe/6yanx5.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div className="max-w-3xl mx-auto flex flex-col items-center relative z-10">
          <motion.p
            {...getAnimationProps(0)}
            className="text-xs font-body tracking-[0.3em] uppercase text-white/30 mb-6"
          >
            Contact
          </motion.p>
          <motion.h2
            {...getAnimationProps(0.15)}
            className="text-6xl md:text-7xl text-white font-normal leading-[0.9] tracking-[-2px] italic"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Let's think together.
          </motion.h2>
          <motion.p
            {...getAnimationProps(0.3)}
            className="mt-8 max-w-lg text-base text-white/40 font-body leading-relaxed font-light"
          >
            Reach out at
          </motion.p>
          <motion.div
            {...getAnimationProps(0.4)}
            className="mt-4"
          >
            <a
              href="mailto:fadedpiglin@gmail.com"
              className="font-body text-sm text-white/50 tracking-widest no-underline hover:text-white transition-colors duration-300 uppercase block"
            >
              fadedpiglin@gmail.com
            </a>
          </motion.div>
        </div>
      </div>

      {/* Transition Band: Contact and Footer */}
      <div className="section-transition" />

      {/* MINIMAL FOOTER BY LUVYA SAVARIA */}
      <footer className="relative z-[4] w-full py-[32px] text-center">
        <div className="font-body text-[11px] tracking-[0.25em] uppercase text-white/20 select-none">
          Made by Luvya Savaria
        </div>
      </footer>
    </div>
  </SmoothScroll>
  );
}
