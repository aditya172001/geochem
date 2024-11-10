"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EditMasterSpecLimit } from "./edit-master-spec-limit";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SpecLimit = {
  id: string;
  sampleId: string;
  sampleName: string;
  testId: string;
  testName: string;
  specificationId: string;
  specificationName: string;
  description: string;
  minQuantity: number;
  maxQuantity: number;
  unit: string;
  year: number;
};

export const columns: ColumnDef<SpecLimit>[] = [
  {
    accessorKey: "sampleName",
    header: "Sample Name",
  },
  {
    accessorKey: "testName",
    header: "Test Name",
  },
  {
    accessorKey: "specificationName",
    header: "Specification Name",
  },
  {
    accessorKey: "description",
    header: "Specification Limit Description",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    id: "edit",
    cell: ({ row }) => {
      const specLimit = row.original;
      return (
        <div className="text-right font-medium">
          <EditMasterSpecLimit specLimit={specLimit} />
        </div>
      );
    },
  },
];
