"use client";

import { Button } from "@/src/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { FillTestResult } from "./fill-test-result";
import { GetAllSamplesForTestingType } from "./actions";
import { PdfReport } from "../../pdf-report";
import { GetAllSamplesForReportType } from "../get-report/actions";

export const columns: ColumnDef<GetAllSamplesForTestingType>[] = [
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
    id: "update-test",
    cell: ({ row }) => {
      const sample = row.original;
      return (
        <div className="text-right font-medium">
          <FillTestResult sample={sample} />
        </div>
      );
    },
  },
  {
    id: "download-pdf",
    accessorKey: "ref-pdf",
    header: () => <div className="text-right">Reference Pdf</div>,
    cell: ({ row }) => {
      const sample = row.original;
      return (
        <div className="text-right font-medium">
          <Button>
            {sample && (
              <PdfReport
                sample={sample as unknown as GetAllSamplesForReportType}
              />
            )}
          </Button>
        </div>
      );
    },
  },
];
