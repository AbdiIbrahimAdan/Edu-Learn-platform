import prisma from '../config/prismaClient.js';

export const getCourses = async (req, res) => {
  try {
    const courses = await prisma.course.findMany({
      include: {
        teacher: true,
        assignments: true,
        quizzes: true,
      },
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve courses' });
  }
};


export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) },
      include: {
        teacher: true,
        assignments: true,
        quizzes: true,
      },
    });
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve course' });
  }
};


export const createCourse = async (req, res) => {
  const { title, description, teacherId } = req.body;

  try {
    const newCourse = await prisma.course.create({
      data: {
        title,
        description,
        teacherId,
      },
    });
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create course' });
  }
};


export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updatedCourse = await prisma.course.update({
      where: { id: parseInt(id) },
      data: {
        title,
        description,
      },
    });
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update course' });
  }
};


export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.course.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete course' });
  }
};
