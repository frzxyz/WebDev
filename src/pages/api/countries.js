import prisma from '../../../lib/prisma';

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
        const { name } = req.body;
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
        const { id, name } = req.body;
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

        await prisma.country.delete({
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
