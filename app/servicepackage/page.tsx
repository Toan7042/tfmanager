"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import Navbar from "../components/Nav";
import ServicePackageDeposit from "../components/custom/ServicePackageDeposit";
import ServicePackagePurchaseHistory from "../components/custom/ServicePackagePurchaseHistory";
import { CircleCheck, HistoryIcon, PlusCircle, KeyRound } from "lucide-react";
import ServicePackageLicenseRenewalKey from "../components/custom/ServicePackageLicenseRenewalKey";

interface ServicePackage {
  id: number;
  name: string;
  packageType: string;
  description?: string;
  price: number;
  quantityPC: number;
  quantityPhone: number;
  durationDays: number;
}

const servicePackages: ServicePackage[] = [
  { id: 1, name: "Basic Package", packageType: "Standard", description: "Basic package for beginners", price: 100000, quantityPC: 1, quantityPhone: 2, durationDays: 30 },
  { id: 2, name: "Advanced Package", packageType: "Integrated", description: "Package with multiple features", price: 250000, quantityPC: 3, quantityPhone: 5, durationDays: 60 },
  { id: 3, name: "Advanced Package", packageType: "Mandatory", description: "Package with multiple features", price: 250000, quantityPC: 3, quantityPhone: 5, durationDays: 60 },
];

// Hiệu ứng xuất hiện
const cardVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

// Component hiển thị chi tiết gói dịch vụ trong dialog
const PackageDetailsDialog = ({ pkg, onClose }: { pkg: ServicePackage; onClose: () => void }) => {
  const details = [
    { label: "Name", value: pkg.name },
    { label: "Type", value: pkg.packageType },
    { label: "Description", value: pkg.description },
    { label: "Price", value: `${pkg.price.toLocaleString()} VND` },
    { label: "PCs", value: pkg.quantityPC },
    { label: "Phones", value: pkg.quantityPhone },
    { label: "Duration", value: `${pkg.durationDays} days` },
  ];

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-sm">Payment confirmations</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        {details.map((item, index) => (
          <p key={index} className="text-sm text-gray-600">
            <strong>{item.label}:</strong> {item.value}
          </p>
        ))}
        <div className="flex justify-end gap-2">
          <Button
            className="w-24 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-600 hover:to-blue-800"
            onClick={() => console.log("Agreed:", pkg)}
          >
            Agree
          </Button>
          <Button variant="outline" className="w-24 rounded-full" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </DialogContent>
  );
};

export default function ServicePackage() {
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showRenewal, setshowRenewal] = useState(false);
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false);

  const handleHistoryClick = () => setShowHistory(!showHistory);
  const handleRenewalClick = () => setshowRenewal(!showRenewal);

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <Navbar />
      <motion.div initial="hidden" animate="visible" variants={cardVariants}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-sm">Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: "Deposit", value: 200000, color: "bg-blue-600" },
              { label: "Balance", value: 30000, color: "bg-yellow-600" },
              { label: "Spending", value: 70000, color: "bg-red-600" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center text-white`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M12 2v20M17 5H9.5a.5.5 0 0 0 0 11H21M17 11v11" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold">{label}</h3>
                  <p className="text-xs text-gray-600">{value.toLocaleString()} VND</p>
                </div>
              </div>
            ))}
            <Dialog open={isDepositOpen} onOpenChange={setIsDepositOpen}>
              <DialogTrigger asChild>
                <motion.div
                  className="flex items-center cursor-pointer mt-4 text-blue-500 hover:text-blue-600 transition-colors duration-200 select-none"
                  whileTap={{ scale: 0.95, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <PlusCircle className="w-4 h-4 mr-1" />
                  <span className="text-sm">Deposit</span>
                </motion.div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-xs text-muted-foreground">Deposit</DialogTitle>
                </DialogHeader>
                <ServicePackageDeposit />
              </DialogContent>
            </Dialog>
            <div
              className="flex items-center cursor-pointer mt-2 text-blue-500 hover:text-blue-600 transition-colors duration-200 select-none"
              onClick={handleHistoryClick}
            >
              <motion.div animate={{ rotate: showHistory ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <HistoryIcon className="w-4 h-4 mr-1" />
              </motion.div>
              <span className="text-sm">Transaction History</span>
            </div>
            {showHistory && <ServicePackagePurchaseHistory />}

            <div
              className="flex items-center cursor-pointer mt-2 text-blue-500 hover:text-blue-600 transition-colors duration-200 select-none"
              onClick={handleRenewalClick}
            >
              <motion.div animate={{ rotate: showRenewal ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <KeyRound className="w-4 h-4 mr-1" />
              </motion.div>
              <span className="text-sm">License Renewal Key</span>
            </div>
            {showRenewal && <ServicePackageLicenseRenewalKey />}

          </CardContent>
        </Card>
      </motion.div>

      <motion.h1
        className="text-xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
        style={{ textShadow: "2px 2px 4px rgba(13, 57, 253, 0.2)" }}
      >
        Service Packages
      </motion.h1>

      <div className="grid gap-6 lg:grid-cols-3 max-w-screen-lg mx-auto">
        {servicePackages.map((pkg, index) => (
          <motion.div
            key={pkg.id}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between text-sm">
                  {pkg.name}
                  <Badge
                    className={
                      pkg.packageType === "Standard"
                        ? "bg-blue-600"
                        : pkg.packageType === "Mandatory"
                        ? "bg-red-600"
                        : "bg-purple-600"
                    }
                  >
                    {pkg.packageType}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">{pkg.description}</p>
                <Separator />
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex gap-2"><CircleCheck className="h-4 w-4 mt-1 text-green-600" /> {pkg.quantityPC} PCs</li>
                  <li className="flex gap-2"><CircleCheck className="h-4 w-4 mt-1 text-green-600" /> {pkg.quantityPhone} Phones</li>
                  <li className="flex gap-2"><CircleCheck className="h-4 w-4 mt-1 text-green-600" /> {pkg.durationDays} days</li>
                </ul>
                <div className="text-sm text-gray-600">
                  <p>Price: <span className="font-medium">{pkg.price.toLocaleString()} VND</span></p>
                </div>
                <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full rounded-full">Buy</Button>
                  </DialogTrigger>
                  <PackageDetailsDialog pkg={pkg} onClose={() => setIsPackageDialogOpen(false)} />
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
}