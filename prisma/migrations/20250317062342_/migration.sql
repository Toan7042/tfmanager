/*
  Warnings:

  - Added the required column `sttempFirstName` to the `MPC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sttempLastName` to the `MPC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sttempListProxyIDVerify` to the `MPC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sttempListProxyLaunchApp` to the `MPC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sttempPhoneNumber` to the `MPC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sttempUserAgent` to the `MPC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sttempWipe` to the `MPC` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `MPC` ADD COLUMN `sttempFirstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `sttempLastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `sttempListProxyIDVerify` VARCHAR(191) NOT NULL,
    ADD COLUMN `sttempListProxyLaunchApp` VARCHAR(191) NOT NULL,
    ADD COLUMN `sttempPhoneNumber` VARCHAR(191) NOT NULL,
    ADD COLUMN `sttempUserAgent` VARCHAR(191) NOT NULL,
    ADD COLUMN `sttempWipe` VARCHAR(191) NOT NULL;
