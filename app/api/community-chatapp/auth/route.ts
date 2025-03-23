import { NextResponse } from "next/server";
import { pusher } from "@/lib/pusher";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const bodyText = await request.text();
    const params = new URLSearchParams(bodyText);
    const socket_id = params.get("socket_id");
    const channel_name = params.get("channel_name");

    if (!socket_id || !channel_name) {
      return NextResponse.json({ error: "Missing socket_id or channel_name" }, { status: 400 });
    }

    if (!channel_name.startsWith("community-chat") && !channel_name.startsWith("private-chat-")) {
      return NextResponse.json({ error: "Invalid channel" }, { status: 403 });
    }

    const auth = pusher.authenticate(socket_id, channel_name);
    return NextResponse.json(auth);
  } catch (error) {
    console.error("Error in /api/community-chatapp/auth:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}