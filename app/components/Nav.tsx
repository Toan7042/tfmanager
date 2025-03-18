"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, LayoutDashboard, Shield, User, Package, Command, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { href: "/dashboard", label: "Bảng điều khiển", icon: <LayoutDashboard size={16} />, show: status === "authenticated" },
    { href: "/community", label: "Cộng đồng", icon: <Command size={16} />, show: status === "authenticated" },
    { href: "/servicepackage", label: "Gói dịch vụ", icon: <Package size={16} />, show: status === "authenticated" },
    { href: "/profile", label: "Hồ sơ", icon: <User size={16} />, show: status === "authenticated" },
    { href: "/admin", label: "Quản trị", icon: <Shield size={16} />, show: session?.user?.role === "admin" },
  ];

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-xl font-semibold text-blue-600 hover:opacity-80 transition">
              ToolWeb
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-3">
              {menuItems.filter((item) => item.show).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1.5 bg-gray-100 px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Nút đăng nhập/đăng xuất */}
              {status === "loading" ? (
                <button className="px-3 py-1.5 text-sm bg-gray-200 rounded-md flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
                </button>
              ) : session ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-500 text-white px-3 py-1.5 text-sm rounded-md hover:bg-red-600 transition"
                >
                  Đăng xuất
                </button>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-md hover:bg-blue-600 transition"
                >
                  Đăng nhập
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700">
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu với Animation */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-md py-4 px-6 space-y-4 absolute top-16 left-0 w-full"
            >
              {menuItems.filter((item) => item.show).map((item) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="block text-gray-700 hover:text-blue-500 flex items-center space-x-2 text-base"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}

              {/* Nút đăng nhập/đăng xuất trong mobile */}
              {status === "loading" ? (
                <button className="block w-full text-center bg-gray-200 text-gray-500 px-4 py-2 rounded-lg text-base flex items-center justify-center">
                  <Loader2 className="animate-spin h-5 w-5" />
                </button>
              ) : session ? (
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="block w-full text-left bg-red-500 text-white px-4 py-2 rounded-lg text-base hover:bg-red-600 transition"
                >
                  Đăng xuất
                </button>
              ) : (
                <button
                  onClick={() => signIn("google")}
                  className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg text-base hover:bg-blue-600 transition"
                >
                  Đăng nhập
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="pt-16"></div>
    </>
  );
}
