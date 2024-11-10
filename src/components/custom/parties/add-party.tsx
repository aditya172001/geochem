import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";

import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";
import { Button } from "@/src/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { PlusCircle, TrashIcon } from "lucide-react";
import { Textarea } from "@/src/components/ui/textarea";
import { isIntegerString } from "../orders/new-package-entry/add-fields";
import { addPartyWithBranches } from "./actions";
import { useSetRecoilState } from "recoil";
import { partiesWithBranchesState } from "@/src/store/atoms";

const createSeedBranch = () => ({
  id: "1",
  address: "",
  name: "",
  partyId: "",
});

export type SeedBranchType = ReturnType<typeof createSeedBranch>;

export function AddParty() {
  const [party, setParty] = useState<string>("");
  const [branches, setBranches] = useState<SeedBranchType[]>([
    createSeedBranch(),
  ]);
  const setPartiesWithBranches = useSetRecoilState(partiesWithBranchesState);

  const getNewId = () => {
    return String(
      branches.length > 0
        ? Math.max(
            ...branches.map((branch) =>
              isIntegerString(branch.id) ? Number(branch.id) : 0
            )
          ) + 1
        : 1
    );
  };
  const addRow = () => {
    setBranches((oldBranch) => [
      ...oldBranch,
      { id: getNewId(), name: "", address: "", partyId: "" },
    ]);
  };

  const removeRow = (id: string) => {
    setBranches((oldBranch) =>
      oldBranch.filter((b) => {
        return b.id !== id;
      })
    );
  };

  async function handleSubmit() {
    try {
      const partyWithBranchesData = await addPartyWithBranches({
        id: "",
        name: party,
        branches,
      });
      setPartiesWithBranches((oldData) => [...oldData, partyWithBranchesData]);
    } catch (error) {
      console.error("error in add-party:", error);
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusCircledIcon className="mr-2" />
            Add Party
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-fit max-h-fit overflow-auto">
          <DialogHeader>
            <DialogTitle>Add New Party</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 ">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor={`party`}>Party Name</Label>
              <Input
                id={`party`}
                placeholder="Name of new party"
                className="w-[300px]"
                value={party}
                onChange={(e) => setParty(e.target.value)}
              />
            </div>
            <div className=" text-end">
              <Button type="button" onClick={addRow} variant="default">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Branch
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {branches.map((branch, index) => (
                  <TableRow key={branch.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="w-60">
                      <Input
                        type="text"
                        placeholder="Name of the branch"
                        value={branch.name}
                        onChange={(e) =>
                          setBranches((branches) =>
                            branches.map((b) =>
                              b.id === branch.id
                                ? { ...b, name: e.target.value }
                                : b
                            )
                          )
                        }
                      />
                    </TableCell>
                    <TableCell className="w-60">
                      <Textarea
                        placeholder="Address of the branch"
                        value={branch.address}
                        onChange={(e) =>
                          setBranches((branches) =>
                            branches.map((b) =>
                              b.id === branch.id
                                ? { ...b, address: e.target.value }
                                : b
                            )
                          )
                        }
                      />
                    </TableCell>
                    {branches.length > 1 && (
                      <TableCell>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeRow(branch.id)}
                          aria-label={`Remove row ${index + 1}`}
                          className=""
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              {/* keep it disabled untill changes are update in be */}
              <DialogClose asChild>
                <Button onClick={handleSubmit}>Save changes</Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
