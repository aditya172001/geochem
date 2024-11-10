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
import { Button } from "@/src/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { PlusCircle, TrashIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { SelectMasterField } from "./select-master-field";
import { Textarea } from "@/src/components/ui/textarea";
import { useRecoilState } from "recoil";
import {
  masterSamplesState,
  masterSpecificationsState,
  masterSpecLimitsState,
  masterTestsState,
} from "@/src/store/atoms";
import { getAllSpecifications } from "../specifications/actions";
import { getAllTests } from "../tests-master/actions";
import { getAllMasterSamples } from "../samples/actions";
import { addSpecLimits } from "./action";
import { toast } from "sonner";

export interface InputRow {
  id: number;
  sample: { id: string; name: string; isOpen: boolean };
  test: { id: string; name: string; isOpen: boolean };
  specification: { id: string; name: string; isOpen: boolean };
  description: string;
  minQuantity: number;
  maxQuantity: number;
  unit: string;
  year: number;
}

const initialObj = {
  id: 1,
  sample: { id: "", name: "", isOpen: false },
  test: { id: "", name: "", isOpen: false },
  specification: { id: "", name: "", isOpen: false },
  description: "",
  minQuantity: 0,
  maxQuantity: 0,
  unit: "",
  year: 2020,
};

export function AddMasterSpecLimit() {
  const [samples, setSamples] = useRecoilState(masterSamplesState);
  const [tests, setTests] = useRecoilState(masterTestsState);
  const [specifications, setSpecifications] = useRecoilState(
    masterSpecificationsState
  );
  const [data, setData] = useRecoilState(masterSpecLimitsState);

  useEffect(() => {
    async function fetchData() {
      setSamples(await getAllMasterSamples());
      setTests(await getAllTests());
      setSpecifications(await getAllSpecifications());
    }
    fetchData();
  }, [setSamples, setTests, setSpecifications]);

  const [rows, setRows] = useState<InputRow[]>([initialObj]);

  const addRow = () => {
    const newId =
      rows.length > 0 ? Math.max(...rows.map((row) => row.id)) + 1 : 1;
    setRows((oldRows) => [
      ...oldRows,
      {
        id: newId,
        sample: { id: "", name: "", isOpen: false },
        test: { id: "", name: "", isOpen: false },
        specification: { id: "", name: "", isOpen: false },
        description: "",
        minQuantity: 0,
        maxQuantity: 0,
        unit: "",
        year: 2020,
      },
    ]);
  };

  const removeRow = (id: number) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const updateNonNestedField = <
    K extends Exclude<keyof InputRow, "sample" | "test" | "specification">
  >(
    id: number,
    field: K,
    value: InputRow[K]
  ) => {
    setRows((oldRows) =>
      oldRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const updateNestedField = <K extends "sample" | "test" | "specification">(
    id: number,
    field: K,
    nestedField: keyof InputRow[K],
    value: InputRow[K][typeof nestedField]
  ) => {
    setRows((oldRows) =>
      oldRows.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: {
                ...row[field],
                [nestedField]: value,
              },
            }
          : row
      )
    );
  };

  const handleSubmit = async () => {
    const specLimitsToBeAdded = rows.map((row) => {
      return {
        masterSampleId: row.sample.id,
        masterTestId: row.test.id,
        masterSpecificationId: row.specification.id,
        description: row.description,
        minQuantity: row.minQuantity,
        maxQuantity: row.maxQuantity,
        unit: row.unit,
        year: row.year,
      };
    });
    try {
      const response = await addSpecLimits(specLimitsToBeAdded);
      response.errors.map((e) => toast(e));
      const updatedData = [...data, ...response.success];
      setData(updatedData);
    } catch (error) {
      console.log(error);
    } finally {
      setRows([initialObj]);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusCircledIcon className="mr-2" />
            Add Specification Limit
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-fit max-h-fit overflow-auto">
          <DialogHeader>
            <DialogTitle>Add New Specification Limits</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 ">
            <div className=" text-end">
              <Button type="button" onClick={addRow} variant="default">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>Sample</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Specification</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Min Qty</TableHead>
                  <TableHead>Max Qty</TableHead>
                  <TableHead className="text-end">Unit</TableHead>
                  <TableHead>Year</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <SelectMasterField
                        index={index}
                        row={row}
                        updateNestedField={updateNestedField}
                        field="sample"
                        fieldData={samples}
                      />
                    </TableCell>
                    <TableCell>
                      <SelectMasterField
                        index={index}
                        row={row}
                        updateNestedField={updateNestedField}
                        field="test"
                        fieldData={tests}
                      />
                    </TableCell>
                    <TableCell>
                      <SelectMasterField
                        index={index}
                        row={row}
                        updateNestedField={updateNestedField}
                        field="specification"
                        fieldData={specifications}
                      />
                    </TableCell>
                    <TableCell>
                      <Textarea
                        placeholder="description of the specification's limit"
                        className="w-40"
                        onChange={(e) =>
                          updateNonNestedField(
                            row.id,
                            "description",
                            e.target.value
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="0"
                        className="w-20"
                        onChange={(e) =>
                          updateNonNestedField(
                            row.id,
                            "minQuantity",
                            Number(e.target.value)
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="10"
                        className="w-20"
                        onChange={(e) =>
                          updateNonNestedField(
                            row.id,
                            "maxQuantity",
                            Number(e.target.value)
                          )
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="ppm"
                        className="w-20"
                        onChange={(e) =>
                          updateNonNestedField(row.id, "unit", e.target.value)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        placeholder="2020"
                        className="w-24"
                        onChange={(e) =>
                          updateNonNestedField(
                            row.id,
                            "year",
                            Number(e.target.value)
                          )
                        }
                      />
                    </TableCell>
                    {rows.length > 1 && (
                      <TableCell>
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
