"use client";

import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const paymentInfo = {
    bankId: "MB",
    accountNumber: "045204000764",
    accountHolder: "HOANG KIM TOAN",
    template: "compact",
};

export default function ServicePackageDeposit() {
    const [amount, setAmount] = useState<number>(0);
    const userId = 1; // Giả định userId, thay bằng logic auth thực tế

    const getQrUrl = () => {
        const description = `Hato ${userId} Nap tien`;
        return `https://img.vietqr.io/image/${paymentInfo.bankId}-${paymentInfo.accountNumber}-${paymentInfo.template}.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(paymentInfo.accountHolder)}`;
    };

    return (
        <div className="w-full max-w-md p-6 space-y-6">


            {amount > 0 && (
                <div className="space-y-4">
                    <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">Số tài khoản:</span> {paymentInfo.accountNumber}</p>
                        <p><span className="font-medium">Chủ tài khoản:</span> {paymentInfo.accountHolder}</p>
                        <p><span className="font-medium">Số tiền:</span> {amount.toLocaleString()} VND</p>
                        <p><span className="font-medium">Nội dung:</span> Hato {userId} Nap tien</p>
                    </div>
                    <div className="flex justify-center">
                        <Image
                            src={getQrUrl()}
                            alt="QR Code Nạp Tiền"
                            width={192} // 48 * 4 (tailwind w-48)
                            height={192} // 48 * 4
                            className="rounded-lg shadow-sm"
                        />

                    </div>
                </div>
            )}

            <div className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                        Số tiền (VND)
                    </Label>
                    <Input
                        id="amount"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        placeholder="Nhập số tiền"
                        min={0}
                        className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
}