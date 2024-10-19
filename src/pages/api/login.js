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

    // Hanya allow login untuk role Admin (roleId = 1) dan Writer (roleId = 2)
    if (user.roleId !== 1 && user.roleId !== 2) {
      return res.status(403).json({ error: 'Role tidak diizinkan untuk login' });
    }

    // Buat JWT token
    const token = jwt.sign(
      { userId: user.id, role: user.role.name },
      process.env.JWT_SECRET || 'secret', // Sebaiknya disimpan di env variable
      { expiresIn: '1h' }
    );

    return res.status(200).json({ token, userId: user.id, role: user.role.name });
  } catch (error) {
    return res.status(500).json({ message: 'Terjadi kesalahan saat login', error });
  }
}
