"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowDown, ArrowRight, X, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingElement from "@/components/FloatingElement";
import SprayRevealImage from "@/components/SprayRevealImage";

// Inline Instagram SVG — lucide-react v1.33.0 does not export Instagram
function Instagram({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  aspect_ratio?: string;
  year: string;
  thumbnail: string;
  video: string;
  description: string;
  roles: string;
  tools: string;
  isFeatured: boolean;
  isPublished: boolean;
  order: number;
  createdAt?: string;
}

const HERO_NAME = "Sectio Kautsar Ramadhani.";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [displayedName, setDisplayedName] = useState("");
  const showreelRef = useRef<HTMLVideoElement>(null);
  const [showreelPlaying, setShowreelPlaying] = useState(false);
  const [showreelStarted, setShowreelStarted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/projects")
      .then(res => res.ok ? res.json() : [])
      .then(data => setProjects(data))
      .catch(() => setProjects([]));
  }, []);

  useEffect(() => {
    let characterIndex = 0;
    const typingTimer = window.setInterval(() => {
      characterIndex += 1;
      setDisplayedName(HERO_NAME.slice(0, characterIndex));

      if (characterIndex >= HERO_NAME.length) {
        window.clearInterval(typingTimer);
      }
    }, 90);

    return () => window.clearInterval(typingTimer);
  }, []);

  const topProjects = [...projects]
    .sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) return Number(b.isFeatured) - Number(a.isFeatured);
      const newestFirst = (b.createdAt || "").localeCompare(a.createdAt || "");
      return newestFirst || a.order - b.order;
    })
    .slice(0, 4);

  const ratioStyle = (ratio?: string) => {
    const ratios: Record<string, string> = {
      "9:16": "9 / 16", "16:9": "16 / 9", "1:1": "1 / 1",
      "4:5": "4 / 5", "3:4": "3 / 4", "21:9": "21 / 9",
    };
    return ratios[ratio || "9:16"] || "16 / 9";
  };

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="min-h-screen relative flex items-center overflow-hidden px-6 md:px-16 lg:px-24 pt-28 pb-20">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-[10%] w-72 h-72 bg-[#F4B400]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 left-[5%] w-96 h-96 bg-[#B497D6]/10 rounded-full blur-[150px]" />
        </div>

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left: Typography */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Small label */}
              <div className="inline-flex items-center gap-2 bg-[#3D2560] border-2 border-[#B497D6]/30 rounded-full px-4 py-2 mb-8">
                <div className="w-2 h-2 bg-[#F4B400] rounded-full animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#C9B6E4]">Slide to Know Me</span>
              </div>

              {/* Main headline */}
              <div className="relative w-fit max-w-full">
                <div aria-hidden="true" className="absolute -right-7 -top-5 rotate-12 text-xl text-[#F4B400]">✦</div>
                <h1 className="font-display-hero text-[clamp(3.5rem,10vw,7rem)] uppercase leading-[0.84] mb-6">
                  <motion.span
                    animate={{ y: [0, -6, 0], rotate: [0, -0.8, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex max-w-full flex-col"
                  >
                    <span className="hero-brush-word hero-brush-port text-[#F5EFE0]">PORT</span>
                    <span className="hero-brush-word hero-brush-folio text-[#F4B400]">FOLIO.</span>
                  </motion.span>
                </h1>
                <div aria-hidden="true" className="absolute -bottom-1 left-2 flex items-center gap-2">
                  <div className="hero-brush-stroke" />
                  <span className="text-sm text-[#B497D6]">✦</span>
                </div>
              </div>
              <h2 className="font-display-name text-3xl sm:text-4xl md:text-5xl text-[#B497D6] mb-8 leading-tight">
                <span aria-label={HERO_NAME}>{displayedName}</span>
                <motion.span
                  aria-hidden="true"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  className="ml-1 inline-block h-[0.9em] w-0.5 translate-y-1 bg-[#B497D6]"
                />
              </h2>

              {/* Subtext */}
              <p className="text-lg text-[#C9B6E4] max-w-lg mb-10 leading-relaxed">
                I turn footage, ideas, and visuals into stories worth watching.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <a href="#showreel" className="group flex items-center gap-3 bg-[#F4B400] text-[#1B1024] px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:brightness-110 hover:scale-105 transition-all glow-yellow">
                  <Play size={18} fill="currentColor" />
                  Watch Showreel
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <Link href="/projects" className="group flex items-center gap-3 border-2 border-[#B497D6]/50 text-[#F5EFE0] px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:border-[#F4B400] hover:text-[#F4B400] transition-all">
                  Explore Works
                  <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right: Visual composition */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Main visual panel */}
              <div className="bg-[#2E1A47] rounded-[2rem] border-3 border-[#3D2560] p-4 relative overflow-hidden z-10">
                <div id="showreel" style={{ aspectRatio: "16 / 9" }} className="group bg-[#1B1024] rounded-2xl relative overflow-hidden">
                  <video
                    ref={showreelRef}
                    src="/Video/Portofolio%20SkautsarR-web.mp4"
                    title="Sera showreel"
                    controls
                    loop
                    playsInline
                    muted={false}
                    preload="metadata"
                    className="absolute inset-0 h-full w-full object-contain"
                    onPlay={() => {
                      setShowreelStarted(true);
                      setShowreelPlaying(true);
                    }}
                    onPause={() => setShowreelPlaying(false)}
                  />
                  <div
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-0 z-[1] bg-[#1B1024] transition-opacity duration-300 ${!showreelStarted ? "opacity-100" : showreelPlaying ? "opacity-0" : "bg-[#1B1024]/55 opacity-100"}`}
                  />
                  <button
                    type="button"
                    aria-label={showreelPlaying ? "Pause showreel" : "Play showreel"}
                    onClick={() => {
                      if (showreelRef.current?.paused) {
                        void showreelRef.current.play();
                      } else {
                        showreelRef.current?.pause();
                      }
                    }}
                    className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-[#FFD54F]/70 bg-[#F4B400]/80 px-5 py-3 font-mono text-xs font-bold uppercase tracking-[0.14em] text-[#1B1024] opacity-0 shadow-lg shadow-[#F4B400]/30 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 focus-visible:opacity-100 hover:scale-105 sm:text-sm"
                  >
                    {showreelPlaying ? <span className="text-lg leading-none">Ⅱ</span> : <Play size={20} fill="currentColor" />}
                    {showreelPlaying ? "Pause Showreel" : "Watch Showreel"}
                  </button>
                </div>
              </div>

              {/* Floating labels */}
              <FloatingElement delay={0} y={6} className="absolute -top-4 -right-4 z-20">
                <div className="bg-[#F4B400] text-[#1B1024] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider rotate-6">
                  ✦ Creative
                </div>
              </FloatingElement>
              <FloatingElement delay={1} y={8} className="absolute -bottom-3 -left-3 z-20">
                <div className="bg-[#3D2560] border-2 border-[#F4B400] text-[#F4B400] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider -rotate-3">
                  Skautsarr
                </div>
              </FloatingElement>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-[#C9B6E4] uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-[#3D2560] rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-[#F4B400] rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-16 lg:px-24 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual side */}
          <div className="lg:col-span-5">
            <AnimatedSection>
              <div className="relative">
                <div className="bg-[#2E1A47] rounded-[2rem] border-2 border-[#3D2560] p-6">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-[#3D2560] to-[#B497D6]/20">
                    <Image
                      src="/images/Sera.png"
                      alt="Foto Sera"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover object-center"
                    />
                  </div>
                </div>
                <FloatingElement delay={0.5} y={8} className="absolute -top-4 left-8">
                  <div className="bg-[#F4B400] text-[#1B1024] px-3 py-1.5 rounded-lg text-xs font-bold rotate-[-6deg]">
                    Its Me!<menu type="context"></menu> ↗
                  </div>
                </FloatingElement>
              </div>
            </AnimatedSection>
          </div>

          {/* Text side */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.2}>
              <span className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4 block">✦ About me</span>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tighter mb-8 leading-[0.95]">
                HI, I'M <span className="inline-flex items-center gap-2">
                  <motion.span
                    animate={{ y: [0, -5, 0], rotate: [0, 1, 0] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex"
                  >
                    <SprayRevealImage
                      src="/images/Textsera.png"
                      alt="Sera"
                      width={1821}
                      height={864}
                      className="h-auto w-[clamp(9rem,24vw,16rem)] object-contain"
                    />
                  </motion.span>
                  <motion.span
                    animate={{ y: [0, -7, 0], rotate: [0, 3, -3, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-flex shrink-0 align-middle"
                  >
                    <Image
                      src="/images/Iconchar2.png"
                      alt="Karakter About"
                      width={160}
                      height={136}
                      className="h-auto w-24 object-contain sm:w-32 md:w-40"
                    />
                  </motion.span>
                </span>
              </h2>
             
              <p className="text-[#C9B6E4] text-lg leading-relaxed max-w-xl">
                A graduate of Visual Communication Design from Dian Nuswantoro University with a passion for video editing dan visual storytelling. "Setiap frame adalah kesempatan untuk bercerita."
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SELECTED WORKS ═══════════════════ */}
      <section id="works" className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-16">
              <div>
                <span className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4 block">✦ Portfolio</span>
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.95]">
                  WATCH MY<br/><span className="text-[#F4B400]">WORK</span>
                </h2>
                <p className="mt-5 text-sm sm:text-base text-[#C9B6E4] font-mono uppercase tracking-widest">
                  My latest project
                </p>
              </div>
            </div>
          </AnimatedSection>

          {projects.length === 0 ? (
            <AnimatedSection delay={0.2}>
              <div className="bg-[#2E1A47] rounded-[2rem] border-2 border-[#3D2560] p-16 md:p-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-1/4 left-0 right-0 h-px bg-[#B497D6]" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-[#B497D6]" />
                  <div className="absolute top-3/4 left-0 right-0 h-px bg-[#B497D6]" />
                </div>
                <FloatingElement y={10} duration={5}>
                  <span className="text-6xl mb-6 block">🎬</span>
                </FloatingElement>
                <h3 className="text-3xl sm:text-4xl font-bold uppercase tracking-tighter text-[#B497D6] mb-4">No Stories Yet.</h3>
                <p className="text-[#C9B6E4] font-mono text-sm uppercase tracking-widest">Coming soon — stay tuned.</p>
                <div className="mt-8 flex gap-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-3 h-3 rounded-full bg-[#3D2560] border border-[#B497D6]/30" />
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
                    {topProjects.map((p, i) => (
                      <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="cursor-pointer group" onClick={() => setSelectedProject(p)}>
                        <div className="bg-[#2E1A47] rounded-2xl border-2 border-[#3D2560] p-2 group-hover:border-[#F4B400] transition-all duration-300">
                          <div style={{ aspectRatio: ratioStyle(p.aspect_ratio) }} className="bg-[#1B1024] rounded-2xl overflow-hidden relative">
                            {p.thumbnail ? <img src={p.thumbnail} alt={p.title} className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-700" /> : <div className="w-full h-full flex items-center justify-center"><Play size={48} className="text-[#3D2560]" /></div>}
                            <div className="absolute inset-0 bg-[#1B1024]/40 group-hover:bg-transparent transition-colors duration-500" />
                            <div className="absolute bottom-3 right-3 bg-[#F4B400] text-[#1B1024] px-3 py-1.5 rounded-full text-[10px] font-bold uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">Watch →</div>
                          </div>
                          <div className="p-3">
                            <div className="inline-block bg-[#3D2560] border border-[#B497D6]/30 rounded-full px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-[#C9B6E4] mb-2">{p.category}</div>
                            <h3 className="text-lg font-bold uppercase tracking-tight text-[#F5EFE0] group-hover:text-[#F4B400] transition-colors">{p.title}</h3>
                            <p className="text-xs text-[#C9B6E4] mt-1">{p.year}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
              </div>
              <div className="mt-10 flex justify-center">
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-3 border-2 border-[#B497D6]/50 text-[#F5EFE0] px-7 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:border-[#F4B400] hover:text-[#F4B400] transition-all"
                >
                  View All Projects
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════ SKILLS / MY TOOLS ═══════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#2E1A47]/50">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <span className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4 block">✦ Equipped</span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tighter mb-16 leading-[0.95]">
              MY <span className="text-[#F4B400]">TOOLS</span>
            </h2>
          </AnimatedSection>

          {/* Skills pills */}
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap gap-4 mb-16">
              {['VIDEO EDITING', 'MOTION GRAPHICS', 'VISUAL STORYTELLING', 'GRAPHIC DESIGN', 'VIDEOGRAPHY'].map((skill, i) => (
                <motion.div
                  key={skill}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="bg-[#1B1024] border-2 border-[#F4B400] rounded-full px-6 py-3 text-[#F4B400] font-bold text-sm uppercase tracking-wider cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>

          {/* Software tools - sticker style */}
          <AnimatedSection delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                { name: 'Premiere Pro', abbr: 'Pr', color: '#9999FF' },
                { name: 'After Effects', abbr: 'Ae', color: '#9999FF' },
                { name: 'Photoshop', abbr: 'Ps', color: '#31A8FF' },
                { name: 'Illustrator', abbr: 'Ai', color: '#FF9A00' },
                { name: 'Figma', abbr: 'Fi', color: '#A259FF' },
                { name: 'CapCut', abbr: 'Cc', color: '#00D1FF' },
              ].map((tool, i) => (
                <motion.div
                  key={tool.name}
                  whileHover={{ rotate: [-2, 2, 0], scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#2E1A47] border-2 border-[#3D2560] rounded-2xl p-6 flex flex-col items-center gap-3 cursor-default group hover:border-[#F4B400] transition-colors"
                >
                  <span className="text-3xl font-black" style={{ color: tool.color }}>{tool.abbr}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9B6E4] group-hover:text-[#F4B400] transition-colors">{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════ EXPERIENCE ═══════════════════ */}
      <section className="relative overflow-hidden py-24 md:py-32 px-6 md:px-16 lg:px-24">
        <div className="relative max-w-7xl mx-auto">
          <AnimatedSection className="mb-16">
            <span className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4 block">✦ Journey</span>
            <div className="flex items-center gap-3">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.95]">
                EXPERI<span className="text-[#F4B400]">ENCE</span>
              </h2>
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none hidden shrink-0 sm:block"
              >
                <Image
                  src="/images/Iconchar1.png"
                  alt="Karakter Experience"
                  width={190}
                  height={186}
                  className="h-auto w-28 object-contain opacity-90 md:w-40 lg:w-48"
                />
              </motion.div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { num: '01', company: 'Techarea Indonesia', role: 'Video Editor & Content Creator', date: 'Recent', desc: 'Producing visual content and video editing for digital platforms.' },
              { num: '02', company: 'Freelance', role: 'Video Editor & Content Creator', date: 'Ongoing', desc: 'social media content, and various creative projects.' },
            ].map((exp, i) => (
              <AnimatedSection key={i} delay={i * 0.15}>
                <div className="bg-[#2E1A47] rounded-[2rem] border-2 border-[#3D2560] p-8 relative overflow-hidden group hover:border-[#F4B400]/50 transition-all duration-300 h-full">
                  {/* Number */}
                  <span className="text-8xl font-black text-[#3D2560] absolute -top-4 -right-2 leading-none select-none group-hover:text-[#F4B400]/20 transition-colors duration-300">
                    {exp.num}
                  </span>
                  
                  <div className="relative z-10">
                    <div className="inline-block bg-[#F4B400] text-[#1B1024] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
                      {exp.date}
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 text-[#F5EFE0]">{exp.company}</h3>
                    <p className="text-[#F4B400] font-medium text-sm uppercase tracking-wider mb-4">{exp.role}</p>
                    <p className="text-[#C9B6E4] text-sm leading-relaxed">{exp.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ EDUCATION ═══════════════════ */}
      <section className="py-16 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <div className="bg-[#2E1A47] rounded-[2rem] border-2 border-[#3D2560] p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div>
                <span className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-3 block">✦ Education</span>
                <h3 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F5EFE0] mb-2">Universitas Dian Nuswantoro</h3>
                <p className="text-[#C9B6E4] text-lg">S1 Desain Komunikasi Visual</p>
              </div>
              <div className="bg-[#F4B400] text-[#1B1024] px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm shrink-0">
                ✓ Graduated
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection delay={0.15}>
            <div className="bg-[#2E1A47] rounded-[2rem] border-2 border-[#3D2560] p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mt-4">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight text-[#F5EFE0] mb-2">SMK Telkom Sandhy Putra Purwokerto</h3>
                <p className="text-[#C9B6E4]">Rekayasa Perangkat Lunak</p>
              </div>
              
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════ MORE THAN VIDEO ═══════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-[#2E1A47]/30">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <span className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4 block">✦ Beyond the timeline</span>
            <h2 className="text-5xl sm:text-6xl font-bold uppercase tracking-tighter mb-12 leading-[0.95]">
              MORE THAN <span className="text-[#F4B400]">VIDEO</span>
            </h2>
          </AnimatedSection>
          
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap gap-4">
              {['Graphic Design', 'Branding', 'UI/UX', 'Photography', 'Illustration'].map((item, i) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.05, rotate: i % 2 === 0 ? 2 : -2 }}
                  className="bg-[#3D2560] border-2 border-[#B497D6]/20 rounded-2xl px-8 py-5 text-[#C9B6E4] font-bold text-lg uppercase tracking-tight cursor-default hover:border-[#F4B400]/50 hover:text-[#F5EFE0] transition-all"
                >
                  {item}
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <section id="contact" className="py-32 md:py-40 px-6 md:px-16 lg:px-24 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#F4B400]/10 rounded-full blur-[200px]" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <AnimatedSection>
            <span className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-8 block">✦ Get in touch</span>
            <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.9] mb-12">
              LET'S MAKE<br/>
              SOMETHING<br/>
              <span className="text-[#F4B400]">WORTH WATCHING.</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-12">
              <a href="mailto:skautsarr@gmail.com" className="group flex items-center justify-center gap-3 bg-[#2E1A47] border-2 border-[#3D2560] rounded-full px-8 py-4 text-[#C9B6E4] hover:border-[#F4B400] hover:text-[#F4B400] transition-all">
                <Mail size={18} />
                <span className="font-medium">skautsarr@gmail.com</span>
              </a>
              <a href="https://instagram.com/skautsar.ra" target="_blank" rel="noreferrer" className="group flex items-center justify-center gap-3 bg-[#2E1A47] border-2 border-[#3D2560] rounded-full px-8 py-4 text-[#C9B6E4] hover:border-[#F4B400] hover:text-[#F4B400] transition-all">
                <Instagram size={18} />
                <span className="font-medium">@skautsar.ra</span>
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3}>
            <a href="mailto:skautsarr@gmail.com" className="inline-flex items-center gap-3 bg-[#F4B400] text-[#1B1024] px-12 py-5 rounded-full font-bold uppercase tracking-widest text-lg hover:brightness-110 hover:scale-105 transition-all glow-yellow">
              Let's Talk
              <ArrowRight size={20} />
            </a>
          </AnimatedSection>

          {/* Decorative floating elements */}
          <FloatingElement delay={0} y={15} className="absolute top-20 left-[10%] hidden lg:block">
            <div className="text-4xl">✦</div>
          </FloatingElement>
          <FloatingElement delay={1.5} y={10} className="absolute bottom-20 right-[10%] hidden lg:block">
            <div className="text-4xl">🎬</div>
          </FloatingElement>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="py-8 px-6 md:px-16 border-t border-[#3D2560] text-center">
        <p className="font-mono text-[10px] text-[#C9B6E4]/50 uppercase tracking-widest">
          © 2025 Sectio Kautsar Ramadhani — A Video Editor With a Designer's Eye.
        </p>
      </footer>

      {/* ═══════════════════ PROJECT DETAIL MODAL ═══════════════════ */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#1B1024]/95 backdrop-blur-xl z-[100] overflow-y-auto"
          >
            <div className="min-h-screen p-6 md:p-12">
              {/* Close button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="fixed top-6 right-6 z-[110] w-12 h-12 bg-[#3D2560] border-2 border-[#B497D6]/30 rounded-full flex items-center justify-center text-[#F5EFE0] hover:bg-[#F4B400] hover:text-[#1B1024] hover:border-[#F4B400] transition-all"
              >
                <X size={20} />
              </button>

              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="max-w-5xl mx-auto pt-16"
              >
                {/* Video */}
                <div className="aspect-video bg-[#2E1A47] rounded-[2rem] border-2 border-[#3D2560] overflow-hidden mb-12 flex items-center justify-center">
                  {selectedProject.video ? (
                    <video src={selectedProject.video} controls className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-4">
                      <Play size={64} className="text-[#3D2560]" />
                      <span className="font-mono text-xs text-[#C9B6E4]">No video available</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                  <div className="md:col-span-8">
                    <div className="inline-block bg-[#F4B400] text-[#1B1024] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                      {selectedProject.category}
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-bold uppercase tracking-tighter mb-6">{selectedProject.title}</h2>
                    <p className="text-[#C9B6E4] text-lg leading-relaxed">{selectedProject.description}</p>
                  </div>
                  <div className="md:col-span-4 space-y-6">
                    <div>
                      <h4 className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-2">Year</h4>
                      <p className="text-[#F5EFE0] font-medium">{selectedProject.year}</p>
                    </div>
                    {selectedProject.roles && (
                      <div>
                        <h4 className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-2">Role</h4>
                        <p className="text-[#F5EFE0] font-medium">{selectedProject.roles}</p>
                      </div>
                    )}
                    {selectedProject.tools && (
                      <div>
                        <h4 className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-2">Tools</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tools.split(',').map(t => (
                            <span key={t} className="bg-[#3D2560] border border-[#B497D6]/20 rounded-full px-3 py-1 text-xs text-[#C9B6E4]">{t.trim()}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {selectedProject.slug && (
                      <div className="pt-2">
                        <Link
                          href={`/projects/${selectedProject.slug}`}
                          className="inline-flex items-center gap-2 bg-[#F4B400] text-[#1B1024] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all"
                        >
                          Full Project Page ↗
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Next project */}
                {projects.length > 1 && (
                  <div className="mt-16 pt-8 border-t border-[#3D2560]">
                    <button
                      onClick={() => {
                        const idx = projects.findIndex(p => p.id === selectedProject.id);
                        const next = projects[(idx + 1) % projects.length];
                        setSelectedProject(next);
                      }}
                      className="group flex items-center gap-3 text-[#C9B6E4] hover:text-[#F4B400] transition-colors font-bold uppercase tracking-wider"
                    >
                      Next Project
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
