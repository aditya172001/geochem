"use server";

import prisma from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { SeedSampleTestingType } from "./fill-test-result";

export type GetAllSamplesForTestingType = Prisma.SampleGetPayload<{
  where: {
    status: "testing";
  };
  include: {
    masterSample: true;
    tests: {
      include: {
        masterTest: true;
      };
    };
    masterSpecification: true;
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

export async function getAllSamplesForTesting(): Promise<
  GetAllSamplesForTestingType[]
> {
  const samples = prisma.sample.findMany({
    where: {
      status: "testing",
    },
    include: {
      masterSample: true,
      tests: {
        include: {
          masterTest: true,
        },
      },
      masterSpecification: true,
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

export async function updateTestingDetails(
  data: SeedSampleTestingType
): Promise<void> {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.sample.update({
        where: { id: data.id },
        data: {
          status: "completed",
          report: {
            create: {
              certificateNumber: data.certificateNo,
              approvalNumber: data.approvalNo,
              shippingBillNumber: data.ShippingBillNo,
              chaNumber: data.chaNo,
              trNumber: data.trNo,
              arNumber: data.arNo,
              analysisStartDate: data.analysisStartDate,
              analysisEndDate: data.analysisEndDate,
              additionalComments: data.additionalComments,
            },
          },
        },
      });

      await Promise.all(
        data.tests.map(async (t) => {
          await prisma.test.update({
            where: { id: t.id },
            data: {
              resultQuantity: t.resultQuantity,
            },
          });
        })
      );
    });
  } catch (error) {
    console.error("Error updating sample:", error);
  }
}
