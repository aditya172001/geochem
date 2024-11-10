"use client";

import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { FillSampleDetail } from "./fill-sample-detail";
import { GetAllSamplesForProcessingType } from "./actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<GetAllSamplesForProcessingType>[] = [
  {
    id: "sampleName",
    accessorKey: "masterSample.name",
    header: "Sample Name",
  },
  {
    id: "partyName",
    accessorKey: "package.branch.party.name",
    header: "Party",
  },
  {
    id: "branchName",
    accessorKey: "package.branch.name",
    header: "Branch",
  },
  {
    id: "collectionDate",
    accessorKey: "package.collectionDate",
    header: ({ column }) => (
      <div className="text-right">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date of Receipt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-right">
          {row.original.package.collectionDate.toISOString().split("T")[0]}
        </div>
      );
    },
  },
  {
    id: "process",
    cell: ({ row }) => {
      const sample = row.original;
      return (
        <div className="text-right">
          <FillSampleDetail sample={sample} />
        </div>
      );
    },
  },
];
