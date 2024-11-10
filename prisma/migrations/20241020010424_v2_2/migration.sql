/*
  Warnings:

  - The `year` column on the `SpecificationLimit` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SpecificationLimit" DROP COLUMN "year",
ADD COLUMN     "year" INTEGER;
