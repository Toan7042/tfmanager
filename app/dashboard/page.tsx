"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import Navbar from "../components/Nav";
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { AlertCircle } from "lucide-react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


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
      <Navbar />
      <div>
      <Button>Click me</Button>
      <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components and dependencies to your app using the cli.
      </AlertDescription>
    </Alert>
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>

    <Table>
  <TableCaption>A list of your recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>






    </div>
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
