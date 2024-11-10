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
import { masterSpecificationsState } from "@/src/store/atoms";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { getAllSpecifications } from "./actions";
import { LoadingMasterTable } from "../../loading-master-table";

export default function SpecificationTab() {
  const [data, setData] = useRecoilState(masterSpecificationsState);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setData(await getAllSpecifications());
      setIsLoading(false);
    }
    fetchData();
  }, [setData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Specification</CardTitle>
        <CardDescription>Maintain specification master</CardDescription>
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
