"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PcsettingsLaunch from "./PcSettingsLaunch";
import PcsettingsNetwork from "./PcSettingsNetwork";
import PcsettingsAperChange from "./PcSettingsAperChange";
import PcsettingsTime from "./PcSettingsTime";
import PcsettingsOTP from "./PcSettingsOTP";

interface Settings {
  launch: Record<string, string>;
  network: Record<string, string>;
  aperChange: Record<string, boolean>;
  otp: Record<string, string>;
  time: Record<string, number>;
}

// Giá trị mặc định để tránh lỗi thiếu thuộc tính
const initialSettings: Settings = {
  launch: {},
  network: {},
  aperChange: {},
  otp: {},
  time: {},
};

export default function PcSettings() {
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [activeTab, setActiveTab] = useState<keyof Settings>("launch");

  const handleChange = (category: keyof Settings, key: string, value: string | number | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value,
      },
    }));
  };

  return (
    <div className="p-4 max-w-full w-full">
      <Tabs defaultValue={activeTab} className="w-full">
        <TabsList className="w-full p-0 bg-background justify-start border-b rounded-none overflow-x-auto whitespace-nowrap">
          {(Object.keys(settings) as (keyof Settings)[]).map((key) => (
            <TabsTrigger
              key={key}
              value={key}
              onClick={() => setActiveTab(key)}
              className="rounded-none bg-background data-[state=active]:shadow-none border border-transparent border-b-border data-[state=active]:border-border data-[state=active]:border-b-background -mb-[2px] rounded-t px-4 py-2"
            >
              <span className="text-[13px] font-normal">{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}</span>
            </TabsTrigger>

          ))}
        </TabsList>
        <TabsContent value="launch">
          <PcsettingsLaunch settings={settings} handleChange={handleChange} />
        </TabsContent>
        <TabsContent value="network">
          <PcsettingsNetwork settings={settings} handleChange={handleChange} />
        </TabsContent>
        <TabsContent value="aperChange">
          <PcsettingsAperChange settings={settings} handleChange={handleChange} />
        </TabsContent>
        <TabsContent value="otp">
          <PcsettingsOTP settings={settings} handleChange={handleChange} />
        </TabsContent>
        <TabsContent value="time">
          <PcsettingsTime settings={settings} handleChange={handleChange} />
        </TabsContent>
      </Tabs>
    </div>
  );
}