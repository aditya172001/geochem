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
import { masterSpecLimitsState } from "@/src/store/atoms";
import { useEffect, useState } from "react";
import { getAllSpecLimits } from "./action";
import { LoadingMasterTable } from "../../loading-master-table";

export default function SpecLimitTab() {
  const [data, setData] = useRecoilState(masterSpecLimitsState);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setData(await getAllSpecLimits());
    }
    fetchData();
    setIsLoading(false);
  }, [setData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Specification Limit</CardTitle>
        <CardDescription>Maintain specification Limit</CardDescription>
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
