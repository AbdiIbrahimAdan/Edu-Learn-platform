import { Router } from 'express';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/admin.controllers.js';
// import authMiddleware from '../middlewares/auth.middleware.js';
// import adminMiddleware from '../middlewares/admin.middleware.js';

const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users', updateUser);
router.delete('/users/:id',  deleteUser);

export default router;
