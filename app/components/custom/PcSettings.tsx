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
        <TabsList className="border-b overflow-x-auto whitespace-nowrap">
          {(Object.keys(settings) as (keyof Settings)[]).map((key) => (
            <TabsTrigger key={key} value={key} onClick={() => setActiveTab(key)}>
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
