
import prisma from '../config/prismaClient.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('image');

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
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Failed to upload image' });
    }

    const { title, description, teacherId } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    try {
      const newCourse = await prisma.course.create({
        data: {
          title,
          description,
          imageUrl,
          teacherId,
        },
      });
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).json({ error: 'Failed to create course' });
    }
  });
};

export const updateCourse = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Failed to upload image' });
    }

    const { id } = req.params;
    const { title, description } = req.body;
    const imageUrl = req.file ? req.file.path : req.body.imageUrl;

    try {
      const updatedCourse = await prisma.course.update({
        where: { id: parseInt(id) },
        data: {
          title,
          description,
          imageUrl,
        },
      });
      res.json(updatedCourse);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update course' });
    }
  });
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
