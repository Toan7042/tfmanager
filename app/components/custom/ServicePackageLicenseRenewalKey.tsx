"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ContentEditable from "react-contenteditable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, CheckCircle2 } from "lucide-react";

// Định nghĩa kiểu dữ liệu
interface Device {
    id: number;
    phoneId?: string;
    pcId?: string;
    name: string;
    createdDate: string;
    expirationDate: string;
    note: string;
}

interface RenewalResult {
    index: number;
    id: string;
    createdDate: string;
    expirationDate: string;
    renewalPrice: number;
    status: "Valid" | "Invalid";
    expirationDateAfterRenewal: string;
    daysRemaining: number;
    daysRemainingAfterRenewal: number;
}

// Dữ liệu mẫu
const mockPhoneData: Device[] = [
    { id: 1, phoneId: "PHONE001", name: "Phone 1", createdDate: "2024-01-01T00:00:00Z", expirationDate: "2024-03-01T00:00:00Z", note: "Note 1" },
    { id: 2, phoneId: "PHONE002", name: "Phone 2", createdDate: "2024-02-01T00:00:00Z", expirationDate: "2024-04-01T00:00:00Z", note: "Note 2" },
];

const mockPCData: Device[] = [
    { id: 1, pcId: "PC0504", name: "PC 1", createdDate: "2024-01-15T00:00:00Z", expirationDate: "2024-03-15T00:00:00Z", note: "Note 1" },
    { id: 2, pcId: "PC0036", name: "PC 2", createdDate: "2024-02-15T00:00:00Z", expirationDate: "2024-04-15T00:00:00Z", note: "Note 2" },
    { id: 3, pcId: "PC0106", name: "PC 3", createdDate: "2024-03-01T00:00:00Z", expirationDate: "2024-05-01T00:00:00Z", note: "Note 3" },
    { id: 4, pcId: "PC0405", name: "PC 4", createdDate: "2024-03-02T00:00:00Z", expirationDate: "2024-05-02T00:00:00Z", note: "Note 4" },
    { id: 5, pcId: "PC0472", name: "PC 5", createdDate: "2024-03-03T00:00:00Z", expirationDate: "2024-05-03T00:00:00Z", note: "Note 5" },
    { id: 6, pcId: "PC0967", name: "PC 6", createdDate: "2024-03-04T00:00:00Z", expirationDate: "2024-05-04T00:00:00Z", note: "Note 6" },
    { id: 7, pcId: "PC0501", name: "PC 7", createdDate: "2024-03-05T00:00:00Z", expirationDate: "2024-05-05T00:00:00Z", note: "Note 7" },
];

// Style cho khu vực nhập ID
const contentEditableStyle = {
    wordWrap: "break-word" as const,
    maxWidth: "100%",
    whiteSpace: "pre-wrap" as const,
    overflowY: "auto" as const,
    wordBreak: "break-all" as const,
};

// Giá cơ bản và logic giảm giá
const baseRenewalPrices = {
    "1month": 50000,
    "2months": 90000,
    "3months": 120000,
};

const getDiscount = (quantity: number): number => {
    if (quantity > 200) return 0.16;
    if (quantity > 100) return 0.12;
    if (quantity > 50) return 0.08;
    if (quantity > 20) return 0.03;
    return 0;
};

