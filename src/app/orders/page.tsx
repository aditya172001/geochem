import { TabsContent } from "@/src/components/ui/tabs";
import { NewPackageEntryTab } from "@/src/components/custom/orders/new-package-entry/new-package-entry-tab";
import ProcessSampleTab from "@/src/components/custom/orders/process-sample/process-sample-tab";
import UpdateTestResultTab from "@/src/components/custom/orders/update-test-result/update-test-result-tab";
import GetReportTab from "@/src/components/custom/orders/get-report/get-report-tab";
import { SelectOrderPageTab } from "@/src/components/custom/orders/select-order-page-tab";
import { Suspense } from "react";
import { LoadingIcon } from "@/src/components/custom/extras/loading-icon";

enum TabOptions {
  preEntry = "preEntry",
  processSample = "processSample",
  updateTestResult = "updateTestResult",
  getReport = "getReport",
}

export default function OrdersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6">Orders</h1>
          <Suspense fallback={<LoadingIcon className=" animate-spin" />}>
            <SelectOrderPageTab>
              <TabsContent value={TabOptions.preEntry}>
                <NewPackageEntryTab />
              </TabsContent>
              <TabsContent value={TabOptions.processSample}>
                <ProcessSampleTab />
              </TabsContent>
              <TabsContent value={TabOptions.updateTestResult}>
                <UpdateTestResultTab />
              </TabsContent>
              <TabsContent value={TabOptions.getReport}>
                <GetReportTab />
              </TabsContent>
            </SelectOrderPageTab>
          </Suspense>
        </div>
      </main>
    </div>
  );
}
