/*
  Warnings:

  - You are about to drop the `SpecificationWithLimit` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SampleStatus" AS ENUM ('processing', 'testing', 'completed');

-- DropForeignKey
ALTER TABLE "SpecificationWithLimit" DROP CONSTRAINT "SpecificationWithLimit_sampleId_fkey";

-- DropForeignKey
ALTER TABLE "SpecificationWithLimit" DROP CONSTRAINT "SpecificationWithLimit_specificationId_fkey";

-- DropForeignKey
ALTER TABLE "SpecificationWithLimit" DROP CONSTRAINT "SpecificationWithLimit_testId_fkey";

-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "approvalNumber" TEXT;

-- AlterTable
ALTER TABLE "Sample" ADD COLUMN     "status" "SampleStatus" NOT NULL DEFAULT 'processing';

-- DropTable
DROP TABLE "SpecificationWithLimit";

-- CreateTable
CREATE TABLE "SpecificationLimit" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "minQuantity" DOUBLE PRECISION NOT NULL,
    "maxQuantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "sampleId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "specificationId" TEXT NOT NULL,

    CONSTRAINT "SpecificationLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpecificationLimit_sampleId_testId_specificationId_key" ON "SpecificationLimit"("sampleId", "testId", "specificationId");

-- AddForeignKey
ALTER TABLE "SpecificationLimit" ADD CONSTRAINT "SpecificationLimit_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "MasterSample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificationLimit" ADD CONSTRAINT "SpecificationLimit_testId_fkey" FOREIGN KEY ("testId") REFERENCES "MasterTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificationLimit" ADD CONSTRAINT "SpecificationLimit_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "MasterSpecification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
