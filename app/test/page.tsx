"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import PcSettings from "../components/custom/pcsettings/page";

export default function TestPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Mở PC Settings</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cấu hình PC</DialogTitle>
          </DialogHeader>
          <PcSettings />
        </DialogContent>
      </Dialog>
    </div>
  );
}
