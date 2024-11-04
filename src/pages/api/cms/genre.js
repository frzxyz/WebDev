import prisma from '../../../../lib/prisma';

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    // Read - Get all genres
    case 'GET':
      try {
        const genres = await prisma.genre.findMany();
        res.status(200).json(genres);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch genres" });
      }
      break;

    // Create - Add a new genre
    case 'POST':
      try {
        let { name, description } = req.body;

        // Capitalize each word in the genre name
        name = capitalizeWords(name.trim());

        // Check if the genre name already exists
        const existingGenre = await prisma.genre.findFirst({
          where: { name }
        });

        if (existingGenre) {
          return res.status(409).json({ error: 'Genre already exists' });
        }

        // Create the new genre
        const newGenre = await prisma.genre.create({
          data: {
            name,
            description,
          },
        });
        res.status(201).json(newGenre);
      } catch (error) {
        res.status(500).json({ error: "Failed to create genre" });
      }
      break;

    // Update - Modify a genre by id
    case 'PUT':
      try {
        const { id, name: originalName, description } = req.body;

        if (!id) {
          return res.status(400).json({ error: "ID is required" });
        }

        // Capitalize each word in the genre name
        const name = capitalizeWords(originalName.trim());

        // Check for duplicate genre name, excluding the current genre
        const existingGenre = await prisma.genre.findFirst({
          where: {
            name,
            NOT: { id: parseInt(id) } // Exclude the current genre from duplicate check
          },
        });

        if (existingGenre) {
          return res.status(409).json({ error: 'Genre already exists' });
        }

        // Update the genre
        const updatedGenre = await prisma.genre.update({
          where: { id: parseInt(id) },
          data: {
            name,
            description,
          },
        });
        res.status(200).json(updatedGenre);
      } catch (error) {
        res.status(500).json({ error: "Failed to update genre" });
      }
      break;

    // Delete - Remove a genre by id
    case 'DELETE':
      try {
        const { id } = req.body;
        if (!id) {
          return res.status(400).json({ error: "Genre ID is required" });
        }

        await prisma.genre.delete({
          where: { id: parseInt(id) },
        });
        res.status(200).json({ message: "Genre deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete genre" });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
