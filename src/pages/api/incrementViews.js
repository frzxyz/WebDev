// pages/api/incrementViews.js
import { PrismaClient } from '@prisma/client'; // Assuming you're using Prisma ORM
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { dramaId } = req.body;
    
    try {
      // Update the view count in the database
      const updatedDrama = await prisma.drama.update({
        where: { id: dramaId },
        data: { views: { increment: 1 } } // Increment views by 1
      });
      res.status(200).json({ success: true, updatedDrama });
    } catch (error) {
      res.status(500).json({ error: 'Failed to increment views' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
