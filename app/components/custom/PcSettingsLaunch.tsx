"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LucideGanttChart, Check, ChevronsUpDown, Equal, ChevronDown, ChevronUp, ChevronsUp, InfoIcon } from "lucide-react";
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
import { MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Menubar } from "@/components/ui/menubar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PcSettingsRAND from "./PcSettingsRAND";
import PcSettingsAPITestCase from "./PcSettingsAPITestCase";
import PcSettingsProxyList from "./PcSettingsProxyList";
import PcSettingsWipe from "./PcSettingsWipe";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PcSettingsDomainBlack from "./PcSettingsDomainBlack";
import PcSettingsFormatDataAndUploadWebsite from "./PcSettingsFormatDataAcccountandUpLoadWebSite";

interface Props {
  settings: Settings;
  handleChange: (category: keyof Settings, key: string, value: string | boolean) => void;
}

interface Settings {
  launch: Record<string, string>;
}

interface OptionsApiInitialInitializationState {
  staperchangetypePHONEINFO: string[];
  staperchangeUSERAGENT: string[];
  staperchangetypeNAME: string[];
  staperchangeCOUNTRY: string[];
  staperchangeCarrier: string[];
  staperchangePHONENUMBER: string[];
  staperchangeEMAIL: string[];
  staperchangeLANGUAGE: string[];
}

// Dữ liệu menu
const menuItems = [
  {
    label: "List",
    items: [{ label: "Proxy", key: "proxylist" }, { label: "Rand", key: "randlist" }, { label: "Wipe", key: "wipelist" } , { label: "DomainBlack", key: "domainblack" }]
  },
  {
    label: "API Testcase",
    items: [{ label: "Entity test", key: "entitytest" }]
  },
  {
    label: "Export",
    items: [{ label: "Format Data Acccount and UpLoadWebSite", key: "formatdataacccountanduploadwebsite" }]
  },
  {
    label: "About",
    items: [{ label: "Contact us", key: "contactus" }, { label: "Social network for study", key: "socialnetworkforstudy" }]
  },
  {
    label: "Help",
    items: [{ label: "API Document", key: "apidocument" }, { label: "How to use", key: "howtouse" }]
  }
];

// SET SPEED
const prioritiesSpeeds = [
  { value: "highest", label: "Highest", icon: ChevronsUp, color: "text-destructive", description: "Maximum performance, highest resource utilization" },
  { value: "high", label: "High", icon: ChevronUp, color: "text-orange-500", description: "High performance, high resource utilization" },
  { value: "medium", label: "Medium", icon: Equal, color: "text-yellow-500", description: "Balance between performance and resources" },
  { value: "low", label: "Low", icon: ChevronDown, color: "text-green-600", description: "Save resources, low speed" }
];

