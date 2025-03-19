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
import { Copy, MoreHorizontal, ArrowUp, ArrowDown, Search, Edit, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";
import { toast } from "sonner";
import PcSettings from "./PcSettings";
import {
    Dialog,
    DialogContentCustomPCSettings,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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

// Hàm tạo dữ liệu ngẫu nhiên cho 100 dòng
const generateInitialDevices = (): Device[] => {
    return Array.from({ length: 100 }, (_, index) => {
        const id = index + 1;
        const randomDaysForCreation = Math.floor(Math.random() * 365) - 182; // ±6 tháng từ hiện tại
        const createdDate = new Date(Date.now() + randomDaysForCreation * 24 * 60 * 60 * 1000);
        const randomDaysForExpiration = Math.floor(Math.random() * 730) - 365; // ±1 năm từ ngày tạo
        const expirationDate = new Date(createdDate.getTime() + randomDaysForExpiration * 24 * 60 * 60 * 1000);
        const round = Math.floor(Math.random() * 50); // 0-49 rounds
        const success = Math.floor(Math.random() * round); // 0 đến round
        const failed = round - success;

        return {
            pcId: `PC${String(id).padStart(4, "0")}`,
            name: `Device ${id}`,
            timmer: `${Math.floor(Math.random() * 60)}s`, // 0-59 giây
            createdDate: createdDate.toISOString(),
            expirationDate: expirationDate.toISOString(),
            note: `Note for device ${id}`,
            round,
            success,
            failed,
        };
    });
};

const tableHeaders = [
    { key: "checkbox", label: "", className: "w-10" },
    { key: "index", label: "Index", className: "w-10" },
    { key: "move", label: "Move", className: "w-20" },
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

export default function MyDevicesTablePC() {
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
    const [isBatchUpdateDialogOpen, setIsBatchUpdateDialogOpen] = React.useState(false);
    const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
    const [devicesState, setDevicesState] = React.useState<Device[]>([]); // Khởi tạo rỗng
    const [tempDevice, setTempDevice] = React.useState<Device | null>(null);
    const [selectedDevices, setSelectedDevices] = React.useState<Set<number>>(new Set());
    const [searchTerm, setSearchTerm] = React.useState("");
    const [filterType, setFilterType] = React.useState<string>("all");
    const [sortOrder, setSortOrder] = React.useState<string>("expirationAsc");
    const [batchUpdateText, setBatchUpdateText] = React.useState("");
    const [batchUpdateField, setBatchUpdateField] = React.useState<"pcId" | "name" | "note">("pcId");
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 50;

    // Khởi tạo dữ liệu trên client-side sau khi mount
    React.useEffect(() => {
        setDevicesState(generateInitialDevices());
    }, []);

    const filteredDevices = React.useMemo(() => {
        let result = [...devicesState];

        if (searchTerm) {
            result = result.filter(device =>
                device.pcId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                device.note.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        const now = Date.now();
        switch (filterType) {
            case "expired":
                result = result.filter(d => new Date(d.expirationDate).getTime() < now);
                break;
            case "active":
                result = result.filter(d => new Date(d.expirationDate).getTime() > now);
                break;
            case "nearExpiration":
                result = result.filter(d => {
                    const expTime = new Date(d.expirationDate).getTime();
                    return expTime > now && expTime - now <= 3 * 86400000; // 3 ngày
                });
                break;
        }

        switch (sortOrder) {
            case "createdDate":
                result.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
                break;
            case "name":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "pcId":
                result.sort((a, b) => a.pcId.localeCompare(b.pcId));
                break;
            case "expirationAsc":
                result.sort((a, b) => new Date(a.expirationDate).getTime() - new Date(b.expirationDate).getTime());
                break;
            case "expirationDesc":
                result.sort((a, b) => new Date(b.expirationDate).getTime() - new Date(a.expirationDate).getTime());
                break;
        }

        return result;
    }, [devicesState, searchTerm, filterType, sortOrder]);

    const paginatedDevices = React.useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredDevices.slice(startIndex, endIndex);
    }, [filteredDevices, currentPage]);

    const totalPages = Math.ceil(filteredDevices.length / itemsPerPage);

    const handleEdit = (index: number) => {
        setEditingIndex(index);
        setTempDevice(devicesState[index]);
        setIsEditDialogOpen(true);
    };

    const handleSave = () => {
        if (editingIndex !== null && tempDevice) {
            const newDevices = [...devicesState];
            newDevices[editingIndex] = tempDevice;
            setDevicesState(newDevices);
            setIsEditDialogOpen(false);
        }
    };

    const handleMoveUp = (index: number) => {
        setDevicesState((prev) => {
            const newDevices = [...prev];
            const filteredIndex = filteredDevices.indexOf(newDevices[index]);
            if (filteredIndex > 0) {
                const prevIndex = prev.indexOf(filteredDevices[filteredIndex - 1]);
                [newDevices[index], newDevices[prevIndex]] = [newDevices[prevIndex], newDevices[index]];
            }
            return newDevices;
        });
    };

    const handleMoveDown = (index: number) => {
        setDevicesState((prev) => {
            const newDevices = [...prev];
            const filteredIndex = filteredDevices.indexOf(newDevices[index]);
            if (filteredIndex < filteredDevices.length - 1) {
                const nextIndex = prev.indexOf(filteredDevices[filteredIndex + 1]);
                [newDevices[index], newDevices[nextIndex]] = [newDevices[nextIndex], newDevices[index]];
            }
            return newDevices;
        });
    };

    const handleCheckboxChange = (index: number) => {
        const newSelectedDevices = new Set(selectedDevices);
        if (newSelectedDevices.has(index)) {
            newSelectedDevices.delete(index);
        } else {
            newSelectedDevices.add(index);
        }
        setSelectedDevices(newSelectedDevices);
    };

    const handleSelectAll = () => {
        if (selectedDevices.size === paginatedDevices.length) {
            setSelectedDevices(new Set());
        } else {
            const allIndices = paginatedDevices.map((_, idx) => devicesState.indexOf(paginatedDevices[idx]));
            setSelectedDevices(new Set(allIndices));
        }
    };

    const handleReload = () => {
        setDevicesState(generateInitialDevices());
        setSelectedDevices(new Set());
        setSearchTerm("");
        setFilterType("all");
        setSortOrder("expirationAsc");
        setCurrentPage(1);
        toast.success("Data reloaded successfully");
    };

    const handleBatchUpdate = (field: "pcId" | "name" | "note") => {
        setBatchUpdateField(field);
        const selected = Array.from(selectedDevices).map(index => devicesState[index]);
        const text = selected.map(d => d[field]).join('\n');
        setBatchUpdateText(text);
        setIsBatchUpdateDialogOpen(true);
    };

    const handleBatchSave = () => {
        const lines = batchUpdateText.split('\n').filter(Boolean);
        const newDevices = [...devicesState];

        lines.forEach((value, idx) => {
            const deviceIndex = Array.from(selectedDevices)[idx];
            if (deviceIndex !== undefined) {
                newDevices[deviceIndex] = {
                    ...newDevices[deviceIndex],
                    [batchUpdateField]: value.trim(),
                };
            }
        });

        setDevicesState(newDevices);
        setIsBatchUpdateDialogOpen(false);
        setSelectedDevices(new Set());
        toast.success(`Batch updated ${batchUpdateField} successfully`);
    };

    const handleBatchChange = (e: { target: { value: string } }) => {
        const newText = e.target.value;
        setBatchUpdateText(newText);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        setSelectedDevices(new Set());
    };

    return (
        <div className="w-full flex flex-col">
            {/* Phần điều khiển (alert, reload, edit, search, filter, pagination) */}
            <div className="mb-4 flex flex-wrap gap-4 items-center">
                <Alert className="border-amber-500/50 text-amber-500 dark:border-amber-500 [&>svg]:text-amber-500">
                    <AlertTitle>Proceed with Caution</AlertTitle>
                    <AlertDescription>PC devices that are more than 3 months expired will be automatically deleted.</AlertDescription>
                </Alert>
                <Button variant="secondary" className="shrink-0 p-2" onClick={handleReload} title="Reload data">
                    <RefreshCw size={16} />
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            type="submit"
                            variant="secondary"
                            disabled={selectedDevices.size === 0}
                            className="shrink-0 p-2"
                        >
                            <Edit size={16} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleBatchUpdate("pcId")}>Multi Update PC ID</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBatchUpdate("name")}>Multi Update Name</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleBatchUpdate("note")}>Multi Update Note</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                        placeholder="Search for device..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 w-full text-xs text-muted-foreground"
                    />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-auto min-w-[200px] shrink-0">
                        <SelectValue placeholder="Lọc thiết bị" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="nearExpiration">Near expiration</SelectItem>
                    </SelectContent>
                </Select>
                <Select value={sortOrder} onValueChange={(value) => setSortOrder(value)}>
                    <SelectTrigger className="w-auto min-w-[150px] shrink-0">
                        <SelectValue placeholder="Sắp xếp" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="createdDate">Created Date</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                        <SelectItem value="pcId">PC ID</SelectItem>
                        <SelectItem value="expirationAsc">Expiry date: ascending</SelectItem>
                        <SelectItem value="expirationDesc">Expiry date: descending</SelectItem>
                    </SelectContent>
                </Select>
                {/* Phần phân trang với icon */}
                <div className="flex items-center gap-2 shrink-0">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2"
                    >
                        <ChevronLeft size={16} />
                    </Button>
                    <span className="text-sm whitespace-nowrap">
                        {currentPage}/{totalPages} ({filteredDevices.length})
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2"
                    >
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>

            {/* Bảng với thanh cuộn dọc */}
            <div className="flex-1 overflow-y-auto rounded-md border" style={{ maxHeight: "calc(102vh - 470px)" }}>
                <Table className="min-w-full">
                    <TableHeader>
                        <TableRow>
                            {tableHeaders.map((header) => (
                                <TableHead key={header.key} className={header.className}>
                                    {header.key === "checkbox" ? (
                                        <input
                                            type="checkbox"
                                            checked={selectedDevices.size === paginatedDevices.length && paginatedDevices.length > 0}
                                            onChange={handleSelectAll}
                                        />
                                    ) : (
                                        header.label
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedDevices.map((device, index) => {
                            const originalIndex = devicesState.indexOf(device);
                            const remaining = formatDistanceToNow(parseISO(device.expirationDate), { addSuffix: true });
                            const isExpired = remaining.includes("ago");

                            return (
                                <TableRow key={originalIndex}>
                                    <TableCell>
                                        <input
                                            type="checkbox"
                                            checked={selectedDevices.has(originalIndex)}
                                            onChange={() => handleCheckboxChange(originalIndex)}
                                        />
                                    </TableCell>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleMoveUp(originalIndex)}
                                                disabled={filteredDevices.indexOf(device) === 0}
                                            >
                                                <ArrowUp size={16} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleMoveDown(originalIndex)}
                                                disabled={filteredDevices.indexOf(device) === filteredDevices.length - 1}
                                            >
                                                <ArrowDown size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap overflow-x-auto max-w-[200px]">
                                        <div className="flex items-center gap-2">
                                            <span className="block truncate">{device.pcId}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(device.pcId);
                                                    toast.success("Copied PC ID");
                                                }}
                                            >
                                                <Copy size={16} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">{device.name}</TableCell>
                                    <TableCell className="whitespace-nowrap">{device.timmer}</TableCell>
                                    {(["round", "success", "failed", "ratio"] as (keyof Device | "ratio")[]).map((key, i) => (
                                        <TableCell key={i} className="whitespace-nowrap">
                                            <span
                                                className={`px-2 py-1 rounded-md ${key === "round"
                                                        ? "bg-blue-500"
                                                        : key === "success"
                                                            ? "bg-green-500"
                                                            : key === "failed"
                                                                ? "bg-red-500"
                                                                : "bg-teal-500"
                                                    } text-white`}
                                            >
                                                {key === "ratio"
                                                    ? `${((device.success / (device.round || 1)) * 100).toFixed(2)}%`
                                                    : device[key as keyof Device]}
                                            </span>
                                        </TableCell>
                                    ))}
                                    <TableCell className="whitespace-nowrap">
                                        {new Date(device.createdDate).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md ${isExpired
                                                    ? "text-red-600 bg-red-50"
                                                    : new Date(device.expirationDate).getTime() - Date.now() <= 3 * 86400000
                                                        ? "text-yellow-600 bg-yellow-50"
                                                        : "text-green-600 bg-green-50"
                                                }`}
                                        >
                                            <span
                                                className={`w-2 h-2 rounded-full ${isExpired
                                                        ? "bg-red-400"
                                                        : new Date(device.expirationDate).getTime() - Date.now() <= 3 * 86400000
                                                            ? "bg-yellow-400"
                                                            : "bg-green-400"
                                                    }`}
                                            ></span>
                                            <span className="font-medium">{remaining}</span>
                                        </span>
                                    </TableCell>
                                    <TableCell className="whitespace-nowrap">{device.note}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleEdit(originalIndex)}>Edit</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>Settings</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isBatchUpdateDialogOpen} onOpenChange={setIsBatchUpdateDialogOpen}>
                <DialogContentCustomPCSettings className="w-[90vw] max-w-[600px] sm:max-w-[700px] md:max-w-[800px] p-6">
                    <DialogHeader>
                        <DialogTitle className="text-sm font-semibold text-gray-700">Mass update ({selectedDevices.size})</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="relative">
                            <textarea
                                value={batchUpdateText}
                                onChange={handleBatchChange}
                                className="w-full p-2 border border-gray-300 rounded-md shadow-sm min-h-[6rem] max-h-[12rem] overflow-auto bg-gray-50 text-xs text-gray-500 focus:border-blue-500 transition-colors duration-200"
                            />
                        </div>
                        <Button
                            className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={handleBatchSave}
                        >
                            Save
                        </Button>
                    </div>
                </DialogContentCustomPCSettings>
            </Dialog>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContentCustomPCSettings>
                    <DialogHeader>
                        <DialogTitle className="text-xs text-muted-foreground">Settings</DialogTitle>
                    </DialogHeader>
                    <PcSettings />
                </DialogContentCustomPCSettings>
            </Dialog>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContentCustomPCSettings>
                    <DialogHeader>
                        <DialogTitle className="text-sm font-semibold text-gray-700">Edit PC</DialogTitle>
                    </DialogHeader>
                    {tempDevice && (
                        <div className="space-y-3">
                            {(["pcId", "name", "note"] as (keyof Device)[]).map((field) => (
                                <div key={field} className="space-y-1">
                                    <label className="block text-sm font-medium text-gray-700">
                                        {field === "pcId" ? "PC ID" : field === "name" ? "PC Name" : "Note"}
                                    </label>
                                    <input
                                        type="text"
                                        value={tempDevice[field]}
                                        onChange={(e) => setTempDevice({ ...tempDevice, [field]: e.target.value })}
                                        className="block w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                                        placeholder={`Enter ${field === "pcId" ? "PC ID" : field === "name" ? "PC Name" : "Note"}`}
                                    />
                                </div>
                            ))}
                            <Button
                                className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={handleSave}
                            >
                                Save
                            </Button>
                        </div>
                    )}
                </DialogContentCustomPCSettings>
            </Dialog>
        </div>
    );
}

//ahihi