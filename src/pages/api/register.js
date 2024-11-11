import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma'; // Prisma client

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method tidak diizinkan' });
  }

  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Email, password, and username must be filled' });
  }

  try {
    // Cek apakah email atau username sudah terdaftar
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email has been registered' });
    }

    // Cek apakah username sudah terdaftar
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return res.status(409).json({ message: 'Username already used' });
    }

    if (!email.endsWith('@gmail.com')) {
      return res.status(400).json({ message: 'Only @gmail.com email addresses are allowed' });
    }

    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru dengan role "Writer" (roleId = 2)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
        roleId: 2, // Role Writer
      },
    });

    return res.status(201).json({ message: 'User registered successfully. Please sign in to continue', user });
  } catch (error) {
    console.error('Error during registrasi:', error);
    return res.status(500).json({ message: 'Error during registration', error: error.message });
  }
}
