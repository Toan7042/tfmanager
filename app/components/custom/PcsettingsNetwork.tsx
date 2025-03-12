"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Network } from "lucide-react";

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

const selectOptions: Record<string, string[]> = {
  stnetworkTypeNetwork: ["None", "SIM", "4G", "VPN", "ListProxy"],
  stnetworkTypeConnect: ["Aper", "CollegeProxy", "SupperProxy"],
};

export default function PcsettingsNetwork({ settings, handleChange }: Props) {
  return (
    <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="w-5 h-5" />
          Network Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-auto">
        <Table>
          <TableBody>
            {Object.entries(settings.network).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>
                  <code className="text-[13px]">{key}</code>
                </TableCell>
                <TableCell>
                  <Select value={String(value)} onValueChange={(selected) => handleChange("network", key, selected)}>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
