"use client";

import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Vui lòng đăng nhập</p>;
  }

  return <h1>Chào {session.user.name}, đây là Dashboard của bạn!</h1>;
}
