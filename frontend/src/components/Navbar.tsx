"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import SprayRevealImage from "@/components/SprayRevealImage";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUp } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll behavior state
  const [navVisible, setNavVisible] = useState(true);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const lastScrollY = useRef(0);

  if (pathname.startsWith("/superadmin")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Update background styling state
      setScrolled(currentScrollY > 30);

      // Back to top visibility
      setShowBackToTop(currentScrollY > 300);

      // Navbar visibility logic
      if (currentScrollY === 0) {
        setNavVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        // Scrolling down (and past an initial threshold to avoid bounce issues) -> hide
        setNavVisible(false);
        // Also close mobile menu if scrolling down
        setMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling up -> show
        setNavVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
    { label: "Admin", href: "/admin/login" },
  ];

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/admin/login") return pathname.startsWith("/admin") || pathname.startsWith("/superadmin");
    return pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: navVisible ? 0 : -120, opacity: navVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 left-0 w-full z-50 flex flex-col items-center px-6"
      >
        <div className="flex items-center justify-between md:justify-center gap-8 md:gap-12 w-full max-w-5xl md:w-auto">
          
          {/* LOGO */}
          <Link
            href="/"
            className="font-bold text-xl tracking-tighter text-[#F4B400] hover:scale-105 transition-transform flex items-center gap-1.5 shrink-0"
          >
            <motion.span
              animate={{ y: [0, -2, 0], scale: [1, 1.03, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <SprayRevealImage
                src="/images/Textsera.png"
                alt="Sera"
                width={1821}
                height={864}
                className="h-auto w-20 object-contain sm:w-24"
              />
            </motion.span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F4B400] animate-pulse" />
          </Link>

          {/* DESKTOP NAVIGATION PILL */}
          <nav
            className={`hidden md:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-300 ${
              scrolled
                ? "bg-[#1B1024]/95 backdrop-blur-xl border-[#3D2560] shadow-2xl"
                : "bg-[#2E1A47]/85 backdrop-blur-md border-[#3D2560]/70 shadow-lg"
            }`}
          >
            {navItems.map((item) => {
              const active = isLinkActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 rounded-full ${
                    active
                      ? "text-[#1B1024]"
                      : "text-[#C9B6E4] hover:bg-[#3D2560]/50 hover:text-[#F5EFE0]"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activePill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-[#F4B400] rounded-full z-0 shadow-sm"
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* MOBILE HAMBURGER BUTTON */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2.5 rounded-full bg-[#2E1A47]/85 backdrop-blur-md border border-[#3D2560] text-[#F4B400] hover:bg-[#3D2560] transition-colors shadow-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

        </div>

        {/* MOBILE DRAWER MENU */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="md:hidden mt-4 w-full max-w-sm bg-[#1B1024]/95 backdrop-blur-xl border-2 border-[#3D2560] rounded-[2rem] p-4 shadow-2xl flex flex-col gap-2"
            >
              {navItems.map((item) => {
                const active = isLinkActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-center px-6 py-4 rounded-full text-sm font-bold uppercase tracking-wider transition-all ${
                      active
                        ? "bg-[#F4B400] text-[#1B1024]"
                        : "text-[#C9B6E4] hover:bg-[#3D2560] hover:text-[#F5EFE0]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={scrollToTop}
            aria-label="Back to top"
            className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#2E1A47] border border-[#F4B400]/70 text-[#F4B400] shadow-lg hover:scale-105 hover:bg-[#3D2560] hover:border-[#F4B400] transition-all"
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
