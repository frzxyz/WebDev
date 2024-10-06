import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma'; // Prisma client

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method tidak diizinkan' });
  }

  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ message: 'Email, password, dan username harus diisi' });
  }

  try {
    // Cek apakah email atau username sudah terdaftar
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email atau Username sudah terdaftar' });
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

    return res.status(201).json({ message: 'User berhasil diregistrasi', user });
  } catch (error) {
    console.error('Error saat registrasi:', error);
    return res.status(500).json({ message: 'Terjadi kesalahan saat registrasi', error: error.message });
  }
}
