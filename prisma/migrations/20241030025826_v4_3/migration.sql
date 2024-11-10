/*
  Warnings:

  - You are about to drop the column `specificationId` on the `Sample` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_specificationId_fkey";

-- AlterTable
ALTER TABLE "Sample" DROP COLUMN "specificationId",
ADD COLUMN     "masterSpecificationId" TEXT;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_masterSpecificationId_fkey" FOREIGN KEY ("masterSpecificationId") REFERENCES "MasterSpecification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
