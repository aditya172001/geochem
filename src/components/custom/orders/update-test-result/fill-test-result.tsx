import { DatePicker } from "@/src/components/custom/date-picker";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { GetAllSamplesForTestingType, updateTestingDetails } from "./actions";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { useSetRecoilState } from "recoil";
import { samplesForTestingState } from "@/src/store/atoms";
import { Textarea } from "@/src/components/ui/textarea";

const createSeedTestingResult = (sample: GetAllSamplesForTestingType) => ({
  id: sample.id,
  masterSampleId: sample.masterSampleId,
  masterSpecificationId: sample.masterSpecificationId,
  status: sample.status,
  certificateNo: "",
  approvalNo: "",
  ShippingBillNo: "",
  chaNo: "",
  trNo: "",
  arNo: "",
  additionalComments: "",
  analysisStartDate: undefined as Date | undefined,
  analysisEndDate: undefined as Date | undefined,
  tests: sample.tests,
});

export type SeedSampleTestingType = ReturnType<typeof createSeedTestingResult>;

export function FillTestResult({
  sample,
}: {
  sample: GetAllSamplesForTestingType;
}) {
  const [sampleRow, setSampleRow] = useState(createSeedTestingResult(sample));
  const setSamples = useSetRecoilState(samplesForTestingState);

  async function handleSubmit() {
    try {
      await updateTestingDetails({ ...sampleRow, status: "completed" });
      setSamples((samples) => samples.filter((s) => s.id !== sampleRow.id));
    } catch (error) {
      console.log("error from update-test-result:", error);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>Update</Button>
        </DialogTrigger>
        <DialogContent className="max-w-[60vw] max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{sample.masterSample.name}</DialogTitle>
            <DialogDescription>Update test results.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 w-full gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="certificate-number">Certificate Number</Label>
              <Input
                id="certificate-number"
                placeholder="Certificate Number"
                value={sampleRow.certificateNo}
                onChange={(e) =>
                  setSampleRow((s) => ({ ...s, certificateNo: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="approval-number">Approval Number</Label>
              <Input
                id="approval-number"
                placeholder="Approval Number"
                value={sampleRow.approvalNo}
                onChange={(e) =>
                  setSampleRow((s) => ({ ...s, approvalNo: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="shipping-bill-number">Shipping Bill Number</Label>
              <Input
                id="shipping-bill-number"
                placeholder="Shipping Bill Number"
                value={sampleRow.ShippingBillNo}
                onChange={(e) =>
                  setSampleRow((s) => ({
                    ...s,
                    ShippingBillNo: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cha-number">CHA Number</Label>
              <Input
                id="cha-number"
                placeholder="CHA Number"
                value={sampleRow.chaNo}
                onChange={(e) =>
                  setSampleRow((s) => ({ ...s, chaNo: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="tr-number">TR Number</Label>
              <Input
                id="tr-number"
                placeholder="TR Number"
                value={sampleRow.trNo}
                onChange={(e) =>
                  setSampleRow((s) => ({ ...s, trNo: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ar-number">AR Number</Label>
              <Input
                id="ar-number"
                placeholder="AR Number"
                value={sampleRow.arNo}
                onChange={(e) =>
                  setSampleRow((s) => ({ ...s, arNo: e.target.value }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="analysis-start-date">Analysis Start Date</Label>
              <DatePicker
                date={sampleRow.analysisStartDate}
                onDateChange={(date) => {
                  setSampleRow((s) => ({
                    ...s,
                    analysisStartDate: date,
                  }));
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="analysis-end-date">Analysis End Date</Label>
              <DatePicker
                date={sampleRow.analysisEndDate}
                onDateChange={(date) => {
                  setSampleRow((s) => ({
                    ...s,
                    analysisEndDate: date,
                  }));
                }}
              />
            </div>
            <div className=" col-span-2">
              <Label htmlFor="analysis-end-date">Tests</Label>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Test Name</TableHead>
                    <TableHead>Test Result</TableHead>
                    <TableHead>Reference Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sample.tests.map((test, index) => {
                    return (
                      <TableRow key={index}>
                        {/* <div className="flex items-center justify-between space-y-1.5"> */}
                        <TableCell>{test.masterTest.name}</TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            className="w-[240px]"
                            onChange={(e) => {
                              setSampleRow((s) => ({
                                ...s,
                                tests: s.tests.map((t) =>
                                  t.id === test.id
                                    ? {
                                        ...t,
                                        // add validation here
                                        resultQuantity: Number(e.target.value),
                                      }
                                    : t
                                ),
                              }));
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          {sample.masterSpecification?.name}
                        </TableCell>
                        {/* </div> */}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
            <div className="space-y-1.5 col-span-2">
              <Label htmlFor="additional-comments">Additional Comments</Label>
              <Textarea
                id="additional-comments"
                placeholder="Additional Comments"
                value={sampleRow.additionalComments}
                onChange={(e) =>
                  setSampleRow((s) => ({
                    ...s,
                    additionalComments: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button onClick={handleSubmit}>Submit</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
