"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LucideGanttChart } from "lucide-react";
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarShortcut, MenubarSeparator } from "@/components/ui/menubar";

interface Settings {
  launch: {
    stlaunchAppRun: string;
    stlaunchListWipe: string;
    [key: string]: string;
  };
  network: {
    stnetworkTypeNetwork: string;
    stnetworkTypeConnect: string;
  };
  aperChange: {
    [key: string]: boolean;
  };
  otp: {
    stotpGmail: string;
  };
  time: {
    timeZone: string;
    timeSync: boolean;
  };
}

interface Props {
  settings: Settings;
  handleChange: (category: keyof Settings, key: string, value: string | boolean) => void;
}

const selectOptions: Record<string, string[]> = {
  stlaunchAppRun: ["Facebook", "Facebook Lite", "Messenger"],
  stlaunchListWipe: ["ListItem", "Appinfo", "Single"],
  stlaunchIDVerify: ["Phone", "Mail"],
  stlaunchIDGen: ["PhoneGen", "MailGen", "Directly"],
};

const menuItems = [
  {
    label: "File",
    items: [{ label: "New", shortcut: "Ctrl+N" }, { label: "Open", shortcut: "Ctrl+O" }, "separator", { label: "Save", shortcut: "Ctrl+S" }],
  },
  {
    label: "Edit",
    items: [{ label: "Undo", shortcut: "Ctrl+Z" }, { label: "Redo", shortcut: "Ctrl+Y" }],
  },
];

export default function PcsettingsLaunch({ settings, handleChange }: Props) {
  return (
    <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
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
            {Object.entries(settings.launch).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>
                  <code className="text-[13px]">{key}</code>
                </TableCell>
                <TableCell>
                  {selectOptions[key] ? (
                    <Select value={String(value)} onValueChange={(selected) => handleChange("launch", key, selected)}>
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
                    <Input className="text-[13px] p-1" value={String(value)} onChange={(e) => handleChange("launch", key, e.target.value)} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}