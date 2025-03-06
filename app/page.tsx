"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Hoặc useRouter nếu là Next.js 12
import { useEffect } from "react";
import Nav from "@/app/components/Nav";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  // Sử dụng useEffect để thực hiện điều hướng sau khi render hoàn tất
  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]); // Chạy lại khi session thay đổi

  return (
    <main className="bg-gray-50 min-h-screen">
      <Nav />
      
      {/* Hero Section */}
      <section className="text-center mt-16 px-6">
        <h1 className="text-4xl font-bold text-blue-600">Công cụ tự động hóa & tối ưu quy trình</h1>
        <p className="mt-4 text-gray-600 text-lg max-w-3xl mx-auto">
          Chúng tôi cung cấp các giải pháp tối ưu hóa quy trình làm việc, tự động hóa tác vụ 
          giúp bạn tiết kiệm thời gian, tăng hiệu suất và đạt hiệu quả cao nhất.
        </p>
      </section>

      {/* Features Section */}
      <section className="mt-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-xl font-semibold text-blue-500">Tự động hóa mạnh mẽ</h3>
          <p className="text-gray-600 mt-2">Giảm thiểu công việc thủ công, tăng tốc độ và độ chính xác.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-xl font-semibold text-blue-500">Bảo mật & an toàn</h3>
          <p className="text-gray-600 mt-2">Dữ liệu của bạn được bảo vệ với các tiêu chuẩn bảo mật cao nhất.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <h3 className="text-xl font-semibold text-blue-500">Giao diện thân thiện</h3>
          <p className="text-gray-600 mt-2">Thiết kế đơn giản nhưng mạnh mẽ, phù hợp với mọi người dùng.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="mt-16 bg-white py-12 px-6 shadow-lg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-600">Giới thiệu về ToolWeb</h2>
          <p className="text-gray-700 mt-6 text-lg leading-relaxed">
            ToolWeb là nền tảng giúp tự động hóa quy trình làm việc một cách hiệu quả. 
            Chúng tôi mang đến giải pháp tối ưu dành cho các cá nhân và doanh nghiệp 
            nhằm giảm thiểu thời gian thao tác thủ công, tối đa hóa năng suất, 
            đồng thời đảm bảo tính bảo mật và ổn định. Với giao diện trực quan, 
            mọi thao tác trên hệ thống đều trở nên dễ dàng và tiện lợi. 
          </p>
          <p className="text-gray-700 mt-4 text-lg leading-relaxed">
            Các công cụ của chúng tôi được thiết kế để đáp ứng nhu cầu đa dạng, từ 
            quản lý tài khoản, tự động hóa đăng ký, xử lý dữ liệu hàng loạt cho đến 
            tối ưu hóa công việc hàng ngày. Nếu bạn muốn tăng tốc độ và hiệu suất làm việc, 
            hãy để ToolWeb giúp bạn hoàn thành công việc một cách nhanh chóng và chuyên nghiệp.
          </p>
        </div>
      </section>
    </main>
  );
}
