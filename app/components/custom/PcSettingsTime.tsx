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

// Nhóm thời gian (mili giây), (giây), (lượt)
const timeKeysMilliseconds = [
  "sttimeDelayClickSignUP",
  "sttimeOutMethodScriptSignUP",
  "sttimeOutMethodScriptCheckSignUP",
  "sttimeOutMethodScriptVerify",
  "sttimeOutMethodScriptUpAvatar",
];

const timeKeysSeconds = ["sttimeDelayBeforeOpenApp", "sttimeDelayAfterOpenApp"];

const timeKeysAttempts = ["sttimeTryAgainSendOTP"]; // Đơn vị là lượt

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
        <Table>
          <TableBody>
            {/* Nhóm đơn vị mili giây */}
            {timeKeysMilliseconds.map((key) => (
              <TableRow key={key} className="border-b hover:bg-transparent focus:bg-transparent border-0">
                <TableCell className="text-xs font-medium text-black-600">{key}</TableCell>
                <TableCell className="py-2 px-3 flex items-center gap-2">
                  <Input
                    type="number"
                    className="w-20 h-7 text-sm text-black-600 text-center p-1 border rounded-md"
                    value={settings.time[key] ?? 0}
                    onChange={(e) => handleChange("time", key, Number(e.target.value) || 0)}
                  />
                  <span className="text-xs text-black-500">milliseconds</span>
                </TableCell>
              </TableRow>
            ))}

            {/* Nhóm đơn vị giây */}
            {timeKeysSeconds.map((key) => (
              <TableRow key={key} className="border-b hover:bg-transparent focus:bg-transparent border-0">
                <TableCell className="text-xs font-medium text-black-600">{key}</TableCell>
                <TableCell className="py-2 px-3 flex items-center gap-2">
                  <Input
                    type="number"
                    className="w-20 h-7 text-sm text-black-600 text-center p-1 border rounded-md"
                    value={settings.time[key] ?? 0}
                    onChange={(e) => handleChange("time", key, Number(e.target.value) || 0)}
                  />
                  <span className="text-xs text-black-500">seconds</span>
                </TableCell>
              </TableRow>
            ))}

            {/* Nhóm đơn vị lượt */}
            {timeKeysAttempts.map((key) => (
              <TableRow key={key} className="border-b hover:bg-transparent focus:bg-transparent border-0">
                <TableCell className="text-xs font-medium text-black-600">{key}</TableCell>
                <TableCell className="py-2 px-3 flex items-center gap-2">
                  <Input
                    type="number"
                    className="w-20 h-7 text-sm text-black-600 text-center p-1 border rounded-md"
                    value={settings.time[key] ?? 0}
                    onChange={(e) => handleChange("time", key, Number(e.target.value) || 0)}
                  />
                  <span className="text-xs text-black-500">attempts</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
