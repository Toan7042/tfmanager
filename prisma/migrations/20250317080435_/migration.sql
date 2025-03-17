/*
  Warnings:

  - You are about to drop the column `stnetworkListProxy` on the `MPC` table. All the data in the column will be lost.
  - You are about to drop the column `stnetworkListProxyForGetIDlaunchVerify` on the `MPC` table. All the data in the column will be lost.
  - You are about to drop the column `stnetworkTypeProxyForGetIDlaunchVerify` on the `MPC` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `MPC` DROP COLUMN `stnetworkListProxy`,
    DROP COLUMN `stnetworkListProxyForGetIDlaunchVerify`,
    DROP COLUMN `stnetworkTypeProxyForGetIDlaunchVerify`,
    ADD COLUMN `stnetworkTypeProxyIDVerify` INTEGER NOT NULL DEFAULT 0;
