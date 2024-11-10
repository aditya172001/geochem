"use client";

import { Label } from "@/src/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { DatePicker } from "@/src/components/custom/date-picker";
import { SelectField } from "./select-field";
import AddFields from "./add-fields";
import { Button } from "@/src/components/ui/button";
import { useEffect, useState } from "react";
import {
  branchesState,
  masterSamplesState,
  partiesState,
} from "@/src/store/atoms";
import { useRecoilState } from "recoil";
import { addPackage, getAllParties, getBranchesByPartyId } from "./actions";
import { getAllMasterSamples } from "../../masters/samples/actions";
import { Party } from "@prisma/client";

type Sample = {
  id: string;
  name: string;
};

export type Branch = {
  name: string;
  id: string;
  address: string;
};

export type PackageType = {
  description: string;
  shippingDate: Date | undefined;
  collectionDate: Date | undefined;
  party: Party;
  branch: Branch;
  samples: Sample[];
};

export function isValidUUID(id: string): boolean {
  if (id !== "" && isNaN(Number(id))) return true;
  return false;
}

export function NewPackageEntryTab() {
  const [newPackage, setNewPackage] = useState<PackageType>({
    description: "",
    shippingDate: undefined,
    collectionDate: undefined,
    party: {
      id: "",
      name: "",
    },
    branch: { id: "", name: "", address: "" },
    samples: [{ id: "1", name: "" }],
  });

  const [parties, setParties] = useRecoilState(partiesState);
  const [branches, setBranches] = useRecoilState(branchesState);
  const [masterSamples, setMasterSamples] = useRecoilState(masterSamplesState);

  useEffect(() => {
    async function fetchData() {
      setParties(await getAllParties());
      setMasterSamples(await getAllMasterSamples());
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (isValidUUID(newPackage.party.id))
        setBranches(await getBranchesByPartyId(newPackage.party.id));
      else setBranches([]);
    }
    fetchData();
  }, [newPackage.party.id]);

  function setItems(
    updater:
      | ((
          prevItems: { id: string; name: string }[]
        ) => { id: string; name: string }[])
      | { id: string; name: string }[]
  ) {
    setNewPackage((prevPackage) => {
      const prevItems = prevPackage.samples; // or whatever field you're updating
      const newItems =
        typeof updater === "function" ? updater(prevItems) : updater;

      return {
        ...prevPackage,
        samples: newItems,
      };
    });
  }

  function handleCancel() {
    setNewPackage({
      description: "",
      shippingDate: undefined,
      collectionDate: undefined,
      party: {
        id: "",
        name: "",
      },
      branch: { id: "", name: "", address: "" },
      samples: [{ id: "1", name: "" }],
    });
  }

  async function handleSubmit() {
    try {
      await addPackage(newPackage);

      //if no error reset
      setNewPackage({
        description: "",
        shippingDate: undefined,
        collectionDate: undefined,
        party: {
          id: "",
          name: "",
        },
        branch: { id: "", name: "", address: "" },
        samples: [{ id: "1", name: "" }],
      });
    } catch (error) {
      console.log("error from new-package-entry-tab:", error);
    }
  }

  // console.log("newPackage:", newPackage);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Package Entry</CardTitle>
        <CardDescription>
          Enter details for a new samples to be tested in the lab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid grid-cols-2 w-full gap-10">
            <div className="grid w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="sample-id">Description</Label>
                <Input
                  id="package-description"
                  placeholder="Enter package description"
                  value={newPackage.description}
                  onChange={(e) =>
                    setNewPackage((oldPackage) => ({
                      ...oldPackage,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="shipping-date">Shipping Date</Label>
                <DatePicker
                  date={newPackage.shippingDate}
                  onDateChange={(date) =>
                    setNewPackage((oldPackage) => ({
                      ...oldPackage,
                      shippingDate: date ?? undefined,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="collection-date">Collection Date</Label>
                <DatePicker
                  date={newPackage.collectionDate}
                  onDateChange={(date) =>
                    setNewPackage((oldPackage) => ({
                      ...oldPackage,
                      collectionDate: date ?? undefined,
                    }))
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="party">Party</Label>
                <SelectField
                  defaultFieldId="1"
                  options={parties}
                  value={newPackage.party}
                  onChange={(partyId, partyName) => {
                    if (
                      isValidUUID(partyId) &&
                      partyId === newPackage.party.id
                    ) {
                      //if double clicking to disselect the currently selected field
                      setNewPackage((oldPackage) => ({
                        ...oldPackage,
                        party: {
                          id: "1",
                          name: "",
                        },
                      }));
                    } else {
                      setNewPackage((oldPackage) => ({
                        ...oldPackage,
                        party: {
                          id: partyId,
                          name: partyName,
                        },
                      }));
                    }
                  }}
                  field="party"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="branch">Branch</Label>
                <SelectField
                  defaultFieldId="2"
                  options={branches}
                  value={{
                    id: newPackage.branch.id,
                    name: newPackage.branch.name,
                    additionalField: newPackage.branch.address,
                  }}
                  onChange={(branchId, branchName, branchAddress) => {
                    const isExistingBranchFromDb = isValidUUID(branchId);
                    const isDeselectingBranch =
                      branchId === newPackage.branch.id;

                    setNewPackage((oldPackage) => {
                      if (isExistingBranchFromDb && isDeselectingBranch) {
                        return {
                          ...oldPackage,
                          branch: { id: "1", name: "", address: "" },
                        };
                      } else {
                        return {
                          ...oldPackage,
                          branch: {
                            // ...oldPackage.branch,
                            id: branchId,
                            name: branchName,
                            address: branchAddress!,
                          },
                        };
                      }
                    });
                  }}
                  field="branch"
                  additionalFieldKey="address"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="sample">Samples</Label>
                <AddFields
                  items={newPackage.samples}
                  setItems={setItems}
                  options={masterSamples}
                  field="sample"
                />
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </CardFooter>
    </Card>
  );
}
