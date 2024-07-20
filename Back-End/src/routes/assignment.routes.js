import express from 'express';
import {
  getAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,
} from '../controllers/assignment.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();


router.get('/', authMiddleware, getAssignments);


router.get('/:id', authMiddleware, getAssignmentById);

router.post('/', authMiddleware, createAssignment);

router.put('/:id', authMiddleware, updateAssignment);


router.delete('/:id', authMiddleware, deleteAssignment);

export default router;
