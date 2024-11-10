"use server";

import prisma from "@/prisma/db";
import { Prisma } from "@prisma/client";

export type PartyWithBranchesType = Prisma.PartyGetPayload<{
  include: { branches: true };
}>;

export async function getAllPartiesWithBranches(): Promise<
  PartyWithBranchesType[]
> {
  const parties = await prisma.party.findMany({ include: { branches: true } });
  return parties;
}

export async function addPartyWithBranches(
  party: PartyWithBranchesType
): Promise<PartyWithBranchesType> {
  // check for duplicates
  const createdParty = await prisma.party.create({
    data: {
      name: party.name,
      branches: {
        create: party.branches.map((b) => ({
          name: b.name,
          address: b.address,
        })),
      },
    },
    include: {
      branches: true,
    },
  });

  return createdParty;
}

export async function updatePartyAndBranchById(
  party: PartyWithBranchesType
): Promise<PartyWithBranchesType> {
  const updatedParty = await prisma.party.update({
    where: {
      id: party.id,
    },
    data: {
      name: party.name, // Update the party name
      branches: {
        upsert: party.branches.map((b) => ({
          where: { id: b.id },
          update: {
            name: b.name,
            address: b.address,
          },
          create: {
            name: b.name,
            address: b.address,
          },
        })),
      },
    },
    include: {
      branches: true,
    },
  });

  return updatedParty;
}
