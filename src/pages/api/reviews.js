import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { dramaId, userName, rating, comment } = req.body;

    try {
      const newReview = await prisma.review.create({
        data: {
          userName,
          rating: parseInt(rating), // Ensure rating is stored as an integer
          comment,
          drama: {
            connect: {
              id: dramaId, // Use the correct drama ID to associate the review
            },
          },
        },
      });

      res.status(201).json(newReview);
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'Failed to create review' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
