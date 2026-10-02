"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/superadmin/login");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#1B1024] flex items-center justify-center text-[#ffd900]">
      Redirecting to Admin Login...
    </div>
  );
}
