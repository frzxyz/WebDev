import handler from '../pages/api/login';
import bcrypt from "bcryptjs";
import prisma from "../../lib/prisma";

jest.mock("../../lib/prisma", () => ({
  user: {
    findUnique: jest.fn(),
  },
}));

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "mockedToken"),
}));

describe("Login API Handler", () => {
  it("should return 400 if email or password is missing", async () => {
    const req = {
      method: "POST",
      body: { email: "", password: "" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Email dan password harus diisi" });
  });

  it("should return 401 if user is not found", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    const req = {
      method: "POST",
      body: { email: "test@gmail.com", password: "password123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Your email is wrong or not registered" });
  });

  it("should return 403 if user is suspended", async () => {
    prisma.user.findUnique.mockResolvedValue({
      email: "test@gmail.com",
      password: "hashedpassword",
      isSuspended: true,
    });

    const req = {
      method: "POST",
      body: { email: "test@gmail.com", password: "password123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Your account is suspended" });
  });

  it("should return 401 if password is incorrect", async () => {
    prisma.user.findUnique.mockResolvedValue({
      email: "test@gmail.com",
      password: "hashedpassword",
      isSuspended: false,
    });

    bcrypt.compare.mockResolvedValue(false);

    const req = {
      method: "POST",
      body: { email: "test@gmail.com", password: "wrongpassword" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Password is wrong" });
  });

  it("should return 200 and a token if login is successful", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: "test@gmail.com",
      password: "hashedpassword",
      role: { name: "User" },
      isSuspended: false,
    });

    bcrypt.compare.mockResolvedValue(true);

    const req = {
      method: "POST",
      body: { email: "test@gmail.com", password: "password123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      token: "mockedToken",
      userId: 1,
      role: "User",
    });
  });
});