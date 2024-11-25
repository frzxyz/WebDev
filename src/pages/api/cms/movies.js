import prisma from '../../../../lib/prisma';

const isWhitespace = (str) => !str || !str.trim();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': // Read - Get all dramas
      try {
        const dramas = await prisma.drama.findMany({
          include: {
            country: true, // Include related country data
            genres: true,  // Include related genres
            actors: true,  // Include related actors
          },
        });
        res.status(200).json(dramas);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dramas' });
      }
      break;

    case 'POST': // Create - Add a new drama
      try {
        const {
          title,
          alternativeTitle = '',
          urlPhoto,
          year,
          countryId,
          synopsis = '',
          availability,
          genres = [],
          actors = [],
          trailerLink = '',
          rating = 0,
          views = 0,
          duration = 0,
        } = req.body;

        if (!title || !year || !countryId || !urlPhoto || !synopsis || !actors.length) {
          return res
            .status(400)
            .json({ error: 'Title, year, synopsis, actors, country, and URL photo are required' });
        }

        if (isWhitespace(title) || isWhitespace(synopsis) || isWhitespace(urlPhoto)) {
          return res.status(400).json({ error: 'Fields cannot be empty or whitespace' });
        }

        if (!/\.(jpg|jpeg|png)$/i.test(urlPhoto)) {
          return res.status(400).json({ error: 'Poster URL must end with .jpg, .jpeg, or .png' });
        }

        const existingDrama = await prisma.drama.findFirst({
          where: { title, year: parseInt(year) },
        });

        if (existingDrama) {
          return res.status(409).json({ error: 'A movie with the same title and year already exists' });
        }

        const newDrama = await prisma.drama.create({
          data: {
            title: title.trim(),
            alternativeTitle: alternativeTitle.trim(),
            urlPhoto: urlPhoto.trim(),
            year: parseInt(year),
            country: {
              connect: { id: parseInt(countryId) },
            },
            synopsis: synopsis.trim(),
            availability,
            genres: {
              connect: genres.map((genreId) => ({ id: parseInt(genreId) })),
            },
            actors: {
              connect: actors.map((actorId) => ({ id: parseInt(actorId) })),
            },
            trailerLink: trailerLink.trim(),
            rating: parseFloat(rating),
            views: parseInt(views) || 0,
            duration: parseInt(duration),
          },
        });

        res.status(201).json({
          message: 'Movie successfully added!',
          data: newDrama,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Failed to create movie' });
      }
      break;

    case 'PUT': // Update - Modify an existing drama
      try {
        const { id, title, urlPhoto, year, synopsis, genres = [], actors = [] } = req.body;

        if (!id) {
          return res.status(400).json({ error: 'ID is required to update drama' });
        }

        if (!title || isWhitespace(title) || typeof title !== 'string') {
          return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
        }

        if (!urlPhoto || isWhitespace(urlPhoto) || typeof urlPhoto !== 'string') {
          return res.status(400).json({ error: 'URL photo is required and must be a non-empty string' });
        }

        if (!/\.(jpg|jpeg|png)$/i.test(urlPhoto)) {
          return res.status(400).json({ error: 'Poster URL must end with .jpg, .jpeg, or .png' });
        }

        if (!synopsis || isWhitespace(synopsis) || typeof synopsis !== 'string') {
          return res.status(400).json({ error: 'Synopsis is required and must be a non-empty string' });
        }

        if (isNaN(parseInt(year))) {
          return res.status(400).json({ error: 'Year must be a valid number' });
        }

        const currentYear = new Date().getFullYear();
        if (parseInt(year) > currentYear) {
          return res.status(400).json({ error: `Year cannot be greater than the current year (${currentYear})` });
        }

        if (parseInt(year) < 1900) {
          return res.status(400).json({ error: 'Year cannot be less than 1900' });
        }

        const existingDrama = await prisma.drama.findFirst({
          where: {
            title,
            year: parseInt(year),
            NOT: { id: parseInt(id) },
          },
        });

        if (existingDrama) {
          return res.status(409).json({ error: 'A drama with the same title and year already exists' });
        }

        const updateData = {
          title: title.trim(),
          urlPhoto: urlPhoto.trim(),
          year: parseInt(year),
          synopsis: synopsis.trim(),
        };

        if (genres.length > 0) {
          updateData.genres = {
            set: genres.map((genreId) => ({ id: parseInt(genreId) })),
          };
        }

        if (actors.length > 0) {
          updateData.actors = {
            set: actors.map((actorId) => ({ id: parseInt(actorId) })),
          };
        }

        const updatedDrama = await prisma.drama.update({
          where: { id: parseInt(id) },
          data: updateData,
        });

        res.status(200).json(updatedDrama);
      } catch (error) {
        if (error.code === 'P2025') {
          res.status(404).json({ error: 'Movie not found' });
        } else {
          console.error('Error updating drama:', error);
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

        res.status(200).json({ message: 'Movie deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete movie' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
