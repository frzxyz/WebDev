import prisma from '../../../../lib/prisma';

function isValidName(name) {
  // Check that name contains alphabetic characters and does not contain only numbers or special characters
  const containsAlphabet = /[a-zA-Z]/.test(name);
  const isOnlyNumbersOrSpecialChars = /^[^a-zA-Z]*$/.test(name);

  return containsAlphabet && !isOnlyNumbersOrSpecialChars;
}

function capitalizeName(name) {
  return name.replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
}

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': // Read - Ambil semua actor
      try {
        const actors = await prisma.actor.findMany({
          include: {
            country: true, // Include the country relation
            dramas: {       // Include the dramas (movies) relation
              select: {
                title: true,
            },
          },
        },
        });
        res.status(200).json(actors);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch actors' });
      }
      break;

    case 'POST': // Create - Add a new actor
      try {
        let { name, photo, countryId } = req.body; // Receive countryId from the form
        if (!name || name.trim() === '') {
          return res.status(400).json({ error: 'Actor name is required' });
        }
    
        if (!photo || !countryId) {  // Check for required fields photo and countryId
          return res.status(400).json({ error: 'Photo and countryId are required' });
        }

        // Capitalize the actor's name
        name = capitalizeName(name.trim());

        const existingActor = await prisma.actor.findFirst({
          where: { 
            name,
            countryId: parseInt(countryId),
           }
        });

        if (existingActor) {
          return res.status(409).json({ error: 'An actor with the same name and country already exists' });
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
        const { id, name, photo } = req.body;
    
        if (!id) {
          return res.status(400).json({ error: 'ID is required' });
        }
    
        const dataToUpdate = {};
    
        // Validasi nama
        if (name !== undefined) {
          if (name.trim() === '' || !isValidName(name)) {
            return res.status(400).json({
              error: 'Invalid name. It must contain alphabetic characters and cannot be only numbers or special characters.',
            });
          }
          dataToUpdate.name = capitalizeName(name.trim());
        }
    
        // Validasi foto
        if (photo !== undefined) {
          if (photo.trim() === '') {
            return res.status(400).json({ error: 'Photo cannot be empty' });
          }
          dataToUpdate.photo = photo.trim();
        }
    
        // Update actor
        const updatedActor = await prisma.actor.update({
          where: { id: parseInt(id) },
          data: dataToUpdate,
        });
    
        res.status(200).json(updatedActor);
      } catch (error) {
        console.error("Error updating actor:", error); // Log error untuk debugging
        if (error.code === 'P2025') {
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
          return res.status(400).json({ error: 'Actor ID is required' });
        }

        // Check if the actor is connected to any drama
        const connectedDramas = await prisma.drama.findMany({
          where: {
            actors: {
              some: {
                id: parseInt(id),
              },
            },
          },
        });

        if (connectedDramas.length > 0) {
          return res.status(400).json({
            error: `Cannot delete actor because it is associated with ${connectedDramas.length} drama(s). Remove the association before deleting.`,
          });
        }

        // Proceed to delete the actor
        await prisma.actor.delete({
          where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Actor deleted successfully' });
      } catch (error) {
        if (error.code === 'P2025') {
          res.status(404).json({ error: 'Actor not found' });
        } else {
          console.error("Error deleting actor:", error);
          res.status(500).json({ error: 'Failed to delete actor' });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
