/*
  Warnings:

  - Added the required column `imageUrl` to the `course_table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "course_table" ADD COLUMN     "imageUrl" TEXT NOT NULL;
