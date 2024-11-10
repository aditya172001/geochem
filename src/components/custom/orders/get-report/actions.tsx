"use server";

import prisma from "@/prisma/db";
import { Prisma } from "@prisma/client";

export type CustomTestType = Prisma.TestGetPayload<{
  include: { masterTest: true };
}> & {
  description: string | null;
  minQuantity: number | null;
  maxQuantity: number | null;
};

export type GetAllSamplesForReportType = Omit<
  Prisma.SampleGetPayload<{
    include: {
      masterSample: { select: { name: true } };
      tests: {
        include: {
          masterTest: {
            select: {
              name: true;
            };
          };
        };
      };
      masterSpecification: true;
      package: {
        select: {
          shippingDate: true;
          collectionDate: true;
          branch: {
            include: {
              party: { select: { name: true } };
            };
          };
        };
      };
      report: true;
    };
  }>,
  "tests"
> & { tests: CustomTestType[] };

export async function getAllSamplesForReport(): Promise<
  GetAllSamplesForReportType[]
> {
  try {
    const samples = await prisma.sample.findMany({
      where: {
        status: "completed",
      },
      include: {
        masterSample: { select: { name: true } },
        tests: {
          include: {
            masterTest: true,
          },
        },
        masterSpecification: true,
        package: {
          select: {
            shippingDate: true,
            collectionDate: true,
            branch: {
              include: {
                party: { select: { name: true } },
              },
            },
          },
        },
        report: true,
      },
    });

    const samplesWithSpecLimitData = await Promise.all(
      samples.map(async (sample) => ({
        ...sample,
        tests: await Promise.all(
          sample.tests.map(async (test) => {
            const specLimit = await getSpecLimit(
              sample.masterSampleId,
              test.masterTestId,
              sample.masterSpecificationId || ""
            );
            return {
              ...test,
              description: specLimit ? specLimit.description : null,
              minQuantity: specLimit ? specLimit.minQuantity : null,
              maxQuantity: specLimit ? specLimit.maxQuantity : null,
            };
          })
        ),
      }))
    );
    return samplesWithSpecLimitData;
  } catch (error) {
    console.log("error in getAllSamplesForReport:", error);
    throw new Error("Error in fetching report data");
  }
}

export async function getSpecLimit(
  masterSampleId: string,
  masterTestId: string,
  masterSpecificationId: string
) {
  try {
    return await prisma.specificationLimit.findUnique({
      where: {
        masterSampleId_masterTestId_masterSpecificationId: {
          masterSampleId,
          masterTestId,
          masterSpecificationId,
        },
      },
      select: {
        description: true,
        minQuantity: true,
        maxQuantity: true,
      },
    });
  } catch (error) {
    console.log("error from getSpecLimit:", error);
    return null;
  }
}
