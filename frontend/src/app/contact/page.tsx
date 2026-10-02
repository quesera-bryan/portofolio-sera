"use client";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";
import FloatingElement from "@/components/FloatingElement";
import { Mail, ArrowRight } from "lucide-react";

function Instagram({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#1B1024] text-[#F5EFE0] relative overflow-hidden">
      <Navbar />

      <section className="pt-40 pb-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto relative z-10 text-center">
        <AnimatedSection>
          <span className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-8 block">✦ Get in touch</span>
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.9] mb-12">
            LET'S MAKE<br />
            SOMETHING<br />
            <span className="text-[#F4B400]">WORTH WATCHING.</span>
          </h1>
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
            Send Message
            <ArrowRight size={20} />
          </a>
        </AnimatedSection>

        <FloatingElement delay={0} y={15} className="absolute top-20 left-[10%] hidden lg:block">
          <div className="text-4xl">✦</div>
        </FloatingElement>
        <FloatingElement delay={1.5} y={10} className="absolute bottom-20 right-[10%] hidden lg:block">
          <div className="text-4xl">🎬</div>
        </FloatingElement>
      </section>

      <footer className="py-12 px-6 md:px-16 border-t border-[#3D2560] text-center">
        <p className="font-mono text-[10px] text-[#C9B6E4]/50 uppercase tracking-widest">
          © 2025 Sectio Kautsar Ramadhani — A Video Editor With a Designer's Eye.
        </p>
      </footer>
    </main>
  );
}
