/*
  Warnings:

  - You are about to drop the column `dateOfReceipt` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `dateOfShipping` on the `Package` table. All the data in the column will be lost.
  - You are about to drop the column `sampleId` on the `Sample` table. All the data in the column will be lost.
  - Added the required column `collectionDate` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingDate` to the `Package` table without a default value. This is not possible if the table is not empty.
  - Added the required column `masterSampleId` to the `Sample` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_sampleId_fkey";

-- AlterTable
ALTER TABLE "Package" RENAME COLUMN "dateOfReceipt" TO "collectionDate";
ALTER TABLE "Package" RENAME COLUMN "dateOfShipping" TO "shippingDate";

-- AlterTable
ALTER TABLE "Sample"
RENAME COLUMN "sampleId" TO "masterSampleId";

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_masterSampleId_fkey" FOREIGN KEY ("masterSampleId") REFERENCES "MasterSample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
