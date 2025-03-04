"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: "", password: "", phone: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (isRegister) {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Đăng ký thành công! Hãy đăng nhập bằng Google.");
        setMessageType("success");
      } else {
        setMessage(data.error || "Đăng ký thất bại.");
        setMessageType("error");
      }
    } else {
      const res = await signIn("credentials", { ...form, redirect: false });
      if (res?.ok) {
        setMessage("Vui lòng đăng nhập bằng Google để tiếp tục.");
        setMessageType("info");
      } else {
        setMessage("Sai thông tin đăng nhập.");
        setMessageType("error");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {isRegister ? "Đăng ký" : "Đăng nhập"}
        </h2>
        {message && (
          <div
            className={`p-2 text-center rounded mb-4 ${
              messageType === "success" ? "bg-green-200 text-green-800" :
              messageType === "error" ? "bg-red-200 text-red-800" :
              "bg-blue-200 text-blue-800"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Tên đăng nhập"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          {isRegister && (
            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          )}
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            {isRegister ? "Đăng ký" : "Đăng nhập"}
          </button>
        </form>
        <button
          onClick={() => signIn("google")}
          className="w-full mt-3 bg-red-500 text-white p-2 rounded"
        >
          Đăng nhập với Google
        </button>
        <p className="text-center mt-4">
          {isRegister ? "Đã có tài khoản?" : "Chưa có tài khoản?"}
          <span
            className="text-blue-500 cursor-pointer ml-1"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Đăng nhập" : "Đăng ký"}
          </span>
        </p>
      </div>
    </div>
  );
}
