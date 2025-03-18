"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, Settings, ShieldCheck } from "lucide-react";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface Settings {
  aperChange: { [key: string]: boolean };
}

interface Props {
  settings: Settings;
  handleChange: (category: keyof Settings, key: string, value: boolean) => void;
}

const aperChangeKeys = {
  "Security Settings": [
    "staperchangeBOOTLOADER",
    "staperchangeHIDEBYPASSROOT",
    "staperchangeHIDEVPN",
    "staperchangeANTITRACKING",
    "staperchangeHIDEUSBDEBUG",
    "staperchangeHIDEINSTRUMENTATION",
    "staperchangeHIDEADB",
  ],
  "Network Settings": [
    "staperchangeWIFITO4G",
    "staperchangeDNSRESOLUTION",
    "staperchangeBYPASSSERVERSIDEAI",
  ],
  "System Settings": [
    "staperchangeRELEASE",
    "staperchangeWIPEADVANCED",
    "staperchangeSTACKTRACE",
    "staperchangeGOOGLEAUTHUTIL",
    "staperchangePackageSDK",
    "staperchangeAPIGOOGLEPLAYSERVICES",
    "staperchangeEBPF",
    "staperchangeOPENGLRENDERER",
  ],
};

export default function PcsettingsAperChange({ settings, handleChange }: Props) {
  return (
    <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Aper .Inc
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-auto space-y-4">
        {Object.entries(aperChangeKeys).map(([category, keys]) => (
          <CollapsibleFilter key={category} title={category} icon={ShieldCheck}>
            <Table>
              <TableBody>
                {keys.map((key) => (
                  <TableRow key={key} className="hover:bg-transparent">
                    <TableCell>
                      <code className="text-[13px]">{key}</code>
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={settings.aperChange[key] ?? false}
                        onCheckedChange={(checked) =>
                          handleChange("aperChange", key, checked === true)
                        }
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CollapsibleFilter>
        ))}
      </CardContent>
    </Card>
  );
}

const CollapsibleFilter = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}) => (
  <Collapsible defaultOpen>
    <CollapsibleTrigger className="group flex w-full items-center justify-between py-2 text-xs font-semibold text-gray-700">
      <span className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 text-gray-500" />} {title}
      </span>
      <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180 text-gray-500" />
    </CollapsibleTrigger>
    <CollapsibleContent className="pt-1 pb-2">{children}</CollapsibleContent>
  </Collapsible>
);