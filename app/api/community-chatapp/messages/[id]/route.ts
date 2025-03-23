import { NextResponse } from "next/server";
import { pusher } from "@/lib/pusher";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, isPinned, isDeleted } = await request.json();
  
  // Validate id
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: "Invalid message ID" }, { status: 400 });
  }

  const message = await prisma.communityMessage.update({
    where: { id: Number(id) },
    data: { isPinned, isDeleted },
    include: {
      user: { select: { id: true, name: true, avatar: true } },
      reactions: { include: { user: { select: { id: true, name: true, avatar: true } } } },
      seenBy: { include: { user: { select: { id: true, name: true, avatar: true } } } },
    },
  });

  const formattedMessage = {
    ...message,
    imageUrls: Array.isArray(message.imageUrls) ? message.imageUrls : [],
  };

  await pusher.trigger("community-chat", "update-message", formattedMessage);
  return NextResponse.json(formattedMessage);
}