import prisma from '../../../lib/prisma';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { token, password } = req.body;

    // Cek apakah token valid dan belum kedaluwarsa
    const resetRecord = await prisma.passwordResetToken.findUnique({ where: { token } });

    if (!resetRecord || resetRecord.expiration < new Date()) {
      return res.status(400).json({ message: 'Token reset tidak valid atau sudah kedaluwarsa.' });
    }

    // Hash password baru
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password user di database
    await prisma.user.update({
      where: { email: resetRecord.email },
      data: { password: hashedPassword },
    });

    // Hapus token reset setelah password berhasil diubah
    await prisma.passwordResetToken.delete({ where: { token } });

    res.status(200).json({ message: 'Password berhasil diubah.' });
  } else {
    res.status(405).json({ message: 'Metode tidak diizinkan.' });
  }
}
