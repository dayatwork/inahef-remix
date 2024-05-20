/*
  Warnings:

  - You are about to drop the column `packageId` on the `Exhibitor` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Package` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Registration` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[color]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BoothStatus" AS ENUM ('AVAILABLE', 'OCCUPIED', 'BOOKED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PARTIALLY_PAID', 'PAID');

-- DropForeignKey
ALTER TABLE "Exhibitor" DROP CONSTRAINT "Exhibitor_packageId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryId_fkey";

-- AlterTable
ALTER TABLE "Exhibitor" DROP COLUMN "packageId";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryId";

-- AlterTable
ALTER TABLE "ProductCategory" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Package";

-- DropTable
DROP TABLE "Registration";

-- CreateTable
CREATE TABLE "BoothSize" (
    "id" TEXT NOT NULL,
    "length" SMALLINT NOT NULL,
    "width" SMALLINT NOT NULL,
    "defaultPriceInIDR" INTEGER NOT NULL,

    CONSTRAINT "BoothSize_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booth" (
    "id" TEXT NOT NULL,
    "boothNumber" INTEGER NOT NULL,
    "productCategoryId" TEXT NOT NULL,
    "sizeId" TEXT NOT NULL,
    "priceInIDR" INTEGER NOT NULL,
    "status" "BoothStatus" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "Booth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExhibitorBooth" (
    "id" TEXT NOT NULL,
    "exhibitorId" TEXT NOT NULL,
    "boothId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExhibitorBooth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExhibitorRegistration" (
    "id" TEXT NOT NULL,
    "picName" TEXT NOT NULL,
    "picEmail" TEXT NOT NULL,
    "picPhone" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "companyPhone" TEXT NOT NULL,
    "companyWebsite" TEXT,
    "country" TEXT NOT NULL,
    "registrationStatus" "RegistrationStatus" NOT NULL DEFAULT 'WAITING_CONFIRMATION',
    "totalPrice" INTEGER NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paidAt" TIMESTAMP(3),
    "approvedAt" TIMESTAMP(3),

    CONSTRAINT "ExhibitorRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExhibitorRegistrationProductCategories" (
    "exhibitorRegistrationId" TEXT NOT NULL,
    "productCategoryId" TEXT NOT NULL,

    CONSTRAINT "ExhibitorRegistrationProductCategories_pkey" PRIMARY KEY ("exhibitorRegistrationId","productCategoryId")
);

-- CreateTable
CREATE TABLE "RegistrationItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "unit" TEXT NOT NULL,
    "unitPrice" INTEGER NOT NULL,

    CONSTRAINT "RegistrationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExhibitorRegistrationItem" (
    "id" TEXT NOT NULL,
    "exhibitorRegistrationId" TEXT NOT NULL,
    "registrationItemId" TEXT NOT NULL,
    "quantity" SMALLINT NOT NULL,
    "totalPrice" INTEGER NOT NULL,

    CONSTRAINT "ExhibitorRegistrationItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExhibitorRegistrationBooth" (
    "id" TEXT NOT NULL,
    "exhibitorRegistrationId" TEXT NOT NULL,
    "boothId" TEXT NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "ExhibitorRegistrationBooth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BoothSize_length_width_key" ON "BoothSize"("length", "width");

-- CreateIndex
CREATE UNIQUE INDEX "Booth_boothNumber_key" ON "Booth"("boothNumber");

-- CreateIndex
CREATE UNIQUE INDEX "ExhibitorRegistrationItem_registrationItemId_exhibitorRegis_key" ON "ExhibitorRegistrationItem"("registrationItemId", "exhibitorRegistrationId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_color_key" ON "ProductCategory"("color");

-- AddForeignKey
ALTER TABLE "Booth" ADD CONSTRAINT "Booth_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booth" ADD CONSTRAINT "Booth_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "BoothSize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitorBooth" ADD CONSTRAINT "ExhibitorBooth_exhibitorId_fkey" FOREIGN KEY ("exhibitorId") REFERENCES "Exhibitor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitorBooth" ADD CONSTRAINT "ExhibitorBooth_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitorRegistrationProductCategories" ADD CONSTRAINT "ExhibitorRegistrationProductCategories_exhibitorRegistrati_fkey" FOREIGN KEY ("exhibitorRegistrationId") REFERENCES "ExhibitorRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitorRegistrationProductCategories" ADD CONSTRAINT "ExhibitorRegistrationProductCategories_productCategoryId_fkey" FOREIGN KEY ("productCategoryId") REFERENCES "ProductCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitorRegistrationItem" ADD CONSTRAINT "ExhibitorRegistrationItem_exhibitorRegistrationId_fkey" FOREIGN KEY ("exhibitorRegistrationId") REFERENCES "ExhibitorRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitorRegistrationItem" ADD CONSTRAINT "ExhibitorRegistrationItem_registrationItemId_fkey" FOREIGN KEY ("registrationItemId") REFERENCES "RegistrationItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitorRegistrationBooth" ADD CONSTRAINT "ExhibitorRegistrationBooth_exhibitorRegistrationId_fkey" FOREIGN KEY ("exhibitorRegistrationId") REFERENCES "ExhibitorRegistration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExhibitorRegistrationBooth" ADD CONSTRAINT "ExhibitorRegistrationBooth_boothId_fkey" FOREIGN KEY ("boothId") REFERENCES "Booth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
