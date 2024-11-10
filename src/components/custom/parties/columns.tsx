import { ColumnDef } from "@tanstack/react-table";
import { EditParty } from "./edit-party";
import { PartyWithBranchesType } from "./actions";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<PartyWithBranchesType>[] = [
  {
    accessorKey: "name",
    header: "Party Name",
  },
  {
    id: "edit",
    cell: ({ row }) => {
      const party = row.original;
      return (
        <div className="text-right font-medium">
          <EditParty partyWithBranches={party} />
        </div>
      );
    },
  },
];
