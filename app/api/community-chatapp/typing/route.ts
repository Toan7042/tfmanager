import { NextResponse } from "next/server";
import { pusher } from "@/lib/pusher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { userId } = await request.json();
  await pusher.trigger("community-chat", "typing", { userId });
  return NextResponse.json({ success: true });
}