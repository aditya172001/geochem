import { TabsContent } from "@/src/components/ui/tabs";
import { SelectMasterPageTab } from "@/src/components/custom/masters/select-master-page-tab";
import SampleTab from "@/src/components/custom/masters/samples/samples-tab";
import SpecificationTab from "@/src/components/custom/masters/specifications/specifications-tab";
import TestTab from "@/src/components/custom/masters/tests-master/tests-tab";
import SpecLimitTab from "@/src/components/custom/masters/spec-limit/spec-limit-tab";
import { Suspense } from "react";

enum TabOptions {
  sample = "sample",
  test = "test",
  specification = "specification",
  specificationLimit = "specificationLimit",
}

export default function MastersPage() {
  return (
    <div className="flex flex-col h-[125vh]">
      <main className="flex-grow py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Masters</h1>
          <Suspense>
            <SelectMasterPageTab>
              <TabsContent value={TabOptions.sample}>
                <SampleTab />
              </TabsContent>
              <TabsContent value={TabOptions.test}>
                <TestTab />
              </TabsContent>
              <TabsContent value={TabOptions.specification}>
                <SpecificationTab />
              </TabsContent>
              <TabsContent value={TabOptions.specificationLimit}>
                <SpecLimitTab />
              </TabsContent>
            </SelectMasterPageTab>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
