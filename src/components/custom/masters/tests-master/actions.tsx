"use server";

import prisma from "@/prisma/db";
import { Test } from "./columns";

export async function getAllTests(): Promise<Test[]> {
  const tests = await prisma.masterTest.findMany();
  return tests;
}

export async function addTests(tests: { name: string }[]): Promise<Test[]> {
  // check for duplicates
  const createdTests = await Promise.all(
    tests.map(async (test) => await prisma.masterTest.create({ data: test }))
  );
  return createdTests;
}

export async function updateTestById(id: string, name: string): Promise<Test> {
  const updatedTest = await prisma.masterTest.update({
    where: { id },
    data: { name },
  });
  return updatedTest;
}
