"use client";

import { Card, CardContent } from "@/src/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useRecoilState } from "recoil";
import { partiesWithBranchesState } from "@/src/store/atoms";
import { useEffect, useState } from "react";
import { getAllPartiesWithBranches } from "./actions";
import { LoadingMasterTable } from "../loading-master-table";

export default function PartyCard() {
  const [data, setData] = useRecoilState(partiesWithBranchesState);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setData(await getAllPartiesWithBranches());
      setIsLoading(false);
    }
    fetchData();
  }, [setData]);

  return (
    <Card>
      {isLoading && <LoadingMasterTable />}
      {!isLoading && (
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      )}
    </Card>
  );
}
