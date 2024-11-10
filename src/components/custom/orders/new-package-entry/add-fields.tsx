"use client";

import { PlusCircle, TrashIcon } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { SelectField } from "./select-field";
import { isValidUUID } from "./new-package-entry-tab";

export interface InputRow {
  id: number;
  open: boolean;
  value: string;
}

export function isIntegerString(value: string): boolean {
  const parsed = Number(value);
  return !isNaN(parsed) && Number.isInteger(parsed);
}

export default function AddFields({
  items,
  setItems,
  options,
  field,
}: {
  items: { id: string; name: string }[];
  setItems: (
    updater:
      | ((
          prevItems: { id: string; name: string }[]
        ) => { id: string; name: string }[])
      | { id: string; name: string }[]
  ) => void;
  options: { id: string; name: string }[];
  field: "party" | "branch" | "sample" | "test" | "specification";
}) {
  const getNewId = () => {
    return String(
      items.length > 0
        ? Math.max(
            ...items.map((item) =>
              isIntegerString(item.id) ? Number(item.id) : 0
            )
          ) + 1
        : 1
    );
  };

  const addRow = () => {
    setItems((oldItems) => [...oldItems, { id: getNewId(), name: "" }]);
  };

  const removeRow = (id: string) => {
    setItems((oldItems) =>
      oldItems.filter((item) => {
        return item.id !== id;
      })
    );
  };

  return (
    <div>
      <div className="space-y-4">
        <Button type="button" onClick={addRow} variant="default">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add {field.charAt(0).toUpperCase() + field.slice(1)}
        </Button>
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <SelectField
              defaultFieldId={getNewId()}
              options={options}
              value={item}
              onChange={(itemId, itemName) => {
                if (isValidUUID(itemId) && itemId === item.id) {
                  //if double clicking to disselect the currently selected field
                  setItems((oldItems) =>
                    oldItems.map((oldItem) =>
                      oldItem.id === item.id
                        ? { id: getNewId(), name: "" }
                        : oldItem
                    )
                  );
                } else {
                  setItems((oldItems) =>
                    oldItems.map((oldItem) =>
                      oldItem.id === item.id
                        ? { id: itemId, name: itemName }
                        : oldItem
                    )
                  );
                }
              }}
              field={field}
            />
            {items.length > 1 && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeRow(item.id)}
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
