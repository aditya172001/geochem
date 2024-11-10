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

const specifications = [
  {
    name: "Specification 1",
  },
  {
    name: "Specification 2",
  },
  {
    name: "Specification 3",
  },
];

export function SelectSpecification() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [addNew, setAddNew] = useState(false);

  function handleAddNewSpecification() {
    setAddNew(true);
    setOpen(false);
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
            {specifications.some(
              (specification) => specification.name === value
            )
              ? value
              : "Select specification..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0">
          <Command>
            <CommandInput
              placeholder="Search specification..."
              className="h-9"
            />
            <CommandList>
              <CommandEmpty className="p-2 text-sm text-center">
                No specification found.
                <Button
                  variant={"default"}
                  className="ml-2 w-fit"
                  onClick={handleAddNewSpecification}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddNewSpecification();
                  }}
                >
                  Add new
                </Button>
              </CommandEmpty>
              <CommandGroup>
                {specifications.map((specification) => (
                  <CommandItem
                    key={specification.name}
                    value={specification.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      setAddNew(false);
                    }}
                  >
                    {specification.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === specification.name
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
            placeholder="New specification name"
            className="w-[240px]"
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            variant={"destructive"}
            onClick={() => {
              setValue("");
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
