"use client";

import { useState } from "react";
import { CaretSortIcon, CheckIcon, TrashIcon } from "@radix-ui/react-icons";

import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/src/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Input } from "@/src/components/ui/input";

export function SelectField({
  defaultFieldId,
  options,
  value,
  onChange,
  field,
  additionalFieldKey,
}: {
  defaultFieldId: string;
  options: {
    id: string;
    name: string;
    additionalField?: string; //branch
  }[];
  value: {
    id: string;
    name: string;
    additionalField?: string;
  };
  onChange: (
    fieldId: string,
    fieldName: string,
    additionalField?: string
  ) => void;
  field: "party" | "branch" | "sample" | "test" | "specification";
  additionalFieldKey?: string;
}) {
  const [open, setOpen] = useState(false);
  const [addNew, setAddNew] = useState(false);

  // if field is not avaliable in dropdown
  function handleAddNewField() {
    setAddNew(true);
    setOpen(false);
    onChange(defaultFieldId, "", "");
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[240px] justify-between"
          >
            {options.some((option) => option.id === value.id)
              ? value.name
              : `Select ${field}...`}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0">
          <Command>
            <CommandInput placeholder={`Search ${field}...`} className="h-9" />
            <CommandList>
              <CommandEmpty className="p-2 text-sm text-center">
                No {field} found.
                <Button
                  variant={"default"}
                  className="ml-2 w-fit"
                  onClick={handleAddNewField}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddNewField();
                  }}
                >
                  Add new
                </Button>
              </CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.id}
                    value={option.id}
                    onSelect={() => {
                      onChange(option.id, option.name, "");
                      setOpen(false);
                      setAddNew(false);
                    }}
                  >
                    {option.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value.id === option.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {addNew && (
        <div className="mt-2 flex space-x-2">
          <div>
            <Input
              type="text"
              value={value.name}
              placeholder={`New ${field} name`}
              className="w-[240px]"
              onChange={(e) =>
                onChange(defaultFieldId, e.target.value, value.additionalField)
              }
            />
            {field === "branch" && (
              <Input
                type="text"
                value={value.additionalField}
                placeholder={`New ${field} ${additionalFieldKey}`}
                className="w-[240px] mt-1"
                onChange={(e) =>
                  onChange(defaultFieldId, value.name, e.target.value)
                }
              />
            )}
          </div>
          <Button
            variant={"destructive"}
            onClick={() => {
              onChange(defaultFieldId, "", "");
              setAddNew(false);
            }}
          >
            <TrashIcon />
          </Button>
        </div>
      )}
    </div>
  );
}
