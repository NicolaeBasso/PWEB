/*
  Warnings:

  - You are about to drop the column `genre` on the `App` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "App" DROP COLUMN "genre",
ADD COLUMN     "category" TEXT;
