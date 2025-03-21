"use client";

import LoadingPage from "@/app/loading/page";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withAuth<T extends object>(
  Component: React.ComponentType<T>,
  redirectTo: string = "/dashboard" // Mặc định là dashboard
) {
  return function AuthWrapper(props: T) {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "authenticated") {
        router.replace(redirectTo);
      }
    }, [status, router]); // ✅ Xóa redirectTo khỏi dependencies
    

    if (status === "loading") {
      return <LoadingPage />; // Hiển thị trang loading khi xác thực
    }

    return <Component {...props} />;
  };
}
