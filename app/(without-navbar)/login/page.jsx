"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import users from "@/data/users";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      localStorage.setItem("username", matchedUser.name); // simpan nama
      router.push("/");
    } else {
      alert("Email atau password salah");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#1c1b1b] text-white">
      <form
        onSubmit={handleLogin}
        className="bg-[#2a2a2a] p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 bg-[#3a3a3a] border border-gray-600 rounded"
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 bg-[#3a3a3a] border border-gray-600 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
