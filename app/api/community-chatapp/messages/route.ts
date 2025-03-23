import { NextResponse } from "next/server";
import { pusher } from "@/lib/pusher";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { Prisma } from "@prisma/client";

interface CloudinaryUploadResult {
  secure_url: string;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  
  // Nếu không có session, trả về mảng rỗng thay vì lỗi
  if (!session?.user?.id) {
    return NextResponse.json([]);
  }

  const messages = await prisma.communityMessage.findMany({
    include: {
      user: { select: { id: true, name: true, avatar: true } },
      reactions: { include: { user: { select: { id: true, name: true, avatar: true } } } },
      seenBy: { include: { user: { select: { id: true, name: true, avatar: true } } } },
    },
    orderBy: { createdAt: "asc" },
  });

  const formattedMessages = messages.map((msg) => ({
    ...msg,
    imageUrls: Array.isArray(msg.imageUrls) ? msg.imageUrls : msg.imageUrls ? [msg.imageUrls] : [],
  }));

  return NextResponse.json(formattedMessages);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const content = formData.get("content") as string;
  const replyToId = formData.get("replyToId") ? Number(formData.get("replyToId")) : undefined;
  const files = formData.getAll("images") as File[];

  let imageUrls: string[] = [];
  if (files.length > 0) {
    try {
      imageUrls = await Promise.all(
        files.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { resource_type: "image" },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as CloudinaryUploadResult);
              }
            ).end(buffer);
          });
          return result.secure_url;
        })
      );
    } catch (error) {
      console.error("Error uploading images to Cloudinary:", error);
      return NextResponse.json({ error: "Failed to upload images" }, { status: 500 });
    }
  }

  const message = await prisma.communityMessage.create({
    data: {
      userId: Number(session.user.id),
      content: content || "",
      imageUrls: imageUrls.length > 0 ? imageUrls : Prisma.JsonNull,
      replyToId,
    },
    include: {
      user: { select: { id: true, name: true, avatar: true } },
      reactions: { include: { user: { select: { id: true, name: true, avatar: true } } } },
      seenBy: { include: { user: { select: { id: true, name: true, avatar: true } } } },
    },
  });

  const formattedMessage = {
    ...message,
    imageUrls: Array.isArray(message.imageUrls) ? message.imageUrls : message.imageUrls ? [message.imageUrls] : [],
  };

  await pusher.trigger("community-chat", "new-message", formattedMessage);
  return NextResponse.json(formattedMessage);
}