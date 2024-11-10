"use client";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
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
import { Label } from "@radix-ui/react-label";
import { InputRow } from "./add-master-spec-limit";

export function SelectMasterField({
  index,
  row,
  updateNestedField,
  field,
  fieldData,
}: {
  index: number;
  row: InputRow;
  updateNestedField: <K extends "sample" | "test" | "specification">(
    id: number,
    field: K,
    nestedField: keyof InputRow[K],
    value: InputRow[K][typeof nestedField]
  ) => void;
  field: "sample" | "test" | "specification";
  fieldData: { id: string; name: string }[]; // Data for samples or tests
}) {
  const isFieldOpen = row[field].isOpen;
  const fieldId = row[field].id;
  const fieldName = row[field].name;

  return (
    <div className="flex-grow">
      <Label htmlFor={`input-${row.id}`} className="sr-only">
        {field} {index + 1}
      </Label>
      <div>
        <Popover
          open={isFieldOpen}
          onOpenChange={(isOpen) => {
            updateNestedField(row.id, field, "isOpen", isOpen);
          }}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={isFieldOpen}
              className="w-[160px] justify-between"
            >
              {fieldData.some((item) => item.name === fieldName)
                ? fieldName
                : `Select ${field.substring(0, 8)}...`}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[160px] p-0">
            <Command>
              <CommandInput
                placeholder={`Search ${field}...`}
                className="h-9"
              />
              <CommandList>
                <CommandEmpty className="p-2 text-sm text-center">
                  No {field} found.
                </CommandEmpty>
                <CommandGroup>
                  {fieldData.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.id}
                      onSelect={(currentValue) => {
                        updateNestedField(
                          row.id,
                          field,
                          "id",
                          currentValue === fieldId ? "" : item.id
                        );
                        updateNestedField(
                          row.id,
                          field,
                          "name",
                          currentValue === fieldId ? "" : item.name
                        );
                        updateNestedField(row.id, field, "isOpen", false);
                      }}
                    >
                      {item.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          fieldName === item.name ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
