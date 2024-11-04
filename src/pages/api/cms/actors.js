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
        if (name !== undefined) {
          if (name.trim() === '' || !isValidName(name)) {
          return res.status(400).json({ error: 'Invalid name. It must contain alphabetic characters and cannot be only numbers or special characters.' });
        }
        const capitalizedName = capitalizeName(name.trim());
      }
        if (photo !== undefined && photo.trim() === '') {
          return res.status(400).json({ error: 'Photo cannot be empty' });
        }

        if (name && countryId) {
          const existingActor = await prisma.actor.findFirst({
            where: {
              name: capitalizedName,
              countryId: parseInt(countryId),
              NOT: { id: parseInt(id) }, // Exclude the current actor from the duplicate check
            },
          });

          if (existingActor) {
            return res.status(409).json({ error: 'An actor with the same name and country already exists' });
          }
        }

        const dataToUpdate = {};
        if (name !== undefined) dataToUpdate.name = capitalizedName;
        if (photo !== undefined) dataToUpdate.photo = photo.trim();

        const updatedActor = await prisma.actor.update({
          where: { id: parseInt(id) },
          data: { name, photo },
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
