"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Network, Globe, Shield, ScrollText, Signal, TrainFront, Power, PowerOff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  settings: { network: Record<string, string> };
  handleChange: (category: "network", key: string, value: string) => void;
}

const networkSettings = {
  "Network Type": [
    { value: "None", label: "None", icon: Globe },
    { value: "SIM", label: "SIM", icon: Signal },
    { value: "VPN", label: "VPN", icon: Shield },
    { value: "ListProxy", label: "ListProxy", icon: ScrollText },
  ],
  "Connection Type": [
    { value: "Aper", label: "Aper", icon: TrainFront },
    { value: "CollageProxy", label: "CollageProxy", icon: TrainFront },
    { value: "SuperProxy", label: "SuperProxy", icon: TrainFront },
  ],
  "Proxy ID Verify": [
    { value: "Enable", label: "Enable", icon: Power },
    { value: "Disable", label: "Disable", icon: PowerOff },
  ],
};

export default function PcsettingsNetwork({ settings, handleChange }: Props) {
  return (
    <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
      <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xs text-blue-500">
          <Network className="w-5 h-5" />
          Network
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-auto">
        <Table className="w-full">
          <TableBody>
            <TableRow className="hover:bg-transparent focus:bg-transparent border-0">
              <TableCell colSpan={100}>
                <div className="flex flex-col gap-2">
                  {Object.entries(networkSettings).map(([label, options]) => (
                    <div key={label} className="bg-white p-2 rounded-md shadow-sm border border-gray-200 hover:shadow transition-all">
                      <div className="flex items-center gap-2">
                        <Network className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium">{label}:</span>
                        <span className="text-xs text-gray-500 truncate">
                          ({options.map((opt) => opt.label).join(", ")})
                        </span>
                      </div>
                      <Select
                        value={settings.network[label] || options[0].value}
                        onValueChange={(selected) => handleChange("network", label, selected)}
                      >
                        <SelectTrigger className="w-full h-8 text-xs border-gray-300 shadow-none focus:ring-1 focus:ring-blue-400">
                          <SelectValue placeholder={options[0].label} />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-md rounded-md">
                          {options.map(({ value, label, icon: Icon }) => (
                            <SelectItem key={value} value={value} className="text-xs p-1 hover:bg-gray-100 flex items-center gap-2">
                              <Icon className="h-4 w-4 text-muted-foreground" />
                              {label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
