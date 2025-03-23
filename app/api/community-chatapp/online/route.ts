import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { pusher } from "@/lib/pusher";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { userId } = await request.json();

  await pusher.trigger("community-chat", "user-status", {
    userId,
    isOnline: true,
  });

  return NextResponse.json({ success: true });
}