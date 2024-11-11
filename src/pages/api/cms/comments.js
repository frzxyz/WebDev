// comment.js - API handler for managing reviews/comments (view and delete only)
import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': // Retrieve all reviews
      try {
        const reviews = await prisma.review.findMany({
          select: {
            id: true,
            drama: { select: { title: true } },
            userName: true,
            rating: true,
            comment: true,
            dramaId: true,
          },
        });
        res.status(200).json(reviews);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
      }
      break;

    case 'DELETE': // Delete a review
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: 'Review ID is required' });
        }

        await prisma.review.delete({
          where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Review deleted successfully' });
      } catch (error) {
        if (error.code === 'P2025') {
          res.status(404).json({ error: 'Review not found' });
        } else {
          console.error('Failed to delete review:', error);
          res.status(500).json({ error: 'Failed to delete review' });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
