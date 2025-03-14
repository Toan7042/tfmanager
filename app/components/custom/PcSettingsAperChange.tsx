"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { UserRoundCheckIcon } from "lucide-react";

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
  handleChange: (category: keyof Settings, key: string, value: boolean) => void;
}

export default function PcsettingsAperChange({ settings, handleChange }: Props) {
  return (
    <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserRoundCheckIcon className="w-5 h-5" />
          Aper Change Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-auto">
        <Table>
          <TableBody>
            {Object.entries(settings.aperChange).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>
                  <code className="text-[13px]">{key}</code>
                </TableCell>
                <TableCell>
                  <Checkbox 
                    checked={value} 
                    onCheckedChange={(checked) => handleChange("aperChange", key, checked === true)} 
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
