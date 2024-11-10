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
import { masterSamplesState } from "@/src/store/atoms";
import { useEffect } from "react";
import { getAllMasterSamples } from "./actions";

export default function SampleTab() {
  const [data, setData] = useRecoilState(masterSamplesState);
  useEffect(() => {
    async function fetchData() {
      setData(await getAllMasterSamples());
    }
    fetchData();
  }, [setData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample</CardTitle>
        <CardDescription>Maintain sample master</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
