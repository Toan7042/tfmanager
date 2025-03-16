"use client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const tabs = [
  { name: "UserAgentList", value: "Useragent" },
  { name: "PhoneNumberList", value: "Phone number" },
  { name: "FullName", value: "FullName" }
];

export default function PcSettingsRAND() {
  const [tabsData, setTabsData] = useState(
    tabs.reduce((acc, { name }) => ({ ...acc, [name]: "" }), {} as Record<string, string>)
  );
  const [fullNameData, setFullNameData] = useState({ firstName: "", lastName: "" });
  const [selectedTab, setSelectedTab] = useState(tabs[0].name); // Set default selected tab

  const handleChange = (key: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setTabsData((prev) => ({ ...prev, [key]: e.target.value }));

  const handleFullNameChange = (field: "firstName" | "lastName") => (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFullNameData((prev) => ({ ...prev, [field]: e.target.value }));

  const countLines = (text: string) => text.trim() ? text.split("\n").filter(Boolean).length : 0;

  const handleSave = () => {
    console.log("Saving data:", { tabsData, fullNameData });
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">

      <Alert className="border-cyan-600/50 text-cyan-600 dark:border-cyan-600 [&>svg]:text-cyan-600">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Important Information</AlertTitle>
        <AlertDescription>
          Ensure that the data you collect is organized systematically within the list.
        </AlertDescription>
      </Alert>

      <Select value={selectedTab} onValueChange={setSelectedTab}>
        <SelectTrigger className="w-[180px]"> {/* Áp dụng className vào SelectTrigger */}
          <SelectValue placeholder="Select a tab" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {tabs.map(({ name, value }) => (
              <SelectItem key={name} value={name} className="text-sm"> {/* Thêm class vào SelectItem */}
                {value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>


      {tabs.map(({ name }) =>
        name === selectedTab && (
          <div key={name} className="flex flex-col gap-2 mt-4">
            {name === "FullName" ? (
              <>
                <Textarea
                  placeholder="Enter First Name here..."
                  value={fullNameData.firstName}
                  onChange={handleFullNameChange("firstName")}
                  className="w-full p-2 border rounded-md shadow-sm resize-none overflow-auto h-28 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-xs text-gray-500">
                  Total lines in First Name: {countLines(fullNameData.firstName)}
                </div>

                <Textarea
                  placeholder="Enter Last Name here..."
                  value={fullNameData.lastName}
                  onChange={handleFullNameChange("lastName")}
                  className="w-full p-2 border rounded-md shadow-sm resize-none overflow-auto h-28 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-xs text-gray-500">
                  Total lines in Last Name: {countLines(fullNameData.lastName)}
                </div>
              </>
            ) : (
              <>
                <Textarea
                  placeholder={`Enter list ${name} here...`}
                  value={tabsData[name]}
                  onChange={handleChange(name)}
                  className="w-full p-2 border rounded-md shadow-sm resize-none overflow-auto h-28 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="text-xs text-gray-500">
                  Total lines: {countLines(tabsData[name])}
                </div>
              </>
            )}
          </div>
        )
      )}

      <Button type="submit" variant="secondary" className="mt-4">Save</Button>
    </form>
  );
}
