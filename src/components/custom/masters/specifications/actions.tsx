"use server";

import prisma from "@/prisma/db";
import { Specification } from "./columns";

export async function getAllSpecifications(): Promise<Specification[]> {
  const specifications = await prisma.masterSpecification.findMany();
  return specifications;
}

export async function addSpecifications(
  specifications: { name: string }[]
): Promise<Specification[]> {
  //check for duplicates
  const createdSpecifications = await Promise.all(
    specifications.map(
      async (specification) =>
        await prisma.masterSpecification.create({ data: specification })
    )
  );
  return createdSpecifications;
}

export async function updateSpecificationById(
  id: string,
  name: string
): Promise<Specification> {
  const updatedSpecification = await prisma.masterSpecification.update({
    where: { id },
    data: { name },
  });
  return updatedSpecification;
}
