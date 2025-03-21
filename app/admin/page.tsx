"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "../components/Nav";
import { motion } from "framer-motion";

// Định nghĩa interface AdminPageData
interface AdminPageData {
  id: number;
  email: string;
  name?: string | null;
  avatar?: string | null;
  providerId: string;
  lastLoginTime?: Date | null;
  role: string;
  balance: number;
  maxPhone: number;
  maxPC: number;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
  expiresAt: Date;
}

// Component con để hiển thị thông tin
const AdminPageItem = ({ label, value }: { label: string; value: string | number }) => (
  <div className="space-y-1">
    <Label className="text-xs sm:text-sm font-medium text-gray-700">{label}</Label>
    <p className="text-xs sm:text-sm text-gray-600">{value}</p>
  </div>
);

// Hiệu ứng xuất hiện
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function AdminPage() {
  const { data: session } = useSession();
  const [adminData] = useState<AdminPageData>({
    id: 1,
    email: "user@example.com",
    name: "John Doe",
    avatar: "https://github.com/shadcn.png",
    providerId: "google_12345",
    lastLoginTime: new Date(),
    role: "user",
    balance: 500000,
    maxPhone: 2,
    maxPC: 1,
    level: 1,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date(),
    lastActiveAt: new Date(),
    expiresAt: new Date("2025-12-31"),
  });

  if (!session || session.user.role !== "admin") {
    return <p>Bạn không có quyền truy cập trang này.</p>;
  }

  // Dữ liệu hiển thị
  const adminItems = [
    { label: "Account Level", value: adminData.level },
    { label: "Role", value: adminData.role },
    { label: "Balance", value: `${adminData.balance.toLocaleString()} VND` },
    { label: "Provider ID", value: adminData.providerId },
    { label: "Max PCs", value: adminData.maxPC },
    { label: "Max Phones", value: adminData.maxPhone },
    {
      label: "Last Login",
      value: adminData.lastLoginTime?.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) || "N/A",
    },
    {
      label: "Account Created",
      value: adminData.createdAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
    },
    {
      label: "Last Updated",
      value: adminData.updatedAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
    },
    {
      label: "Last Active",
      value: adminData.lastActiveAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
    },
    {
      label: "Expires At",
      value: adminData.expiresAt.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }),
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <div className="w-full p-4 sm:p-6 space-y-6">
        <motion.div variants={cardVariants} initial="hidden" animate="visible">
          <Card className="max-w-2xl border border-blue-500">
            <CardHeader>
              <CardTitle className="text-lg sm:text-sm font-semibold text-gray-800">
                Hello <span className="text-blue-600">ADMIN!</span> <br />
                <span className="text-gray-700">You are</span> <br />
                <span className="text-green-600 font-bold">Founder,</span>
                <span className="text-orange-600 font-bold"> Chairman,</span>
                <span className="text-purple-600 font-bold"> CEO</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12 sm:w-16 sm:h-16">
                  <AvatarImage src={adminData.avatar || undefined} alt={adminData.name || "User"} />
                  <AvatarFallback>{adminData.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-base sm:text-lg font-medium text-gray-700">
                    {adminData.name || "Unnamed User"}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500">{adminData.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {adminItems.map((item, index) => (
                  <AdminPageItem key={index} label={item.label} value={item.value} />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}