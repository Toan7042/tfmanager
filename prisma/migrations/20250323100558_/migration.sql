-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `avatar` VARCHAR(191) NULL,
    `providerId` VARCHAR(191) NOT NULL,
    `lastLoginTime` DATETIME(3) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `maxPhone` INTEGER NOT NULL DEFAULT 0,
    `maxPC` INTEGER NOT NULL DEFAULT 0,
    `level` INTEGER NOT NULL DEFAULT 0,
    `balance` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `totalbalance` DECIMAL(65, 30) NOT NULL DEFAULT 0.000000000000000000000000000000,
    `usedPhone` INTEGER NOT NULL DEFAULT 0,
    `usedPC` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_providerId_key`(`providerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `CommunityMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `imageUrls` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `replyToId` INTEGER NULL,
    `isPinned` BOOLEAN NOT NULL DEFAULT false,
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `CommunityMessage_replyToId_fkey`(`replyToId`),
    INDEX `CommunityMessage_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrivateMessage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senderId` INTEGER NOT NULL,
    `receiverId` INTEGER NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `imageUrls` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `isDeleted` BOOLEAN NOT NULL DEFAULT false,

    INDEX `PrivateMessage_receiverId_fkey`(`receiverId`),
    INDEX `PrivateMessage_senderId_fkey`(`senderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityReaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `messageId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `emoji` VARCHAR(191) NOT NULL,

    INDEX `CommunityReaction_userId_fkey`(`userId`),
    UNIQUE INDEX `CommunityReaction_messageId_userId_emoji_key`(`messageId`, `userId`, `emoji`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrivateReaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `messageId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `emoji` VARCHAR(191) NOT NULL,

    INDEX `PrivateReaction_userId_fkey`(`userId`),
    UNIQUE INDEX `PrivateReaction_messageId_userId_emoji_key`(`messageId`, `userId`, `emoji`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommunityMessageSeen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `messageId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `seenAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `CommunityMessageSeen_userId_fkey`(`userId`),
    UNIQUE INDEX `CommunityMessageSeen_messageId_userId_key`(`messageId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PrivateMessageSeen` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `messageId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `seenAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `PrivateMessageSeen_userId_fkey`(`userId`),
    UNIQUE INDEX `PrivateMessageSeen_messageId_userId_key`(`messageId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServicePackage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `packageType` VARCHAR(191) NOT NULL DEFAULT 'Thông thường',
    `description` VARCHAR(191) NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `quantityPC` INTEGER NOT NULL,
    `quantityPhone` INTEGER NOT NULL,
    `durationDays` INTEGER NOT NULL,
    `Show` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TransactionHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `amount` DECIMAL(65, 30) NOT NULL,
    `type` VARCHAR(191) NOT NULL DEFAULT 'Deposit',
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,
    `Content` VARCHAR(191) NOT NULL,

    INDEX `TransactionHistory_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `packageId` INTEGER NOT NULL,
    `purchaseDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expirationDate` DATETIME(3) NOT NULL,

    INDEX `PurchaseHistory_packageId_fkey`(`packageId`),
    INDEX `PurchaseHistory_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MPhone` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `phoneId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expirationDate` DATETIME(3) NOT NULL,
    `Note` VARCHAR(191) NOT NULL,

    INDEX `MPhone_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MPC` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `pcId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expirationDate` DATETIME(3) NOT NULL,
    `Note` VARCHAR(191) NOT NULL,
    `sttempListProxyLaunchApp` VARCHAR(191) NOT NULL,
    `sttempListProxyIDVerify` VARCHAR(191) NOT NULL,
    `sttempUserAgent` VARCHAR(191) NOT NULL,
    `sttempPhoneNumber` VARCHAR(191) NOT NULL,
    `sttempFirstName` VARCHAR(191) NOT NULL,
    `sttempLastName` VARCHAR(191) NOT NULL,
    `sttempWipe` VARCHAR(191) NOT NULL,
    `stlaunchAppSpeed` VARCHAR(191) NOT NULL DEFAULT 'High',
    `stlaunchAppRun` VARCHAR(191) NOT NULL DEFAULT 'Facebook',
    `stlaunchListWipe` VARCHAR(191) NOT NULL DEFAULT 'ListItem',
    `stlaunchIDGen` VARCHAR(191) NOT NULL DEFAULT 'Phone',
    `stlaunchIDVerify` VARCHAR(191) NOT NULL DEFAULT 'Tempmail',
    `stnetworkTypeNetwork` VARCHAR(191) NOT NULL DEFAULT 'None',
    `stnetworkTypeConnect` VARCHAR(191) NOT NULL DEFAULT 'Aper',
    `stnetworkTypeProxyIDVerify` INTEGER NOT NULL DEFAULT 0,
    `stotpGmail` VARCHAR(191) NOT NULL DEFAULT 'https://sptmail.com = api_here*facebook',
    `stotpHotmail` VARCHAR(191) NOT NULL DEFAULT 'https://unlimitmail.com = api_here*5',
    `stotpTempmail` VARCHAR(191) NOT NULL DEFAULT 'None',
    `stotpPhone` VARCHAR(191) NOT NULL DEFAULT 'https://thuesim.app = api_here*facebook',
    `stotpIcloud` VARCHAR(191) NOT NULL DEFAULT 'https://cubemmo.net = api_here*5',
    `sttimeDelayBeforeOpenApp` INTEGER NOT NULL DEFAULT 0,
    `sttimeDelayAfterOpenApp` INTEGER NOT NULL DEFAULT 0,
    `sttimeDelayClickSignUP` INTEGER NOT NULL DEFAULT 0,
    `sttimeOutMethodScriptSignUP` INTEGER NOT NULL DEFAULT 300,
    `sttimeOutMethodScriptCheckSignUP` INTEGER NOT NULL DEFAULT 300,
    `sttimeOutMethodScriptVerify` INTEGER NOT NULL DEFAULT 300,
    `sttimeOutMethodScriptUpAvatar` INTEGER NOT NULL DEFAULT 100,
    `sttimeTryAgainSendOTP` INTEGER NOT NULL DEFAULT 3,
    `stuploadtowebsiteType` INTEGER NOT NULL DEFAULT 0,
    `stuploadtowebsiteFormat` VARCHAR(191) NOT NULL DEFAULT '{deviceTemp.Uid}|{deviceInfoAPI.PASSWORD}|{deviceTemp.Cookie}|{deviceTemp.Token}|{deviceTemp.MailID}|{deviceTemp.MailPass}|{currentDateTime}|{deviceInfoAPI.FULLNAME}',
    `stuploadtowebsiteURL` VARCHAR(191) NOT NULL DEFAULT 'https://shipclone.com/api/importAccount.php?code=1&api_key=2&account=*[FacebookApp] .Verified(VR)',
    `staperchangeNETWORK` INTEGER NOT NULL DEFAULT 0,
    `staperchangeBUILDOS` INTEGER NOT NULL DEFAULT 0,
    `staperchangeGPS` INTEGER NOT NULL DEFAULT 0,
    `staperchangeSERIAL` INTEGER NOT NULL DEFAULT 0,
    `staperchangeFINGERPRINT` INTEGER NOT NULL DEFAULT 0,
    `staperchangeHOST` INTEGER NOT NULL DEFAULT 0,
    `staperchangeDEVICE` INTEGER NOT NULL DEFAULT 0,
    `staperchangeBOOTLOADER` INTEGER NOT NULL DEFAULT 0,
    `staperchangeRELEASE` INTEGER NOT NULL DEFAULT 0,
    `staperchangeWIPEADVANCED` INTEGER NOT NULL DEFAULT 0,
    `staperchangeHIDEBYPASSROOT` INTEGER NOT NULL DEFAULT 0,
    `staperchangeWIFITO4G` INTEGER NOT NULL DEFAULT 0,
    `staperchangeHIDEVPN` INTEGER NOT NULL DEFAULT 0,
    `staperchangeANTITRACKING` INTEGER NOT NULL DEFAULT 0,
    `staperchangeKEYGUARDMANAGER` INTEGER NOT NULL DEFAULT 0,
    `staperchangeSTACKTRACE` INTEGER NOT NULL DEFAULT 0,
    `staperchangeLOCKPATTERNUTILS` INTEGER NOT NULL DEFAULT 0,
    `staperchangeHIDEUSBDEBUG` INTEGER NOT NULL DEFAULT 0,
    `staperchangeBATTERYMANAGER` INTEGER NOT NULL DEFAULT 0,
    `staperchangeHIDEINSTRUMENTATION` INTEGER NOT NULL DEFAULT 0,
    `staperchangeHIDEINPUTMANAGER` INTEGER NOT NULL DEFAULT 0,
    `staperchangeHIDEACCESSIBILITYNODEINFO` INTEGER NOT NULL DEFAULT 0,
    `staperchangeHIDEADB` INTEGER NOT NULL DEFAULT 0,
    `staperchangeGOOGLEAUTHUTIL` INTEGER NOT NULL DEFAULT 0,
    `staperchangePackageSDK` INTEGER NOT NULL DEFAULT 0,
    `staperchangeAPIGOOGLEPLAYSERVICES` INTEGER NOT NULL DEFAULT 0,
    `staperchangeDNSRESOLUTION` INTEGER NOT NULL DEFAULT 0,
    `staperchangeEBPF` INTEGER NOT NULL DEFAULT 0,
    `staperchangeBYPASSSERVERSIDEAI` INTEGER NOT NULL DEFAULT 0,
    `staperchangeOPENGLRENDERER` INTEGER NOT NULL DEFAULT 0,
    `staperchangetypePHONEINFO` VARCHAR(191) NOT NULL,
    `staperchangeNAME` VARCHAR(191) NOT NULL DEFAULT 'vi_VN',
    `staperchangeCOUNTRY` VARCHAR(191) NOT NULL DEFAULT 'VN',
    `staperchangeCarrier` VARCHAR(191) NOT NULL DEFAULT 'AS-COUNTRY',
    `staperchangePHONENUMBER` VARCHAR(191) NOT NULL DEFAULT 'AS-COUNTRY',
    `staperchangeEMAIL` VARCHAR(191) NOT NULL DEFAULT '8-12|@gmail.com|com.google',
    `staperchangeLANGUAGE` VARCHAR(191) NOT NULL DEFAULT 'US',
    `staperchangeUSERAGENT` VARCHAR(191) NOT NULL DEFAULT 'None',

    INDEX `MPC_userId_fkey`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SessionPoint` ADD CONSTRAINT `SessionPoint_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityMessage` ADD CONSTRAINT `CommunityMessage_replyToId_fkey` FOREIGN KEY (`replyToId`) REFERENCES `CommunityMessage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityMessage` ADD CONSTRAINT `CommunityMessage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivateMessage` ADD CONSTRAINT `PrivateMessage_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivateMessage` ADD CONSTRAINT `PrivateMessage_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityReaction` ADD CONSTRAINT `CommunityReaction_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `CommunityMessage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityReaction` ADD CONSTRAINT `CommunityReaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivateReaction` ADD CONSTRAINT `PrivateReaction_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `PrivateMessage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivateReaction` ADD CONSTRAINT `PrivateReaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityMessageSeen` ADD CONSTRAINT `CommunityMessageSeen_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `CommunityMessage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommunityMessageSeen` ADD CONSTRAINT `CommunityMessageSeen_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivateMessageSeen` ADD CONSTRAINT `PrivateMessageSeen_messageId_fkey` FOREIGN KEY (`messageId`) REFERENCES `PrivateMessage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PrivateMessageSeen` ADD CONSTRAINT `PrivateMessageSeen_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TransactionHistory` ADD CONSTRAINT `TransactionHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseHistory` ADD CONSTRAINT `PurchaseHistory_packageId_fkey` FOREIGN KEY (`packageId`) REFERENCES `ServicePackage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseHistory` ADD CONSTRAINT `PurchaseHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MPhone` ADD CONSTRAINT `MPhone_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MPC` ADD CONSTRAINT `MPC_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
