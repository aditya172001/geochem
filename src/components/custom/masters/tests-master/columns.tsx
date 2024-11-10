"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EditMasterTest } from "./edit-master-test";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Test = {
  id: string;
  name: string;
};

export const columns: ColumnDef<Test>[] = [
  {
    accessorKey: "name",
    header: "Test Name",
  },
  {
    id: "edit",
    cell: ({ row }) => {
      const test = row.original;
      return (
        <div className="text-right font-medium">
          <EditMasterTest test={test} />
        </div>
      );
    },
  },
];
