import { useState } from "react";
import ContentEditable from "react-contenteditable";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const tabs = [
  { name: "UserAgentList", value: "UserAgentList" },
  { name: "PhoneNumberList", value: "PhoneNumberList" },
  { name: "NameGenList", value: "NameGenList" },
  { name: "CarrierList", value: "CarrierList" },
  { name: "EmailList", value: "EmailList" },
  { name: "PhoneInforList", value: "PhoneInforList" },
  { name: "Language", value: "Language" }
] as const;

const contentEditableStyle = {
  wordWrap: "break-word",
  maxWidth: "100%",
  whiteSpace: "pre-wrap",
  overflowY: "auto",
  wordBreak: "break-all",
};

type TabName = typeof tabs[number]["name"];

export default function PcSettingsRAND() {
  const [tabsData, setTabsData] = useState(
    tabs.reduce((acc, { name }) => ({ ...acc, [name]: "" }), {} as Record<TabName, string>)
  );
  const [selectedTab, setSelectedTab] = useState<TabName>(tabs[0].name);

  const handleChange = (key: TabName) => (e: React.FormEvent<HTMLDivElement>) => {
    setTabsData((prev) => ({ ...prev, [key]: e.currentTarget.textContent || "" }));
  };

  const handleGetData = () => {
    console.log("Getting data for:", selectedTab, tabsData[selectedTab]);
  };

  return (
    <div className="space-y-4">
      <Alert className="border-cyan-600/50 text-cyan-600 dark:border-cyan-600 [&>svg]:text-cyan-600">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Important Information</AlertTitle>
        <AlertDescription>
          Ensure that the data you collect is organized systematically within the list.
        </AlertDescription>
      </Alert>

      <div className="flex items-center gap-2">
        <Select value={selectedTab} onValueChange={(value) => setSelectedTab(value as TabName)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a tab" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {tabs.map(({ name, value }) => (
                <SelectItem key={name} value={name} className="text-sm">
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button variant="secondary" onClick={handleGetData}>
          Get
        </Button>
      </div>

      {tabs.map(({ name }) =>
        name === selectedTab ? (
          <div key={name} className="flex flex-col gap-2 mt-4">
            <ContentEditable
              html={tabsData[name]}
              onChange={handleChange(name)}
              className="w-full p-2 border rounded-md shadow-sm min-h-[6rem] max-h-[12rem] overflow-auto bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-gray-500"
              style={contentEditableStyle}
            />
          </div>
        ) : null
      )}
    </div>
  );
}
