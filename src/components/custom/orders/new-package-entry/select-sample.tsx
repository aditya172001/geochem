"use client";

// not in use
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
import { InputRow } from "./add-fields";
import { Label } from "@radix-ui/react-label";

const samples = [
  {
    name: "Sample 1",
  },
  {
    name: "Sample 2",
  },
  {
    name: "Sample 3",
  },
];

export function SelectSample({
  index,
  row,
  handleOpenPopover,
  updateRowValue,
}: {
  index: number;
  row: InputRow;
  handleOpenPopover: (id: number, isOpen: boolean) => void;
  updateRowValue: (id: number, value: string) => void;
}) {
  const [addNew, setAddNew] = useState(false);

  function handleAddNewSample() {
    setAddNew(true);
    handleOpenPopover(row.id, false);
  }

  return (
    <div className="flex-grow">
      <Label htmlFor={`input-${row.id}`} className="sr-only">
        Sample {index + 1}
      </Label>
      <div>
        <Popover
          open={row.open}
          onOpenChange={(isOpen) => handleOpenPopover(row.id, isOpen)}
        >
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={row.open}
              className="w-[240px] justify-between"
            >
              {samples.some((sample) => sample.name === row.value)
                ? row.value
                : "Select sample..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0">
            <Command>
              <CommandInput placeholder="Search sample..." className="h-9" />
              <CommandList>
                <CommandEmpty className="p-2 text-sm text-center">
                  No sample found.
                  <Button
                    variant={"default"}
                    className="ml-2 w-fit"
                    onClick={handleAddNewSample}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddNewSample();
                    }}
                  >
                    Add new
                  </Button>
                </CommandEmpty>
                <CommandGroup>
                  {samples.map((sample) => (
                    <CommandItem
                      key={sample.name}
                      value={sample.name}
                      onSelect={(currentValue) => {
                        updateRowValue(
                          row.id,
                          currentValue === row.value ? "" : currentValue
                        );
                        handleOpenPopover(row.id, false);
                        setAddNew(false);
                      }}
                    >
                      {sample.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          row.value === sample.name
                            ? "opacity-100"
                            : "opacity-0"
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
          <div className={`mt-2 flex space-x-2 `}>
            <Input
              type="text"
              placeholder="New sample name"
              className="w-[240px]"
              onChange={(e) => updateRowValue(row.id, e.target.value)}
            />
            <Button
              variant={"destructive"}
              onClick={() => {
                updateRowValue(row.id, "");
                setAddNew(false);
              }}
            >
              <TrashIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
