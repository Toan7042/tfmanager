"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../components/Nav";
// import { MyDevicesChart } from "../components/custom/MyDevicesChart";
import MyDevicesTablePC from "../components/custom/MyDevicesTablePC";
import MyDevicesTablePhone from "../components/custom/MyDevicesTablePhone";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
// import Phone from "./Phone";

export default function MyDevices() {
  return (
    <main className="bg-gray-50 h-screen flex flex-col ">
      <Navbar />
      <div className="flex-1 max-w-full ml-0 p-6 bg-white overflow-y-auto">
        {/* Card hiển thị thông tin tổng quan */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", type: "spring", stiffness: 150, damping: 25 }}
          className="w-full pb-2"
        >
          <Card className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-1">Device overview</h2>
            <div className="flex flex-col gap-1.5">
              {/* PC */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="flex items-center gap-2 overflow-hidden"
              >
                <span className="text-sm font-medium text-gray-600">PC: 50</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs text-green-600 bg-green-50 border-green-200 px-2 py-0.5">20 AC</Badge>
                  <Badge variant="outline" className="text-xs text-yellow-600 bg-yellow-50 border-yellow-200 px-2 py-0.5">10 EA</Badge>
                  <Badge variant="outline" className="text-xs text-red-600 bg-red-50 border-red-200 px-2 py-0.5">20 ED</Badge>
                </div>
              </motion.div>
              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-center gap-2"
              >
                <span className="text-sm font-medium text-gray-600">Phone: 70</span>
                <div className="flex gap-1">
                  <Badge variant="outline" className="text-xs text-green-600 bg-green-50 border-green-200 px-2 py-0.5">40 A</Badge>
                  <Badge variant="outline" className="text-xs text-yellow-600 bg-yellow-50 border-yellow-200 px-2 py-0.5">10 EA</Badge>
                  <Badge variant="outline" className="text-xs text-red-600 bg-red-50 border-red-200 px-2 py-0.5">20 ED</Badge>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="computer">
          <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none">
            <TabsTrigger value="computer" className="rounded-none bg-background h-full border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background -mb-[2px]">
              PC
            </TabsTrigger>
            <TabsTrigger value="phone" className="rounded-none bg-background h-full border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background -mb-[2px]">
              Phone
            </TabsTrigger>
          </TabsList>

          <div >
            <TabsContent value="computer" className="flex-auto">
              <MyDevicesTablePC />
            </TabsContent>
            <TabsContent value="phone" className="flex-auto">
              <MyDevicesTablePhone />
            </TabsContent>
          </div>
        </Tabs>

      </div>
    </main>
  );
}
//ahihi
