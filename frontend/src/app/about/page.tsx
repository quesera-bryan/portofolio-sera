"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import AnimatedSection from '@/components/AnimatedSection';
import SprayRevealImage from '@/components/SprayRevealImage';

export default function About() {
  return (
    <main className="min-h-screen bg-[#1B1024] text-[#F5EFE0]">
      <Navbar />

      <section className="pt-36 pb-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4 block">✦ About me</span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tighter mb-16 leading-[0.9]">
            HI, I'M <motion.span
              animate={{ y: [0, -5, 0], rotate: [0, -1, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex align-middle"
            >
              <SprayRevealImage
                src="/images/Textsera.png"
                alt="Sera"
                width={1821}
                height={864}
                className="h-auto w-[clamp(10rem,28vw,19rem)] object-contain"
              />
            </motion.span>
          </h1>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.2}>
              <div className="w-full max-w-md mx-auto bg-[#2E1A47] rounded-[2rem] border-2 border-[#3D2560] p-6 mb-8">
                <div className="relative aspect-[4/5] overflow-visible rounded-2xl bg-gradient-to-br from-[#3D2560] to-[#B497D6]/20">
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <Image
                      src="/images/Sera.png"
                      alt="Sera"
                      width={1362}
                      height={1155}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <motion.div
                    animate={{ y: [0, -8, 0], rotate: [0, 3, -2, 0] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="pointer-events-none absolute -bottom-8 -left-8 z-10"
                  >
                    <Image src="/images/Char 1.png" alt="" width={220} height={264} className="w-36 object-contain sm:w-44" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -10, 0], rotate: [0, -3, 2, 0] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                    className="pointer-events-none absolute -bottom-7 -right-8 z-10"
                  >
                    <Image src="/images/Iconchar1.png" alt="" width={170} height={144} className="w-24 object-contain sm:w-32" />
                  </motion.div>
                  <motion.div
                    animate={{ y: [0, -7, 0], rotate: [0, 4, -3, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                    className="pointer-events-none absolute -right-8 -top-8 z-10"
                  >
                    <Image src="/images/Iconchar2.png" alt="" width={150} height={128} className="w-20 object-contain sm:w-24" />
                  </motion.div>
                </div>
              </div>
              <p className="text-[#C9B6E4] text-lg leading-relaxed mb-6">
                Saya adalah Sectio Kautsar Ramadhani (Sera), seorang Video Editor dan Visual Storyteller dengan latar belakang kuat di Graphic Design, Videography, dan Photography.
              </p>
              <p className="text-[#C9B6E4] text-lg leading-relaxed">
                Lulusan S1 Desain Komunikasi Visual dari Universitas Dian Nuswantoro. Pendekatan saya menggabungkan sense desain grafis ke dalam setiap frame video — memperhatikan komposisi, warna, tipografi, hingga transisi yang seamless.
              </p>
            </AnimatedSection>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-8">
            <AnimatedSection delay={0.3}>
              <div className="bg-[#2E1A47] rounded-2xl border-2 border-[#3D2560] p-6">
                <h3 className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4">✦ Experience</h3>
                <div className="space-y-4">
                  <div><h4 className="font-bold text-[#F5EFE0]">Techarea Indonesia</h4><p className="text-sm text-[#C9B6E4]">Video Editor & Graphic Designer</p></div>
                  <div><h4 className="font-bold text-[#F5EFE0]">Freelance</h4><p className="text-sm text-[#C9B6E4]">Promotional Video (SprintA), Social Media Content</p></div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="bg-[#2E1A47] rounded-2xl border-2 border-[#3D2560] p-6">
                <h3 className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4">✦ Education</h3>
                <div className="space-y-4">
                  <div><h4 className="font-bold text-[#F5EFE0]">Universitas Dian Nuswantoro</h4><p className="text-sm text-[#C9B6E4]">S1 Desain Komunikasi Visual — Graduated</p></div>
                  <div><h4 className="font-bold text-[#F5EFE0]">SMK Telkom Sandhy Putra Purwokerto</h4><p className="text-sm text-[#C9B6E4]">Rekayasa Perangkat Lunak</p></div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.5}>
              <div className="bg-[#2E1A47] rounded-2xl border-2 border-[#3D2560] p-6">
                <h3 className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4">✦ Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['Video Editing', 'Visual Storytelling', 'Graphic Design', 'Videography', 'Photography'].map(skill => (
                    <span key={skill} className="border-2 border-[#F4B400] text-[#F4B400] rounded-full px-4 py-1.5 text-xs font-bold uppercase">{skill}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 md:px-16 border-t border-[#3D2560] text-center">
        <p className="font-mono text-[10px] text-[#C9B6E4]/50 uppercase tracking-widest">
          © 2025 Sectio Kautsar Ramadhani — A Video Editor With a Designer's Eye.
        </p>
      </footer>
    </main>
  );
}
