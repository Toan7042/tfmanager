// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogTrigger, DialogContentCustomPCSettings, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// // import PcSettings from "../components/custom/pcsettings/page";
// import PcSettings from "../components/custom/pcsettings/page";

// export default function TestPage() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="p-4">
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button onClick={() => setOpen(true)}>Mở PC Settings</Button>
//         </DialogTrigger>
//         <DialogContentCustomPCSettings>
//         <DialogHeader>
//             <DialogTitle>PC SETTINGS</DialogTitle>
//           </DialogHeader>
//           <PcSettings />
//         </DialogContentCustomPCSettings>
//       </Dialog>
//     </div>
//   );
// }
"use client";
import PcSettings from "../components/custom/pcsettings/page";

export default function TestPage() {
  return (
    <div>
        <PcSettings />
    </div>
  );
}
