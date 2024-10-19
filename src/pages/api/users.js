import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': // Ambil semua users
      try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
      break;

    case 'POST': // Tambah user baru
      try {
        const { username, email } = req.body;
        if (!username || !email) {
          return res.status(400).json({ error: 'Username and Email are required' });
        }

        const newUser = await prisma.user.create({
          data: { username, email },
        });
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
      }
      break;

    case 'PUT': // Update user
      try {
        const { id, username, email } = req.body;
        if (!id || !username || !email) {
          return res.status(400).json({ error: 'ID, Username, and Email are required' });
        }

        const updatedUser = await prisma.user.update({
          where: { id: parseInt(id) },
          data: { username, email },
        });

        res.status(200).json(updatedUser);
      } catch (error) {
        if (error.code === 'P2025') {
          res.status(404).json({ error: 'User not found' });
        } else {
          res.status(500).json({ error: 'Failed to update user' });
        }
      }
      break;

    case 'DELETE': // Hapus user
      try {
        const { id } = req.query;
        if (!id) {
          return res.status(400).json({ error: 'User ID is required' });
        }

        await prisma.user.delete({
          where: { id: parseInt(id) },
        });

        res.status(200).json({ message: 'User deleted successfully' });
      } catch (error) {
        if (error.code === 'P2025') {
          res.status(404).json({ error: 'User not found' });
        } else {
          res.status(500).json({ error: 'Failed to delete user' });
        }
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
