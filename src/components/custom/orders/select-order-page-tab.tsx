"use client";

import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

enum TabOptions {
  preEntry = "preEntry",
  processSample = "processSample",
  updateTestResult = "updateTestResult",
  getReport = "getReport",
}

export function SelectOrderPageTab({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stage = searchParams.get("stage") || "";

  function handlTabChange(value: string) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("stage", value);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  }

  return (
    <Tabs value={stage} className="w-full" onValueChange={handlTabChange}>
      <TabsList className="grid w-full grid-cols-4 mb-8 h-12">
        <TabsTrigger value={TabOptions.preEntry} className="h-10 text-md">
          New Package Entry
        </TabsTrigger>
        <TabsTrigger value={TabOptions.processSample} className="h-10 text-md">
          Process Sample
        </TabsTrigger>
        <TabsTrigger
          value={TabOptions.updateTestResult}
          className="h-10 text-md"
        >
          Update Test Result
        </TabsTrigger>
        <TabsTrigger value={TabOptions.getReport} className="h-10 text-md">
          Get Report
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}