// SET APP RUN
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

  const [options, setOptions] = useState<OptionsApiInitialInitializationState>({
    staperchangetypePHONEINFO: [],
    staperchangeUSERAGENT: [],
    staperchangetypeNAME: [],
    staperchangeCOUNTRY: [],
    staperchangeCarrier: [],
    staperchangePHONENUMBER: [],
    staperchangeEMAIL: [],
    staperchangeLANGUAGE: []
  });

  const launchOptions = {
    stlaunchListWipe: ["ListItem", "Appinfo", "Single"],
    stlaunchIDGen: ["PhoneGen", "MailGen", "Directly"],
    stlaunchIDVerify: ["Tempmail", "Hotmail", "Gmail", "Icloud", "Phone", "Client(Admin-NS)"]
  };

  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null);
  const [showModal, setShowModal] = useState(false);
  const handleMenuSelect = (key: string) => {
    const contentMap: Record<string, React.ReactNode> = {
      devices: (
        <div>Thông tin thiết bị</div>
      ),
      carrier: (
        <div>Nhà mạng</div>
      ),
      phone: (
        <div>Số điện thoại</div>
      ),
      proxylist: <PcSettingsProxyList />,
      randlist: <PcSettingsRAND />,
      wipelist: <PcSettingsWipe />,
      entitytest: <PcSettingsAPITestCase />,
      domainblack: <PcSettingsDomainBlack />,
      formatdataacccountanduploadwebsite: <PcSettingsFormatDataAndUploadWebsite />
    };
    setModalContent(contentMap[key] || null);
    setShowModal(true);
  };


  useEffect(() => {
    const initialWorkspace = stlaunchAppRuntype.find((w) => w.name === settings.launch.stlaunchAppRun) || stlaunchAppRuntype[0];
    setSelectedWorkspace(initialWorkspace);
    setMounted(true);
  }, [settings.launch.stlaunchAppRun]);

  useEffect(() => {
    async function loadOptions() {
      try {
        const response = await fetch("/api/loadOptionsInitialinitialization");
        const data = await response.json();
        setOptions(data);
      } catch (error) {
        console.error("Lỗi khi tải options:", error);
      }
    }
    loadOptions();
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
      {/* File Edit View Help*/}
      <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xs text-blue-500">
          <LucideGanttChart className="w-5 h-5" />
          Launch
          <Menubar>
            {menuItems.map((menu) => (
              <MenubarMenu key={menu.label}>
                <MenubarTrigger>{menu.label}</MenubarTrigger>
                <MenubarContent>
                  {menu.items.map((item) => (
                    <MenubarItem key={item.key} onClick={() => handleMenuSelect(item.key)}>
                      {item.label}
                    </MenubarItem>
                  ))}
                </MenubarContent>
              </MenubarMenu>
            ))}
          </Menubar>

          {/* Modal hiển thị nội dung */}
          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-xs text-muted-foreground">Config</DialogTitle>
              </DialogHeader>
              {modalContent}
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-auto">
        <Table>
          <TableBody>
            {/* loại bỏ separate boder - 0 */}
            <TableRow className="hover:bg-transparent focus:bg-transparent border-0">
              <TableCell className="flex gap-6 items-center">
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
              </TableCell>
            </TableRow>
            {/* Danh muc Run */}
            <TableRow className="hover:bg-transparent focus:bg-transparent border-0">
              <TableCell colSpan={100}> {/* Đảm bảo chiếm toàn bộ hàng */}
                <div className="flex flex-col gap-2">
                  {Object.entries(launchOptions).map(([key, values]) => (
                    <div key={key} className="bg-white p-2 rounded-md shadow-sm border border-gray-200 hover:shadow transition-all">
                      <div className="flex items-center gap-2">
                        <InfoIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">{key}:</span>
                        <span className="text-xs text-gray-500 truncate">({values.join(", ")})</span>
                      </div>
                      <Select
                        value={settings.launch[key] || values[0]}
                        onValueChange={(value) => handleChange("launch", key, value)}
                      >
                        <SelectTrigger className="w-full h-8 text-xs border-gray-300 shadow-none focus:ring-1 focus:ring-blue-400">
                          <SelectValue placeholder={values[0]} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-md rounded-md">
                          {values.map((opt) => (
                            <SelectItem key={opt} value={opt} className="text-xs p-1 hover:bg-gray-100">
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
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
                          <Button
                            variant="outline"
                            className="w-full justify-between text-sm font-medium text-gray-800 dark:text-gray-100">{key}{" "}<span className="text-blue-600 dark:text-blue-400">{values[0]}</span>
                            <ChevronDown className="w-4 h-4 opacity-70" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="w-full shadow-md rounded-lg bg-white dark:bg-gray-800 max-h-60 overflow-y-auto">
                          {values.length > 0 ? (
                            values.map((value: string) => (
                              <DropdownMenuItem
                                key={value}
                                onClick={() => setOptions((prev: OptionsApiInitialInitializationState) => ({
                                  ...prev,
                                  [key as keyof OptionsApiInitialInitializationState]: [value, ...prev[key as keyof OptionsApiInitialInitializationState].filter((v: string) => v !== value)],
                                }))}
                                className="text-sm text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-700"
                              >
                                {value}
                              </DropdownMenuItem>
                            ))
                          ) : (
                            <DropdownMenuItem disabled className="text-sm text-gray-500">
                            </DropdownMenuItem>
                          )}
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
