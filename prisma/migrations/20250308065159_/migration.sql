/*
  Warnings:

  - You are about to drop the column `keyPC` on the `ServicePackage` table. All the data in the column will be lost.
  - You are about to drop the column `keyPhone` on the `ServicePackage` table. All the data in the column will be lost.
  - You are about to drop the `UserKey` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSessionPoint` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Note` to the `MPC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `staperchangetypePHONEINFO` to the `MPC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stnetworkListProxy` to the `MPC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stnetworkListProxyForGetIDlaunchVerify` to the `MPC` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Note` to the `MPhone` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityPC` to the `ServicePackage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityPhone` to the `ServicePackage` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserKey` DROP FOREIGN KEY `UserKey_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserSessionPoint` DROP FOREIGN KEY `UserSessionPoint_userId_fkey`;

-- AlterTable
ALTER TABLE `MPC` ADD COLUMN `Note` VARCHAR(191) NOT NULL,
    ADD COLUMN `staperchangeANTITRACKING` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeAPIGOOGLEPLAYSERVICES` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeBATTERYMANAGER` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeBOOTLOADER` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeBUILDOS` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeBYPASSSERVERSIDEAI` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeCOUNTRY` VARCHAR(191) NOT NULL DEFAULT 'VN',
    ADD COLUMN `staperchangeDEVICE` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeDNSRESOLUTION` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeEBPF` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeEMAIL` VARCHAR(191) NOT NULL DEFAULT '8-12|@gmail.com|com.google',
    ADD COLUMN `staperchangeFINGERPRINT` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeGOOGLEAUTHUTIL` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeGPS` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeHIDEACCESSIBILITYNODEINFO` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeHIDEADB` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeHIDEBYPASSROOT` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeHIDEINPUTMANAGER` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeHIDEINSTRUMENTATION` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeHIDEUSBDEBUG` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeHIDEVPN` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeHOST` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeKEYGUARDMANAGER` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeLANGUAGE` VARCHAR(191) NOT NULL DEFAULT 'US',
    ADD COLUMN `staperchangeLOCKPATTERNUTILS` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeNAME` VARCHAR(191) NOT NULL DEFAULT 'vi_VN',
    ADD COLUMN `staperchangeNETWORK` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeOPENGLRENDERER` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangePHONENUMBER` VARCHAR(191) NOT NULL DEFAULT 'AS-COUNTRY',
    ADD COLUMN `staperchangePackageSDK` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeRELEASE` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeSERIAL` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeSTACKTRACE` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeUSERAGENT` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeWIFITO4G` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangeWIPEADVANCED` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `staperchangetypePHONEINFO` VARCHAR(191) NOT NULL,
    ADD COLUMN `stlaunchAppRun` VARCHAR(191) NOT NULL DEFAULT 'Facebook',
    ADD COLUMN `stlaunchIDGen` VARCHAR(191) NOT NULL DEFAULT 'Phone',
    ADD COLUMN `stlaunchIDVerify` VARCHAR(191) NOT NULL DEFAULT 'Tempmail',
    ADD COLUMN `stlaunchListWipe` VARCHAR(191) NOT NULL DEFAULT 'ListItem',
    ADD COLUMN `stnetworkListProxy` VARCHAR(191) NOT NULL,
    ADD COLUMN `stnetworkListProxyForGetIDlaunchVerify` VARCHAR(191) NOT NULL,
    ADD COLUMN `stnetworkTypeConnect` VARCHAR(191) NOT NULL DEFAULT 'Aper',
    ADD COLUMN `stnetworkTypeNetwork` VARCHAR(191) NOT NULL DEFAULT 'None',
    ADD COLUMN `stnetworkTypeProxyForGetIDlaunchVerify` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `stotpGmail` VARCHAR(191) NOT NULL DEFAULT 'https://sptmail.com = api_here*facebook',
    ADD COLUMN `stotpHotmail` VARCHAR(191) NOT NULL DEFAULT 'https://unlimitmail.com = api_here*5',
    ADD COLUMN `stotpIcloud` VARCHAR(191) NOT NULL DEFAULT 'https://cubemmo.net = api_here*5',
    ADD COLUMN `stotpPhone` VARCHAR(191) NOT NULL DEFAULT 'https://thuesim.app = api_here*facebook',
    ADD COLUMN `stotpTempmail` VARCHAR(191) NOT NULL DEFAULT 'None',
    ADD COLUMN `sttimeDelayAfterOpenApp` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `sttimeDelayBeforeOpenApp` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `sttimeDelayClickSignUP` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `sttimeOutMethodScriptCheckSignUP` INTEGER NOT NULL DEFAULT 300,
    ADD COLUMN `sttimeOutMethodScriptSignUP` INTEGER NOT NULL DEFAULT 300,
    ADD COLUMN `sttimeOutMethodScriptUpAvatar` INTEGER NOT NULL DEFAULT 100,
    ADD COLUMN `sttimeOutMethodScriptVerify` INTEGER NOT NULL DEFAULT 300,
    ADD COLUMN `sttimeTryAgainSendOTP` INTEGER NOT NULL DEFAULT 3,
    ADD COLUMN `stuploadtowebsiteFormat` VARCHAR(191) NOT NULL DEFAULT '{deviceTemp.Uid}|{deviceInfoAPI.PASSWORD}|{deviceTemp.Cookie}|{deviceTemp.Token}|{deviceTemp.MailID}|{deviceTemp.MailPass}|{currentDateTime}|{deviceInfoAPI.FULLNAME}',
    ADD COLUMN `stuploadtowebsiteType` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `stuploadtowebsiteURL` VARCHAR(191) NOT NULL DEFAULT 'https://shipclone.com/api/importAccount.php?code=1&api_key=2&account=*[FacebookApp] .Verified(VR)';

-- AlterTable
ALTER TABLE `MPhone` ADD COLUMN `Note` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `ServicePackage` DROP COLUMN `keyPC`,
    DROP COLUMN `keyPhone`,
    ADD COLUMN `quantityPC` INTEGER NOT NULL,
    ADD COLUMN `quantityPhone` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `maxPC` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `maxPhone` INTEGER NOT NULL DEFAULT 0,
    MODIFY `role` VARCHAR(191) NOT NULL DEFAULT 'user';

-- DropTable
DROP TABLE `UserKey`;

-- DropTable
DROP TABLE `UserSessionPoint`;

-- CreateTable
CREATE TABLE `SessionPoint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `deviceInfo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lastActiveAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expiresAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `SessionPoint_userId_sessionToken_key`(`userId`, `sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SessionPoint` ADD CONSTRAINT `SessionPoint_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
