/*
  Warnings:

  - Added the required column `expiration` to the `PasswordResetToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PasswordResetToken" ADD COLUMN     "expiration" TIMESTAMP(3) NOT NULL;
