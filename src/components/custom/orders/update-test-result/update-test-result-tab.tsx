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
import { samplesForTestingState } from "@/src/store/atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getAllSamplesForTesting } from "./actions";
import { LoadingMasterTable } from "../../loading-master-table";

export default function UpdateTestResultTab() {
  const [samples, setSamples] = useRecoilState(samplesForTestingState);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setSamples(await getAllSamplesForTesting());
    }
    fetchData();
    setIsLoading(false);
  }, [setSamples, setIsLoading]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Test Result</CardTitle>
        <CardDescription>Update test results for a sample.</CardDescription>
      </CardHeader>
      {isLoading && <LoadingMasterTable />}
      {!isLoading && (
        <CardContent>
          <DataTable columns={columns} data={samples} />
        </CardContent>
      )}
    </Card>
  );
}
