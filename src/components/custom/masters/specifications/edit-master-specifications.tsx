import {
  Dialog,
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
import { Specification } from "./columns";
import { useSetRecoilState } from "recoil";
import { useState } from "react";
import { masterSpecificationsState } from "@/src/store/atoms";
import { updateSpecificationById } from "./actions";
import { DialogClose } from "@radix-ui/react-dialog";

// dialogue

export function EditMasterSpecification({
  specification,
}: {
  specification: Specification;
}) {
  const [newSpecificationName, setNewSpecificationName] = useState(
    specification.name
  );
  const setData = useSetRecoilState(masterSpecificationsState);
  const handleMasterSpecificationUpdate = async (id: string, name: string) => {
    try {
      const updatedRowData = await updateSpecificationById(id, name);
      setData((oldSpecifications) =>
        oldSpecifications.map((oldSpecification) =>
          oldSpecification.id === updatedRowData.id
            ? updatedRowData
            : oldSpecification
        )
      );
    } catch (err) {
      // setError("Failed to update the specification.");
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
            <DialogTitle>{specification.name}</DialogTitle>
          </DialogHeader>
          <div className="grid w-full gap-6">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="specificationName">New Name</Label>
              <Input
                id="specificationName"
                placeholder="New name of the specification"
                value={newSpecificationName}
                onChange={(e) => setNewSpecificationName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <DialogClose>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <DialogClose>
                {/* keep it disabled untill changes are update in be */}
                <Button
                  onClick={() =>
                    handleMasterSpecificationUpdate(
                      specification.id,
                      newSpecificationName
                    )
                  }
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
