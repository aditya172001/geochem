/*
  Warnings:

  - You are about to drop the `_MasterTestToSample` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_MasterTestToSample" DROP CONSTRAINT "_MasterTestToSample_A_fkey";

-- DropForeignKey
ALTER TABLE "_MasterTestToSample" DROP CONSTRAINT "_MasterTestToSample_B_fkey";

-- DropTable
DROP TABLE "_MasterTestToSample";

-- CreateTable
CREATE TABLE "Test" (
    "id" TEXT NOT NULL,
    "masterTestId" TEXT NOT NULL,
    "sampleId" TEXT NOT NULL,

    CONSTRAINT "Test_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_masterTestId_fkey" FOREIGN KEY ("masterTestId") REFERENCES "MasterTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
