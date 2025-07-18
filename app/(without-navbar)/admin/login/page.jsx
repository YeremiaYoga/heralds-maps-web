"use client";
import { useState } from "react";

export default function AdminLoginPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setStep(2);
        setMessage("OTP sent to email.");
      } else {
        setMessage(data.message || "Login failed.");
      }
    } catch (err) {
      setMessage("Network error.");
    }
    setIsLoading(false);
  };

  const handleVerify = async () => {
    setIsLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        const expiry = Date.now() + 60 * 60 * 1000;
        localStorage.setItem(
          "admin_session",
          JSON.stringify({ email, expiry, otp })
        );

        setMessage("Login success.");
        window.location.href = "/admin/dashboard";
      } else {
        setMessage(data.message || "OTP verification failed.");
      }
    } catch (err) {
      setMessage("Network error.");
    }
    setIsLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border border-gray-300 rounded">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {isLoading ? "Sending OTP..." : "Login"}
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <p className="text-sm mb-2">OTP sent to: {email}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full mb-3 p-2 border rounded"
          />
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </>
      )}

      {message && <p className="text-center mt-4 text-red-600">{message}</p>}
    </div>
  );
}
