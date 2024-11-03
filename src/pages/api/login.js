import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method tidak diizinkan' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email dan password harus diisi' });
  }

  try {
    // Cari user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      return res.status(401).json({ error: 'Email salah atau tidak terdaftar' });
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Password salah atau tidak terdaftar' });
    }

    // Buat JWT token dengan role 'Admin' jika user memiliki role tersebut
    const token = jwt.sign(
      { userId: user.id, role: user.role.name }, // Menyimpan role name di token
      process.env.JWT_SECRET, // Ambil dari environment variable untuk keamanan
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token, userId: user.id, role: user.role.name });
  } catch (error) {
    return res.status(500).json({ message: 'Terjadi kesalahan saat login', error });
  }
}
