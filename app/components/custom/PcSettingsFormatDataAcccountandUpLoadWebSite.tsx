"use client";

import { useState, useRef } from "react";
import ContentEditable from "react-contenteditable";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

import FancyMultiSelect from "@/components/ui/FancyMultiSelect";

const contentEditableStyle = {
  wordWrap: "break-word",
  maxWidth: "100%",
  whiteSpace: "pre-wrap",
  overflowY: "auto",
  wordBreak: "break-all",
};

// Danh sách các trường có thể chọn
const FIELDS = [
  { value: "UID", label: "UID" },
  { value: "Pass", label: "Pass" },
  { value: "Cookie", label: "Cookie" },
  { value: "Token", label: "Token" },
  { value: "2FAVerification", label: "2FAVerification" },
  { value: "IDVerify", label: "IDVerify" },
  { value: "IDVerifyPassword", label: "IDVerifyPassword" },
  { value: "Time", label: "Time" },
  { value: "Extend", label: "Extend" },
  { value: "Description", label: "Description" },
  { value: "Name", label: "Name" },
  { value: "PhoneGen", label: "PhoneGen" },
  { value: "MailGen", label: "MailGen" },
  { value: "Device", label: "Device" },
];

export default function PcSettingsFormatDataAcccountandUpLoadWebSite() {
  const [text, setText] = useState("");
  const contentEditableRef = useRef<HTMLElement | null>(null);
  const [selectedFields, setSelectedFields] = useState(FIELDS.slice(0, 3)); // Chọn mặc định 3 trường

  const countLines = (text: string) =>
    !text || !text.trim()
      ? 0
      : text.split(/[\r\n]+/).filter((line) => line.trim().length > 0).length;

  const handleChange = () => {
    if (contentEditableRef.current) {
      setText(contentEditableRef.current.innerText);
    }
  };

  return (
    <div className="w-full max-w-lg max-h-[700px] overflow-auto border rounded-md p-4">
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <Alert className="border-cyan-600/50 text-cyan-600 dark:border-cyan-600 [&>svg]:text-cyan-600">
          <InfoIcon className="h-4 w-4" />
          <AlertTitle className="text-xs">Important Information ACCOUNT - WEBSITE</AlertTitle>
          <AlertDescription className="text-xs">
            Ensure that the data you collect is organized systematically.
          </AlertDescription>
        </Alert>

        <FancyMultiSelect
          options={FIELDS}
          selected={selectedFields}
          onChange={(newFields) => setSelectedFields(newFields.filter(Boolean))}
        />

        <div className="max-h-20 border rounded-md p-2 bg-gray-50 text-sm text-gray-700 flex flex-wrap gap-1">
          {selectedFields.map((field, index) => (
            <span key={index} className="after:content-['|'] last:after:content-['']">
              {field.value}
            </span>
          ))}
        </div>
          

        <Alert>
          <Terminal className="h-3 w-3" />
          <AlertTitle className="text-xs">
            APIShop<span className="text-red-500">*</span>Description.
          </AlertTitle>
          <AlertDescription className="text-xs break-words whitespace-pre-line">
            <ul className="list-disc pl-4">
              <li className="break-all">
                Example: https://example.com/api/importAccount.php?code=codeShop1&api_key=apikeyShop&account=
                <span className="text-red-500">*</span>
                [<span className="text-blue-500">FacebookApp</span>]
                .<span className="text-blue-500">Verified(VR)</span>
              </li>
              <li className="break-all">
                Example: https://example.com/api/importAccount.php?code=codeShop2&api_key=apikeyShop&account=
                <span className="text-red-500">*</span>
                [<span className="text-blue-500">FacebooLiteApp</span>]
                .<span className="text-blue-500">Verified(VR)</span>
              </li>
            </ul>
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

        <Button type="submit" variant="secondary">
          Save
        </Button>
      </form>
    </div>

  );
}
