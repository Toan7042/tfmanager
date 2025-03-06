"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Điều hướng về home khi đăng nhập thành công
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  //  Điều hướng về home sau khi logout
  useEffect(() => {
    if (!session) {
      router.push("/");  // Điều hướng về trang chủ khi đã đăng xuất
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        {session ? (
          <>
            <img src={session.user?.image || ""} alt="Avatar" className="w-20 h-20 rounded-full mx-auto border-4 border-blue-500" />
            <h2 className="mt-4 text-lg font-semibold">Chào, {session.user?.name}!</h2>
            <p className="text-gray-500">{session.user?.email}</p>
            <button
              onClick={() => signOut()}
              className="mt-6 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-700">Chào mừng!</h1>
            <p className="text-gray-500 mb-6">Hãy đăng nhập để tiếp tục</p>
            <button
              onClick={() => signIn("google")}
              className="w-full flex items-center justify-center py-3 px-5 bg-white border border-gray-300 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mr-3 shadow-md">
                <svg className="w-6 h-6" viewBox="0 0 48 48">
                  <path fill="#4285F4" d="M24 9.5c3.9 0 7.1 1.3 9.7 3.8l7.2-7.2C36.5 2 30.6 0 24 0 14.9 0 6.9 5.4 2.8 13.3l8.5 6.5C14.3 12.6 18.9 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.1 24.5c0-1.5-.2-3.1-.5-4.5H24v9h12.7c-.6 3-2.5 5.6-5.1 7.2l8.5 6.5c4.9-4.5 7.8-11.1 7.8-18.2z"/>
                  <path fill="#FBBC05" d="M10.6 28.5c-1-3-1-6.2 0-9.2l-8.5-6.5C-1.3 19-1.3 29 2.1 37l8.5-6.5z"/>
                  <path fill="#EA4335" d="M24 48c6.5 0 12.5-2.1 17.3-6l-8.5-6.5c-2.6 1.7-5.9 2.7-8.8 2.7-5.1 0-9.7-3.1-12.2-7.5l-8.5 6.5C6.9 42.6 14.9 48 24 48z"/>
                </svg>
              </div>
              <span className="text-lg font-medium text-gray-700">Đăng nhập với Google</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
