import { useState } from "react";
import ContentEditable from "react-contenteditable";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const tabs = [
  { name: "UserAgentList", value: "Useragent" },
  { name: "PhoneNumberList", value: "Phone number" },
  { name: "FullName", value: "FullName" }
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
  const [tabsData, setTabsData] = useState(tabs.reduce((acc, { name }) => ({ ...acc, [name]: "" }), {} as Record<TabName, string>));
  const [fullNameData, setFullNameData] = useState({ firstName: "", lastName: "" });
  const [selectedTab, setSelectedTab] = useState<TabName>(tabs[0].name);

  const handleChange = (key: TabName) => (e: React.FormEvent<HTMLDivElement>) =>
    setTabsData((prev) => ({ ...prev, [key]: e.currentTarget.innerText }));

  const handleFullNameChange = (field: "firstName" | "lastName") => (e: React.FormEvent<HTMLDivElement>) =>
    setFullNameData((prev) => ({ ...prev, [field]: e.currentTarget.innerText }));

  const countLines = (text: string) => (text.trim() ? text.split("\n").filter(Boolean).length : 0);
  const handleSave = () => console.log("Saving data:", { tabsData, fullNameData });

  return (
    <form onSubmit={(e) => (e.preventDefault(), handleSave())} className="space-y-4">
      <Alert className="border-cyan-600/50 text-cyan-600 dark:border-cyan-600 [&>svg]:text-cyan-600">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Important Information</AlertTitle>
        <AlertDescription>Ensure that the data you collect is organized systematically within the list.</AlertDescription>
      </Alert>

      <Select
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value as TabName)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a tab" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {tabs.map(({ name, value }) => (
              <SelectItem key={name} value={name} className="text-sm">{value}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {tabs.map(
        ({ name }) =>
          name === selectedTab && (
            <div key={name} className="flex flex-col gap-2 mt-4">
              {name === "FullName" ? (
                <>
                  <ContentEditable
                    html={fullNameData.firstName}
                    onChange={handleFullNameChange("firstName")}
                    className="w-full p-2 border rounded-md shadow-sm min-h-[6rem] max-h-[12rem] overflow-auto bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-gray-500"
                    style={contentEditableStyle}
                  />
                  <div className="text-xs text-gray-500">Total lines in First Name: {countLines(fullNameData.firstName)}</div>

                  <ContentEditable
                    html={fullNameData.lastName}
                    onChange={handleFullNameChange("lastName")}
                    className="w-full p-2 border rounded-md shadow-sm min-h-[6rem] max-h-[12rem] overflow-auto bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-gray-500"
                    style={contentEditableStyle}
                  />
                  <div className="text-xs text-gray-500">Total lines in Last Name: {countLines(fullNameData.lastName)}</div>
                </>
              ) : (
                <>
                  <ContentEditable
                    html={tabsData[name]}
                    onChange={handleChange(name)}
                    className="w-full p-2 border rounded-md shadow-sm min-h-[6rem] max-h-[12rem] overflow-auto bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-gray-500"
                    style={contentEditableStyle}
                  />
                  <div className="text-xs text-gray-500">Total lines: {countLines(tabsData[name])}</div>
                </>
              )}
            </div>
          )
      )}

      <Button type="submit" variant="secondary" className="mt-4">Save</Button>
    </form>
  );
}