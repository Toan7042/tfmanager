"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import PcsettingsLaunch from "./PcsettingsLaunch";
import PcsettingsNetwork from "./PcsettingsNetwork";
import PcsettingsAperChange from "./PcsettingsAperChange";
import PcsettingsOTP from "./PcsettingsOTP";
import PcsettingsTime from "./PcsettingsTime";


const defaultSettings = {
  launch: { stlaunchAppRun: "Facebook", stlaunchListWipe: "ListItem" },
  network: { stnetworkTypeNetwork: "None", stnetworkTypeConnect: "Aper" },
  aperChange: { staperchangeNETWORK: false, staperchangeBUILDOS: false },
  otp: { stotpGmail: "https://sptmail.com = api_here*facebook" },
  time: { timeZone: "UTC+7", timeSync: true },
};


export default function PcSettings() {
  const [settings, setSettings] = useState(defaultSettings);
  const [activeTab, setActiveTab] = useState<keyof typeof settings>("launch");

  const handleChange = (category: keyof typeof settings, key: string, value: string | boolean) => {
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
          {Object.keys(settings).map((key) => (
            <TabsTrigger key={key} value={key} onClick={() => setActiveTab(key as keyof typeof settings)}>
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
