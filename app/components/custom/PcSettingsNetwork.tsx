"use client";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Network, CircleCheck, Globe, Shield, ScrollText, Signal, TrainFront } from "lucide-react";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { cn } from "@/lib/utils";

interface Props {
  settings: { network: Record<string, string> };
  handleChange: (category: "network", key: string, value: string) => void;
}

const networkSettings = [
  { key: "stnetworkTypeNetwork", options: [
    { value: "None", label: "None", description: "No network connection", icon: Globe },
    { value: "SIM", label: "SIM", description: "Use SIM data", icon: Signal },
    { value: "VPN", label: "VPN", description: "Use VPN service", icon: Shield },
    { value: "ListProxy", label: "ListProxy", description: "Use a proxy list", icon: ScrollText },
  ]},
  { key: "stnetworkTypeConnect", options: [
    { value: "Aper", label: "Aper", description: "Use Aper.Inc to connect proxy", icon: TrainFront },
    { value: "CollageProxy", label: "CollageProxy", description: "Use CollageProxyApp to connect proxy", icon: TrainFront  },
    { value: "SuperProxy", label: "SuperProxy", description: "Use SuperProxyApp to connect proxy", icon: TrainFront  }
  ]}
];

export default function PcsettingsNetwork({ settings, handleChange }: Props) {
  return (
    <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Network className="w-5 h-5" />
          Network
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-auto space-y-6">
        {networkSettings.map(({ key, options }) => (
          <Table key={key}>
            <TableBody>
              <TableRow className="hover:bg-transparent">
              <TableCell className="pointer-events-none select-none align-middle w-[200px]">
                    <code className="text-[13px]">{key}</code>
                  </TableCell>
                  <TableCell className="align-middle">
                  <RadioGroup.Root
                    className="grid grid-cols-4 gap-2"
                    value={settings.network[key as keyof typeof settings.network] as string}
                    onValueChange={(selected) =>
                      handleChange("network", key, selected)
                    }
                  >
                    {options.map(({ value, label, icon: Icon }) => (
                      <RadioGroup.Item
                        key={value}
                        value={value}
                        className={cn(
                          "relative group ring-1 ring-border rounded p-1 text-center text-xs",
                          "hover:bg-gray-100 focus:outline-none",
                          "data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500"
                        )}
                      >
                        <CircleCheck className="absolute top-0 right-0 h-4 w-4 text-primary fill-blue-500 stroke-white group-data-[state=unchecked]:hidden" />
                        <Icon className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                        <span className="font-medium">{label}</span>
                      </RadioGroup.Item>
                    ))}
                  </RadioGroup.Root>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        ))}
      </CardContent>
    </Card>
  );
}