"use server";

import prisma from "@/prisma/db";
import { SpecificationLimit } from "@prisma/client";
import { SpecLimit } from "./columns";

export async function getAllSpecLimits(): Promise<SpecLimit[]> {
  const specLimits = await prisma.specificationLimit.findMany({
    include: {
      masterSample: true,
      masterTest: true,
      masterSpecification: true,
    },
  });
  const formattedSpecLimits = specLimits.map((specLimit) => {
    return {
      id: specLimit.id,
      sampleId: specLimit.masterSampleId,
      sampleName: specLimit.masterSample.name,
      testId: specLimit.masterTestId,
      testName: specLimit.masterTest.name,
      specificationId: specLimit.masterSpecificationId,
      specificationName: specLimit.masterSpecification.name,
      description: specLimit.description,
      minQuantity: specLimit.minQuantity,
      maxQuantity: specLimit.maxQuantity,
      unit: specLimit.unit,
      year: specLimit.year,
    };
  });
  return formattedSpecLimits;
}

type SpecificationLimitWithoutId = Omit<SpecificationLimit, "id">;

type SpecLimitResponse = {
  success: SpecLimit[];
  errors: string[];
};

export async function addSpecLimits(
  specLimits: SpecificationLimitWithoutId[]
): Promise<SpecLimitResponse> {
  const errors: string[] = [];
  const successfulSpecLimits: SpecLimit[] = [];

  for (const specLimit of specLimits) {
    try {
      // Check if the specLimit already exists
      const existingSpecLimit = await prisma.specificationLimit.findFirst({
        where: {
          masterSampleId: specLimit.masterSampleId,
          masterTestId: specLimit.masterTestId,
          masterSpecificationId: specLimit.masterSpecificationId,
        },
        include: {
          masterSample: true,
          masterSpecification: true,
          masterTest: true,
        },
      });

      if (existingSpecLimit) {
        errors.push(
          `SpecificationLimit for ${existingSpecLimit.masterSample.name}, ${existingSpecLimit.masterSpecification.name}, ${existingSpecLimit.masterTest.name} already exists.`
        );
        continue;
      }

      // Create the specLimit if it doesn’t exist
      const createdSpecLimit = await prisma.specificationLimit.create({
        data: specLimit,
        include: {
          masterSample: true,
          masterTest: true,
          masterSpecification: true,
        },
      });

      successfulSpecLimits.push({
        id: createdSpecLimit.id,
        sampleId: createdSpecLimit.masterSampleId,
        sampleName: createdSpecLimit.masterSample.name,
        testId: createdSpecLimit.masterTestId,
        testName: createdSpecLimit.masterTest.name,
        specificationId: createdSpecLimit.masterSpecificationId,
        specificationName: createdSpecLimit.masterSpecification.name,
        description: createdSpecLimit.description,
        minQuantity: createdSpecLimit.minQuantity,
        maxQuantity: createdSpecLimit.maxQuantity,
        unit: createdSpecLimit.unit,
        year: createdSpecLimit.year,
      });
    } catch (error) {
      console.error("Error occurred at addSpecLimits:", error);
      errors.push("Internal server error");
    }
  }

  return {
    success: successfulSpecLimits,
    errors,
  };
}

type SpecificationLimitForUpdateInput = Omit<
  SpecificationLimit,
  "masterSampleId" | "masterTestId" | "masterSpecificationId"
>;

export async function updateSpecLimitById(
  data: SpecificationLimitForUpdateInput
): Promise<SpecLimit> {
  const updatedSpecLimit = await prisma.specificationLimit.update({
    where: { id: data.id },
    data: data,
    include: {
      masterSample: true,
      masterTest: true,
      masterSpecification: true,
    },
  });

  const formattedSpecLimit = {
    id: updatedSpecLimit.id,
    sampleId: updatedSpecLimit.masterSampleId,
    sampleName: updatedSpecLimit.masterSample.name,
    testId: updatedSpecLimit.masterTestId,
    testName: updatedSpecLimit.masterTest.name,
    specificationId: updatedSpecLimit.masterSpecificationId,
    specificationName: updatedSpecLimit.masterSpecification.name,
    description: updatedSpecLimit.description,
    minQuantity: updatedSpecLimit.minQuantity,
    maxQuantity: updatedSpecLimit.maxQuantity,
    unit: updatedSpecLimit.unit,
    year: updatedSpecLimit.year,
  };
  return formattedSpecLimit;
}
