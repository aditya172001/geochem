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
import { useEffect } from "react";
import { getAllSamplesForReport } from "./actions";

export default function GetReportTab() {
  const [samples, setSamples] = useRecoilState(samplesForReportState);

  useEffect(() => {
    async function fetchData() {
      try {
        setSamples(await getAllSamplesForReport());
      } catch (error) {
        console.log("error in fetching report data:", error);
      }
    }
    fetchData();
  }, [setSamples]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Get Report</CardTitle>
        <CardDescription>
          Download final reports of tested samples.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={samples} />
      </CardContent>
    </Card>
  );
}
