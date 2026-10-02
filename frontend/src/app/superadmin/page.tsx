"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  total: number;
  published: number;
  draft: number;
  featured: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    fetch("http://localhost:8080/api/admin/stats", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => setStats({ total: 0, published: 0, draft: 0, featured: 0 }))
      .finally(() => setLoading(false));
  }, []);

  const statCards = [
    { label: "Total Projects", value: stats?.total ?? 0, icon: "🎬" },
    { label: "Published", value: stats?.published ?? 0, icon: "✅" },
    { label: "Drafts", value: stats?.draft ?? 0, icon: "📝" },
    { label: "Featured", value: stats?.featured ?? 0, icon: "⭐" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back! Here's an overview of your portfolio.</p>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="text-2xl mb-2">{s.icon}</div>
            <p className="text-sm text-gray-500 font-medium mb-1">{s.label}</p>
            {loading ? (
              <div className="h-8 w-12 bg-gray-100 rounded animate-pulse" />
            ) : (
              <p className="text-3xl font-bold">{s.value}</p>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold text-gray-700 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <Link
          href="/superadmin/projects/new"
          className="group bg-black text-white p-6 rounded-xl hover:bg-gray-800 transition-all"
        >
          <div className="text-2xl mb-2">➕</div>
          <h3 className="text-lg font-bold mb-1">Add New Project</h3>
          <p className="text-sm text-gray-300">Create and publish a new portfolio project.</p>
        </Link>
        <Link
          href="/superadmin/projects"
          className="group bg-white border border-gray-200 p-6 rounded-xl hover:border-black hover:shadow-md transition-all"
        >
          <div className="text-2xl mb-2">🎬</div>
          <h3 className="text-lg font-bold mb-1">Manage Projects</h3>
          <p className="text-sm text-gray-500">Edit, publish, or remove existing projects.</p>
        </Link>
      </div>
    </div>
  );
}
