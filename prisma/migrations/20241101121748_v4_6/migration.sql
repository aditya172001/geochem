/*
  Warnings:

  - You are about to drop the column `sampleId` on the `SpecificationLimit` table. All the data in the column will be lost.
  - You are about to drop the column `specificationId` on the `SpecificationLimit` table. All the data in the column will be lost.
  - You are about to drop the column `testId` on the `SpecificationLimit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[masterSampleId,masterTestId,masterSpecificationId]` on the table `SpecificationLimit` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `masterSampleId` to the `SpecificationLimit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `masterSpecificationId` to the `SpecificationLimit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `masterTestId` to the `SpecificationLimit` table without a default value. This is not possible if the table is not empty.

*/

-- Rename columns
ALTER TABLE "SpecificationLimit" RENAME COLUMN "sampleId" TO "masterSampleId";
ALTER TABLE "SpecificationLimit" RENAME COLUMN "testId" TO "masterTestId";
ALTER TABLE "SpecificationLimit" RENAME COLUMN "specificationId" TO "masterSpecificationId";

-- Update unique index with new column names
DROP INDEX "SpecificationLimit_sampleId_testId_specificationId_key";
CREATE UNIQUE INDEX "SpecificationLimit_masterSampleId_masterTestId_masterSpecificationId_key" 
ON "SpecificationLimit"("masterSampleId", "masterTestId", "masterSpecificationId");

-- Drop old foreign key constraints
ALTER TABLE "SpecificationLimit" DROP CONSTRAINT "SpecificationLimit_sampleId_fkey";
ALTER TABLE "SpecificationLimit" DROP CONSTRAINT "SpecificationLimit_testId_fkey";
ALTER TABLE "SpecificationLimit" DROP CONSTRAINT "SpecificationLimit_specificationId_fkey";

-- Add new foreign key constraints with updated column names
ALTER TABLE "SpecificationLimit" 
ADD CONSTRAINT "SpecificationLimit_masterSampleId_fkey" 
FOREIGN KEY ("masterSampleId") REFERENCES "MasterSample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "SpecificationLimit" 
ADD CONSTRAINT "SpecificationLimit_masterTestId_fkey" 
FOREIGN KEY ("masterTestId") REFERENCES "MasterTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "SpecificationLimit" 
ADD CONSTRAINT "SpecificationLimit_masterSpecificationId_fkey" 
FOREIGN KEY ("masterSpecificationId") REFERENCES "MasterSpecification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
