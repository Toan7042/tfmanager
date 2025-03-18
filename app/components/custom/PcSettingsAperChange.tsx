"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, Settings, ShieldCheck } from "lucide-react";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import FancyMultiSelect from "@/components/ui/FancyMultiSelect";

const aperChangeKeys = {
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
  "Security Settings": [
    "staperchangeBOOTLOADER",
    "staperchangeHIDEBYPASSROOT",
    "staperchangeHIDEVPN",
    "staperchangeANTITRACKING",
    "staperchangeHIDEUSBDEBUG",
    "staperchangeHIDEINSTRUMENTATION",
    "staperchangeHIDEADB",
  ],
};

// ✅ Định nghĩa Props
interface Props {
  handleChange: (category: string, values: Record<string, string[]>) => void;
}

export default function PcsettingsAperChange({ handleChange }: Props) {
  const [selectedSettings, setSelectedSettings] = useState<{ [key: string]: string[] }>({});
  const allSelectedItems = Object.values(selectedSettings).flat();
  const [showModal, setShowModal] = useState(false);

  return (
    <Card className="mt-3 w-[800px] h-[500px] overflow-hidden">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          AperChange Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full overflow-auto space-y-4">
        {/* ✅ Nút mở dialog hiển thị danh sách đã chọn */}
        <Button
          variant="outline"
          className="w-full text-xs"
          onClick={() => setShowModal(true)}
        >
          List of properties that have been activated
        </Button>

        {/* ✅ Dialog hiển thị danh sách đã chọn */}
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="max-w-md w-full max-h-[400px] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-sm text-muted-foreground">
                Selected Items
              </DialogTitle>
            </DialogHeader>
            {/* ✅ Đặt chiều cao cố định và bật thanh cuộn khi nội dung vượt quá */}
            <div className="space-y-2 max-h-[300px] overflow-auto">
              {allSelectedItems.length > 0 ? (
                allSelectedItems.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 px-3 py-2 rounded-md text-sm"
                  >
                    ✅ {item} is Enable!
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center">
                  Empty list of properties that have been activated, enable the change
                  information feature to avoid detection
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        {/* ✅ Danh sách các danh mục */}
        {Object.entries(aperChangeKeys).map(([category, keys]) => {
          const selectedKeys = selectedSettings[category] || [];
          return (
            <CollapsibleFilter key={category} title={category} icon={ShieldCheck}>
              <FancyMultiSelect
                options={keys
                  .filter((key) => !selectedKeys.includes(key))
                  .map((key) => ({ label: key, value: key }))}
                selected={selectedKeys.map((key) => ({ label: key, value: key }))}
                onChange={(newKeys) => {
                  const values = newKeys.map((item) => item.value);
                  handleChange("aperChange", { ...selectedSettings, [category]: values });
                  setSelectedSettings((prev) => ({ ...prev, [category]: values }));
                }}
              />
            </CollapsibleFilter>
          );
        })}
      </CardContent>
    </Card>
  );
}

// ✅ Component CollapsibleFilter giữ nguyên
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
