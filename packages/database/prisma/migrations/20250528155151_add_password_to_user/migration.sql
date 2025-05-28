/*
  Warnings:

  - You are about to drop the column `password` on the `accounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `accounts` DROP COLUMN `password`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `password` VARCHAR(191) NULL;
