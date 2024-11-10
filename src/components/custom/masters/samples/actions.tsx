"use server";

import prisma from "@/prisma/db";
import { Sample } from "./columns";

export async function getAllMasterSamples(): Promise<Sample[]> {
  const samples = await prisma.masterSample.findMany();
  return samples;
}

export async function addSamples(
  samples: { name: string }[]
): Promise<Sample[]> {
  // check for duplicates
  const createdSamples = await Promise.all(
    samples.map(
      async (sample) => await prisma.masterSample.create({ data: sample })
    )
  );
  return createdSamples;
}

export async function updateSampleById(
  id: string,
  name: string
): Promise<Sample> {
  const updatedSample = await prisma.masterSample.update({
    where: { id },
    data: { name },
  });
  return updatedSample;
}
