"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContentCustomPCSettings, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PcSettings from "../components/custom/PcSettings";


export default function TestPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Mở PC Settings</Button>
        </DialogTrigger>
        <DialogContentCustomPCSettings>
        <DialogHeader>
            <DialogTitle>PC SETTINGS</DialogTitle>
          </DialogHeader>
          <PcSettings />
        </DialogContentCustomPCSettings>
      </Dialog>
    </div>
  );
}


// "use client";
// import PcSettings from "../components/custom/pcsettings";

// export default function TestPage() {
//   return (
//     <div>
//         <PcSettings />
//     </div>
//   );
// }


// "use client";
// import PcSettings from "../components/custom/PcSettings";
// const TestPage = () => {
//   return (
//     <main className="p-6">
//     <h1 className="text-2xl font-bold mb-4">Quản lý danh sách A, B, C</h1>
//     <PcSettings />
//   </main>
//   );
// };

// export default TestPage;
