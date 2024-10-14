import prisma from '../../../lib/prisma';  // Misalkan menggunakan Prisma untuk database
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Cek apakah email terdaftar
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: 'Email tidak terdaftar.' });
    }

    // Buat token unik untuk reset password
    const resetToken = uuidv4();
    const tokenExpiration = new Date(Date.now() + 3600 * 1000); // Token valid selama 1 jam

    // Simpan token di database (misal di tabel "passwordResetToken")
    await prisma.passwordResetToken.create({
      data: {
        email,
        token: resetToken,
        expiration: tokenExpiration,
      },
    });

    // Kirim email reset password (gunakan nodemailer atau service email lainnya)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Atau email provider lain
      auth: {
        user: process.env.EMAIL_USER, // Misal email akun
        pass: process.env.EMAIL_PASS, // Kata sandi akun email
      },
    });

    const resetUrl = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Password',
      text: `Hi MovNow Member! Klik tautan berikut untuk reset password Anda: ${resetUrl}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email reset password sudah dikirim.' });
  } else {
    res.status(405).json({ message: 'Metode tidak diizinkan.' });
  }
}
