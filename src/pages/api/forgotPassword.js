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
      subject: 'Reset Password for MovNow',
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
        <table align="center" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 10px; overflow: hidden;">
          <tr style="background-color: #051941; text-align: center;">
            <td style="padding: 20px;">
              <img src="https://i.ibb.co/Z1hDszL/logo-movienow.png" alt="MovNow Logo" width="100" height="100" style="display: block; margin: 0 auto;">
              <h1 style="color: #ffffff; font-size: 24px; margin-top: 10px;">Reset Your MovNow Password</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; text-align: center; color: #333333;">
              <p style="font-size: 18px; margin-bottom: 20px;">Hi MovieNow Member,</p>
              <p style="font-size: 16px; margin-bottom: 30px;">Thanks for requesting to reset your password. Click the button below to reset it:</p>
              <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #051941; color: #ffffff; text-decoration: none; border-radius: 5px; font-size: 16px;">Reset Password</a>
              <p style="margin-top: 30px; font-size: 14px; color: #777777;">If you didn't request this, you can safely ignore this email.</p>
            </td>
          </tr>
          <tr style="background-color: #f9f9f9; text-align: center;">
            <td style="padding: 20px;">
              <p style="font-size: 12px; color: #999999;">MovNow 2024 | All rights reserved.</p>
            </td>
          </tr>
        </table>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email reset password sudah dikirim.' });
  } else {
    res.status(405).json({ message: 'Metode tidak diizinkan.' });
  }
}
