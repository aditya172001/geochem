"use client";

import { useState } from "react";
import { PlusCircle, TrashIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { SelectTest } from "./select-test";

export interface InputRow {
  id: number;
  open: boolean;
  value: string;
}

export default function AddTests() {
  const [rows, setRows] = useState<InputRow[]>([
    { id: 1, open: false, value: "" },
  ]);

  const addRow = () => {
    const newId =
      rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    setRows((oldRows) => [...oldRows, { id: newId, open: false, value: "" }]);
  };

  const removeRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const updateRowValue = (id: number, value: string) => {
    setRows((oldRows) =>
      oldRows.map((row) => (row.id === id ? { ...row, value } : row))
    );
  };

  function handleOpenPopover(id: number, isOpen: boolean) {
    setRows((oldRows) =>
      oldRows.map((row) => (row.id === id ? { ...row, open: isOpen } : row))
    );
  }

  return (
    <div>
      <div className="space-y-4">
        <Button type="button" onClick={addRow} variant="default">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Test
        </Button>
        {rows.map((row, index) => (
          <div key={row.id} className="flex items-center space-x-2">
            <SelectTest
              index={index}
              row={row}
              handleOpenPopover={handleOpenPopover}
              updateRowValue={updateRowValue}
            />
            {rows.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeRow(row.id)}
                aria-label={`Remove row ${index + 1}`}
              >
                <TrashIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