// Hàm tính ngày hết hạn mới và số ngày còn lại
const calculateExpirationDate = (currentExpiration: string, duration: string, currentDate: Date): { date: string; daysRemaining: number; daysRemainingAfterRenewal: number } => {
    const expDate = new Date(currentExpiration);
    const today = currentDate;
    let newExpDate: Date;

    const monthsToAdd = duration === "1month" ? 1 : duration === "2months" ? 2 : 3;

    if (expDate > today) {
        newExpDate = new Date(expDate);
        newExpDate.setMonth(newExpDate.getMonth() + monthsToAdd);
    } else {
        newExpDate = new Date(today);
        newExpDate.setMonth(newExpDate.getMonth() + monthsToAdd);
    }

    const daysRemaining = Math.max(0, Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
    const daysRemainingAfterRenewal = Math.ceil((newExpDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return { date: newExpDate.toISOString(), daysRemaining, daysRemainingAfterRenewal };
};

// Component dialog xác nhận gia hạn
const RenewalConfirmationDialog = ({ count, totalPrice, onConfirm, onClose }: { count: number; totalPrice: number; onConfirm: () => void; onClose: () => void }) => (
    <DialogContent className="max-w-sm">
        <DialogHeader>
            <DialogTitle className="text-sm">Confirm Renewal</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
            <p className="text-sm text-gray-600">
                Do you want to renew <span className="font-semibold">{count}</span> {count === 1 ? "ID" : "IDs"} with a total price of{" "}
                <span className="font-semibold">{totalPrice.toLocaleString()} VND</span>?
            </p>
            <div className="flex justify-end gap-2">
                <Button
                    className="w-20 text-sm bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 shadow-md"
                    onClick={onConfirm}
                >
                    Agree
                </Button>
                <Button variant="outline" className="w-20 text-sm" onClick={onClose}>
                    Cancel
                </Button>
            </div>
        </div>
    </DialogContent>
);

// Hàm xử lý chuỗi HTML từ ContentEditable
const parseContentEditableText = (html: string): string[] => {
    if (!html) return [];
    const cleanedText = html
        .replace(/<div>/gi, "\n")
        .replace(/<\/div>/gi, "\n")
        .replace(/<br\s*\/?>/gi, "\n")
        .replace(/<[^>]+>/g, "");
    return [...new Set(cleanedText.split("\n").map(line => line.trim()).filter(line => line))];
};

export default function ServicePackageLicenseRenewalKey() {
    const [idList, setIdList] = useState<string>("");
    const [duration, setDuration] = useState<string>("1month");
    const [deviceType, setDeviceType] = useState<string>("phone");
    const [renewalResults, setRenewalResults] = useState<RenewalResult[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isRenewalDialogOpen, setIsRenewalDialogOpen] = useState(false);
    // const contentEditableRef = useRef<HTMLElement>(null);
    const currentDate = new Date("2025-03-21T00:00:00Z");

    const totalLines = parseContentEditableText(idList).length;

    const updateResults = (ids: string[]) => {
        if (ids.length === 0) {
            setRenewalResults([]);
            setTotalPrice(0);
            return;
        }

        const dataSource = deviceType === "phone" ? mockPhoneData : mockPCData;
        const basePrice = baseRenewalPrices[duration as keyof typeof baseRenewalPrices];
        const discount = getDiscount(ids.length);
        const pricePerDevice = basePrice * (1 - discount);

        const results: RenewalResult[] = ids.map((id, index) => {
            const device = dataSource.find(d => (deviceType === "phone" ? d.phoneId === id : d.pcId === id));
            const renewalInfo = device ? calculateExpirationDate(device.expirationDate, duration, currentDate) : { date: "N/A", daysRemaining: 0, daysRemainingAfterRenewal: 0 };
            return {
                index: index + 1,
                id: id,
                createdDate: device ? device.createdDate : "N/A",
                expirationDate: device ? device.expirationDate : "N/A",
                renewalPrice: device ? Math.round(pricePerDevice) : 0,
                status: device ? "Valid" : "Invalid",
                expirationDateAfterRenewal: renewalInfo.date,
                daysRemaining: renewalInfo.daysRemaining,
                daysRemainingAfterRenewal: renewalInfo.daysRemainingAfterRenewal,
            };
        });

        const validResults = results.filter(r => r.status === "Valid");
        const total = validResults.reduce((sum, result) => sum + result.renewalPrice, 0);
        setRenewalResults(results);
        setTotalPrice(total);
    };

    const handleChange = (evt: { target: { value: string } }) => {
        const value = evt.target.value || "";
        setIdList(value);
        const ids = parseContentEditableText(value);
        updateResults(ids);
    };

    const handleRenewConfirm = () => {
        console.log(`Renewing ${renewalResults.filter(r => r.status === "Valid").length} IDs with total price: ${totalPrice} VND`);
        setIsRenewalDialogOpen(false);
    };

    useEffect(() => {
        const ids = parseContentEditableText(idList);
        updateResults(ids);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [duration, deviceType]); // Không thêm idList và updateResults để tránh vòng lặp vô hạn

    const tableHeaders = [
        { key: "index", label: "Index", className: "w-12" },
        { key: "id", label: deviceType === "phone" ? "Phone ID" : "PC ID", className: "min-w-[100px]" },
        { key: "createdDate", label: "Created Date", className: "min-w-[120px]" },
        { key: "expirationDate", label: "Expiration Date", className: "min-w-[120px]" },
        { key: "daysRemaining", label: "Days Remaining", className: "min-w-[100px]" },
        { key: "expirationDateAfterRenewal", label: "New Expiration", className: "min-w-[120px]" },
        { key: "daysRemainingAfterRenewal", label: "Days Remaining (Renew)", className: "min-w-[120px]" },
        { key: "renewalPrice", label: "Price", className: "min-w-[80px]" },
        { key: "status", label: "Status", className: "min-w-[100px]" },
    ];

    return (
        <div className="p-4 w-full">
            <div className="space-y-4">
                <Alert className="border-cyan-600/50 text-cyan-600 dark:border-cyan-600 [&>svg]:text-cyan-600">
                    <InfoIcon className="h-4 w-4" />
                    <AlertTitle>Important Information</AlertTitle>
                    <AlertDescription>
                        Pricing: 1 month = 50,000 VND, 2 months = 90,000 VND, 3 months = 120,000 VND. Discounts: 3% ({'>'}20 IDs), 8% ({'>'}50 IDs), 12% ({'>'}100 IDs), 16% ({'>'}200 IDs). Review before proceeding.
                    </AlertDescription>
                </Alert>

                <div className="relative">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-sm font-medium text-gray-700">Enter IDs (one per line)</label>
                        <Badge variant="outline" className="text-xs text-gray-500">Total Lines: {totalLines}</Badge>
                    </div>
                    <ContentEditable
                        // innerRef={contentEditableRef}
                        html={idList}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-md shadow-sm min-h-[100px] max-h-[150px] overflow-auto bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-600"
                        style={contentEditableStyle}
                    />
                    {idList === "" && (
                        <div className="absolute top-10 left-2 text-sm text-gray-400 pointer-events-none">
                            Enter IDs here...
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Renewal Duration</label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-between text-sm">
                                    {duration === "1month" ? "1 Month" : duration === "2months" ? "2 Months" : "3 Months"}
                                    <span>▼</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                <DropdownMenuItem onClick={() => setDuration("1month")}>1 Month</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDuration("2months")}>2 Months</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDuration("3months")}>3 Months</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Device Type</label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full justify-between text-sm">
                                    {deviceType === "phone" ? "Phone ID" : "PC ID"}
                                    <span>▼</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full">
                                <DropdownMenuItem onClick={() => setDeviceType("phone")}>Phone ID</DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setDeviceType("pc")}>PC ID</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {renewalResults.length > 0 && totalPrice > 0 && (
                    <div className="flex gap-2">
                        <Dialog open={isRenewalDialogOpen} onOpenChange={setIsRenewalDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="px-4 py-2 text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center gap-2 border-none">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Renew
                                </Button>
                            </DialogTrigger>
                            <RenewalConfirmationDialog
                                count={renewalResults.filter(r => r.status === "Valid").length}
                                totalPrice={totalPrice}
                                onConfirm={handleRenewConfirm}
                                onClose={() => setIsRenewalDialogOpen(false)}
                            />
                        </Dialog>
                    </div>
                )}
            </div>

            {renewalResults.length > 0 && (
                <div className="mt-4 overflow-x-auto max-h-[300px] overflow-y-auto border rounded-md">
                    <Table className="min-w-full text-sm">
                        <TableHeader className="bg-gray-50 sticky top-0">
                            <TableRow>
                                {tableHeaders.map((header) => (
                                    <TableHead key={header.key} className={`${header.className} text-gray-700 font-medium`}>
                                        {header.label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {renewalResults.map((result) => (
                                <TableRow key={result.index} className="hover:bg-gray-50">
                                    <TableCell>{result.index}</TableCell>
                                    <TableCell>{result.id}</TableCell>
                                    <TableCell>{new Date(result.createdDate).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(result.expirationDate).toLocaleDateString()}</TableCell>
                                    <TableCell className="font-semibold text-blue-600">{result.daysRemaining}</TableCell>
                                    <TableCell>{new Date(result.expirationDateAfterRenewal).toLocaleDateString()}</TableCell>
                                    <TableCell className="font-semibold text-blue-600">{result.daysRemainingAfterRenewal}</TableCell>
                                    <TableCell>{result.renewalPrice.toLocaleString()} VND</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={`bg-${result.status === "Valid" ? "green" : "red"
                                                }-100 dark:bg-${result.status === "Valid" ? "green" : "red"
                                                }-200 hover:bg-${result.status === "Valid" ? "green" : "red"
                                                }-100 text-${result.status === "Valid" ? "green" : "red"
                                                }-600 shadow-none rounded-full`}
                                        >
                                            <div
                                                className={`h-1.5 w-1.5 rounded-full bg-${result.status === "Valid" ? "green" : "red"
                                                    }-500 mr-2`}
                                            />
                                            {result.status === "Valid" ? "Valid" : "Invalid"}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {renewalResults.length > 0 && (
                <div className="flex justify-end mt-2">
                    <Badge variant="outline" className="text-sm text-gray-600">
                        Total Price: {totalPrice.toLocaleString()} VND
                    </Badge>
                </div>
            )}
        </div>
    );
}