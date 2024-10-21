import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': // Read - Get all dramas
      try {
        const dramas = await prisma.drama.findMany({
          include: {
            country: true, // Include related country data
            genres: true,  // Include related genres
            actors: true   // Include related actors
          },
        });
        res.status(200).json(dramas);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dramas' });
      }
      break;

    case 'POST': // Create - Add a new drama
      try {
        console.log('Received data:', req.body);
        
        const {
          title,
          alternativeTitle,
          urlPhoto,
          year,
          countryId,
          synopsis,
          availability,
          genres = [],
          actors = [],
          trailerLink,
          awards = [],
          rating = 0,
          views = 0,
          duration
        } = req.body;

        // Ensure that all necessary fields are provided
        if (!title || !year || !countryId) {
          return res.status(400).json({ error: 'Title, year, and country are required' });
        }

        const parsedAwards = awards.map(award => {
            const [category, name, year] = award.split(',').map(item => item.trim()); // Split by commas and trim whitespace
            
            if (!category || !name || !year || isNaN(parseInt(year))) {
              throw new Error('Invalid awards format. Use: Category, Award Name, Year');
            }
            return {
              name,  // Award name
              year: parseInt(year), // Convert year to integer
              category // Category of the award
            };
          });

        const newDrama = await prisma.drama.create({
          data: {
            title,
            alternativeTitle,
            urlPhoto,
            year: parseInt(year),
            country: {
              connect: { id: parseInt(countryId) },  // Connect the country
            },
            synopsis,
            availability,
            genres: {
              connect: genres.map((genreId) => ({ id: parseInt(genreId) })),  // Connect genres
            },
            actors: {
              connect: actors.map((actorId) => ({ id: parseInt(actorId) })),  // Connect actors
            },
            trailerLink,
            rating: parseFloat(rating),
            views: parseInt(views) || 0,
            duration: parseInt(duration),
            awards: {
              create: parsedAwards , // Assuming awards come as an array of objects { name, year }
            },
          },
        });

        res.status(201).json(newDrama);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create drama' });
      }
      break;

    case 'PUT': // Update - Modify an existing drama
      try {
        const {
          id,
          title,
          alternativeTitle,
          urlPhoto,
          year,
          countryId,
          synopsis,
          availability,
          genres,
          actors,
          trailerLink,
          rating,
          views,
          duration
        } = req.body;

        if (!id) {
          return res.status(400).json({ error: 'ID is required to update drama' });
        }

        const updatedDrama = await prisma.drama.update({
          where: { id: parseInt(id) },
          data: {
            title,
            alternativeTitle,
            urlPhoto,
            year: parseInt(year),
            country: {
              connect: { id: parseInt(countryId) },  // Connect the country
            },
            synopsis,
            availability,
            genres: {
              set: [],  // Clear previous genres before connecting new ones
              connect: genres.map((genreId) => ({ id: parseInt(genreId) })),
            },
            actors: {
              set: [],  // Clear previous actors before connecting new ones
              connect: actors.map((actorId) => ({ id: parseInt(actorId) })),
            },
            trailerLink,
            rating: parseFloat(rating),
            views: parseInt(views),
            duration: parseInt(duration),
          },
        });

        res.status(200).json(updatedDrama);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update drama' });
      }
      break;

    case 'DELETE': // Delete - Remove a drama
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: 'Drama ID is required' });
        }

        await prisma.drama.delete({
          where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Drama deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete drama' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
