"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../components/Nav";
// import { MyDevicesChart } from "../components/custom/MyDevicesChart";
import MyDevicesTablePC from "../components/custom/MyDevicesTablePC";
import MyDevicesTablePhone from "../components/custom/MyDevicesTablePhone";
// import Phone from "./Phone";

export default function MyDevices() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <Navbar />
      {/* <MyDevicesChart /> */}
      <div className="max-w-full ml-0 mt-10 p-6 bg-white shadow-md rounded-lg">
        <Tabs defaultValue="computer" className="w-full">
          <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none">
            <TabsTrigger value="computer" className="rounded-none bg-background h-full border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background -mb-[2px]">
              PC
            </TabsTrigger>
            <TabsTrigger value="phone" className="rounded-none bg-background h-full border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background -mb-[2px]">
              Phone
            </TabsTrigger>
          </TabsList>

          <TabsContent value="computer">
            <MyDevicesTablePC />
          </TabsContent>
          <TabsContent value="phone">
            <MyDevicesTablePhone />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
