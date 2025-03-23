import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import Pusher from "pusher";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
  useTLS: true,
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const users = await prisma.user.findMany({
    include: { sessions: true },
  });

  const usersWithStatus = users.map((user) => ({
    ...user,
    isOnline: user.sessions.some((s) => new Date(s.expiresAt) > new Date()),
  }));

  return NextResponse.json(usersWithStatus);
}

// Cập nhật trạng thái khi user online/offline (gọi từ middleware hoặc client)
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, isOnline } = await request.json();

  await pusher.trigger("community-chat", "user-status", {
    userId,
    isOnline,
  });

  return NextResponse.json({ success: true });
}