import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const contentEditableStyle = {
  wordWrap: "break-word",
  maxWidth: "100%",
  whiteSpace: "pre-wrap",
  overflowY: "auto",
  wordBreak: "break-all",
};

export default function PcSettingsDomainBlack() {
  const [text, setText] = useState("");
  const contentEditableRef = useRef<HTMLElement | null>(null);

  const countLines = (text: string) =>
    !text || !text.trim() ? 0 : text.split(/[\r\n]+/).filter((line) => line.trim().length > 0).length;

  const handleChange = () => {
    if (contentEditableRef.current) {
      setText(contentEditableRef.current.innerText);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <Alert className="border-cyan-600/50 text-cyan-600 dark:border-cyan-600 [&>svg]:text-cyan-600">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Important Information DOMAIN BLACK</AlertTitle>
        <AlertDescription>List of domains not applicable to email. 
          <br />Example:
          <li>eotiro.xyz</li>
          <li>bufiw.cn</li>
          </AlertDescription>
      </Alert>

      <div>
        <ContentEditable
          innerRef={(el: HTMLElement | null) => (contentEditableRef.current = el)}
          html={text}
          onChange={handleChange}
          onBlur={handleChange}
          className="w-full p-2 border rounded-md shadow-sm min-h-[6rem] max-h-[12rem] overflow-auto bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs text-gray-500"
          style={contentEditableStyle}
        />
        <div className="mt-2 text-xs text-gray-500">Total lines: {countLines(text)}</div>
      </div>

      <Button type="submit" variant="secondary" className="mt-4">
        Save
      </Button>
    </form>
  );
}
