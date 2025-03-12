import * as React from "react";
import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";

const rawData = [
  { id: "1", website: "https://sptmail.com", category: "gmail", api_value: "HR3UL9TMGYP22MZO*facebook" },
  { id: "2", website: "https://thueotp.site", category: "gmail", api_value: "LdRgpTaAruqhJjIGtVyMPcFxnYDNZWCkbziUKOEv*facebook" },
  { id: "3", website: "http://sellotpvn.com", category: "gmail", api_value: "884a6af67b9031badfb013907dfe56*facebook" },
  { id: "4", website: "https://rentgmail.online", category: "gmail", api_value: "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGllbmNrYW5ra3VuIiwidXVpZCI6ImFsd2F5cy0xNTI3IiwidXNlcmlkIjoiMTUyNyJ9.9n9abJZD7da6Sv4ajXg-HHyuPi7Ro5bMp19iBydARPhW1OBBPSuGkCYWf-ZRx5H2SMcGEjIlvfZa1QON-YaReg*facebookall" },
  { id: "5", website: "https://gm.haivl.wtf", category: "gmail", api_value: "R2zH0tOQaZEXG5cCJrqBLzM2OOdTBvq3ZzJmudGrmg*FACEBOOK" },
  { id: "6", website: "https://unlimitmail.com", category: "hotmail", api_value: "bqd3xtd4jb2fxvmurmt7wab1r4ysdlubbvrom26j4k2fhdq2egzcxo5aibkbsoed4nicly1730648074*5" },
  { id: "7", website: "https://dongvanfb.net", category: "hotmail", api_value: "9Bxvs1jsh4plD6KUEGuv20mSm*2" },
  { id: "8", website: "https://muamail.store", category: "hotmail", api_value: "c3c596363f3f5d3595cdcf43b64171fb4c734fd1*6" },
  { id: "9", website: "https://emailfake.com", category: "tempmail", api_value: "None" },
  { id: "10", website: "https://www.1secmail.com", category: "tempmail", api_value: "None" },
  { id: "11", website: "https://tempmail.lol", category: "tempmail", api_value: "None" },
  { id: "12", website: "https://temp-mail.io", category: "tempmail", api_value: "None" },
  { id: "13", website: "https://temp-mail.org", category: "tempmail", api_value: "None" },
  { id: "14", website: "https://temporarymail.com", category: "tempmail", api_value: "None" },
  { id: "15", website: "https://generator.email", category: "tempmail", api_value: "None" },
  { id: "16", website: "https://inboxes.com", category: "tempmail", api_value: "None" },
  { id: "17", website: "https://tempm.com", category: "tempmail", api_value: "None" },
  { id: "18", website: "https://www.uocnv.com", category: "tempmail", api_value: "None" },
  { id: "19", website: "https://thuesim.app", category: "phone", api_value: "884a6af67b9031badfb013907dfe56*facebook5" },
  { id: "20", website: "https://fbapi.live", category: "phone", api_value: "N3ZTRlpSL3FIQ1Zpb280Ym41TlRFZkk1c1ltTzBqc3JudWZyeFNYN2VIVmNkZlcrRUhDcTVVaEIvb1pZRGN5cw*facebook" },
  { id: "21", website: "https://fbtaxi.shop", category: "phone", api_value: "FB" },
  { id: "22", website: "https://usotp.xyz", category: "phone", api_value: "DxqjNWEOxL4y5ZjTaseGsq6GnBWQ7QaF*facebook5" },
  { id: "23", website: "https://cubemmo.net", category: "icloud", api_value: "f2d12de411dbcb4f7d22a7ac0aebac0b64a7d63b572dea385f6969913c14ee0d*5" },
];

const countCategory = (category: string) => rawData.filter(item => item.category === category).length;

const sortDataByCategory = (data: { id: string; website: string; category: string; api_value: string }[]) => {
  return [...data].sort((a, b) => a.category.localeCompare(b.category));
};

export default function PcsettingsOTP() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortedData, setSortedData] = useState(sortDataByCategory(rawData));
  const [editItem, setEditItem] = useState<{ id: string; website: string; category: string; api_value: string } | null>(null);

  const filteredData = selectedCategory !== "all" ? sortedData.filter((item) => item.category === selectedCategory) : sortedData;
  const categories = Array.from(new Set(rawData.map((item) => item.category))).sort();

  const saveEdit = () => {
    if (editItem) {
      const newData = sortedData.map((item) => item.id === editItem.id ? { ...item, api_value: editItem.api_value } : item);
      setSortedData(sortDataByCategory(newData));
      setEditItem(null);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 py-2">
        <Select onValueChange={(value) => setSelectedCategory(value)} value={selectedCategory}>
          <SelectTrigger className="min-w-0 w-auto h-8 text-sm">
            <SelectValue placeholder="Chọn danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              Tất cả <Badge className="ml-2 bg-gray-200 text-gray-700">{rawData.length}</Badge>
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat} <Badge className="ml-2 bg-gray-200 text-gray-700">{countCategory(cat)}</Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="rounded-md border text-sm overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">STT</TableHead>
              <TableHead className="w-[50px]">Thao tác</TableHead>
              <TableHead className="w-[100px]">Danh mục</TableHead>
              <TableHead className="max-w-[200px] overflow-auto whitespace-nowrap">Website</TableHead>
              <TableHead className="max-w-[300px] overflow-auto whitespace-nowrap">API Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">
                    <Button variant="ghost" size="icon" onClick={() => setEditItem(item)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="max-w-[200px] overflow-auto whitespace-nowrap">{item.website}</TableCell>
                  <TableCell className="max-w-[300px] overflow-auto whitespace-nowrap">{item.api_value}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">Không có dữ liệu.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {editItem && (
        <Dialog open={!!editItem} onOpenChange={(open) => !open && setEditItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-sm font-medium">API Value</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={editItem.api_value}
                onChange={(e) => setEditItem({ ...editItem, api_value: e.target.value })}
              />
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setEditItem(null)}>Hủy</Button>
              <Button onClick={saveEdit}>Lưu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}