"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

interface Settings {
  time: { [key: string]: number };
}

interface Props {
  settings: Settings;
  handleChange: (category: keyof Settings, key: string, value: number | string | boolean) => void;
}

const timeKeys = [
  "sttimeDelayBeforeOpenApp", "sttimeDelayAfterOpenApp", "sttimeDelayClickSignUP",
  "sttimeOutMethodScriptSignUP", "sttimeOutMethodScriptCheckSignUP",
  "sttimeOutMethodScriptVerify", "sttimeOutMethodScriptUpAvatar", "sttimeTryAgainSendOTP"
];

export default function PcSettingsTime({ settings, handleChange }: Props) {
  return (
    <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Time
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-auto p-4">
        <Table className="text-[13px] w-full"> 
          <TableBody>
            {timeKeys.map((key) => (
              <TableRow key={key} className="border-b">
                <TableCell>{key}</TableCell>
                <TableCell className="py-2 px-3">
                  <Input
                    type="number"
                    className="w-20 h-8 text-center p-1 border rounded-md"
                    value={settings.time[key] ?? 0} // Fix lỗi undefined
                    onChange={(e) => handleChange("time", key, Number(e.target.value) || 0)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
