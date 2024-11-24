import handler from '../pages/api/register'; 
import bcrypt from 'bcryptjs';

jest.mock('../../lib/prisma', () => ({
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

describe('Register API', () => {
  const prisma = require('../../lib/prisma'); // Import mock prisma

  const mockRequestResponse = (method, body = {}) => {
    const req = { method, body };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    return { req, res };
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Reset semua mock sebelum tiap test
  });

  it('should return 405 if method is not POST', async () => {
    const { req, res } = mockRequestResponse('GET');

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: 'Method tidak diizinkan' });
  });

  it('should return 400 if required fields are missing', async () => {
    const { req, res } = mockRequestResponse('POST', { email: 'test@gmail.com' });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email, password, and username must be filled' });
  });

  it('should return 409 if email already exists', async () => {
    prisma.user.findUnique.mockResolvedValueOnce({ id: 1, email: 'test@gmail.com' });

    const { req, res } = mockRequestResponse('POST', {
      email: 'test@gmail.com',
      password: 'Password123',
      username: 'testuser',
    });

    await handler(req, res);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@gmail.com' } });
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Email has been registered' });
  });

  it('should return 409 if username already exists', async () => {
    prisma.user.findUnique
      .mockResolvedValueOnce(null) // No user with the given email
      .mockResolvedValueOnce({ id: 2, username: 'testuser' }); // Username already exists

    const { req, res } = mockRequestResponse('POST', {
      email: 'new@gmail.com',
      password: 'Password123',
      username: 'testuser',
    });

    await handler(req, res);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'new@gmail.com' } });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { username: 'testuser' } });
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: 'Username already used' });
  });

  it('should return 400 if email is not @gmail.com', async () => {
    const { req, res } = mockRequestResponse('POST', {
      email: 'test@yahoo.com',
      password: 'Password123',
      username: 'testuser',
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Only @gmail.com email addresses are allowed' });
  });

  it('should return 201 if user is created successfully', async () => {
    prisma.user.findUnique.mockResolvedValue(null); // No existing email or username
    bcrypt.hash.mockResolvedValue('hashedpassword123'); // Mock bcrypt hash
    prisma.user.create.mockResolvedValue({
      id: 1,
      email: 'test@gmail.com',
      username: 'testuser',
      roleId: 2,
    });

    const { req, res } = mockRequestResponse('POST', {
      email: 'test@gmail.com',
      password: 'Password123',
      username: 'testuser',
    });

    await handler(req, res);

    expect(bcrypt.hash).toHaveBeenCalledWith('Password123', 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        email: 'test@gmail.com',
        password: 'hashedpassword123',
        username: 'testuser',
        roleId: 2,
      },
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User registered successfully. Please sign in to continue',
      user: {
        id: 1,
        email: 'test@gmail.com',
        username: 'testuser',
        roleId: 2,
      },
    });
  });
});
