/*
  Warnings:

  - Added the required column `countryId` to the `Actor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actor" ADD COLUMN     "countryId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Actor" ADD CONSTRAINT "Actor_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
