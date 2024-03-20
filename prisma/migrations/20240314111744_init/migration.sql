/*
  Warnings:

  - You are about to drop the column `Projects` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Projects";

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "githubLink" TEXT NOT NULL,
    "deploymentLink" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
