import { Checkbox } from "@/src/components/ui/checkbox";
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
import { GetAllSamplesForProcessingType, processSamples } from "./actions";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  masterSpecificationsState,
  masterTestsState,
  samplesForProcessingState,
} from "@/src/store/atoms";
import { useState } from "react";
import { SelectField } from "../new-package-entry/select-field";
import { isValidUUID } from "../new-package-entry/new-package-entry-tab";
import AddFields from "../new-package-entry/add-fields";
import { DialogClose } from "@radix-ui/react-dialog";

const createSeedSample = (sample: GetAllSamplesForProcessingType) => ({
  id: sample.id,
  description: "",
  quantity: "",
  unit: "",
  drawnByGeoChem: false,
  mfgName: "",
  mfgLicenceNumber: "",
  batchNumber: "",
  batchSizeQuantity: "",
  batchSizeUnit: "",
  mfgDate: undefined as Date | undefined,
  expDate: undefined as Date | undefined,
  status: sample.status,
  masterSample: sample.masterSample,
  tests: [{ id: "1", name: "" }],
  specification: { id: "1", name: "" },
  package: sample.package,
});

export type SeedSampleProcessingType = ReturnType<typeof createSeedSample>;

export function FillSampleDetail({
  sample,
}: {
  sample: GetAllSamplesForProcessingType;
}) {
  const seedSample = createSeedSample(sample);
  const [sampleRow, setSampleRow] = useState(seedSample);
  const specifications = useRecoilValue(masterSpecificationsState);
  const masterTests = useRecoilValue(masterTestsState);
  const setSamples = useSetRecoilState(samplesForProcessingState);

  function setItems(
    updater:
      | ((
          prevItems: { id: string; name: string }[]
        ) => { id: string; name: string }[])
      | { id: string; name: string }[]
  ) {
    setSampleRow((s) => {
      const prevItems = s.tests; // or whatever field you're updating
      const newItems =
        typeof updater === "function" ? updater(prevItems) : updater;

      return {
        ...s,
        tests: newItems,
      };
    });
  }

  async function handleSubmit() {
    try {
      await processSamples({ ...sampleRow, status: "testing" });
      setSamples((samples) => samples.filter((s) => s.id !== sampleRow.id));
    } catch (error) {
      console.log("error from process-samples:", error);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            // reset the data when reopening the modal
            onClick={() => {
              setSampleRow(seedSample);
            }}
          >
            Process
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[60vw] max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{sample.masterSample.name}</DialogTitle>
            <DialogDescription>Update details of the sample.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 w-full gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Description"
                value={sampleRow.description}
                onChange={(e) =>
                  setSampleRow((s) => ({ ...s, description: e.target.value }))
                }
              />
            </div>
            <div className="flex space-x-2">
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="quantity">Sample Quantity</Label>
                <Input
                  id="quantity"
                  placeholder="Quantity of sample"
                  value={sampleRow.quantity}
                  onChange={(e) =>
                    setSampleRow((s) => ({
                      ...s,
                      quantity: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col my-5 w-full">
                <Input
                  id="unit"
                  placeholder="Unit of measuremeant"
                  value={sampleRow.unit}
                  onChange={(e) =>
                    setSampleRow((s) => ({
                      ...s,
                      unit: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex space-x-1.5 items-center">
              <Label htmlFor="drawn-by-geoChem">Drawn by GeoChem</Label>
              <Checkbox
                id="drawn-by-geoChem"
                checked={sampleRow.drawnByGeoChem}
                onCheckedChange={(checked) => {
                  setSampleRow((s) => ({
                    ...s,
                    drawnByGeoChem: checked === true ? true : false,
                  }));
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mfg-name">Manufacturer Name</Label>
              <Input
                id="mfg-name"
                placeholder="Name of the sample manufacturer"
                value={sampleRow.mfgName}
                onChange={(e) =>
                  setSampleRow((s) => ({
                    ...s,
                    mfgName: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mfg-licence-number">
                Manufacturer Licence Number
              </Label>
              <Input
                id="mfg-licence-number"
                placeholder="Licence number of  manufacturer"
                value={sampleRow.mfgLicenceNumber}
                onChange={(e) =>
                  setSampleRow((s) => ({
                    ...s,
                    mfgLicenceNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="batch-number">Batch Number</Label>
              <Input
                id="batch-number"
                placeholder="Batch number of sample"
                value={sampleRow.batchNumber}
                onChange={(e) =>
                  setSampleRow((s) => ({
                    ...s,
                    batchNumber: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex space-x-2">
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="batch-size">Batch size</Label>
                <Input
                  id="batch-quantity"
                  placeholder="Quantity of batch"
                  value={sampleRow.batchSizeQuantity}
                  onChange={(e) =>
                    setSampleRow((s) => ({
                      ...s,
                      batchSizeQuantity: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col my-5 w-full">
                <Input
                  id="batch-unit"
                  placeholder="Unit of measuremeant"
                  value={sampleRow.batchSizeUnit}
                  onChange={(e) =>
                    setSampleRow((s) => ({
                      ...s,
                      batchSizeUnit: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="mfg-date">Manufacturing Date</Label>
              <DatePicker
                date={sampleRow.mfgDate}
                onDateChange={(date) =>
                  setSampleRow((s) => ({
                    ...s,
                    mfgDate: date,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="exp-date">Expiration Date</Label>
              <DatePicker
                date={sampleRow.expDate}
                onDateChange={(date) =>
                  setSampleRow((s) => ({
                    ...s,
                    expDate: date,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="test-specification">Test specification</Label>
              <SelectField
                defaultFieldId="1"
                options={specifications}
                value={sampleRow.specification}
                onChange={(specificationId, specificationName) => {
                  if (
                    isValidUUID(specificationId) &&
                    specificationId === sampleRow.specification.id
                  ) {
                    //if double clicking to disselect the currently selected field
                    setSampleRow((s) => ({
                      ...s,
                      specification: { id: "1", name: "" },
                    }));
                  } else {
                    setSampleRow((s) => ({
                      ...s,
                      specification: {
                        id: specificationId,
                        name: specificationName,
                      },
                    }));
                  }
                }}
                field="specification"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="sample">Tests</Label>
              <AddFields
                items={sampleRow.tests}
                setItems={setItems}
                options={masterTests}
                field="test"
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <DialogClose>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <DialogClose>
                <Button onClick={handleSubmit}>
                  Save and Push for Testing
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
