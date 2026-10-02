"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = ["Commercial", "Music Video", "Short Film", "Documentary", "Content Creator", "Wedding", "Corporate", "Other"];
const ASPECT_RATIOS = [
  ["9:16", "Reels / TikTok / Shorts"],
  ["16:9", "YouTube / Landscape"],
  ["1:1", "Square / Instagram"],
  ["4:5", "Portrait"],
  ["3:4", "Portrait"],
  ["21:9", "Ultrawide"],
  ["custom", "Custom"],
];

const aspectRatioStyle = (ratio: string) => ({ "9:16": "9 / 16", "16:9": "16 / 9", "1:1": "1 / 1", "4:5": "4 / 5", "3:4": "3 / 4", "21:9": "21 / 9" }[ratio] || "16 / 9");

function slugify(str: string) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function ProjectInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: {
  label: string;
  name: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
    </div>
  );
}

export default function NewProject() {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    aspect_ratio: "9:16",
    client: "",
    year: new Date().getFullYear().toString(),
    thumbnail: "",
    videoUrl: "",
    youtubeUrl: "",
    instagramUrl: "",
    tiktokUrl: "",
    roles: "",
    tools: "",
    duration: "",
    projectType: "",
    isPublished: false,
    isFeatured: false,
    order: 0,
  });

  const set = (k: string, v: string | boolean | number) => setForm((f) => ({ ...f, [k]: v }));

  const handleTitleChange = (v: string) => {
    setForm((f) => ({ ...f, title: v, slug: slugify(v) }));
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const token = localStorage.getItem("admin_token");
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("http://localhost:8080/api/admin/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (res.ok) set("thumbnail", `http://localhost:8080${data.url}`);
      else setError(data.error || "Upload failed");
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (publish: boolean) => {
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.slug.trim()) { setError("Slug is required."); return; }
    setError("");
    setLoading(true);
    const token = localStorage.getItem("admin_token");
    const payload = { ...form, isPublished: publish };
    try {
      const res = await fetch("http://localhost:8080/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      if (res.ok) router.push("/superadmin/projects");
      else {
        const d = await res.json();
        setError(d.error || "Failed to save project.");
      }
    } catch {
      setError("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-black text-sm">← Back</button>
        <h1 className="text-3xl font-bold">Add New Project</h1>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
      )}

      <div className="space-y-6">
        {/* Basic Info */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g. Brand Commercial for XYZ"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={form.slug}
                onChange={(e) => set("slug", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="brand-commercial-xyz"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <ProjectInput label="Client" name="client" value={form.client} onChange={(value) => set("client", value)} placeholder="Client or brand name" />
            <ProjectInput label="Year" name="year" value={form.year} onChange={(value) => set("year", value)} placeholder="2025" />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aspect Ratio</label>
              <select value={form.aspect_ratio} onChange={(e) => set("aspect_ratio", e.target.value)} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black">
                {ASPECT_RATIOS.map(([value, label]) => <option key={value} value={value}>{value} - {label}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Describe this project..."
              />
            </div>
          </div>
        </section>

        {/* Media */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail / Cover Image</label>
              <p className="text-xs text-gray-500 mb-3">Recommended: 1080 x 1920 px for 9:16. The original image will not be cropped.</p>
              <div className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    value={form.thumbnail}
                    onChange={(e) => set("thumbnail", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder="Paste URL or upload file below"
                  />
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
              {form.thumbnail && (
                <div style={{ aspectRatio: aspectRatioStyle(form.aspect_ratio) }} className="mt-3 w-36 rounded-lg border border-gray-200 bg-gray-100 overflow-hidden">
                  <img src={form.thumbnail} alt="Thumbnail preview" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
            <ProjectInput label="Video URL" name="videoUrl" value={form.videoUrl} onChange={(value) => set("videoUrl", value)} placeholder="/uploads/projects/video.mp4 or external URL" />
            <ProjectInput label="YouTube URL" name="youtubeUrl" value={form.youtubeUrl} onChange={(value) => set("youtubeUrl", value)} placeholder="https://youtube.com/watch?v=..." />
            <ProjectInput label="Instagram URL" name="instagramUrl" value={form.instagramUrl} onChange={(value) => set("instagramUrl", value)} placeholder="https://instagram.com/p/..." />
            <ProjectInput label="TikTok URL" name="tiktokUrl" value={form.tiktokUrl} onChange={(value) => set("tiktokUrl", value)} placeholder="https://tiktok.com/@.../..." />
          </div>
        </section>

        {/* Project Details */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Project Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProjectInput label="Role" name="roles" value={form.roles} onChange={(value) => set("roles", value)} placeholder="Video Editor, Director" />
            <ProjectInput label="Tools / Software" name="tools" value={form.tools} onChange={(value) => set("tools", value)} placeholder="Premiere Pro, After Effects" />
            <ProjectInput label="Duration" name="duration" value={form.duration} onChange={(value) => set("duration", value)} placeholder="e.g. 2 weeks" />
            <ProjectInput label="Project Type" name="projectType" value={form.projectType} onChange={(value) => set("projectType", value)} placeholder="e.g. Freelance, Agency, Personal" />
          </div>
        </section>

        {/* Settings */}
        <section className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-4">Display Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => set("order", parseInt(e.target.value) || 0)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
              <p className="text-xs text-gray-400 mt-1">Lower number = shown first</p>
            </div>
            <label className="flex items-center gap-3 cursor-pointer p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <input type="checkbox" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)} className="w-4 h-4" />
              <div>
                <div className="text-sm font-medium">Featured Project</div>
                <div className="text-xs text-gray-400">Show in featured section</div>
              </div>
            </label>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex gap-3 pb-8">
          <button
            onClick={() => handleSubmit(true)}
            disabled={loading}
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Project"}
          </button>
          <button
            onClick={() => handleSubmit(false)}
            disabled={loading}
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold text-sm hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="text-gray-400 hover:text-black px-6 py-3 text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
