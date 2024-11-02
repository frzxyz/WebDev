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
          alternativeTitle = "",
          urlPhoto,
          year,
          countryId,
          synopsis = "",
          availability,
          genres = [],
          actors = [],
          trailerLink = "",
          awards = [],
          rating = 0,
          views = 0,
          duration = 0
        } = req.body;

        // Ensure that all necessary fields are provided
        if (!title || !year || !countryId || !urlPhoto || !synopsis  || !actors) {
          return res.status(400).json({ error: 'Title, year, synopsis, actors, country, and url photo are required' });
        }

        // Validate data types
        if (typeof title !== 'string' || typeof alternativeTitle !== 'string' || typeof synopsis !== 'string' || !Array.isArray(awards)) {
          return res.status(400).json({ error: 'Title, alternative title, synopsis must be strings, and awards must be an array' });
        }
        if (isNaN(parseInt(year)) || isNaN(parseInt(countryId)) || isNaN(parseFloat(rating)) || isNaN(parseInt(views)) || isNaN(parseInt(duration))) {
          return res.status(400).json({ error: 'Year, rating, views, and duration must be numbers' });
        }

        // Check for duplicate drama by title and year
        const existingDrama = await prisma.drama.findFirst({
          where: { title, year: parseInt(year) },
        });

        if (existingDrama) {
          return res.status(409).json({ error: 'A drama with the same title and year already exists' });
        }

        const parsedAwards = awards.map(award => {
          if (!award.category || isNaN(parseInt(award.year))) {
            throw new Error("Invalid awards format. Each award must have a 'category' and a valid 'year'.");
          }
          
          return {
            name,
            year: parseInt(year),
            category
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
          urlPhoto,
          year,
          synopsis,
        } = req.body;
    
        if (!id) {
          return res.status(400).json({ error: 'ID is required to update drama' });
        }
    
        const updateData = {
          title,
          urlPhoto,
          year: parseInt(year),
          synopsis,
        };
    
        const updatedDrama = await prisma.drama.update({
          where: { id: parseInt(id) },
          data: updateData, // Hanya kirim field yang ingin di-update
        });
    
        res.status(200).json(updatedDrama);
      } catch (error) {
        if (error.code === 'P2025') {
          res.status(404).json({ error: 'Movie not found' });
        } else {
          console.error("Error updating drama:", error);
          res.status(500).json({ error: 'Failed to update drama' });
        }
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
