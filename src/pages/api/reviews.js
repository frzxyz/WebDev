import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { dramaId, userName, comment, rating } = req.body;

    try {
      const newReview = await prisma.review.create({
        data: {
          userName,
          comment,
          rating,
          drama: {
            connect: { id: parseInt(dramaId) },
          },
        },
      });
      res.status(200).json(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'Failed to create review' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
