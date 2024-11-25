import prisma from '../../../../lib/prisma';

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': // Read - Ambil semua negara
      try {
        const countries = await prisma.country.findMany();
        res.status(200).json(countries);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch countries' });
      }
      break;

    case 'POST': // Create - Tambah negara baru
      try {
        let { name } = req.body;

        name = capitalizeWords(name.trim());

        const existingCountry = await prisma.country.findFirst({
          where: { name }
        });

        if (existingCountry) {
          return res.status(409).json({ error: 'Country already exists' });
        }

        if (!name || name.trim() === '') {
          return res.status(400).json({ error: 'Country name is required' });
        }

        const newCountry = await prisma.country.create({
          data: { name },
        });
        res.status(201).json(newCountry);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create country' });
      }
      break;

    case 'PUT': // Update - Ubah data negara
      try {
        const { id, name: originalName } = req.body;

        if (!id) {
          return res.status(400).json({ error: "ID is required" });
        }

        // Capitalize each word in the country name
        const name = capitalizeWords(originalName.trim());

        // Check for duplicate country name, excluding the current country
        const existingCountry = await prisma.country.findFirst({
          where: {
            name,
            NOT: { id: parseInt(id) } // Exclude the current country from duplicate check
          },
        });

        if (existingCountry) {
          return res.status(409).json({ error: 'Country already exists' });
        }
        
        if (!id || !name || name.trim() === '') {
          return res.status(400).json({ error: 'ID and country name are required' });
        }

        const updatedCountry = await prisma.country.update({
          where: { id: parseInt(id) },
          data: { name },
        });

        res.status(200).json(updatedCountry);
      } catch (error) {
        if (error.code === 'P2025') {
          // Prisma error code for 'Record not found'
          res.status(404).json({ error: 'Country not found' });
        } else {
          res.status(500).json({ error: 'Failed to update country' });
        }
      }
      break;

      case 'DELETE': // Delete - Hapus negara
      try {
        const { id } = req.query; // Gunakan query parameter untuk DELETE
        if (!id) {
          return res.status(400).json({ error: 'Country ID is required' });
        }

        // Check if the country is connected to any drama
        const connectedDramas = await prisma.drama.findMany({
          where: {
            countryId: parseInt(id),
          },
        });

        if (connectedDramas.length > 0) {
          return res.status(400).json({
            error: `Cannot delete country because it is associated with ${connectedDramas.length} drama(s). Remove the association before deleting.`,
          });
        }

        // Check if the country is connected to any actor
        const connectedActors = await prisma.actor.findMany({
          where: {
            countryId: parseInt(id),
          },
        });

        if (connectedActors.length > 0) {
          return res.status(400).json({
            error: `Cannot delete country because it is associated with ${connectedActors.length} actor(s). Remove the association before deleting.`,
          });
        }

        // Proceed to delete the country
        await prisma.country.delete({
          where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'Country deleted successfully' });
      } catch (error) {
        if (error.code === 'P2025') {
          res.status(404).json({ error: 'Country not found' });
        } else {
          console.error("Error deleting country:", error);
          res.status(500).json({ error: 'Failed to delete country because it is associated with another table.' });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
