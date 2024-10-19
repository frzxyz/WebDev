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
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Simpan user ID di JWT token
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Set session user ID dari token
      session.user.email = token.email;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect ke halaman utama setelah login
    },
  },
});
