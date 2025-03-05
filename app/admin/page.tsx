"use client";

import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();

  if (!session || session.user.role !== "admin") {
    return <p>Bạn không có quyền truy cập trang này.</p>;
  }

  return <h1>Chào mừng Admin {session.user.name}!</h1>;
}
