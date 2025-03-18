"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Copy, MoreHorizontal } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { toast } from "sonner";
import PcSettings from "./PcSettings";
import {
    Dialog,
    DialogContentCustomPCSettings,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

// Types and table headers remain the same
export type Device = {
    pcId: string;
    name: string;
    timmer: string;
    createdDate: string;
    expirationDate: string;
    note: string;
    round: number;
    success: number;
    failed: number;
};

const devices: Device[] = [
    { pcId: "pc-001c-001c-001c-001c-001c", name: "Office PC", timmer: "00:00:00", createdDate: "2024-03-01T10:00:00Z", expirationDate: "2024-04-01T10:00:00Z", note: "Primary workstation", round: 10, success: 8, failed: 2 },
    { pcId: "pc-002", name: "Gaming Rig", timmer: "00:00:00", createdDate: "2024-02-15T10:00:00Z", expirationDate: "2025-03-20T10:00:00Z", note: "Personal use", round: 5, success: 3, failed: 2 },
];

const tableHeaders = [
    { key: "stt", label: "STT", className: "w-10" },
    { key: "pcId", label: "PC ID", className: "min-w-[200px] max-w-[400px] whitespace-nowrap overflow-auto" },
    { key: "name", label: "PC Name", className: "whitespace-nowrap" },
    { key: "timmer", label: "Timmer", className: "whitespace-nowrap" },
    { key: "round", label: "Round", className: "whitespace-nowrap" },
    { key: "success", label: "Success", className: "whitespace-nowrap" },
    { key: "failed", label: "Failed", className: "whitespace-nowrap" },
    { key: "ratio", label: "Ratio", className: "whitespace-nowrap" },
    { key: "createdDate", label: "Created Date", className: "whitespace-nowrap" },
    { key: "expirationDate", label: "Expiration Date", className: "whitespace-nowrap" },
    { key: "note", label: "Note", className: "whitespace-nowrap" },
    { key: "actions", label: "Actions", className: "w-32" },
];

// New ActionsCell component
const ActionsCell: React.FC<{ onSettingsClick: () => void }> = ({ onSettingsClick }) => (
    <TableCell>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toast.info("Edit PC ID")}>Sửa PC ID</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info("Edit PC Name")}>Sửa PC Name</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info("Edit Note")}>Sửa Note</DropdownMenuItem>
                <DropdownMenuItem onClick={onSettingsClick}>Settings</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </TableCell>
);

export default function MyDevicesTablePC() {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);

    return (
        <div className="w-full">
            <div className="rounded-md border overflow-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {tableHeaders.map((header) => (
                                <TableHead key={header.key} className={header.className}>
                                    {header.label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {devices.map((device, index) => {
                            const remaining = formatDistanceToNow(parseISO(device.expirationDate), { addSuffix: true });
                            const isExpired = remaining.includes("ago");

                            return (
                                <TableRow key={device.pcId}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell className="whitespace-nowrap overflow-x-auto max-w-[200px]">
                                        <div className="flex items-center gap-2">
                                            <span className="block truncate">{device.pcId}</span>
                                            <Button variant="ghost" size="sm" onClick={() => {
                                                navigator.clipboard.writeText(device.pcId);
                                                toast.success("Copied PC ID");
                                            }}>
                                                <Copy size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">{device.name}</TableCell>
                                    <TableCell className="whitespace-nowrap">{device.timmer}</TableCell>
                                    {(["round", "success", "failed", "ratio"] as (keyof Device | "ratio")[]).map((key, i) => (
                                        <TableCell key={i} className="whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-md ${key === "round" ? "bg-blue-500" :
                                                key === "success" ? "bg-green-500" :
                                                    key === "failed" ? "bg-red-500" : "bg-teal-500"} text-white`}>
                                                {key === "ratio"
                                                    ? `${((device.success / (device.round || 1)) * 100).toFixed(2)}%`
                                                    : device[key as keyof Device]
                                                }
                                            </span>
                                        </TableCell>
                                    ))}
                                    <TableCell className="whitespace-nowrap">{new Date(device.createdDate).toLocaleDateString()}</TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md ${isExpired ? "text-red-600 bg-red-50" : new Date(device.expirationDate).getTime() - Date.now() <= 3 * 86400000 ? "text-yellow-600 bg-yellow-50" : "text-green-600 bg-green-50"}`}>
                                            <span className={`w-2 h-2 rounded-full ${isExpired ? "bg-red-400" : new Date(device.expirationDate).getTime() - Date.now() <= 3 * 86400000 ? "bg-yellow-400" : "bg-green-400"}`}></span>
                                            <span className="font-medium">{remaining}</span>
                                        </span>
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">{device.note}</TableCell>
                                    <ActionsCell onSettingsClick={() => setIsDialogOpen(true)} />
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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