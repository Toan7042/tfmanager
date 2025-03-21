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
  const userId = 2; // Assumed userId
  const userLevel = 12; // Giả sử level của người dùng là 3

  // Tính toán khuyến mãi dựa trên level
  const promotion = userLevel > 1 ? Math.min(userLevel, 12) : 0;

  const getQrUrl = () => {
    const description = `Hato ${userId} Deposit`;
    return `https://img.vietqr.io/image/${paymentInfo.bankId}-${paymentInfo.accountNumber}-${paymentInfo.template}.png?amount=${amount}&addInfo=${encodeURIComponent(description)}&accountName=${encodeURIComponent(paymentInfo.accountHolder)}`;
  };

  const receivedAmount = amount + (amount * promotion) / 100; // Actual received = amount + % promotion

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Giới hạn độ dài là 20 ký tự
    if (inputValue.length > 20) {
      inputValue = inputValue.slice(0, 20);
    }

    setAmount(inputValue === "" ? 0 : parseFloat(inputValue) || 0);
  };

  return (
    <div className="w-full max-w-md p-6 space-y-6">
      {amount > 0 && (
        <div className="space-y-4">
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="font-medium">Account Number:</span> {paymentInfo.accountNumber}
            </p>
            <p>
              <span className="font-medium">Account Holder:</span> {paymentInfo.accountHolder}
            </p>
            <p>
              <span className="font-medium">Amount:</span> {amount.toLocaleString()} VND
            </p>
            <p>
              <span className="font-medium">Description:</span> Hato {userId} Deposit
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src={getQrUrl()}
              alt="Deposit QR Code"
              width={192}
              height={192}
              className="rounded-lg shadow-sm"
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
            Amount (VND)
          </Label>
          <Input
            id="amount"
            type="number"
            value={amount === 0 ? "" : amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            min={0}
            className="border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg"
          />
          <div className="text-sm text-gray-600">
            Account Level: {userLevel}, Promotion: {promotion}% <br />
            Actual Received: {receivedAmount.toLocaleString()} VND
          </div>
        </div>
      </div>
    </div>
  );
}