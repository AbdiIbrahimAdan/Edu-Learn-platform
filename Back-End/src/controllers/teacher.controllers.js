import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCourse = async (req, res) => {
  try {
    const { title, description, imageUrl, teacherId } = req.body;
    const course = await prisma.course.create({
      data: { title, description, imageUrl, teacher: { connect: { id: teacherId } } },
    });
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({ include: { modules: true } });
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { id, title, description, imageUrl } = req.body;
    const course = await prisma.course.update({
      where: { id },
      data: { title, description, imageUrl },
    });
    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.course.delete({ where: { id } });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createModule = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title } = req.body;
    const module = await prisma.module.create({
      data: { title, course: { connect: { id: parseInt(courseId, 10) } } },
    });
    res.status(201).json({ message: 'Module created successfully', module });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createLesson = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { title } = req.body;
    const lesson = await prisma.lesson.create({
      data: { title, module: { connect: { id: parseInt(moduleId, 10) } } },
    });
    res.status(201).json({ message: 'Lesson created successfully', lesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSubLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { title, content } = req.body;
    const subLesson = await prisma.subLesson.create({
      data: { title, content, lesson: { connect: { id: parseInt(lessonId, 10) } } },
    });
    res.status(201).json({ message: 'SubLesson created successfully', subLesson });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createAssignment = async (req, res) => {
  try {
    const { title, content, courseId } = req.body;
    const assignment = await prisma.assignment.create({
      data: { title, content, course: { connect: { id: parseInt(courseId, 10) } } },
    });
    res.status(201).json({ message: 'Assignment created successfully', assignment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAssignments = async (req, res) => {
  try {
    const assignments = await prisma.assignment.findMany();
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createQuiz = async (req, res) => {
  try {
    const { title, questions, courseId } = req.body;
    const quiz = await prisma.quiz.create({
      data: { title, questions, course: { connect: { id: parseInt(courseId, 10) } } },
    });
    res.status(201).json({ message: 'Quiz created successfully', quiz });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany();
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const manageEnrollments = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const enrollment = await prisma.enrollment.create({
      data: { student: { connect: { id: studentId } }, course: { connect: { id: parseInt(courseId, 10) } } },
    });
    res.status(201).json({ message: 'Enrollment successful', enrollment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
