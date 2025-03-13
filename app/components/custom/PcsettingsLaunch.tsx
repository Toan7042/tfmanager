"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LucideGanttChart, Check, ChevronsUpDown, Equal, ChevronDown, ChevronUp, ChevronsUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
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
  { value: "highest", label: "Highest", icon: ChevronsUp, color: "text-destructive" },
  { value: "high", label: "High", icon: ChevronUp, color: "text-orange-500" },
  { value: "medium", label: "Medium", icon: Equal, color: "text-yellow-500" },
  { value: "low", label: "Low", icon: ChevronDown, color: "text-green-600" },
];

const stlaunchAppRuntype = [
  { id: 1, name: "Facebook", createdBy: "com.facebook.katana" },
  { id: 2, name: "Facebook Lite", createdBy: "com.facebook.lite" },
  { id: 3, name: "Messenger", createdBy: "com.facebook.orca" },
];



export default function PcsettingsLaunch({ settings, handleChange }: Props) {
  const [selectedWorkspace, setSelectedWorkspace] = useState(stlaunchAppRuntype[0]);
  const [mounted, setMounted] = useState(false);
  const [priority, setPriority] = useState("highest");
  const selectedPriority = prioritiesSpeeds.find((p) => p.value === priority);

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
      {/* MenuToolBar */}
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
      {/* MenuToolBar */}
      <CardContent className="h-full overflow-auto">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {selectedPriority && <selectedPriority.icon className={`mr-2 h-4 w-4 ${selectedPriority.color}`} />}
                      Speed: {priority}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-44">
                    <DropdownMenuLabel>Set Speed</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup value={priority} onValueChange={setPriority}>
                      {prioritiesSpeeds.map(({ value, label, icon: Icon, color }) => (
                        <DropdownMenuRadioItem key={value} value={value}>
                          <Icon className={`mr-2 h-4 w-4 ${color}`} /> {label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>

            <TableRow className="hover:bg-transparent focus:bg-transparent">
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 border hover:bg-accent py-1.5 px-2 rounded-md">
                    <Avatar className="rounded-lg h-8 w-8">
                      <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                        {selectedWorkspace.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-start flex flex-col gap-1 leading-none">
                      <span className="text-sm font-semibold truncate max-w-[17ch]">
                        {selectedWorkspace.name}
                      </span>
                      <span className="text-xs text-muted-foreground truncate max-w-[20ch]">
                        {selectedWorkspace.createdBy}
                      </span>
                    </div>
                    <ChevronsUpDown className="ml-6 h-4 w-4 text-muted-foreground" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-52" align="start">
                    <DropdownMenuLabel>stlaunchAppRun</DropdownMenuLabel>
                    {stlaunchAppRuntype.map((stlaunchAppRuntype) => (
                      <DropdownMenuItem
                        key={stlaunchAppRuntype.id}
                        onClick={() => {
                          setSelectedWorkspace(stlaunchAppRuntype);
                          handleChange("launch", "stlaunchAppRun", stlaunchAppRuntype.name);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="rounded-md h-8 w-8">
                            <AvatarFallback className="rounded-md bg-primary/10 text-foreground">
                              {stlaunchAppRuntype.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span>{stlaunchAppRuntype.name}</span>
                            <span className="text-xs text-muted-foreground">{stlaunchAppRuntype.createdBy}</span>
                          </div>
                        </div>
                        {selectedWorkspace.id === stlaunchAppRuntype.id && <Check className="ml-auto" />}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>

            {Object.entries(settings.launch).map(([key, value]) =>
              key !== "stlaunchAppRun" ? (
                <TableRow className="hover:bg-transparent focus:bg-transparent" key={key}>
                  <TableCell>
                    <code className="text-[13px]">{key}</code>
                  </TableCell>
                  <TableCell>
                    <Input
                      className="text-[13px] p-1"
                      value={String(value)}
                      onChange={(e) => handleChange("launch", key, e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              ) : null
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}