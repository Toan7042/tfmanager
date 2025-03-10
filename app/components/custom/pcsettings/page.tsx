"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";    
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import Navbar from "../../Nav";

const defaultSettings = {
    launch: {
      stlaunchAppRun: "Facebook",
      stlaunchListWipe: "ListItem",
      stlaunchIDGen: "PhoneGen",
      stlaunchIDVerify: "Tempmail",
      staperchangeNAME: ["vi_VN"],
      staperchangeCOUNTRY: ["VN"],
      staperchangePHONENUMBER: ["AS-COUNTRY"],
      staperchangeLANGUAGE: ["VN"],
      staperchangeEMAIL: ["randomvalue|@gmail.com|com.google"],
    },
    network: {
      stnetworkTypeNetwork: "None",
      stnetworkTypeConnect: "Aper",
      stnetworkListProxy: "",
      stnetworkTypeProxyForGetIDlaunchVerify: 0,
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
        staperchangeBOOTLOADER: 0,
        staperchangeRELEASE: 0,
        staperchangeWIPEADVANCED: 0,
        staperchangeHIDEBYPASSROOT: 0,
        staperchangeWIFITO4G: 0,
        staperchangeHIDEVPN: 0,
        staperchangeANTITRACKING: 0,
        staperchangeKEYGUARDMANAGER: 0,
        staperchangeSTACKTRACE: 0,
        staperchangeLOCKPATTERNUTILS: 0,
        staperchangeHIDEUSBDEBUG: 0,
        staperchangeBATTERYMANAGER: 0,
        staperchangeHIDEINSTRUMENTATION: 0,
        staperchangeHIDEINPUTMANAGER: 0,
        staperchangeHIDEACCESSIBILITYNODEINFO: 0,
        staperchangeHIDEADB: 0,
        staperchangeGOOGLEAUTHUTIL: 0,
        staperchangePackageSDK: 0,
        staperchangeAPIGOOGLEPLAYSERVICES: 0,
        staperchangeDNSRESOLUTION: 0,
        staperchangeEBPF: 0,
        staperchangeBYPASSSERVERSIDEAI: 0,
        staperchangeOPENGLRENDERER: 0
      },
    otp: {
      otpAutoFetch: true,
      otpTimeout: 60,
    },
    time: {
      timeZone: "UTC+7",
      timeSync: true,
    },
  };
  
  const selectOptions: Record<string, string[]> = {
    stnetworkTypeNetwork: ["None", "WiFi", "4G", "VPN"],
    stnetworkTypeConnect: ["Aper", "Static", "Dynamic"],
    stlaunchAppRun: ["Facebook", "Facebook Lite", "Messenger"],
    stlaunchListWipe: ["ListItem", "Appinfo", "Single"],
    stlaunchIDVerify: ["Tempmail", "Phone", "Hotmail", "Gmail", "Icloud"],
    stlaunchIDGen: ["PhoneGen", "MailGen", "Directly"],
    uploadMethod: ["POST", "GET"],
    staperchangeNAME: ["vi_VN", "en_US", "fr_FR"],
    staperchangeCOUNTRY: ["VN", "US", "FR", "JP"],
    staperchangePHONENUMBER: ["AS-COUNTRY", "RANDOM", "CUSTOM"],
    staperchangeLANGUAGE: ["US", "VN", "JP", "FR"],
    staperchangeEMAIL: [
        "randomvalue|@gmail.com|com.google",
        "randomvalue|@yahoo.com|com.yahoo",
        "randomvalue|@outlook.com|com.microsoft",
        "randomvalue|@icloud.com|com.apple",
        "randomvalue|@protonmail.com|com.proton",
        "randomvalue|@zoho.com|com.zoho",
        "randomvalue|@aol.com|com.aol",
        "randomvalue|@gmx.com|com.gmx",
        "randomvalue|@yandex.com|com.yandex",
        "randomvalue|@mail.com|com.mail",
        "randomvalue|@tutanota.com|com.tutanota",
        "randomvalue|@fastmail.com|com.fastmail",
        "randomvalue|@hushmail.com|com.hushmail",
        "randomvalue|@inbox.com|com.inbox",
        "randomvalue|@rediffmail.com|com.rediffmail",
        "randomvalue|@lycos.com|com.lycos",
        "randomvalue|@shortmail.com|com.shortmail",
        "randomvalue|@mail.ru|com.mailru",
        "randomvalue|@rambler.ru|com.rambler",
        "randomvalue|@tiscali.co.uk|com.tiscali",
        "randomvalue|@bluewin.ch|com.bluewin",
        "randomvalue|@virginmedia.com|com.virginmedia",
        "randomvalue|@btinternet.com|com.btinternet",
        "randomvalue|@att.net|com.att",
        "randomvalue|@cox.net|com.cox",
        "randomvalue|@charter.net|com.charter",
        "randomvalue|@earthlink.net|com.earthlink",
        "randomvalue|@optonline.net|com.optonline",
        "randomvalue|@verizon.net|com.verizon",
        "randomvalue|@rogers.com|com.rogers",
        "randomvalue|@shaw.ca|com.shaw",
        "randomvalue|@sympatico.ca|com.sympatico",
        "randomvalue|@bell.net|com.bell",
        "randomvalue|@naver.com|com.naver",
        "randomvalue|@daum.net|com.daum",
        "randomvalue|@qq.com|com.qq",
        "randomvalue|@163.com|com.163",
        "randomvalue|@126.com|com.126",
        "randomvalue|@sina.com|com.sina",
        "randomvalue|@sohu.com|com.sohu",
        "randomvalue|@21cn.com|com.21cn",
        "randomvalue|@tom.com|com.tom",
        "randomvalue|@yeah.net|com.yeah",
        "randomvalue|@vip.qq.com|com.vipqq",
        "randomvalue|@gmx.de|com.gmxde",
        "randomvalue|@freenet.de|com.freenet",
        "randomvalue|@web.de|com.webde",
        "randomvalue|@t-online.de|com.t-online",
        "randomvalue|@arcor.de|com.arcor",
        "randomvalue|@alice.de|com.alice",
        "randomvalue|@o2online.de|com.o2online",
        "randomvalue|@hotmail.com|com.hotmail",
        "randomvalue|@live.com|com.live",
        "randomvalue|@msn.com|com.msn"
      ],
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
              <code className="text-[13px]">{key.toUpperCase()}</code>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(settings).map(([category, values]) => (
        <TabsContent key={category} value={category}>
        <Card className="mt-3 w-[800px] h-[500px] overflow-hidden"> {/* Kích thước cố định */}
          <CardHeader>
            <CardTitle>{category.toUpperCase()} Settings</CardTitle>
          </CardHeader>
          <CardContent className="h-full overflow-auto"> {/* Nội dung có thể cuộn */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/2">Name</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
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
                      ) : key === "stnetworkListProxy" ? (
                        <Textarea
                          className="text-[13px] p-1"
                          value={String(value)}
                          onChange={(e) => handleChange(category as keyof typeof settings, key, e.target.value)}
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
          </CardContent>
        </Card>
      </TabsContent>
      
       
        ))}
      </Tabs>
    </div>
  );
}