"use client";

import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { PdfReport } from "../../pdf-report";
import { GetAllSamplesForReportType } from "./actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<GetAllSamplesForReportType>[] = [
  {
    id: "name",
    accessorKey: "masterSample.name",
    header: "Sample Name",
  },
  {
    id: "party",
    accessorKey: "package.branch.party.name",
    header: "Party",
  },
  {
    id: "branch",
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
        <div className="text-right font-medium">
          {row.original.package.collectionDate.toISOString().split("T")[0]}
        </div>
      );
    },
  },
  {
    id: "download-pdf",
    accessorKey: "ref-pdf",
    header: () => <div className="text-right">Final Pdf</div>,
    cell: ({ row }) => {
      const sample = row.original;
      return (
        <div className="text-right font-medium">
          <Button>{sample && <PdfReport sample={sample} />}</Button>
        </div>
      );
    },
  },
];
