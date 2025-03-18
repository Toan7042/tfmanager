"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SwirlingEffectSpinner from "@/components/ui/SwirlingEffectSpinner";

export default function LoadingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(next);
    }, 1000); // Điều chỉnh thời gian loading nếu cần

    return () => clearTimeout(timer);
  }, [router, next]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <SwirlingEffectSpinner />
    </div>
  );
}
