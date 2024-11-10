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
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { PlusCircle, TrashIcon } from "lucide-react";
import { masterTestsState } from "@/src/store/atoms";
import { useRecoilState } from "recoil";
import { addTests } from "./actions";

export interface InputRow {
  id: number;
  name: string;
}

export function AddMasterTest() {
  const [rows, setRows] = useState<InputRow[]>([{ id: 1, name: "" }]);
  const [data, setData] = useRecoilState(masterTestsState);

  const addRow = () => {
    const newId =
      rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    setRows((oldRows) => [...oldRows, { id: newId, name: "" }]);
  };

  const removeRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const updateRow = (id: number, name: string) => {
    setRows((oldRows) =>
      oldRows.map((row) => (row.id === id ? { ...row, name } : row))
    );
  };

  const handleSubmit = async () => {
    const testToBeAdded = rows.map((row) => ({ name: row.name }));
    const createdTests = await addTests(testToBeAdded);
    const updatedData = [...data, ...createdTests];
    setData(updatedData);
    setRows([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircledIcon className="mr-2" />
          Add Test
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px] max-h-fit overflow-auto">
        <DialogHeader>
          <DialogTitle>Add New Tests</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 ">
          <div className=" text-end">
            <Button type="button" onClick={addRow} variant="default">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
          {rows.map((row, index) => (
            <div key={row.id} className="flex items-end justify-between">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={`test${index + 1}`}>Test {index + 1}</Label>
                <Input
                  id={`test${index + 1}`}
                  placeholder="Name of new test"
                  className="w-[300px]"
                  value={row.name}
                  onChange={(e) => updateRow(row.id, e.target.value)}
                />
              </div>
              {rows.length > 1 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeRow(row.id)}
                  aria-label={`Remove row ${index + 1}`}
                  className=""
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
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
  );
}
