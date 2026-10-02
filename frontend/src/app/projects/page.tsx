"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import AnimatedSection from "@/components/AnimatedSection";
import { Play } from "lucide-react";

interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  aspect_ratio?: string;
  year: string;
  thumbnail: string;
  description: string;
  isPublished: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/projects")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const imgSrc = (url: string) =>
    url?.startsWith("http") ? url : `http://localhost:8080${url}`;
  const ratioStyle = (ratio?: string) => ({
    "9:16": "9 / 16", "16:9": "16 / 9", "1:1": "1 / 1", "4:5": "4 / 5", "3:4": "3 / 4", "21:9": "21 / 9",
  }[ratio || "9:16"] || "16 / 9");
  const groupedProjects = projects.reduce<Record<string, Project[]>>((groups, project) => {
    const category = project.category?.trim() || "Other";
    (groups[category] ||= []).push(project);
    return groups;
  }, {});

  return (
    <main className="min-h-screen bg-[#1B1024] text-[#F5EFE0]">
      <Navbar />

      <section className="pt-36 pb-32 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
        <AnimatedSection>
          <span className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4 block">
            ✦ Selected Works
          </span>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tighter mb-6 leading-[0.9]">
            ALL <span className="text-[#F4B400]">PROJECTS</span>
          </h1>
          <p className="text-[#C9B6E4] text-lg max-w-2xl mb-16">
            A curated showcase of video editing, visual storytelling, and creative direction.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="py-24 text-center text-[#C9B6E4] font-mono text-sm uppercase tracking-widest animate-pulse">
            Loading published projects...
          </div>
        ) : projects.length === 0 ? (
          <div className="bg-[#2E1A47] rounded-[2rem] border-2 border-[#3D2560] p-16 text-center">
            <span className="text-6xl mb-4 block">🎬</span>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-[#B497D6] mb-2">No Published Projects Yet</h3>
            <p className="text-[#C9B6E4] text-sm font-mono">Check back soon for new work.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {Object.entries(groupedProjects).map(([category, categoryProjects]) => (
              <div key={category}>
                <div className="flex items-center gap-4 mb-6"><h2 className="text-xl font-bold uppercase tracking-widest text-[#F5EFE0]">{category}</h2><div className="h-px flex-1 bg-[#3D2560]" /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                {categoryProjects.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.1}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="group block bg-[#2E1A47] rounded-[2rem] border-2 border-[#3D2560] p-4 hover:border-[#F4B400] transition-all duration-300"
                >
                  <div style={{ aspectRatio: ratioStyle(p.aspect_ratio) }} className="bg-[#1B1024] rounded-2xl overflow-hidden relative">
                    {p.thumbnail ? (
                      <img
                        src={imgSrc(p.thumbnail)}
                        alt={p.title}
                        className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Play size={48} className="text-[#3D2560]" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-[#1B1024]/40 group-hover:bg-transparent transition-colors duration-500" />
                    <div className="absolute bottom-4 right-4 bg-[#F4B400] text-[#1B1024] px-4 py-2 rounded-full text-xs font-bold uppercase opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      View Project ↗
                    </div>
                  </div>
                  <div className="p-4 pt-6">
                    <div className="inline-block bg-[#3D2560] border border-[#B497D6]/30 rounded-full px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#C9B6E4] mb-3">
                      {p.category || "Project"}
                    </div>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-[#F5EFE0] group-hover:text-[#F4B400] transition-colors">
                      {p.title}
                    </h3>
                    {p.year && <p className="text-sm text-[#C9B6E4] mt-1">{p.year}</p>}
                  </div>
                </Link>
              </AnimatedSection>
            ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="py-12 px-6 md:px-16 border-t border-[#3D2560] text-center">
        <p className="font-mono text-[10px] text-[#C9B6E4]/50 uppercase tracking-widest">
          © 2025 Sectio Kautsar Ramadhani — A Video Editor With a Designer's Eye.
        </p>
      </footer>
    </main>
  );
}
