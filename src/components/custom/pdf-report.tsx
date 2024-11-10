"use client";

import { Document, usePDF } from "@react-pdf/renderer";
import {
  CustomTestType,
  GetAllSamplesForReportType,
} from "./orders/get-report/actions";
import { DownloadIcon } from "lucide-react";
import { useEffect } from "react";
import { LoadingIcon } from "./extras/loading-icon";
import { ErrorIcon } from "./extras/error-icon";
import { PageOfReport } from "./pdf-page";

function calculateHeightOfTestDescription(s: string): number {
  return (s.length / 30) * 11 + 5;
}

function getPagedTests(sample: GetAllSamplesForReportType): CustomTestType[][] {
  const pagedTests: CustomTestType[][] = [];
  let currentHeight = 0;
  let currentPage: CustomTestType[] = [];
  // const temp: CustomTestType[] = Array(15).fill(sample.tests).flat();
  for (const test of sample.tests) {
    const testHeight = calculateHeightOfTestDescription(test.description || "");
    if (currentHeight + testHeight < 235) {
      currentPage.push(test);
      currentHeight += testHeight;
    } else {
      pagedTests.push(currentPage);
      currentPage = [test];
      currentHeight = testHeight;
    }
  }
  if (currentPage.length > 0) pagedTests.push(currentPage);
  return pagedTests;
}

export const SampleReport = ({
  sample,
  pagedTests,
}: {
  sample: GetAllSamplesForReportType;
  pagedTests: CustomTestType[][];
}) => (
  <Document>
    {pagedTests.map((t, index) => (
      <PageOfReport
        key={index}
        pageNo={index + 1}
        totalPages={pagedTests.length}
        sample={sample}
        tests={t}
      />
    ))}
  </Document>
);

export function PdfReport({ sample }: { sample: GetAllSamplesForReportType }) {
  const pagedTests = getPagedTests(sample);

  const [instance, updateInstance] = usePDF({
    document: SampleReport({ sample, pagedTests }),
  });

  useEffect(() => {
    if (instance.error || !instance.url || !instance.blob)
      updateInstance(SampleReport({ sample, pagedTests }));
  }, [pagedTests, sample, instance, updateInstance]);

  if (instance.loading) return <LoadingIcon className="animate-spin h-4 w-4" />;
  if (instance.error || instance.url == null || instance.blob == null)
    return <ErrorIcon className="h-4 w-4" />;

  return (
    <div>
      {/* <PDFViewer className="w-full h-screen">
        <SampleReport sample={sample} pagedTests={pagedTests} />
      </PDFViewer> */}
      <a href={instance.url || undefined} download="report.pdf">
        <DownloadIcon className="h-4 w-4" />
      </a>
    </div>
  );
}
