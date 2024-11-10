"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EditMasterSample } from "./edit-master-sample";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Sample = {
  id: string; //for sample table ref
  name: string; //for master table ref
};

export const columns: ColumnDef<Sample>[] = [
  {
    accessorKey: "name",
    header: "Sample Name",
  },
  {
    id: "edit",
    cell: ({ row }) => {
      const sample = row.original;
      return (
        <div className="text-right font-medium">
          <EditMasterSample sample={sample} />
        </div>
      );
    },
  },
];
