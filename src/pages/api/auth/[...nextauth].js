import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from '../../../../lib/prisma'; // Prisma Client

export default NextAuth({
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        console.log('Google Profile:', profile);
        console.log('User Data:', user);

        // Cek apakah user sudah ada di database berdasarkan email
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });

        console.log('Existing User:', existingUser);

        if (existingUser) {
          // Jika pengguna sudah terdaftar tapi bukan dengan Google
          if (account.provider !== 'google') {
            throw new Error('Email ini tidak registrasi menggunakan Google');
          }

          // Jika sudah terdaftar dengan Google, izinkan login
          return true;
        } else {
          // Jika pengguna belum ada, buat akun baru di database
          await prisma.user.create({
            data: {
              email: user.email,
              username: profile.name || user.name || 'Anonymous',
              roleId: 2,  // Role writer
            },
          });
          return true; // Lanjutkan sign-in
        }
      } catch (error) {
        console.error('Error during sign-in:', error);
        throw new Error(error.message);
      }
    },
    // Callback untuk menyimpan userId ke dalam session
    async session({ session, token, user }) {
      session.userId = token.sub; // Menyimpan userId ke session
      session.user = {
        id: token.sub,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      };
      return session;
    },
  },
});
