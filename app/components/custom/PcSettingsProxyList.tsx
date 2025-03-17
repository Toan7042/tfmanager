import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@/components/ui/context-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const tabs = [
  { name: "LaunchApp", value: "LaunchApp" },
  { name: "IDVerify", value: "IDVerify" }
] as const;

type TabName = typeof tabs[number]["name"];

const contentEditableStyle = { wordWrap: "break-word", maxWidth: "100%", whiteSpace: "pre-wrap", overflowY: "auto", wordBreak: "break-all" };

export default function PcSettingsProxyList() {
  const [tabsData, setTabsData] = useState<Record<TabName, string>>(tabs.reduce((acc, { name }) => ({ ...acc, [name]: "" }), {} as Record<TabName, string>));
  const [selectedTab, setSelectedTab] = useState<TabName>(tabs[0].name);
  const [cloneTimes, setCloneTimes] = useState("1");
  const [isCloneDialogOpen, setIsCloneDialogOpen] = useState(false);
  const contentEditableRef = useRef<HTMLElement>(null as unknown as HTMLElement);

  const updateTabData = (key: TabName, newText: string) => setTabsData((prev) => ({ ...prev, [key]: newText }));
  const countLines = (text: string) => (!text || !text.trim() ? 0 : text.split(/[\r\n]+/).filter(line => line.trim().length > 0).length);

  const handleChange = (key: TabName) => () => updateTabData(key, contentEditableRef.current?.innerText || "");
  const handleCopy = () => navigator.clipboard.writeText(tabsData[selectedTab] || "");
  const handlePaste = async () => updateTabData(selectedTab, (tabsData[selectedTab] || "") + (await navigator.clipboard.readText()));
  const handleClone = () => setIsCloneDialogOpen(true);
  const confirmClone = () => {
    const repeatCount = parseInt(cloneTimes, 10) || 1;
    const baseText = tabsData[selectedTab] || "";
    updateTabData(selectedTab, Array(repeatCount).fill(baseText).join("\n") + (baseText ? "\n" : "") + baseText);
    setIsCloneDialogOpen(false);
  };

  const handleShuffle = () => {
    const lines = (tabsData[selectedTab] || "").split("\n").filter(Boolean);
    for (let i = lines.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [lines[i], lines[j]] = [lines[j], lines[i]];
    }
    setTabsData((prev) => ({ ...prev, [selectedTab]: lines.join("\n") }));
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <Alert className="border-cyan-600/50 text-cyan-600 dark:border-cyan-600">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Important Information PROXY</AlertTitle>
        <AlertDescription>Format: IP:PORT or IP:PORT:USER:PASS. Right click to show Copy, Paste, Shuffle</AlertDescription>
      </Alert>

      <Select value={selectedTab} onValueChange={(value) => setSelectedTab(value as TabName)}>
        <SelectTrigger className="w-[180px]"><SelectValue placeholder="Select a tab" /></SelectTrigger>
        <SelectContent><SelectGroup>{tabs.map(({ name, value }) => <SelectItem key={name} value={name} className="text-sm">{value}</SelectItem>)}</SelectGroup></SelectContent>
      </Select>

      <ContextMenu>
        <ContextMenuTrigger>
          <div>
            <ContentEditable
              innerRef={contentEditableRef}
              html={tabsData[selectedTab] || ""}
              onChange={handleChange(selectedTab)}
              onBlur={handleChange(selectedTab)}
              className="w-full p-2 border rounded-md shadow-sm min-h-[6rem] max-h-[12rem] overflow-auto bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-gray-500"
              style={contentEditableStyle}
            />
            <div className="mt-2 text-xs text-gray-500">Total lines: {countLines(tabsData[selectedTab])}</div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleCopy}>Copy</ContextMenuItem>
          <ContextMenuItem onClick={handlePaste}>Paste</ContextMenuItem>
          <ContextMenuItem onClick={handleClone}>Clone</ContextMenuItem>
          <ContextMenuItem onClick={handleShuffle}>Shuffle</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <Dialog open={isCloneDialogOpen} onOpenChange={setIsCloneDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clone Content</DialogTitle>
            <DialogDescription>Enter the number of times to duplicate the content.</DialogDescription>
          </DialogHeader>
          <Input type="number" value={cloneTimes} onChange={(e) => setCloneTimes(e.target.value)} min="1" className="w-full" />
          <Button onClick={confirmClone}>Confirm</Button>
        </DialogContent>
      </Dialog>

      <Button type="submit" variant="secondary" className="mt-4">Save</Button>
    </form>
  );
}