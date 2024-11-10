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
import { useEffect } from "react";
import { getAllSpecLimits } from "./action";

export default function SpecLimitTab() {
  const [data, setData] = useRecoilState(masterSpecLimitsState);
  useEffect(() => {
    async function fetchData() {
      setData(await getAllSpecLimits());
    }
    fetchData();
  }, [setData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Specification Limit</CardTitle>
        <CardDescription>Maintain specification Limit</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
