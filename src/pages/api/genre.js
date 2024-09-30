import prisma from '../../../lib/prisma'; // Pastikan path prisma sudah benar

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    // Read - Mendapatkan semua genre
    case 'GET':
      try {
        const genres = await prisma.genre.findMany();
        res.status(200).json(genres);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch genres" });
      }
      break;

    // Create - Menambah genre baru
    case 'POST':
      try {
        const { name, description } = req.body;
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

    // Update - Mengubah genre berdasarkan id
    case 'PUT':
      try {
        const { id, name, description } = req.body;
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

    // Delete - Menghapus genre berdasarkan id
    case 'DELETE':
      try {
        const { id } = req.body;
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
