"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LucideGanttChart, Check, ChevronsUpDown, Equal, ChevronDown, ChevronUp, ChevronsUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar";
import { Menubar } from "@/components/ui/menubar";

interface Settings {
  launch: Record<string, string>;
  network: Record<string, string>;
  aperChange: Record<string, boolean>;
  otp: Record<string, string>;
  time: { timeZone: string; timeSync: boolean };
}

interface Props {
  settings: Settings;
  handleChange: (category: keyof Settings, key: string, value: string | boolean) => void;
}

interface MenuItem {
  label: string;
  shortcut?: string;
}

interface MenuGroup {
  label: string;
  items: (MenuItem | string | "separator")[];
}

const menuItems: MenuGroup[] = [
  {
    label: "File",
    items: [
      { label: "New", shortcut: "⌘N" },
      { label: "Open", shortcut: "⌘O" },
      { label: "Save", shortcut: "⌘S" },
      "separator",
      { label: "Print", shortcut: "⌘P" },
      { label: "Exit" }
    ]
  },
  {
    label: "Edit",
    items: [
      { label: "Undo", shortcut: "⌘Z" },
      { label: "Redo", shortcut: "⌘Y" },
      "separator",
      { label: "Cut", shortcut: "⌘X" },
      { label: "Copy", shortcut: "⌘C" },
      { label: "Paste", shortcut: "⌘V" }
    ]
  },
  {
    label: "View",
    items: [
      { label: "Zoom In", shortcut: "⌘+" },
      { label: "Zoom Out", shortcut: "⌘-" },
      { label: "Reset Zoom", shortcut: "⌘0" }
    ]
  },
  {
    label: "Help",
    items: ["About", "Contact Us", "Support"]
  }
];

const prioritiesSpeeds = [
  { value: "highest", label: "Highest", icon: ChevronsUp, color: "text-destructive", description: "Tối đa hiệu suất, sử dụng tài nguyên cao nhất." },
  { value: "high", label: "High", icon: ChevronUp, color: "text-orange-500", description: "Hiệu suất cao, sử dụng nhiều tài nguyên." },
  { value: "medium", label: "Medium", icon: Equal, color: "text-yellow-500", description: "Cân bằng giữa hiệu suất và tài nguyên." },
  { value: "low", label: "Low", icon: ChevronDown, color: "text-green-600", description: "Tiết kiệm tài nguyên, tốc độ thấp." }
];


const stlaunchAppRuntype = [
  { id: 1, name: "Facebook", createdBy: "com.facebook.katana" },
  { id: 2, name: "Facebook Lite", createdBy: "com.facebook.lite" },
  { id: 3, name: "Messenger", createdBy: "com.facebook.orca" },
];

const options = {
  PHONEINFO: ["iPhone", "Samsung", "Google Pixel"],
  NAME: ["vi_VN", "en_US"],
  COUNTRY: ["VN", "US"],
  PHONENUMBER: ["AS-COUNTRY", "US-NUMBER"],
  LANGUAGE: ["US", "JP"],
  EMAIL: ["@gmail.com", "@yahoo.com"]
};

interface LocalSettings {
  PHONEINFO: string;
  NAME: string;
  COUNTRY: string;
  PHONENUMBER: string;
  LANGUAGE: string;
  EMAIL: string;
}

