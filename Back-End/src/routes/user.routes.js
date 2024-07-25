import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
};

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, role } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber: phoneNumber.toString(),
        password: hashedPassword,
        role: role || 'STUDENT',
      },
    });

    const token = generateToken(newUser);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(201).json({ success: true, message: 'User signed up successfully', user: { ...newUser, password: undefined } });
  } catch (error) {
    console.error('Signup failed:', error);
    res.status(500).json({ success: false, message: 'Signup failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({ success: true, message: 'Login successful', user: { ...user, password: undefined } });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ success: false, message: 'Login failed' });
  }
});

router.get('/user/me', async (req, res) => {
  const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    const foundUser = await prisma.user.findUnique({ where: { id: user.id } });

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ success: true, user: { ...foundUser, password: undefined } });
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.status(200).json({ success: true, message: 'Logout successful' });
});

export default router;
