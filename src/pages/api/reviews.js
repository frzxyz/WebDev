import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { dramaId, userId, userName, rating, comment } = req.body;

    console.log('User ID yang diterima:', userId); // Log untuk debugging

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }, // ID harus integer
      });

      if (!user) {
        console.log('User tidak ditemukan:', userId);
        return res.status(404).json({ error: 'User tidak ditemukan.' });
      }

      const newReview = await prisma.review.create({
        data: {
          userName,
          rating,
          comment,
          drama: { connect: { id: dramaId } },
          user: { connect: { id: userId } }, // Pastikan ID adalah integer
        },
      });

      console.log('Review berhasil ditambahkan:', newReview);
      return res.status(201).json(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      return res.status(500).json({ error: 'Gagal membuat review.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Tidak Diizinkan.`);
  }
}
