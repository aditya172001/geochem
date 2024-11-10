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
import { useEffect } from "react";
import { getAllTests } from "./actions";

export default function TestTab() {
  const [data, setData] = useRecoilState(masterTestsState);
  useEffect(() => {
    async function fetchData() {
      setData(await getAllTests());
    }
    fetchData();
  }, [setData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Test</CardTitle>
        <CardDescription>Maintain test master</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
