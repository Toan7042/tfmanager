
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "../components/Nav";
import { motion } from "framer-motion";

interface Profile {
  id: number;
  email: string;
  name?: string;
  avatar?: string;
  providerId: string;
  role: string;
  balance: number;
  maxPhone: number;
  maxPC: number;
  level: number;
  lastLoginTime: Date;
  createdAt: Date;
  updatedAt: Date;
  lastActiveAt: Date;
  expiresAt: Date;
}

const ProfileItem = ({ label, value }: { label: string | number; value: string | number }) => (
  <div className="space-y-1">
    <Label className="text-xs sm:text-sm font-medium text-gray-700">{String(label)}</Label>
    <p className="text-xs sm:text-sm text-gray-600">{value}</p>
  </div>
);

const DiscountTimeline = ({ currentLevel }: { currentLevel: number }) => (
  <div className="mt-4">
    <h3 className="text-sm mb-2">Level - Endow Discount</h3>
    <div className="relative">
      <div className="h-2 bg-gray-200 rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(currentLevel / 12) * 100}%` }}
          className="h-full bg-blue-500 rounded-full"
        />
      </div>
      <div className="flex justify-between mt-2">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={`text-center ${i + 1 === currentLevel ? "text-blue-600 font-semibold" : "text-gray-600"}`}>
            <div className="text-xs">{i ? i + 1 : 0}%</div>
            <div className="text-[10px]">L{i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function Profile() {
  const [profile] = useState<Profile>({
    id: 1,
    email: "user@example.com",
    name: "John Doe",
    avatar: "https://github.com/shadcn.png",
    providerId: "google_12345",
    role: "user",
    balance: 500000,
    maxPhone: 2,
    maxPC: 1,
    level: 1,
    lastLoginTime: new Date(),
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date(),
    lastActiveAt: new Date(),
    expiresAt: new Date("2025-12-31"),
  });

  const info = [
    ["Account Level", profile.level],
    ["Role", profile.role],
    ["Balance", `${profile.balance.toLocaleString()} VND`],
    ["Provider ID", profile.providerId],
    ["Max PCs", profile.maxPC],
    ["Max Phones", profile.maxPhone],
    ["Last Login", profile.lastLoginTime.toLocaleString()],
    ["Account Created", profile.createdAt.toLocaleString()],
    ["Last Updated", profile.updatedAt.toLocaleString()],
    ["Last Active", profile.lastActiveAt.toLocaleString()],
    ["Expires At", profile.expiresAt.toLocaleString()]
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}transition={{ duration: 0.8 }}>
          <Card className="max-w-2xl ml-4">
            <CardHeader>
              <CardTitle className="text-lg">User Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4 items-left">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={profile.avatar} />
                  <AvatarFallback>{profile.name?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-base font-medium text-blue-600">{profile.name}</h2>
                  <p className="text-xs text-gray-500">{profile.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {info.map(([label, value]) => (
                  <ProfileItem key={label} label={label} value={value} />
                ))}
              </div>
              <DiscountTimeline currentLevel={profile.level} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
