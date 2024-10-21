import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': // Read - Ambil semua actor
      try {
        const actors = await prisma.actor.findMany();
        res.status(200).json(actors);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch actors' });
      }
      break;

    case 'POST': // Create - Add a new actor
      try {
        const { name, photo, countryId } = req.body; // Receive countryId from the form
        if (!name || name.trim() === '') {
          return res.status(400).json({ error: 'Actor name is required' });
        }
    
        if (!photo || !countryId) {  // Check for required fields photo and countryId
          return res.status(400).json({ error: 'Photo and countryId are required' });
        }
    
        const newActor = await prisma.actor.create({
          data: { 
            name,
            photo,
            country: {
              connect: { id: parseInt(countryId) }, // Connect the actor to the country
            },
          },
        });
        res.status(201).json(newActor);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create actor' });
      }
      break;
    

    case 'PUT': // Update - Ubah data actor
      try {
        const { id, name } = req.body;
        if (!id || !name || name.trim() === '') {
          return res.status(400).json({ error: 'ID and actor name are required' });
        }

        const updatedActor = await prisma.actor.update({
          where: { id: parseInt(id) },
          data: { name },
        });

        res.status(200).json(updatedActor);
      } catch (error) {
        if (error.code === 'P2025') {
          // Prisma error code for 'Record not found'
          res.status(404).json({ error: 'Actor not found' });
        } else {
          res.status(500).json({ error: 'Failed to update Actor' });
        }
      }
      break;

    case 'DELETE': // Delete - Hapus actor
      try {
        const { id } = req.query; // Gunakan query parameter untuk DELETE
        if (!id) {
          return res.status(400).json({ error: 'Country ID is required' });
        }

        await prisma.actor.delete({
          where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Country deleted successfully' });
      } catch (error) {
        if (error.code === 'P2025') {
          res.status(404).json({ error: 'Country not found' });
        } else {
          res.status(500).json({ error: 'Failed to delete country' });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
