import prisma from '../config/prismaClient.js';


export const getQuizzes = async (req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        course: true,
        student: true,
      },
    });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve quizzes' });
  }
};


export const getQuizById = async (req, res) => {
  const { id } = req.params;
  try {
    const quiz = await prisma.quiz.findUnique({
      where: { id: parseInt(id) },
      include: {
        course: true,
        student: true,
      },
    });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve quiz' });
  }
};


export const createQuiz = async (req, res) => {
  const { title, questions, courseId, studentId } = req.body;

  try {
    const newQuiz = await prisma.quiz.create({
      data: {
        title,
        questions,
        courseId,
        studentId,
      },
    });
    res.status(201).json(newQuiz);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create quiz' });
  }
};


export const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, questions } = req.body;

  try {
    const updatedQuiz = await prisma.quiz.update({
      where: { id: parseInt(id) },
      data: {
        title,
        questions,
      },
    });
    res.json(updatedQuiz);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update quiz' });
  }
};


export const deleteQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.quiz.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete quiz' });
  }
};
