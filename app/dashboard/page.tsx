"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Nav from "@/app/components/Nav";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function DashboardPage() {
  const { data: session } = useSession();
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Nav />
      {/* Biểu đồ ApexCharts */}
      <div id="apex-curved-line-charts" className="w-full">
        <ReactApexChart
          options={{
            chart: { height: 300, type: "line", toolbar: { show: false }, zoom: { enabled: false } },
            colors: ["#008FFB", "#00E396", "#FF4560"],
            series: [
              { name: "Lượt chạy", data: [1000, 17000, 35000, 23000, 40000] },
              { name: "Thành công", data: [3000, 15000, 19000, 32000, 27000] },
              { name: "Thất bại", data: [5000, 1200, 16000, 20000, 30000] },
            ],
            dataLabels: { enabled: false },
            stroke: { curve: "smooth", width: [4, 4, 4] },
            xaxis: { categories: ["06/03", "07/03", "08/03", "09/03", "10/03"] },
            yaxis: { min: 0, max: 40000, tickAmount: 4 },
            tooltip: { enabled: true },
          }}
          series={[
            { name: "Lượt chạy", data: [1000, 17000, 35000, 23000, 40000] },
            { name: "Thành công", data: [3000, 15000, 19000, 32000, 27000] },
            { name: "Thất bại", data: [5000, 1200, 16000, 20000, 30000] },
          ]}
          type="line"
          height={300}
        />
      </div>

      {/* Hiển thị thông tin người dùng */}
      <AnimatePresence>
        {session && showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-4 right-4 flex items-center bg-white shadow-lg p-3 rounded-xl"
          >
            <Image
              src={session.user?.image || "/default-avatar.png"}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full border-2 border-blue-500"
            />
            <span className="ml-3 text-gray-700 font-semibold">Xin chào, {session.user?.name}!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
