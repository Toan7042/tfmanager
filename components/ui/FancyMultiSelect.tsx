"use client";

import { X } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";

type Field = { value: string; label: string };

interface FancyMultiSelectProps {
  options: Field[];
  selected: Field[];
  onChange: (selected: Field[]) => void;
}

export default function FancyMultiSelect({ options, selected, onChange }: FancyMultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = (field: Field) => {
    onChange(selected.filter((s) => s.value !== field.value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && selected.length > 0 && !inputValue) {
      onChange(selected.slice(0, -1));
    }
  };

  const filteredOptions = options.filter((field) => !selected.includes(field));

  return (
    <div className="w-full">
      <Command className="overflow-visible">
        <div
          className="rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 flex items-center justify-between"
        >
          {/* Khu vực chọn */}
          <div className="flex flex-wrap gap-1 flex-1" onClick={() => setOpen(true)}>
            {selected.map((field) => (
              <Badge key={field.value} variant="secondary" className="select-none">
                {field.label}
                <X
                  className="size-3 text-muted-foreground hover:text-foreground ml-2 cursor-pointer"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleUnselect(field)}
                />
              </Badge>
            ))}
            <CommandPrimitive.Input
              onKeyDown={handleKeyDown}
              onValueChange={setInputValue}
              value={inputValue}
              placeholder="Select fields..."
              className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            />
          </div>

          {/* Nút đóng */}
          {open && (
            <X
              className="size-5 text-muted-foreground hover:text-foreground cursor-pointer ml-2"
              onClick={() => setOpen(false)}
            />
          )}
        </div>

        {/* Danh sách lựa chọn với hiệu ứng mượt và z-index */}
        <div
          className={`relative mt-2 origin-top transition-all duration-300 ease-in-out ${
            open && filteredOptions.length > 0
              ? "opacity-100 scale-y-100 z-20" // Higher z-index when open
              : "opacity-0 scale-y-0 pointer-events-none z-0" // Lower z-index when closed
          }`}
        >
          <div className="absolute top-0 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
            <CommandList className="max-h-60 overflow-auto">
              <CommandGroup className="h-full overflow-auto">
                {filteredOptions.map((field) => (
                  <CommandItem
                    key={field.value}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      setInputValue("");
                      onChange([...selected, field]);
                      setOpen(false); // Đóng ngay sau khi chọn
                    }}
                    className="cursor-pointer"
                  >
                    {field.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        </div>
      </Command>
    </div>
  );
}