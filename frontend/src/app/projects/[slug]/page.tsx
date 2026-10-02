"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  client: string;
  year: string;
  thumbnail: string;
  videoUrl: string;
  youtubeUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
  roles: string;
  tools: string;
  duration: string;
  projectType: string;
  isFeatured: boolean;
  isPublished: boolean;
}

interface ProjectImage {
  id: number;
  imageUrl: string;
  sortOrder: number;
}

function getYoutubeId(url: string) {
  const m = url?.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
  return m ? m[1] : null;
}

export default function ProjectDetail() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<ProjectImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/api/projects/${slug}`)
      .then((r) => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then((d) => {
        setProject(d.project || d);
        setImages(d.images || []);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  const imgSrc = (url: string) =>
    url?.startsWith("http") ? url : `http://localhost:8080${url}`;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#1B1024] flex items-center justify-center">
        <Navbar />
        <div className="text-[#C9B6E4] font-mono text-sm uppercase tracking-widest animate-pulse">Loading...</div>
      </main>
    );
  }

  if (notFound || !project) {
    return (
      <main className="min-h-screen bg-[#1B1024] flex flex-col items-center justify-center gap-6">
        <Navbar />
        <h1 className="text-4xl font-bold text-[#F5EFE0] uppercase tracking-tighter">Project Not Found</h1>
        <p className="text-[#C9B6E4]">This project doesn't exist or has been unpublished.</p>
        <Link href="/" className="bg-[#F4B400] text-[#1B1024] px-8 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:brightness-110 transition-all">
          Back to Portfolio
        </Link>
      </main>
    );
  }

  const youtubeId = project.youtubeUrl ? getYoutubeId(project.youtubeUrl) : null;

  return (
    <main className="min-h-screen bg-[#1B1024] text-[#F5EFE0]">
      <Navbar />

      {/* Hero Thumbnail */}
      <section className="relative w-full aspect-video max-h-[75vh] overflow-hidden">
        {project.thumbnail ? (
          <img
            src={imgSrc(project.thumbnail)}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#2E1A47] flex items-center justify-center text-6xl">🎬</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1024] via-[#1B1024]/40 to-transparent" />
        <div className="absolute bottom-8 left-6 md:left-16">
          <span className="inline-block bg-[#F4B400] text-[#1B1024] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            {project.category || "Project"}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tighter leading-tight">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[#C9B6E4] hover:text-[#F4B400] transition-colors mb-12 font-mono text-sm uppercase tracking-wider"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main */}
          <div className="lg:col-span-8 space-y-10">
            {/* Description */}
            {project.description && (
              <div>
                <p className="text-[#C9B6E4] text-lg leading-relaxed">{project.description}</p>
              </div>
            )}

            {/* Video */}
            {youtubeId && (
              <div>
                <h3 className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4">✦ Video</h3>
                <div className="aspect-video rounded-[2rem] overflow-hidden border-2 border-[#3D2560]">
                  <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {!youtubeId && project.videoUrl && (
              <div>
                <h3 className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4">✦ Video</h3>
                <div className="aspect-video rounded-[2rem] overflow-hidden border-2 border-[#3D2560] bg-[#2E1A47]">
                  <video
                    src={imgSrc(project.videoUrl)}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* Gallery */}
            {images.length > 0 && (
              <div>
                <h3 className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4">✦ Gallery</h3>
                <div className="grid grid-cols-2 gap-4">
                  {images.map((img) => (
                    <div key={img.id} className="aspect-video rounded-2xl overflow-hidden border border-[#3D2560]">
                      <img src={imgSrc(img.imageUrl)} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* External Links */}
            {(project.instagramUrl || project.tiktokUrl) && (
              <div>
                <h3 className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-4">✦ View On</h3>
                <div className="flex flex-wrap gap-3">
                  {project.instagramUrl && (
                    <a
                      href={project.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-[#2E1A47] border-2 border-[#3D2560] rounded-full px-6 py-3 text-sm font-medium text-[#C9B6E4] hover:border-[#F4B400] hover:text-[#F4B400] transition-all"
                    >
                      📸 Instagram
                    </a>
                  )}
                  {project.tiktokUrl && (
                    <a
                      href={project.tiktokUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 bg-[#2E1A47] border-2 border-[#3D2560] rounded-full px-6 py-3 text-sm font-medium text-[#C9B6E4] hover:border-[#F4B400] hover:text-[#F4B400] transition-all"
                    >
                      🎵 TikTok
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-[#2E1A47] rounded-[2rem] border-2 border-[#3D2560] p-8 space-y-6 sticky top-28">
              {[
                { label: "Year", value: project.year },
                { label: "Client", value: project.client },
                { label: "Role", value: project.roles },
                { label: "Tools", value: project.tools },
                { label: "Duration", value: project.duration },
                { label: "Type", value: project.projectType },
              ]
                .filter((item) => item.value)
                .map((item) => (
                  <div key={item.label}>
                    <h4 className="font-mono text-xs text-[#F4B400] uppercase tracking-widest mb-1">{item.label}</h4>
                    <p className="text-[#F5EFE0] font-medium">{item.value}</p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
