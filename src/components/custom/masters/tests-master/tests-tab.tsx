"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { useRecoilState } from "recoil";
import { masterTestsState } from "@/src/store/atoms";
import { useEffect, useState } from "react";
import { getAllTests } from "./actions";
import { LoadingMasterTable } from "../../loading-master-table";

export default function TestTab() {
  const [data, setData] = useRecoilState(masterTestsState);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setData(await getAllTests());
      setIsLoading(false);
    }
    fetchData();
  }, [setData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test</CardTitle>
        <CardDescription>Maintain test master</CardDescription>
      </CardHeader>
      {isLoading && <LoadingMasterTable />}
      {!isLoading && (
        <CardContent>
          <DataTable columns={columns} data={data} />
        </CardContent>
      )}
    </Card>
  );
}
