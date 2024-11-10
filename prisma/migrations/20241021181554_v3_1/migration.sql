-- DropForeignKey
ALTER TABLE "Sample" DROP CONSTRAINT "Sample_specificationId_fkey";

-- AlterTable
ALTER TABLE "Sample" ALTER COLUMN "specificationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "MasterSpecification"("id") ON DELETE SET NULL ON UPDATE CASCADE;
