/*
  Warnings:

  - You are about to drop the `useInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "useInfo";

-- CreateTable
CREATE TABLE "userInfo" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "userInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userInfo_email_key" ON "userInfo"("email");
