"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("admin_token", data.token);
        router.push("/superadmin");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      alert("Error connecting to server");
    }
  };

  return (
    <div className="min-h-screen bg-[#1B1024] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-[#FCFAFF] p-8 md:p-10 rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.2)] border border-[#E5E1EC] w-full max-w-[420px]"
      >
        <h1 className="text-4xl md:text-[42px] font-bold text-center mb-8 text-[#2E1A47] tracking-tight">
          Admin Login
        </h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-[16px] md:text-[18px] font-semibold mb-2 text-[#2E1A47]">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full bg-[#F5F3F7] border border-[#D5CFE1] text-[#1F1730] placeholder-[#8F86A3] rounded-[12px] p-3.5 outline-none focus:border-[#F4B400] focus:ring-4 focus:ring-[#F4B400]/20 transition-all duration-300 font-medium"
              required
            />
          </div>
          <div>
            <label className="block text-[16px] md:text-[18px] font-semibold mb-2 text-[#2E1A47]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#F5F3F7] border border-[#D5CFE1] text-[#1F1730] placeholder-[#8F86A3] rounded-[12px] p-3.5 outline-none focus:border-[#F4B400] focus:ring-4 focus:ring-[#F4B400]/20 transition-all duration-300 font-medium tracking-widest"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#F4B400] text-[#2E1A47] font-bold text-lg py-4 rounded-[12px] mt-4 hover:bg-[#FFCA28] hover:-translate-y-[1px] hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-[#F4B400]/20"
          >
            LOGIN
          </button>
        </form>
      </motion.div>
    </div>
  );
}
