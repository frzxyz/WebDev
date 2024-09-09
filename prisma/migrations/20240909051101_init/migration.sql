/*
  Warnings:

  - You are about to drop the column `award` on the `Drama` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Drama` table. All the data in the column will be lost.
  - Added the required column `countryId` to the `Drama` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Drama` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drama" DROP COLUMN "award",
DROP COLUMN "country",
ADD COLUMN     "countryId" INTEGER NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Award" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "dramaId" INTEGER NOT NULL,

    CONSTRAINT "Award_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Country" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Drama" ADD CONSTRAINT "Drama_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Award" ADD CONSTRAINT "Award_dramaId_fkey" FOREIGN KEY ("dramaId") REFERENCES "Drama"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
