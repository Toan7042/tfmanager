/*
  Warnings:

  - Added the required column `status` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TransactionHistory` ADD COLUMN `status` VARCHAR(191) NOT NULL;
