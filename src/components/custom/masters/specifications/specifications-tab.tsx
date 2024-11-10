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
import { useEffect } from "react";
import { getAllSpecifications } from "./actions";

export default function SpecificationTab() {
  const [data, setData] = useRecoilState(masterSpecificationsState);
  useEffect(() => {
    async function fetchData() {
      setData(await getAllSpecifications());
    }
    fetchData();
  }, [setData]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Specification</CardTitle>
        <CardDescription>Maintain specification master</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
