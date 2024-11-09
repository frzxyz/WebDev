import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async authorize(credentials) {
        // Cari user di database berdasarkan email dari Google
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        // Cek apakah user dalam status suspended
        if (user && user.isSuspended) {
          throw new Error("Your account is suspended");
        }

        return user ? { id: user.id, email: user.email, name: user.username } : null;
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Cari user di database
        const user = await prisma.user.findUnique({
          where: { email },
          include: { role: true }, // Ambil role user
        });

        if (!user) {
          throw new Error("Email is wrong or not registered");
        }

        // Cek apakah user dalam status suspended
        if (user.isSuspended) {
          throw new Error("Your account is suspended");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Password salah");
        }

        return { id: user.id, email: user.email, name: user.username, role: user.role.name }; // Return user object dengan role
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Arahkan ke halaman login custom
    error: "/error-suspended",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        // Cari pengguna di database berdasarkan email untuk cek status suspended
        let dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        // Jika user belum ada, buat user baru
        if (!dbUser) {
          dbUser = await prisma.user.create({
            data: {
              email: user.email,
              username: user.name || user.email.split("@")[0], // Membuat username dari bagian depan email
              role: { connect: { id: 2 } }, // Menyambungkan role default, misalnya role dengan ID 1
            },
          });
        }

        if (dbUser && dbUser.isSuspended) {
          throw new Error("Your account is suspended");
        }

        token.id = user.id; // Simpan user ID di JWT token
        token.email = user.email;
        token.role = user.role; // Simpan role user di JWT token
      }
      return token;
    },
    async session({ session, token }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email },
      });
      if (dbUser) {
        session.user.id = dbUser.id; // Set session dengan ID integer user
        session.user.role = token.role; // Set role user di session
        session.user.isSuspended = dbUser.isSuspended; // Menyimpan status isSuspended di session
      }
      session.user.email = token.email;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect ke halaman utama setelah login
    },
  },
});
