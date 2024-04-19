/*
  Warnings:

  - You are about to drop the column `requirementId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `Job` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[jobId]` on the table `Requirement` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jobId]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `jobId` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobId` to the `Role` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_requirementId_fkey";

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_roleId_fkey";

-- DropIndex
DROP INDEX "Job_requirementId_key";

-- DropIndex
DROP INDEX "Job_roleId_key";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "requirementId",
DROP COLUMN "roleId";

-- AlterTable
ALTER TABLE "Requirement" ADD COLUMN     "jobId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Role" ADD COLUMN     "jobId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Requirement_jobId_key" ON "Requirement"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Role_jobId_key" ON "Role"("jobId");

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
