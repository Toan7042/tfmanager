"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock } from "lucide-react";

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

export default function PcsettingsTime({ settings, handleChange }: Props) {
  return (
    <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Time Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-auto">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Time Zone</TableCell>
              <TableCell>
                <input type="text" value={settings.time.timeZone} onChange={(e) => handleChange("time", "timeZone", e.target.value)} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Time Sync</TableCell>
              <TableCell>
                <Checkbox checked={settings.time.timeSync} onCheckedChange={(checked) => handleChange("time", "timeSync", checked)} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
