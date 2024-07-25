// import jwt from 'jsonwebtoken';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();
// const JWT_SECRET = process.env.JWT_SECRET;
//  const authenticate = async (req, res, next) => {
//   const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded; 
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };
//  const authorizeTeacher = async (req, res, next) => {
//   await authenticate(req, res, async () => {
//     const user = await prisma.user.findUnique({ where: { id: req.user.id } });

//     if (user.role !== 'TEACHER') {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     next();
//   });
// };
// const authorizeAdmin = async (req, res, next) => {
//   await authenticate(req, res, async () => {
//     const user = await prisma.user.findUnique({ where: { id: req.user.id } });

//     if (user.role !== 'ADMIN') {
//       return res.status(403).json({ message: 'Access denied' });
//     }

//     next();
//   });
// };

// export default {authenticate, authorizeTeacher, authorizeAdmin};