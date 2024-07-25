-- CreateTable
CREATE TABLE "module_table" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "CourseId" INTEGER NOT NULL,

    CONSTRAINT "module_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lesson_table" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "ModuleId" INTEGER NOT NULL,

    CONSTRAINT "lesson_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_lesson_table" (
    "id" SERIAL NOT NULL,
    "Title" TEXT NOT NULL,
    "Content" TEXT NOT NULL,
    "LessonId" INTEGER NOT NULL,

    CONSTRAINT "sub_lesson_table_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "module_table" ADD CONSTRAINT "module_table_CourseId_fkey" FOREIGN KEY ("CourseId") REFERENCES "course_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson_table" ADD CONSTRAINT "lesson_table_ModuleId_fkey" FOREIGN KEY ("ModuleId") REFERENCES "module_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_lesson_table" ADD CONSTRAINT "sub_lesson_table_LessonId_fkey" FOREIGN KEY ("LessonId") REFERENCES "lesson_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
