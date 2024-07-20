import express from 'express';
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/course.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get('/', authMiddleware, getCourses);
router.get('/:id', authMiddleware, getCourseById);
router.post('/', authMiddleware, createCourse);

router.put('/:id', authMiddleware, updateCourse);

router.delete('/:id', authMiddleware, deleteCourse);

export default router;
