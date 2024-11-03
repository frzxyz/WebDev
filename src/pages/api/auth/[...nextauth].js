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
        });

        if (!user) {
          throw new Error("Email salah atau tidak terdaftar");
        }

        // Cek apakah user dalam status suspended
        if (user.isSuspended) {
          throw new Error("Your account is suspended");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          throw new Error("Password salah");
        }

        return { id: user.id, email: user.email, name: user.username }; // Return user object
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
    async jwt({ token, user }) {
      if (user) {
        // Cari pengguna di database berdasarkan email untuk cek status suspended
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (dbUser && dbUser.isSuspended) {
          throw new Error("Your account is suspended");
        }

        token.id = user.id; // Simpan user ID di JWT token
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email },
      });
      if (dbUser) {
        session.user.id = dbUser.id; // Set session dengan ID integer user
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
