"use client";

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
import { Sample } from "./columns";
import { useState } from "react";
import { updateSampleById } from "./actions";
import { useSetRecoilState } from "recoil";
import { masterSamplesState } from "@/src/store/atoms";

export function EditMasterSample({ sample }: { sample: Sample }) {
  const [newSampleName, setNewSampleName] = useState(sample.name);
  const setData = useSetRecoilState(masterSamplesState);
  const handleMasterSampleUpdate = async () => {
    // setLoading(true);
    // setError(null);
    try {
      const updatedRowData = await updateSampleById(sample.id, newSampleName);
      setData((oldSamples) =>
        oldSamples.map((oldSample) =>
          oldSample.id === updatedRowData.id ? updatedRowData : oldSample
        )
      );
    } catch (err) {
      // setError("Failed to update the sample.");
      console.log("error onEdit:", err);
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
            <DialogTitle>{sample.name}</DialogTitle>
          </DialogHeader>
          <div className="grid w-full gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="sampleName">New Name</Label>
              <Input
                id="sampleName"
                placeholder="New name of the sample"
                value={newSampleName}
                onChange={(e) => setNewSampleName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button
                  onClick={handleMasterSampleUpdate}
                  // disabled={loading || !newSampleName.trim()}
                >
                  {/* {loading ? "Saving..." : "Save changes"} */}
                  Save changes
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
          {/* {error && <p className="text-red-500">{error}</p>} */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
