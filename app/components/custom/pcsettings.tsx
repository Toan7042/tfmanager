"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";    
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
  } from "@/components/ui/menubar"
  
import { Network, Clock, KeyRound, Settings, UserRoundCheckIcon, LucideGanttChart } from "lucide-react";
import { JSX } from "react/jsx-runtime";
import PcsettingsOTP from "./pcsettingsOTP";
// import PCSettingsTreeView from "./pcsettingstreeview";

const defaultSettings = {
    launch: {
      stlaunchAppRun: "Facebook",
      stlaunchListWipe: "ListItem",
      stlaunchIDGen: "PhoneGen",
      stlaunchIDVerify: "Phone",
      staperchangeNAME: ["vi_VN"],
      staperchangeCOUNTRY: ["VN"],
      staperchangePHONENUMBER: ["AS-COUNTRY"],
      staperchangeLANGUAGE: ["VN"],
      staperchangeEMAIL: ["randomvalue|@gmail.com|com.google"],
    },
    network: {
      stnetworkTypeNetwork: "None",
      stnetworkTypeConnect: "Aper",
    },
    aperChange: {
        staperchangeNETWORK: 0,
        staperchangeBUILDOS: 0,
        staperchangeUSERAGENT: 0,
        staperchangeGPS: 0,
        staperchangeSERIAL: 0,
        staperchangeFINGERPRINT: 0,
        staperchangeHOST: 0,
        staperchangeDEVICE: 0,
      },
    otp: {
        stotpGmail: "https://sptmail.com = api_here*facebook",
        stotpHotmail: "https://unlimitmail.com = api_here*5",
        stotpTempmail: "None",
        stotpPhone: "https://thuesim.app = api_here*facebook",
        stotpIcloud: "https://cubemmo.net = api_here*5",
    },
    time: {
      timeZone: "UTC+7",
      timeSync: true,
    },
  };
  
  const selectOptions: Record<string, string[]> = {
    stnetworkTypeNetwork: ["None", "SIM", "4G", "VPN", "ListProxy"],
    stnetworkTypeConnect: ["Aper", "CollegeProxy", "SupperProxy"],
    stlaunchAppRun: ["Facebook", "Facebook Lite", "Messenger"],
    stlaunchListWipe: ["ListItem", "Appinfo", "Single"],
    stlaunchIDVerify: ["Phone", "Mail"],
    stlaunchIDGen: ["PhoneGen", "MailGen", "Directly"],
    uploadMethod: ["POST", "GET"],
    staperchangeNAME: ["vi_VN", "en_US", "fr_FR"],
    staperchangeCOUNTRY: ["VN", "US", "FR", "JP"],
    staperchangePHONENUMBER: ["AS-COUNTRY", "RANDOM", "CUSTOM"],
    staperchangeLANGUAGE: ["US", "VN", "JP", "FR"],
    staperchangeEMAIL: [
        "randomvalue|@gmail.com|com.google",
        "randomvalue|@yahoo.com|com.yahoo",
      ],
    };

const tabIcons: Record<string, JSX.Element> = {
        launch: <LucideGanttChart className="w-5 h-5" />,
        network: <Network className="w-5 h-5" />,
        aperChange: <UserRoundCheckIcon className="w-5 h-5" />,
        otp: <KeyRound className="w-5 h-5" />,
        time: <Clock className="w-5 h-5" />,
};

type MenuItem = { label: string; shortcut?: string };

const isMenuItem = (item: unknown): item is MenuItem =>     
  typeof item === 'object' && item !== null && 'label' in item;

const menuItems = [
  {
    label: "Wipe",
    items: [
      { label: "Config List" },
    ],
  },
  {
    label: "ListProxy",
    items: [
      { label: "Config for AppRun"},
      "separator",
      { label: "Config for GetIDVerify"},
    ],
  },
  {
    label: "ListOTP",
    items: [
      { label: "Zoom In", shortcut: "⌘+" },
      { label: "Zoom Out", shortcut: "⌘-" },
      { label: "Full Screen", shortcut: "F11" },
    ],
  },
];

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
              <code className="text-[13px]">{key.toUpperCase()}</code>
            </TabsTrigger>
          ))}
        </TabsList>
        {Object.entries(settings).map(([category, values]) => (
        <TabsContent key={category} value={category}>
        <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {tabIcons[category] || <Settings className="w-5 h-5" />}
              <Menubar>
                {menuItems.map((menu) => (
                  <MenubarMenu key={menu.label}>
                    <MenubarTrigger>{menu.label}</MenubarTrigger>
                    <MenubarContent>
                      {menu.items.map((item, index) =>
                        item === "separator" ? (
                          <MenubarSeparator key={index} />
                        ) : isMenuItem(item) && (
                          <MenubarItem key={item.label}>
                            {item.label}
                            {item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
                          </MenubarItem>
                        )
                      )}
                    </MenubarContent>
                  </MenubarMenu>
                ))}
              </Menubar>
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full overflow-auto">
            {category === "otp" ? (
             <PcsettingsOTP/>
            ) : (
              <Table>
                <TableBody>
                  {Object.entries(values).map(([key, value]) => (
                    <TableRow key={key}>
                      <TableCell>
                        <code className="text-[13px]">{key}</code>
                      </TableCell>
                      <TableCell>
                        {category === "aperChange" || typeof value === "boolean" ? (
                          <Checkbox
                            checked={Boolean(value)}
                            onCheckedChange={(checked) => handleChange(category as keyof typeof settings, key, checked)}
                          />
                        ) : selectOptions[key] ? (
                          <Select
                            value={String(value)}
                            onValueChange={(selected) => handleChange(category as keyof typeof settings, key, selected)}
                          >
                            <SelectTrigger className="w-full text-[13px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {selectOptions[key].map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            className="text-[13px] p-1"
                            value={String(value)}
                            onChange={(e) => handleChange(category as keyof typeof settings, key, e.target.value)}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}