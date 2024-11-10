"use server";

import prisma from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { SeedSampleProcessingType } from "./fill-sample-detail";

export type GetAllSamplesForProcessingType = Prisma.SampleGetPayload<{
  where: {
    status: "processing";
  };
  select: {
    id: true;
    masterSample: { select: { name: true } };
    status: true;
    package: {
      select: {
        collectionDate: true;
        branch: {
          select: {
            name: true;
            party: { select: { name: true } };
          };
        };
      };
    };
  };
}>;

export async function getAllSamplesForProcessing(): Promise<
  GetAllSamplesForProcessingType[]
> {
  const samples = await prisma.sample.findMany({
    where: {
      status: "processing",
    },
    select: {
      id: true,
      masterSample: { select: { name: true } },
      status: true,
      package: {
        select: {
          collectionDate: true,
          branch: {
            select: {
              name: true,
              party: { select: { name: true } },
            },
          },
        },
      },
    },
  });

  return samples;
}

export async function processSamples(
  data: SeedSampleProcessingType
): Promise<void> {
  try {
    // Update the sample record
    // create specifications if not present
    let specificationData = await prisma.masterSpecification.findUnique({
      where: { id: data.specification.id },
    });
    if (!specificationData)
      specificationData = await prisma.masterSpecification.create({
        data: { name: data.specification.name },
      });

    // create master test if not present
    const associatedMasterTests = await Promise.all(
      data.tests.map(async (t) => {
        if (await prisma.masterTest.findUnique({ where: { id: t.id } }))
          return t;
        else {
          return await prisma.masterTest.create({
            data: { name: t.name },
          });
        }
      })
    );

    await prisma.sample.update({
      where: { id: data.id },
      data: {
        description: data.description, // Example field update
        quantity: Number(data.quantity),
        unit: data.unit,
        batchNumber: data.batchNumber,
        batchSizeQuantity: Number(data.batchSizeQuantity),
        batchSizeUnit: data.batchSizeUnit,
        drawnByGeoChem: data.drawnByGeoChem,
        mfgName: data.mfgName,
        mfgLicenceNumber: data.mfgLicenceNumber,
        mfgDate: data.mfgDate,
        expDate: data.expDate,
        status: data.status,
        masterSpecification: {
          connect: { id: specificationData.id },
        },
        tests: {
          create: associatedMasterTests.map((test) => ({
            masterTest: {
              connect: {
                id: test.id,
              },
            },
          })),
        },
      },
    });

    // console.log("Sample updated successfully:", updatedSample);
  } catch (error) {
    console.error("Error updating sample:", error);
  }
}
