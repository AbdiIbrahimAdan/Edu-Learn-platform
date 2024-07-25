import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role, phoneNumber } = req.body;
    const user = await prisma.user.create({
      data: { firstName, lastName, email, password, role, phoneNumber },
    });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateUser = async (req, res) => {
  try {
    const { id, firstName, lastName, email, role, phoneNumber } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { firstName, lastName, email, role, phoneNumber },
    });
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
