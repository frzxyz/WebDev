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
          include: { role: true }, // Ambil role user
        });

        if (!user) {
          throw new Error("Email salah atau tidak terdaftar");
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
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
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
      }
      session.user.email = token.email;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl; // Redirect ke halaman utama setelah login
    },
  },
});
