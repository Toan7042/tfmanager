"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SwirlingEffectSpinner from "@/components/ui/SwirlingEffectSpinner";

function LoadingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/";

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(next);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router, next]);

  return <SwirlingEffectSpinner />;
}

export default function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
      <Suspense fallback={<SwirlingEffectSpinner />}>
        <LoadingContent />
      </Suspense>
    </div>
  );
}
