-- DropForeignKey
ALTER TABLE "Exhibitor" DROP CONSTRAINT "Exhibitor_packageId_fkey";

-- AlterTable
ALTER TABLE "Exhibitor" ALTER COLUMN "packageId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Exhibitor" ADD CONSTRAINT "Exhibitor_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE SET NULL ON UPDATE CASCADE;
