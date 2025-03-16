"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { KeyRound } from "lucide-react";

interface Settings {
  upload: { [key: string]: string | number };
}

interface Props {
  settings: Settings;
  handleChange: (category: keyof Settings, key: string, value: string | number) => void;
}

const timeKeys = [
  "stuploadtowebsiteType",
  "stuploadtowebsiteFormat",
  "stuploadtowebsiteURL"
];

export default function PcSettingsUploadWebsite({ settings, handleChange }: Props) {
  return (
    <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="w-5 h-5" />
          Upload Website Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-auto p-4">
        <Table className="text-sm w-full">
          <TableBody>
            {timeKeys.map((key) => (
              <TableRow key={key} className="border-b">
                <TableCell className="py-2 px-3 font-medium text-gray-700">{key}</TableCell>
                <TableCell className="py-2 px-3">
                  <Input
                    type={typeof settings.upload[key] === "number" ? "number" : "text"}
                    className="w-full h-8 p-1 border rounded-md"
                    value={settings.upload[key] ?? ""}
                    onChange={(e) =>
                      handleChange("upload", key, typeof settings.upload[key] === "number"
                        ? Number(e.target.value) || 0
                        : e.target.value
                      )
                    }
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
