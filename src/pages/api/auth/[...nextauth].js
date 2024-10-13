import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../../lib/prisma"; // Prisma Client

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt", // Gunakan JWT untuk sesi
  },
  pages: {
    signIn: "/login", // Arahkan ke halaman login custom
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        // Cari user berdasarkan email
        let existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        if (!existingUser) {
          // Buat user baru jika tidak ditemukan
          existingUser = await prisma.user.create({
            data: {
              email: user.email,
              username: user.name || "Anonymous",
              roleId: 2, // Role writer
            },
          });
        }

        return true; // Login berhasil
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Gagal login
      }
    },
    async session({ session, token }) {
      // Cari user di database berdasarkan email dari token
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email },
      });

      if (dbUser) {
        session.user.id = dbUser.id; // Set session dengan ID integer user
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email; // Simpan email di token untuk digunakan nanti
      }
      return token;
    },
  },
});
