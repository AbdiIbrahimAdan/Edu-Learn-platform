import { Router } from 'express';
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  createModule,
  createLesson,
  createSubLesson,
  createAssignment,
  getAssignments,
  createQuiz,
  getQuizzes,
  manageEnrollments
} from '../controllers/teacher.controllers.js';

const router = Router();

router.post('/create', createCourse);
router.get('/courses', getCourses);

router.put('/updatecourses', updateCourse);
router.delete('/courses/:id', deleteCourse);

router.post('/courses/:courseId/modules', createModule);
router.post('/modules/:moduleId/lessons', createLesson);
router.post('/lessons/:lessonId/sublessons', createSubLesson);

router.post('/assignments', createAssignment);
router.get('/assignments', getAssignments);

router.post('/quizzes', createQuiz);
router.get('/quizzes', getQuizzes);

router.post('/enrollments', manageEnrollments);

export default router;
