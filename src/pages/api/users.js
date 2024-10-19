import prisma from '../../../lib/prisma';

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET': // Read - Ambil semua users
      try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
      }
      break;

    case 'POST': // Create - Tambah user baru
      try {
        const { username, email, roleId } = req.body;
        if (!username || !email || !roleId) {
          return res.status(400).json({ error: 'All fields are required' });
        }

        const newUser = await prisma.user.create({
          data: {
            username,
            email,
            roleId: parseInt(roleId), // Simpan role sebagai integer
            createdAt: new Date(), // Simpan waktu pembuatan
          },
        });
        res.status(201).json(newUser);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
      }
      break;

    case 'PUT': // Update - Ubah data user
      try {
        const { id, username, email, role } = req.body;
        if (!id || !username || !email || !role) {
          return res.status(400).json({ error: 'ID, username, email, and role are required' });
        }

        const updatedUser = await prisma.user.update({
          where: { id: parseInt(id) },
          data: {
            username,
            email,
            role: parseInt(role),
          },
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

    case 'DELETE': // Delete - Hapus user
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
