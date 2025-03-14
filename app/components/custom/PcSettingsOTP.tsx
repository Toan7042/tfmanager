import * as React from "react";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { KeyRound, MoreVertical } from "lucide-react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

interface DataItem {
  id: string;
  website: string;
  category: string;
  api_value: string;
  default: boolean;
}

const rawData: DataItem[] = [
  { id: "1", website: "https://sptmail.com", category: "gmail", api_value: "HR3UL9TMGYP22MZO*facebook", default: true },
  { id: "2", website: "https://thueotp.site", category: "gmail", api_value: "LdRgpTaAruqhJjIGtVyMPcFxnYDNZWCkbziUKOEv*facebook", default: false },
  { id: "3", website: "http://sellotpvn.com", category: "gmail", api_value: "884a6af67b9031badfb013907dfe56*facebook", default: false },
  { id: "4", website: "https://rentgmail.online", category: "gmail", api_value: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGllbmNrYW5ra3VuIiwidXVpZCI6ImFsd2F5cy0xNTI3IiwidXNlcmlkIjoiMTUyNyJ9.9n9abJZD7da6Sv4ajXg-HHyuPi7Ro5bMp19iBydARPhW1OBBPSuGkCYWf-ZRx5H2SMcGEjIlvfZa1QON-YaReg*facebookall", default: false },
  { id: "5", website: "https://gm.haivl.wtf", category: "gmail", api_value: "R2zH0tOQaZEXG5cCJrqBLzM2OOdTBvq3ZzJmudGrmg*FACEBOOK", default: false },
  { id: "6", website: "https://unlimitmail.com", category: "hotmail", api_value: "bqd3xtd4jb2fxvmurmt7wab1r4ysdlubbvrom26j4k2fhdq2egzcxo5aibkbsoed4nicly1730648074*5", default: false },
  { id: "7", website: "https://dongvanfb.net", category: "hotmail", api_value: "9Bxvs1jsh4plD6KUEGuv20mSm*2", default: true },
  { id: "8", website: "https://muamail.store", category: "hotmail", api_value: "c3c596363f3f5d3595cdcf43b64171fb4c734fd1*6", default: false },
  { id: "9", website: "https://emailfake.com", category: "tempmail", api_value: "None", default: true },
  { id: "10", website: "https://www.1secmail.com", category: "tempmail", api_value: "None", default: false },
  { id: "11", website: "https://tempmail.lol", category: "tempmail", api_value: "None", default: false },
  { id: "12", website: "https://temp-mail.io", category: "tempmail", api_value: "None", default: false },
  { id: "13", website: "https://temp-mail.org", category: "tempmail", api_value: "None", default: false },
  { id: "14", website: "https://temporarymail.com", category: "tempmail", api_value: "None", default: false },
  { id: "15", website: "https://generator.email", category: "tempmail", api_value: "None", default: false },
  { id: "16", website: "https://inboxes.com", category: "tempmail", api_value: "None", default: false },
  { id: "17", website: "https://tempm.com", category: "tempmail", api_value: "None", default: false },
  { id: "18", website: "https://www.uocnv.com", category: "tempmail", api_value: "None", default: false },
  { id: "19", website: "https://thuesim.app", category: "phone", api_value: "884a6af67b9031badfb013907dfe56*facebook5", default: true },
  { id: "20", website: "https://fbapi.live", category: "phone", api_value: "N3ZTRlpSL3FIQ1Zpb280Ym41TlRFZkk1c1ltTzBqc3JudWZyeFNYN2VIVmNkZlcrRUhDcTVVaEIvb1pZRGN5cw*facebook", default: false },
  { id: "21", website: "https://fbtaxi.shop", category: "phone", api_value: "FB", default: false },
  { id: "22", website: "https://usotp.xyz", category: "phone", api_value: "DxqjNWEOxL4y5ZjTaseGsq6GnBWQ7QaF*facebook5", default: false },
  { id: "23", website: "https://cubemmo.net", category: "icloud", api_value: "f2d12de411dbcb4f7d22a7ac0aebac0b64a7d63b572dea385f6969913c14ee0d*5", default: true },
];

const countCategory = (category: string) => rawData.filter((item) => item.category === category).length;
const sortDataByCategory = (data: DataItem[]) => [...data].sort((a, b) => a.category.localeCompare(b.category));

interface Settings {
  launch: {
    stlaunchAppRun: string;
    stlaunchListWipe: string;
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
export default function PcsettingsOTP({ handleChange }: Props) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortedData, setSortedData] = useState<DataItem[]>(sortDataByCategory(rawData));
  const [editItem, setEditItem] = useState<DataItem | null>(null);

  const filteredData = selectedCategory !== "all" ? sortedData.filter((item) => item.category === selectedCategory) : sortedData;
  const categories = Array.from(new Set(rawData.map((item) => item.category))).sort();

  const saveEdit = () => {
    if (editItem) {
      const newData = sortedData.map((item) => item.id === editItem.id ? { ...item, api_value: editItem.api_value } : item);
      setSortedData(sortDataByCategory(newData));
      setEditItem(null);
      handleChange("otp", "stotpGmail", editItem.api_value);
    }
  };

  const setDefault = (id: string, category: string) => {
    const newData = sortedData.map((item) =>
      item.category === category ? { ...item, default: item.id === id } : item
    );
    setSortedData(sortDataByCategory(newData));
  };

  return (
    <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="w-5 h-5" />
          Time Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-auto">
        <div className="w-full">
          <div className="flex items-center gap-2 py-2">
            <Select onValueChange={(value) => setSelectedCategory(value)} value={selectedCategory}>
              <SelectTrigger className="min-w-0 w-auto h-8 text-sm">
                <SelectValue placeholder="Chọn danh mục" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">
                  Tất cả <Badge className="ml-2 bg-gray-200 text-gray-700 hover:bg-gray-200 hover:text-gray-700">{rawData.length}</Badge>
                </SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat} <Badge className="ml-2 bg-gray-200 text-gray-700 hover:bg-gray-200 hover:text-gray-700">{countCategory(cat)}</Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-md border text-sm overflow-auto" style={{ maxHeight: "350px" }}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">STT</TableHead>
                  <TableHead className="w-[50px]">Thao tác</TableHead>
                  <TableHead className="w-[100px]">Danh mục</TableHead>
                  <TableHead className="max-w-[200px] overflow-auto whitespace-nowrap">Website</TableHead>
                  <TableHead className="max-w-[300px] overflow-auto whitespace-nowrap">API Value*TypeService</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button  variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem onClick={() => setEditItem(item)}>Chỉnh sửa</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setDefault(item.id, item.category)}>
                              Đặt mặc định
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell className={`max-w-[200px] overflow-auto whitespace-nowrap ${item.default ? "text-blue-600" : ""}`}>{item.website}</TableCell>
                      <TableCell className="max-w-[300px] overflow-auto whitespace-nowrap">{item.api_value}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4"></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {editItem && (
            <Dialog open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-sm font-medium">API Value*TypeService</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input value={editItem.api_value} onChange={(e) => setEditItem({ ...editItem, api_value: e.target.value })} />
                </div>
                <DialogFooter>
                  <Button variant="secondary" onClick={() => setEditItem(null)}>Hủy</Button>
                  <Button onClick={saveEdit}>Lưu</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
