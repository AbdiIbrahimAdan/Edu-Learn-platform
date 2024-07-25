/*
  Warnings:

  - You are about to drop the `Assignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Enrollment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quiz` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Assignment" DROP CONSTRAINT "Assignment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_studentId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_courseId_fkey";

-- DropForeignKey
ALTER TABLE "Quiz" DROP CONSTRAINT "Quiz_studentId_fkey";

-- DropTable
DROP TABLE "Assignment";

-- DropTable
DROP TABLE "Course";

-- DropTable
DROP TABLE "Enrollment";

-- DropTable
DROP TABLE "Quiz";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user_table" (
    "id" TEXT NOT NULL,
    "First Name" TEXT NOT NULL,
    "Last Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone Number" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "user_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_table" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "teacherId" TEXT NOT NULL,

    CONSTRAINT "course_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "enrollment_table" (
    "id" SERIAL NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "enrollment_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignment_table" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "assignment_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_table" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "questions" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "quiz_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_table_Email_key" ON "user_table"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "user_table_Phone Number_key" ON "user_table"("Phone Number");

-- CreateIndex
CREATE UNIQUE INDEX "enrollment_table_studentId_courseId_key" ON "enrollment_table"("studentId", "courseId");

-- AddForeignKey
ALTER TABLE "course_table" ADD CONSTRAINT "course_table_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment_table" ADD CONSTRAINT "enrollment_table_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "enrollment_table" ADD CONSTRAINT "enrollment_table_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment_table" ADD CONSTRAINT "assignment_table_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment_table" ADD CONSTRAINT "assignment_table_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_table" ADD CONSTRAINT "quiz_table_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_table" ADD CONSTRAINT "quiz_table_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "user_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
