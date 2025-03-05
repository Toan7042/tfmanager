"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, LayoutDashboard, Shield, User, Package, Command } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  // Danh sách menu
  const menuItems = [
    {
      href: "/dashboard",
      label: "Bảng điều khiển",
      icon: <LayoutDashboard size={16} />,
      show: !!session,
    },
    {
      href: "/community",
      label: "Cộng đồng",
      icon: <Command size={16} />,
      show: !!session, // Hiển thị nếu session tồn tại (đăng nhập)
    },
    {
      href: "/mydevices",
      label: "Thiết bị của tôi",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 4H19C19.55 4 20 4.45 20 5V19C20 19.55 19.55 20 19 20H5C4.45 20 4 19.55 4 19V5C4 4.45 4.45 4 5 4H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      show: !!session, // Hiển thị nếu session tồn tại (đăng nhập)
    },
    {
      href: "/servicepackage",
      label: "Gói dịch vụ",
      icon: <Package size={16} />,
      show: !!session,
    },
    {
      href: "/profile",
      label: "Hồ sơ",
      icon: <User size={16} />, // Thêm icon profile
      show: !!session,
    },
    {
      href: "/admin",
      label: "Quản trị",
      icon: <Shield size={16} />,
      show: session?.user?.role === "admin",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo = Trang chủ */}
            <Link href="/" className="text-xl font-semibold text-blue-600 hover:opacity-80 transition">
              ToolWeb
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-3">
              {menuItems
                .filter((item) => item.show)
                .map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-1.5 bg-gray-100 px-3 py-1.5 rounded-md text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-500 transition"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ))}

              {/* Hiển thị Avatar người dùng hoặc nút đăng xuất */}
              {session ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => signOut()}
                    className="bg-red-500 text-white px-3 py-1.5 text-sm rounded-md hover:bg-red-600 transition"
                  >
                    Đăng xuất
                  </button>
                </div>
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

        {/* Mobile Menu (Giữ nguyên) */}
        {menuOpen && (
          <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-4 absolute top-16 left-0 w-full">
            {menuItems
              .filter((item) => item.show)
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-gray-700 hover:text-blue-500 flex items-center space-x-2 text-base"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

            {/* Hiển thị avatar người dùng hoặc nút đăng xuất trên mobile */}
            {session ? (
              <button
                onClick={() => signOut()}
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
          </div>
        )}
      </nav>

      {/* Padding tránh navbar đè lên nội dung */}
      <div className="pt-16"></div>
    </>
  );
}
