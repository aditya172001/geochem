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
import {
  masterSpecificationsState,
  masterTestsState,
  samplesForProcessingState,
} from "@/src/store/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getAllSamplesForProcessing } from "./actions";
import { getAllSpecifications } from "../../masters/specifications/actions";
import { getAllTests } from "../../masters/tests-master/actions";
import { LoadingMasterTable } from "../../loading-master-table";

export default function ProcessSampleTab() {
  const [samples, setSamples] = useRecoilState(samplesForProcessingState);
  const setMasterSpecifications = useSetRecoilState(masterSpecificationsState);
  const setMasterTests = useSetRecoilState(masterTestsState);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setSamples(await getAllSamplesForProcessing());
      setMasterSpecifications(await getAllSpecifications());
      setMasterTests(await getAllTests());
      setIsLoading(false);
    }
    fetchData();
  }, [setSamples, setMasterSpecifications, setMasterTests, setIsLoading]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Process Sample</CardTitle>
        <CardDescription>
          Select a sample to process and record testing procedures.
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
