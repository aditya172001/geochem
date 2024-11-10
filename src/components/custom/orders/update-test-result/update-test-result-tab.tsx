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
import { useEffect } from "react";
import { getAllSamplesForTesting } from "./actions";
import { PdfReport } from "../../pdf-report";
import { GetAllSamplesForReportType } from "../get-report/actions";

export default function UpdateTestResultTab() {
  const [samples, setSamples] = useRecoilState(samplesForTestingState);

  useEffect(() => {
    async function fetchData() {
      setSamples(await getAllSamplesForTesting());
    }
    fetchData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Test Result</CardTitle>
        <CardDescription>Update test results for a sample.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={samples} />
      </CardContent>
    </Card>
  );
}
