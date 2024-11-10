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
import { samplesForReportState } from "@/src/store/atoms";
import { useEffect, useState } from "react";
import { getAllSamplesForReport } from "./actions";
import { LoadingMasterTable } from "../../loading-master-table";

export default function GetReportTab() {
  const [samples, setSamples] = useRecoilState(samplesForReportState);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      try {
        setSamples(await getAllSamplesForReport());
        setIsLoading(false);
      } catch (error) {
        console.log("error in fetching report data:", error);
      }
    }
    fetchData();
  }, [setSamples, setIsLoading]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Report</CardTitle>
        <CardDescription>
          Download final reports of tested samples.
        </CardDescription>
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
