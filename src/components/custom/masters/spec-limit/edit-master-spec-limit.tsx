import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import { SpecLimit } from "./columns";
import { useSetRecoilState } from "recoil";
import { masterSpecLimitsState } from "@/src/store/atoms";
import { updateSpecLimitById } from "./action";

// dialogue

export function EditMasterSpecLimit({ specLimit }: { specLimit: SpecLimit }) {
  const [newSpecLimit, setNewSpecLimit] = useState(specLimit);
  const setData = useSetRecoilState(masterSpecLimitsState);
  const handleMasterSpecLimitUpdate = async () => {
    try {
      const updatedRowData = await updateSpecLimitById({
        id: newSpecLimit.id,
        description: newSpecLimit.description,
        minQuantity: newSpecLimit.minQuantity,
        maxQuantity: newSpecLimit.maxQuantity,
        unit: newSpecLimit.unit,
        year: newSpecLimit.year,
      });

      setData((oldSamples) =>
        oldSamples.map((oldSample) =>
          oldSample.id === updatedRowData.id ? updatedRowData : oldSample
        )
      );
    } catch (err) {
      console.log("error from editmaster spec limit:", err);
      // setError("Failed to update the sample.");
    } finally {
      // setLoading(false);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Pencil2Icon />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[400px] max-h-fit overflow-auto">
          <DialogHeader>
            <DialogTitle className="w-[340px] grid grid-rows-4">
              <div>Limit for</div>
              <div className=" font-medium text-sm">
                {specLimit.sampleName},
              </div>
              <div className=" font-medium text-sm">{specLimit.testName},</div>
              <div className=" font-medium text-sm">
                {specLimit.specificationName}
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="grid w-full gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="New description"
                value={newSpecLimit.description}
                onChange={(e) =>
                  setNewSpecLimit((oldLimit) => ({
                    ...oldLimit,
                    description: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="minQuantity">Minimum Quantity</Label>
              <Input
                id="minQuantity"
                placeholder="Lower limit for test result"
                value={newSpecLimit.minQuantity}
                onChange={(e) =>
                  setNewSpecLimit((oldLimit) => ({
                    ...oldLimit,
                    minQuantity: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="maxQuantity">Maximum Quantity</Label>
              <Input
                id="maxQuantity"
                placeholder="Upper limit for test result"
                value={newSpecLimit.maxQuantity}
                onChange={(e) =>
                  setNewSpecLimit((oldLimit) => ({
                    ...oldLimit,
                    maxQuantity: Number(e.target.value),
                  }))
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="unit">Unit of Measurement</Label>
              <Input
                id="unit"
                placeholder="Unit of Measurement"
                value={newSpecLimit.unit}
                onChange={(e) =>
                  setNewSpecLimit((oldLimit) => ({
                    ...oldLimit,
                    unit: e.target.value,
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
              {/* keep it disabled untill changes are update in be */}
              <DialogClose asChild>
                <Button onClick={handleMasterSpecLimitUpdate}>
                  Save changes
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
