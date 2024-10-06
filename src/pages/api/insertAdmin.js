import bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma'; // Prisma client

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const email = 'admin@gmail.com';
    const username = 'Admin';
    const roleId = 1;
    const plainPassword = 'Admin123';

    // Hash password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Insert admin ke database
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, // Simpan password yang sudah di-hash
        username,
        roleId,
        createdAt: new Date(),
      },
    });

    res.status(200).json({ message: 'Admin berhasil ditambahkan', admin });
  } catch (error) {
    console.error('Error saat menambahkan admin:', error);
    res.status(500).json({ message: 'Error saat menambahkan admin', error: error.message });
  }
}
