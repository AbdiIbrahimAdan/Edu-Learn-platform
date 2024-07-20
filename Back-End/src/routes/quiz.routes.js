import {Router} from 'express';
import {
  getQuizzes,
  getQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
} from '../controllers/quiz.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();
router.get('/', authMiddleware, getQuizzes);
router.get('/:id', authMiddleware, getQuizById);
router.post('/', authMiddleware, createQuiz);
router.put('/:id', authMiddleware, updateQuiz);
router.delete('/:id', authMiddleware, deleteQuiz);

export default router;
