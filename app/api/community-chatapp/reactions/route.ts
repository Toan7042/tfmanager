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

  const { messageId, emoji } = await request.json();

  const existingReaction = await prisma.communityReaction.findFirst({
    where: { messageId, userId: Number(session.user.id), emoji },
  });

  let reaction;
  if (!existingReaction) {
    reaction = await prisma.communityReaction.create({
      data: {
        messageId,
        userId: Number(session.user.id),
        emoji,
      },
    });
  }

  const message = await prisma.communityMessage.findUnique({
    where: { id: messageId },
    include: {
      user: { select: { id: true, name: true, avatar: true } },
      reactions: {
        include: { user: { select: { id: true, name: true, avatar: true } } }, // Thêm thông tin user vào reactions
      },
      seenBy: {
        include: { user: { select: { id: true, name: true, avatar: true } } },
      },
    },
  });

  if (message) {
    // Đảm bảo imageUrls là mảng
    const formattedMessage = { ...message, imageUrls: Array.isArray(message.imageUrls) ? message.imageUrls : [] };
    await pusher.trigger("community-chat", "new-reaction", formattedMessage);
  }

  return NextResponse.json(reaction || existingReaction);
}