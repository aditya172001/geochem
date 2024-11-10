"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EditMasterSpecification } from "./edit-master-specifications";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Specification = {
  id: string; //for sample table ref
  name: string; //for master table ref
};

export const columns: ColumnDef<Specification>[] = [
  {
    accessorKey: "name",
    header: "Specification Name",
  },
  {
    id: "edit",
    cell: ({ row }) => {
      const specification = row.original;
      return (
        <div className="text-right font-medium">
          <EditMasterSpecification specification={specification} />
        </div>
      );
    },
  },
];
