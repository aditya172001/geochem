"use server";

import prisma from "@/prisma/db";
import { PackageType } from "./new-package-entry-tab";

export async function getAllParties() {
  const parties = await prisma.party.findMany();
  return parties;
}

export async function getBranchesByPartyId(partyId: string) {
  const parties = await prisma.branch.findMany({
    where: { partyId },
    select: { id: true, name: true, address: true },
  });

  return parties;
}

export async function addPackage(packageData: PackageType) {
  const { description, shippingDate, collectionDate, party, branch, samples } =
    packageData;

  try {
    // create party if not present
    let partyData = await prisma.party.findUnique({
      where: { id: party.id },
    });
    if (!partyData)
      partyData = await prisma.party.create({ data: { name: party.name } });

    // create branches if not present
    let branchData = await prisma.branch.findUnique({
      where: { id: branch.id },
    });
    if (!branchData)
      branchData = await prisma.branch.create({
        data: {
          name: branch.name,
          address: branch.address,
          party: {
            connect: {
              id: partyData.id,
            },
          },
        },
      });

    // create master sample if not present
    const associatedMasterSamples = await Promise.all(
      samples.map(async (sample) => {
        if (await prisma.masterSample.findUnique({ where: { id: sample.id } }))
          return sample;
        else {
          return await prisma.masterSample.create({
            data: { name: sample.name },
          });
        }
      })
    );

    //create package and nested samples
    await prisma.package.create({
      data: {
        description,
        shippingDate: shippingDate || "update after validation",
        collectionDate: collectionDate || "update after validation",
        branch: {
          connect: {
            id: branchData.id,
          },
        },
        samples: {
          create: associatedMasterSamples.map((ms) => ({
            masterSample: {
              connect: {
                id: ms.id,
              },
            },
          })),
        },
      },
    });
  } catch (error) {
    console.log("error in addPackage action:", error);
  }

  return;
}
