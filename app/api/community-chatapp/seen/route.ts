import { NextResponse } from "next/server";
import { pusher } from "@/lib/pusher";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { messageId } = await request.json();
  await prisma.communityMessageSeen.upsert({
    where: { messageId_userId: { messageId, userId: Number(session.user.id) } },
    update: {},
    create: { messageId, userId: Number(session.user.id) },
  });

  const message = await prisma.communityMessage.findUnique({
    where: { id: messageId },
    include: {
      user: { select: { id: true, name: true, avatar: true } },
      reactions: { include: { user: { select: { id: true, name: true, avatar: true } } } },
      seenBy: { include: { user: { select: { id: true, name: true, avatar: true } } } },
    },
  });

  if (message) {
    const formattedMessage = { ...message, imageUrls: Array.isArray(message.imageUrls) ? message.imageUrls : [] };
    await pusher.trigger("community-chat", "message-seen", formattedMessage);
  }

  return NextResponse.json({ success: true });
}