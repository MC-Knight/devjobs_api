/*
  Warnings:

  - You are about to drop the column `jobId` on the `Requirement` table. All the data in the column will be lost.
  - You are about to drop the column `jobId` on the `Role` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[requirementId]` on the table `Job` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roleId]` on the table `Job` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `requirementId` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Requirement" DROP CONSTRAINT "Requirement_jobId_fkey";

-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_jobId_fkey";

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "requirementId" INTEGER NOT NULL,
ADD COLUMN     "roleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Requirement" DROP COLUMN "jobId";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "jobId";

-- CreateIndex
CREATE UNIQUE INDEX "Job_requirementId_key" ON "Job"("requirementId");

-- CreateIndex
CREATE UNIQUE INDEX "Job_roleId_key" ON "Job"("roleId");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "Requirement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
