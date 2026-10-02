"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function SuperadminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token && pathname !== "/superadmin/login") {
      router.replace("/superadmin/login");
    } else {
      setReady(true);
    }
  }, [pathname, router]);

  if (!ready) return null;

  // Don't render sidebar on login page
  if (pathname === "/superadmin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/superadmin", icon: "📊" },
    { label: "Projects", href: "/superadmin/projects", icon: "🎬" },
    { label: "Media", href: "/superadmin/media", icon: "🖼️" },
    { label: "Settings", href: "/superadmin/settings", icon: "⚙️" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    router.push("/superadmin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Top Header */}
      <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <span className="font-bold text-lg text-gray-900 tracking-tight">Admin Panel</span>
          <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-mono">Portfolio</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-semibold text-gray-600 hover:text-black bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
          >
            View Website ↗
          </Link>
          <button
            onClick={handleLogout}
            className="text-xs font-semibold text-red-600 hover:text-red-800 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation Bar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between shrink-0">
          <nav className="flex flex-col gap-1.5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">Navigation</p>
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/superadmin" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <span>🚪</span>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-8 md:p-10 overflow-y-auto max-w-7xl">
          {children}
        </main>
      </div>
    </div>
  );
}