export default function PcsettingsLaunch({ settings, handleChange }: Props) {
  const [selectedWorkspace, setSelectedWorkspace] = useState(stlaunchAppRuntype[0]);
  const [mounted, setMounted] = useState(false);
  const [priority, setPriority] = useState("highest");
  const selectedPriority = prioritiesSpeeds.find((p) => p.value === priority);
  const [localSettings, setLocalSettings] = useState<LocalSettings>({
    PHONEINFO: "iPhone",
    NAME: "vi_VN",
    COUNTRY: "VN",
    PHONENUMBER: "AS-COUNTRY",
    LANGUAGE: "US",
    EMAIL: "@gmail.com"
  });

  useEffect(() => {
    const initialWorkspace = stlaunchAppRuntype.find((w) => w.name === settings.launch.stlaunchAppRun) || stlaunchAppRuntype[0];
    setSelectedWorkspace(initialWorkspace);
    setMounted(true);
  }, [settings.launch.stlaunchAppRun]);

  if (!mounted) {
    return null;
  }

  return (
    <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
      {/* File Edit View Help*/}
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LucideGanttChart className="w-5 h-5" />
          Launch Settings
          <Menubar>
            {menuItems.map((menu) => (
              <MenubarMenu key={menu.label}>
                <MenubarTrigger>{menu.label}</MenubarTrigger>
                <MenubarContent>
                  {menu.items.map((item, index) =>
                    item === "separator" ? (
                      <MenubarSeparator key={index} />
                    ) : (
                      <MenubarItem key={typeof item === "object" ? item.label : index}>
                        {typeof item === "object" ? item.label : item}
                        {typeof item === "object" && item.shortcut && <MenubarShortcut>{item.shortcut}</MenubarShortcut>}
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
        <Table>
          <TableBody>
            <TableRow className="hover:bg-transparent focus:bg-transparent">
              <TableCell className="flex gap-6 items-center">

                {/* Set Speed */}
                <div className="flex-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full min-h-[48px] px-4 grid grid-cols-[auto_1fr_auto] items-center">
                        {selectedPriority && <selectedPriority.icon className={`h-4 w-4 ${selectedPriority.color}`} />}
                        <div className="flex flex-col text-left">
                          <span>stlaunchAppSpeed: {priority}</span>
                          <span className="text-xs text-muted-foreground">{selectedPriority?.description}</span>
                        </div>
                        <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-44">
                      <DropdownMenuLabel>Set Speed</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {prioritiesSpeeds.map(({ value, label, icon: Icon, color }) => (
                        <DropdownMenuRadioItem key={value} value={value} onClick={() => setPriority(value)}>
                          <Icon className={`mr-2 h-4 w-4 ${color}`} /> {label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* stlaunchAppRun */}
                <div className="flex-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full min-h-[48px] px-4 grid grid-cols-[auto_1fr_auto] gap-3 items-center border hover:bg-accent rounded-md">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{selectedWorkspace.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col text-left">
                        <span>{selectedWorkspace.name}</span>
                        <span className="text-xs text-muted-foreground">{selectedWorkspace.createdBy}</span>
                      </div>
                      <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-max w-auto">
                      {stlaunchAppRuntype.map((o) => (
                        <DropdownMenuItem
                          key={o.id}
                          onClick={() => (setSelectedWorkspace(o), handleChange("launch", "stlaunchAppRun", o.name))}
                          className="flex items-center gap-3 px-4 py-2 whitespace-nowrap"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{o.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col text-left">
                            <span>{o.name}</span>
                            <span className="text-xs text-muted-foreground">{o.createdBy}</span>
                          </div>
                          {selectedWorkspace.id === o.id && <Check className="ml-auto" />}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>

                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>

            {/* Api Initial initialization */}
            <TableRow className="hover:bg-transparent focus:bg-transparent">
              <TableCell colSpan={100}> {/* Đảm bảo chiếm toàn bộ hàng */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Api Initial initialization
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    {Object.entries(options).map(([key, values]) => (
                      <DropdownMenu key={key}>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="w-full justify-between text-sm font-medium text-gray-800 dark:text-gray-100">
                            {key}: <span className="text-blue-600 dark:text-blue-400">{localSettings[key as keyof LocalSettings]}</span>
                            <ChevronDown className="w-4 h-4 opacity-70" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-full shadow-md rounded-lg bg-white dark:bg-gray-800">
                          {values.map((value) => (
                            <DropdownMenuItem
                              key={value}
                              onClick={() => setLocalSettings(prev => ({ ...prev, [key]: value }))}
                              className="text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-700"
                            >
                              {value}
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ))}
                  </CardContent>
                </Card>
              </TableCell>
            </TableRow>

            {/* More Settings */}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
