"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useRecoilState } from "recoil";
import { partiesWithBranchesState } from "@/src/store/atoms";
import { useEffect } from "react";
import { getAllPartiesWithBranches } from "./actions";

export default function PartyCard() {
  const [data, setData] = useRecoilState(partiesWithBranchesState);
  useEffect(() => {
    async function fetchData() {
      setData(await getAllPartiesWithBranches());
    }
    fetchData();
  }, [setData]);

  return (
    <Card>
      <CardContent className="mt-6">
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
