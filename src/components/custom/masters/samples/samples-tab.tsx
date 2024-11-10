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
import { useEffect, useState } from "react";
import { getAllMasterSamples } from "./actions";
import { LoadingMasterTable } from "../../loading-master-table";

export default function SampleTab() {
  const [data, setData] = useRecoilState(masterSamplesState);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setData(await getAllMasterSamples());
    }
    fetchData();
    setIsLoading(false);
  }, [setData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample</CardTitle>
        <CardDescription>Maintain sample master</CardDescription>
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
