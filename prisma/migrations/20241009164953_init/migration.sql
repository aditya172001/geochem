-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Branch" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "partyId" TEXT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterSample" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MasterSample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterTest" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MasterTest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterSpecification" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MasterSpecification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dateOfShipping" TIMESTAMP(3) NOT NULL,
    "dateOfReceipt" TIMESTAMP(3) NOT NULL,
    "branchId" TEXT NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sample" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "quantity" DOUBLE PRECISION,
    "unit" TEXT,
    "drawnByGeoChem" BOOLEAN,
    "mfgName" TEXT,
    "mfgLicenceNumber" TEXT,
    "batchNumber" TEXT,
    "batchSizeQuantity" DOUBLE PRECISION,
    "batchSizeUnit" TEXT,
    "mfgDate" TIMESTAMP(3),
    "expDate" TIMESTAMP(3),
    "sampleId" TEXT NOT NULL,
    "specificationId" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,

    CONSTRAINT "Sample_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" TEXT NOT NULL,
    "certificateNumber" TEXT,
    "trNumber" TEXT,
    "shippingBillNumber" TEXT,
    "chaNumber" TEXT,
    "analysisStartDate" TIMESTAMP(3),
    "analysisEndDate" TIMESTAMP(3),
    "arNumber" TEXT,
    "sampleId" TEXT NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpecificationWithLimit" (
    "id" TEXT NOT NULL,
    "minQuantity" DOUBLE PRECISION NOT NULL,
    "maxQuantity" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "sampleId" TEXT NOT NULL,
    "testId" TEXT NOT NULL,
    "specificationId" TEXT NOT NULL,

    CONSTRAINT "SpecificationWithLimit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MasterTestToSample" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Party_name_key" ON "Party"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Branch_name_key" ON "Branch"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MasterSample_name_key" ON "MasterSample"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MasterTest_name_key" ON "MasterTest"("name");

-- CreateIndex
CREATE UNIQUE INDEX "MasterSpecification_name_key" ON "MasterSpecification"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Report_sampleId_key" ON "Report"("sampleId");

-- CreateIndex
CREATE UNIQUE INDEX "SpecificationWithLimit_sampleId_testId_specificationId_key" ON "SpecificationWithLimit"("sampleId", "testId", "specificationId");

-- CreateIndex
CREATE UNIQUE INDEX "_MasterTestToSample_AB_unique" ON "_MasterTestToSample"("A", "B");

-- CreateIndex
CREATE INDEX "_MasterTestToSample_B_index" ON "_MasterTestToSample"("B");

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_partyId_fkey" FOREIGN KEY ("partyId") REFERENCES "Party"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "MasterSample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "MasterSpecification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sample" ADD CONSTRAINT "Sample_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "Sample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificationWithLimit" ADD CONSTRAINT "SpecificationWithLimit_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES "MasterSample"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificationWithLimit" ADD CONSTRAINT "SpecificationWithLimit_testId_fkey" FOREIGN KEY ("testId") REFERENCES "MasterTest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpecificationWithLimit" ADD CONSTRAINT "SpecificationWithLimit_specificationId_fkey" FOREIGN KEY ("specificationId") REFERENCES "MasterSpecification"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MasterTestToSample" ADD CONSTRAINT "_MasterTestToSample_A_fkey" FOREIGN KEY ("A") REFERENCES "MasterTest"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MasterTestToSample" ADD CONSTRAINT "_MasterTestToSample_B_fkey" FOREIGN KEY ("B") REFERENCES "Sample"("id") ON DELETE CASCADE ON UPDATE CASCADE;
