"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navbar from "../components/Nav";
import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

interface Profile {
  id: number;
  email: string;
  name?: string;
  avatar?: string;
  providerId: string;
  role: string;
  maxPhone: number;
  maxPC: number;
  level: number;
  balance: number;
  totalbalance: number;
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
    maxPhone: 2,
    maxPC: 1,
    level: 4,
    balance: 600000,
    totalbalance: 6000000,
    lastLoginTime: new Date(),
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date(),
    lastActiveAt: new Date(),
    expiresAt: new Date("2025-12-31"),
  });

  const info = [
    ["Account Level", profile.level],
    ["Role", profile.role],
    ["Provider ID", profile.providerId],
    ["Max PCs", profile.maxPC],
    ["Max Phones", profile.maxPhone],
    ["Balance", `${profile.balance.toLocaleString()} VND`],
    ["Total Balance", `${profile.totalbalance.toLocaleString()} VND`],
    ["Last Login", profile.lastLoginTime.toLocaleString()],
    ["Account Created", profile.createdAt.toLocaleString()],
    ["Last Updated", profile.updatedAt.toLocaleString()],
    ["Last Active", profile.lastActiveAt.toLocaleString()],
    ["Expires At", profile.expiresAt.toLocaleString()],
  ];

  // Danh sách các mốc yêu cầu để lên level (tổng số dư tích lũy)
  const levelRequirements = [
    { level: 1, requiredBalance: 2000000, nextLevel: 2 },
    { level: 2, requiredBalance: 5000000, nextLevel: 3 },
    { level: 3, requiredBalance: 10000000, nextLevel: 4 },
    { level: 4, requiredBalance: 18000000, nextLevel: 5 },
    { level: 5, requiredBalance: 25000000, nextLevel: 6 },
    { level: 6, requiredBalance: 30000000, nextLevel: 7 },
    { level: 7, requiredBalance: 40000000, nextLevel: 8 },
    { level: 8, requiredBalance: 50000000, nextLevel: 9 },
    { level: 9, requiredBalance: 60000000, nextLevel: 10 },
    { level: 10, requiredBalance: 80000000, nextLevel: 11 },
    { level: 11, requiredBalance: 150000000, nextLevel: 12 },
    { level: 12, requiredBalance: Infinity, nextLevel: null },
  ];

  // Tìm yêu cầu cho level hiện tại
  const currentRequirement = levelRequirements.find(req => req.level === profile.level) || levelRequirements[levelRequirements.length - 1];

  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className="p-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card className="max-w-2xl ml-4">
            <CardHeader>
              <CardTitle className="text-sm">User Profile</CardTitle>
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
              <Alert className="border-cyan-600/50 text-cyan-600 dark:border-cyan-600 [&>svg]:text-cyan-600">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>Important Notification Level</AlertTitle>
                <AlertDescription>
                  {currentRequirement.nextLevel ? (
                    <div className="space-y-1">
                      <p>
                        To upgrade to <span className="text-green-500 font-sm">Level {currentRequirement.nextLevel}</span>
                      </p>
                      <p>
                        Account must have a total accumulated balance of{" "}
                        <span className="text-blue-500 font-semibold">{currentRequirement.requiredBalance.toLocaleString()} VND</span>.
                      </p>
                    </div>
                  ) : (
                    "Congratulations! You have reached the maximum level."
                  )}
                </AlertDescription>
              </Alert>
              <DiscountTimeline currentLevel={profile.level} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}