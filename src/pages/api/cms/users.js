import prisma from '../../../../lib/prisma';

function isValidUsername(username) {
  // Check that username contains alphabetic characters and does not contain only numbers or special characters
  const containsAlphabet = /[a-zA-Z]/.test(username);
  const isOnlyNumbersOrSpecialChars = /^[^a-zA-Z]*$/.test(username);

  return containsAlphabet && !isOnlyNumbersOrSpecialChars;
}

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

        if (!isValidUsername(username)) {
          return res.status(400).json({ error: 'Invalid username. It must contain alphabetic characters and cannot be only numbers or special characters.' });
        }

        // Check for duplicate username
        const existingUsername = await prisma.user.findFirst({
          where: { username: username.trim() }
        });

        if (existingUsername) {
          return res.status(409).json({ error: 'Username already exists' });
        }

        // Check for duplicate email
        const existingEmail = await prisma.user.findFirst({
          where: { email: email.trim() }
        });

        if (existingEmail) {
          return res.status(409).json({ error: 'Email already exists' });
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
        const { id, username, email, isSuspended } = req.body;
    
        // Ensure `id` is provided, but allow other fields to be optional
        if (!id) {
          return res.status(400).json({ error: 'ID is required' });
        }
    
        const dataToUpdate = {};
        
        if (username !== undefined) {
          if (!isValidUsername(username)) {
            return res.status(400).json({ error: 'Invalid username. It must contain alphabetic characters and cannot be only numbers or special characters.' });
          }

          // Check for duplicate username
          const existingUser = await prisma.user.findFirst({
            where: {
              username: username.trim(),
              NOT: { id: parseInt(id) } // Exclude current user from duplicate check
            }
          });

          if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
          }
          dataToUpdate.username = username.trim();
        }

        if (email !== undefined) {
          // Check for duplicate email
          const existingEmailUser = await prisma.user.findFirst({
            where: {
              email: email.trim(),
              NOT: { id: parseInt(id) } // Exclude current user from duplicate check
            }
          });

          if (existingEmailUser) {
            return res.status(409).json({ error: 'Email already exists' });
          }
          dataToUpdate.email = email.trim();
        }

        if (isSuspended !== undefined) dataToUpdate.isSuspended = isSuspended;
    
        const updatedUser = await prisma.user.update({
          where: { id: parseInt(id) },
          data: dataToUpdate,
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
