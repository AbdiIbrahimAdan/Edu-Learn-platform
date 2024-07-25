/*
  Warnings:

  - You are about to drop the column `content` on the `assignment_table` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `assignment_table` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `assignment_table` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `assignment_table` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `course_table` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `course_table` table. All the data in the column will be lost.
  - You are about to drop the column `teacherId` on the `course_table` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `course_table` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `enrollment_table` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `enrollment_table` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `quiz_table` table. All the data in the column will be lost.
  - You are about to drop the column `questions` on the `quiz_table` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `quiz_table` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `quiz_table` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user_table` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[StudentId,CourseId]` on the table `enrollment_table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Content` to the `assignment_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CourseId` to the `assignment_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StudentId` to the `assignment_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Title` to the `assignment_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Description` to the `course_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ImageUrl` to the `course_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `TeacherId` to the `course_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Title` to the `course_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CourseId` to the `enrollment_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StudentId` to the `enrollment_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CourseId` to the `quiz_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Questions` to the `quiz_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StudentId` to the `quiz_table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Title` to the `quiz_table` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assignment_table" DROP CONSTRAINT "assignment_table_courseId_fkey";

-- DropForeignKey
ALTER TABLE "assignment_table" DROP CONSTRAINT "assignment_table_studentId_fkey";

-- DropForeignKey
ALTER TABLE "course_table" DROP CONSTRAINT "course_table_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "enrollment_table" DROP CONSTRAINT "enrollment_table_courseId_fkey";

-- DropForeignKey
ALTER TABLE "enrollment_table" DROP CONSTRAINT "enrollment_table_studentId_fkey";

-- DropForeignKey
ALTER TABLE "quiz_table" DROP CONSTRAINT "quiz_table_courseId_fkey";

-- DropForeignKey
ALTER TABLE "quiz_table" DROP CONSTRAINT "quiz_table_studentId_fkey";

-- DropIndex
DROP INDEX "enrollment_table_studentId_courseId_key";

-- AlterTable
ALTER TABLE "assignment_table" DROP COLUMN "content",
DROP COLUMN "courseId",
DROP COLUMN "studentId",
DROP COLUMN "title",
ADD COLUMN     "Content" TEXT NOT NULL,
ADD COLUMN     "CourseId" INTEGER NOT NULL,
ADD COLUMN     "StudentId" TEXT NOT NULL,
ADD COLUMN     "Title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "course_table" DROP COLUMN "description",
DROP COLUMN "imageUrl",
DROP COLUMN "teacherId",
DROP COLUMN "title",
ADD COLUMN     "Description" TEXT NOT NULL,
ADD COLUMN     "ImageUrl" TEXT NOT NULL,
ADD COLUMN     "TeacherId" TEXT NOT NULL,
ADD COLUMN     "Title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "enrollment_table" DROP COLUMN "courseId",
DROP COLUMN "studentId",
ADD COLUMN     "CourseId" INTEGER NOT NULL,
ADD COLUMN     "StudentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "quiz_table" DROP COLUMN "courseId",
DROP COLUMN "questions",
DROP COLUMN "studentId",
DROP COLUMN "title",
ADD COLUMN     "CourseId" INTEGER NOT NULL,
ADD COLUMN     "Questions" TEXT NOT NULL,
ADD COLUMN     "StudentId" TEXT NOT NULL,
ADD COLUMN     "Title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user_table" DROP COLUMN "role",
ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'STUDENT';

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_table_StudentId_CourseId_key" ON "enrollment_table"("StudentId", "CourseId");

-- AddForeignKey
ALTER TABLE "course_table" ADD CONSTRAINT "course_table_TeacherId_fkey" FOREIGN KEY ("TeacherId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment_table" ADD CONSTRAINT "enrollment_table_StudentId_fkey" FOREIGN KEY ("StudentId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment_table" ADD CONSTRAINT "enrollment_table_CourseId_fkey" FOREIGN KEY ("CourseId") REFERENCES "course_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment_table" ADD CONSTRAINT "assignment_table_CourseId_fkey" FOREIGN KEY ("CourseId") REFERENCES "course_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment_table" ADD CONSTRAINT "assignment_table_StudentId_fkey" FOREIGN KEY ("StudentId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_table" ADD CONSTRAINT "quiz_table_CourseId_fkey" FOREIGN KEY ("CourseId") REFERENCES "course_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_table" ADD CONSTRAINT "quiz_table_StudentId_fkey" FOREIGN KEY ("StudentId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
