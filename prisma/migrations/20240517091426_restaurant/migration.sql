/*
  Warnings:

  - The `speciality` column on the `Restaurant` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `quantity` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "quantity" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "speciality",
ADD COLUMN     "speciality" TEXT[];
