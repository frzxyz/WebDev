import prisma from '../../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': // Retrieve all awards
      try {
        const awards = await prisma.award.findMany({
          include: {
            drama: { select: { title: true } },
            country: { select: { name: true } },
          },
        });
        res.status(200).json(awards);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch awards' });
      }
      break;

      case 'POST': // Add a new award
      try {
        const { name, year, dramaId, countryId } = req.body;
        if (!name || !year || !dramaId || !countryId) {
          return res.status(400).json({ error: 'All fields are required' });
        }
    
        const newAward = await prisma.award.create({
          data: { name, year: parseInt(year), dramaId, countryId },
        });
        res.status(201).json(newAward);
      } catch (error) {
        console.error("Error creating award:", error); // Log full error details
        res.status(500).json({ error: 'Failed to create award' });
      }
    
      break;

    case 'PUT': // Update an award
      try {
        const { id, name, year } = req.body;
        if (!id || !name || !year) {
          return res.status(400).json({ error: 'ID, name, and year are required' });
        }

        const updatedAward = await prisma.award.update({
          where: { id: parseInt(id) },
          data: { name, year },
        });
        res.status(200).json(updatedAward);
      } catch (error) {
        if (error.code === 'P2025') {
          res.status(404).json({ error: 'Award not found' });
        } else {
          res.status(500).json({ error: 'Failed to update award' });
        }
      }
      break;

    case 'DELETE': // Delete an award
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: 'Award ID is required' });
        }

        await prisma.award.delete({
          where: { id: parseInt(id) },
        });
        res.status(200).json({ message: 'Award deleted successfully' });
      } catch (error) {
        if (error.code === 'P2025') {
          res.status(404).json({ error: 'Award not found' });
        } else {
          res.status(500).json({ error: 'Failed to delete award' });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
