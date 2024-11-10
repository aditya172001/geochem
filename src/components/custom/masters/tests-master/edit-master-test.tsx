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
import { Test } from "./columns";
import { useState } from "react";
import { masterTestsState } from "@/src/store/atoms";
import { useSetRecoilState } from "recoil";
import { updateTestById } from "./actions";

export function EditMasterTest({ test }: { test: Test }) {
  const [newTestName, setNewTestName] = useState(test.name);
  const setData = useSetRecoilState(masterTestsState);
  const handleMasterTestUpdate = async (id: string, name: string) => {
    try {
      const updatedRowData = await updateTestById(id, name);
      setData((oldTests) =>
        oldTests.map((oldTest) =>
          oldTest.id === updatedRowData.id ? updatedRowData : oldTest
        )
      );
    } catch (err) {
    } finally {
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
            <DialogTitle>{test.name}</DialogTitle>
            {/* <DialogDescription>Update test.</DialogDescription> */}
          </DialogHeader>
          <div className="grid w-full gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="testName">New Name</Label>
              <Input
                id="testName"
                placeholder="New name of the test"
                value={newTestName}
                onChange={(e) => setNewTestName(e.target.value)}
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
                <Button
                  onClick={() => handleMasterTestUpdate(test.id, newTestName)}
                >
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
