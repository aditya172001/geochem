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

const parties = [
  {
    name: "Party 1",
  },
  {
    name: "Party 2",
  },
  {
    name: "Party 3",
  },
];

export function SelectParty() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [addNew, setAddNew] = useState(false);

  function handleAddNewParty() {
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
            {parties.some((party) => party.name === value)
              ? value
              : "Select party..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-0">
          <Command>
            <CommandInput placeholder="Search party..." className="h-9" />
            <CommandList>
              <CommandEmpty className="p-2 text-sm text-center">
                No party found.
                <Button
                  variant={"default"}
                  className="ml-2 w-fit"
                  onClick={handleAddNewParty}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddNewParty();
                  }}
                >
                  Add new
                </Button>
              </CommandEmpty>
              <CommandGroup>
                {parties.map((party) => (
                  <CommandItem
                    key={party.name}
                    value={party.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      setAddNew(false);
                    }}
                  >
                    {party.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === party.name ? "opacity-100" : "opacity-0"
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
            placeholder="New party name"
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
