"use client";

import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface TransactionHistory {
    id: number;
    userId: number;
    amount: number;
    type: "Deposit" | "Purchase";
    date: Date;
    status: "Completed" | "Pending" | "Failed";
    content: string;
}

const transactionHistory: TransactionHistory[] = [
    { id: 1, userId: 1, amount: 200000, type: "Deposit", date: new Date("2025-03-20T10:00:00"), status: "Completed", content: "Bank transfer deposit" },
    { id: 2, userId: 1, amount: -250000, type: "Purchase", date: new Date("2025-03-19T15:30:00"), status: "Completed", content: "Purchased Advanced Package" },
    { id: 3, userId: 1, amount: 100000, type: "Deposit", date: new Date("2025-03-18T09:15:00"), status: "Pending", content: "Awaiting payment confirmation" },
    { id: 4, userId: 1, amount: 150000, type: "Deposit", date: new Date("2025-03-17T14:00:00"), status: "Completed", content: "Online payment" },
    { id: 5, userId: 1, amount: -100000, type: "Purchase", date: new Date("2025-03-16T09:00:00"), status: "Completed", content: "Purchased Basic Package" },
    { id: 6, userId: 1, amount: 300000, type: "Deposit", date: new Date("2025-03-15T12:00:00"), status: "Pending", content: "Pending bank transfer" },
    { id: 11, userId: 1, amount: 200000, type: "Deposit", date: new Date("2025-03-20T10:00:00"), status: "Completed", content: "Bank transfer deposit" },
    { id: 21, userId: 1, amount: -250000, type: "Purchase", date: new Date("2025-03-19T15:30:00"), status: "Completed", content: "Purchased Advanced Package" },
    { id: 31, userId: 1, amount: 100000, type: "Deposit", date: new Date("2025-03-18T09:15:00"), status: "Pending", content: "Awaiting payment confirmation" },
    { id: 41, userId: 1, amount: 150000, type: "Deposit", date: new Date("2025-03-17T14:00:00"), status: "Completed", content: "Online payment" },
    { id: 51, userId: 1, amount: -100000, type: "Purchase", date: new Date("2025-03-16T09:00:00"), status: "Completed", content: "Purchased Basic Package" },
    { id: 61, userId: 1, amount: 300000, type: "Deposit", date: new Date("2025-03-15T12:00:00"), status: "Pending", content: "Pending bank transfer" },
    { id: 121, userId: 1, amount: 200000, type: "Deposit", date: new Date("2025-03-20T10:00:00"), status: "Completed", content: "Bank transfer deposit" },
    { id: 22, userId: 1, amount: -250000, type: "Purchase", date: new Date("2025-03-19T15:30:00"), status: "Completed", content: "Purchased Advanced Package" },
    { id: 32, userId: 1, amount: 100000, type: "Deposit", date: new Date("2025-03-18T09:15:00"), status: "Pending", content: "Awaiting payment confirmation" },
    { id: 42, userId: 1, amount: 150000, type: "Deposit", date: new Date("2025-03-17T14:00:00"), status: "Completed", content: "Online payment" },
    { id: 52, userId: 1, amount: -100000, type: "Purchase", date: new Date("2025-03-16T09:00:00"), status: "Completed", content: "Purchased Basic Package" },
    { id: 62, userId: 1, amount: 300000, type: "Deposit", date: new Date("2025-03-15T12:00:00"), status: "Pending", content: "Pending bank transfer" },
];

export default function ServicePackagePurchaseHistory() {
    const tableHeaders = [
        { key: "id", label: "ID" },
        { key: "content", label: "Content", className: "min-w-[150px]" },
        { key: "date", label: "Date", className: "min-w-[120px]" },
        { key: "amount", label: "Amount" },
        { key: "type", label: "Type" },
        { key: "status", label: "Status" },
    ];

    return (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto border rounded-md">
            <Table className="min-w-full">
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
                    {transactionHistory.map((txn) => (
                        <TableRow key={txn.id}>
                            <TableCell>{txn.id}</TableCell>
                            <TableCell>{txn.content}</TableCell>
                            <TableCell>{txn.date.toLocaleString()}</TableCell>
                            <TableCell className={`py-2 px-4 ${txn.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                                {txn.amount > 0 ? "+" : ""}{txn.amount.toLocaleString()} VND
                            </TableCell>
                            <TableCell>
                                <Badge className={`bg-${txn.type === "Deposit" ? "blue" : "purple"}-600/10 dark:bg-${txn.type === "Deposit" ? "blue" : "purple"}-600/20 hover:bg-${txn.type === "Deposit" ? "blue" : "purple"}-600/10 text-${txn.type === "Deposit" ? "blue" : "purple"}-500 shadow-none rounded-full`}>
                                    <div className={`h-1.5 w-1.5 rounded-full bg-${txn.type === "Deposit" ? "blue" : "purple"}-500 mr-2`} />
                                    {txn.type}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <Badge className={`bg-${txn.status === "Completed" ? "emerald" : txn.status === "Pending" ? "amber" : "red"}-600/10 dark:bg-${txn.status === "Completed" ? "emerald" : txn.status === "Pending" ? "amber" : "red"}-600/20 hover:bg-${txn.status === "Completed" ? "emerald" : txn.status === "Pending" ? "amber" : "red"}-600/10 text-${txn.status === "Completed" ? "emerald" : txn.status === "Pending" ? "amber" : "red"}-500 shadow-none rounded-full`}>
                                    <div className={`h-1.5 w-1.5 rounded-full bg-${txn.status === "Completed" ? "emerald" : txn.status === "Pending" ? "amber" : "red"}-500 mr-2`} />
                                    {txn.status === "Completed" ? "Done" : txn.status === "Pending" ? "In Progress" : "Blocked"}
                                </Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}