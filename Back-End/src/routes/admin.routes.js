import {Router} from 'express';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/admin.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = Router();


router.get('/users', authMiddleware, getUsers);


router.get('/users/:id', authMiddleware, getUserById);


router.put('/users/:id', authMiddleware, updateUser);


router.delete('/users/:id', authMiddleware, deleteUser);

export default router;
