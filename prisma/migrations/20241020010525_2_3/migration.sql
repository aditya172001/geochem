/*
  Warnings:

  - Made the column `year` on table `SpecificationLimit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SpecificationLimit" ALTER COLUMN "year" SET NOT NULL;
