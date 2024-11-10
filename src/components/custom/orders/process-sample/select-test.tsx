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
import { InputRow } from "./add-tests";
import { Label } from "@radix-ui/react-label";

const tests = [
  {
    name: "Test 1",
  },
  {
    name: "Test 2",
  },
  {
    name: "Test 3",
  },
];

export function SelectTest({
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

  function handleAddNewTest() {
    setAddNew(true);
    handleOpenPopover(row.id, false);
  }

  return (
    <div className="flex-grow">
      <Label htmlFor={`input-${row.id}`} className="sr-only">
        Test {index + 1}
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
              {tests.some((test) => test.name === row.value)
                ? row.value
                : "Select test..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[240px] p-0">
            <Command>
              <CommandInput placeholder="Search test..." className="h-9" />
              <CommandList>
                <CommandEmpty className="p-2 text-sm text-center">
                  No test found.
                  <Button
                    variant={"default"}
                    className="ml-2 w-fit"
                    onClick={handleAddNewTest}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddNewTest();
                    }}
                  >
                    Add new
                  </Button>
                </CommandEmpty>
                <CommandGroup>
                  {tests.map((test) => (
                    <CommandItem
                      key={test.name}
                      value={test.name}
                      onSelect={(currentValue) => {
                        updateRowValue(
                          row.id,
                          currentValue === row.value ? "" : currentValue
                        );
                        handleOpenPopover(row.id, false);
                        setAddNew(false);
                      }}
                    >
                      {test.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          row.value === test.name ? "opacity-100" : "opacity-0"
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
              placeholder="New test name"
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
