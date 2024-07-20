import prisma from '../config/prismaClient.js';

export const getAssignments = async (req, res) => {
  try {
    const assignments = await prisma.assignment.findMany({
      include: {
        course: true,
        student: true,
      },
    });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve assignments' });
  }
};


export const getAssignmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const assignment = await prisma.assignment.findUnique({
      where: { id: parseInt(id) },
      include: {
        course: true,
        student: true,
      },
    });
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve assignment' });
  }
};


export const createAssignment = async (req, res) => {
  const { title, content, courseId, studentId } = req.body;

  try {
    const newAssignment = await prisma.assignment.create({
      data: {
        title,
        content,
        courseId,
        studentId,
      },
    });
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create assignment' });
  }
};


export const updateAssignment = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedAssignment = await prisma.assignment.update({
      where: { id: parseInt(id) },
      data: {
        title,
        content,
      },
    });
    res.json(updatedAssignment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update assignment' });
  }
};


export const deleteAssignment = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.assignment.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete assignment' });
  }
};
