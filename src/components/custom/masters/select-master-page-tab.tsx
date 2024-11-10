"use client";

import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

enum TabOptions {
  sample = "sample",
  test = "test",
  specification = "specification",
  specificationLimit = "specificationLimit",
}

export function SelectMasterPageTab({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const stage = searchParams.get("item") || "";

  function handlTabChange(value: string) {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("item", value);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  }

  return (
    <Tabs value={stage} className="w-full" onValueChange={handlTabChange}>
      <TabsList className="grid w-full grid-cols-4 mb-8 h-12">
        <TabsTrigger value={TabOptions.sample} className="h-10 text-md">
          Samples
        </TabsTrigger>
        <TabsTrigger value={TabOptions.test} className="h-10 text-md">
          Tests
        </TabsTrigger>
        <TabsTrigger value={TabOptions.specification} className="h-10 text-md">
          Specifications
        </TabsTrigger>
        <TabsTrigger
          value={TabOptions.specificationLimit}
          className="h-10 text-md"
        >
          Specification Limits
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
}
