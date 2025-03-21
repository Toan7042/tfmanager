"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, Shield, User, Package, Command, Loader2, MonitorSpeaker } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Bảng điều khiển", icon: <LayoutDashboard size={16} />, show: status === "authenticated" },
    { href: "/community", label: "Cộng đồng", icon: <Command size={16} />, show: status === "authenticated" },
    { href: "/mydevices", label: "Thiết bị của tôi", icon: <MonitorSpeaker size={16} />, show: status === "authenticated" },
    { href: "/servicepackage", label: "Gói dịch vụ", icon: <Package size={16} />, show: status === "authenticated" },
    { href: "/profile", label: "Hồ sơ", icon: <User size={16} />, show: status === "authenticated" },
    { href: "/admin", label: "Quản trị", icon: <Shield size={16} />, show: session?.user?.role === "admin" },
  ];

  // Hiệu ứng chung cho cả desktop và mobile
  const menuItemVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03, transition: { type: "spring", stiffness: 500, damping: 30 } },
    tap: { scale: 0.97, transition: { type: "spring", stiffness: 600, damping: 25 } },
    active: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 20 } },
  };

  const mobileMenuVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25, mass: 0.5 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } },
  };

  const mobileItemVariants = {
    initial: { opacity: 0, x: -5 },
    animate: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 400, damping: 20, mass: 0.4 } },
    exit: { opacity: 0, x: -5, transition: { duration: 0.1 } },
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 0.5, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  };

  return (
    <>
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-1 text-lg font-semibold text-blue-600 hover:opacity-80 transition">
              <svg width="150" height="40" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                <image href="hato.png" x="0" y="5" height="30px" />
                <text x="55" y="25" fontSize="17" fill="#2657A4" fontWeight="bold">Hato</text>
                <text x="95" y="25" fontSize="12" fill="gray">.cloud</text>
              </svg>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-3">
              {menuItems.filter((item) => item.show).map((item) => (
                <motion.div
                  key={item.href}
                  variants={menuItemVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  animate={pathname === item.href ? "active" : "initial"}
                  layout
                >
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-sm transition whitespace-nowrap ${
                      pathname === item.href
                        ? "text-blue-500 font-sm bg-blue-100"
                        : "text-gray-700 bg-gray-100 hover:text-blue-500 hover:bg-blue-100"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}

              {/* Nút đăng nhập/đăng xuất */}
              {status === "loading" ? (
                <button className="px-3 py-1.5 text-sm bg-gray-200 rounded-md flex items-center justify-center whitespace-nowrap">
                  <Loader2 className="animate-spin h-5 w-5 text-gray-500" />
                </button>
              ) : session ? (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="bg-red-500 text-white px-3 py-1.5 text-sm rounded-md hover:bg-red-600 transition whitespace-nowrap"
                >
                  Đăng xuất
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  onClick={() => signIn("google")}
                  className="bg-blue-500 text-white px-3 py-1.5 text-sm rounded-md hover:bg-blue-600 transition whitespace-nowrap"
                >
                  Đăng nhập
                </motion.button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 600, damping: 20 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700"
              >
                {menuOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu với Animation */}
        <AnimatePresence>
          {menuOpen && (
            <>
              <motion.div
                variants={overlayVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed inset-0 z-40"
                onClick={() => setMenuOpen(false)}
              />

              <motion.div
                variants={mobileMenuVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                layout
                className="lg:hidden bg-white shadow-md py-4 px-6 space-y-4 absolute top-16 left-0 w-full z-50"
              >
                {menuItems.filter((item) => item.show).map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={mobileItemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={`block flex items-center space-x-2 text-base transition ${
                        pathname === item.href
                          ? "text-blue-500 font-sm bg-blue-100 rounded-md px-2 py-1"
                          : "text-gray-700 hover:text-blue-500 hover:bg-blue-50"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  </motion.div>
                ))}

                {status === "loading" ? (
                  <button className="block w-full text-center bg-gray-200 text-gray-500 px-4 py-2 rounded-lg text-base flex items-center justify-center">
                    <Loader2 className="animate-spin h-5 w-5" />
                  </button>
                ) : session ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    onClick={() => {
                      setMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="block w-full text-left bg-red-500 text-white px-4 py-2 rounded-lg text-base hover:bg-red-600 transition"
                  >
                    Đăng xuất
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    onClick={() => {
                      setMenuOpen(false);
                      signIn("google");
                    }}
                    className="block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-lg text-base hover:bg-blue-600 transition"
                  >
                    Đăng nhập
                  </motion.button>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <div className="pt-16"></div>
    </>
  );
}