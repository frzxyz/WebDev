/*
  Warnings:

  - Added the required column `countryId` to the `Award` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Award" ADD COLUMN     "countryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
