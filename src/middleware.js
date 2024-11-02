import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Mendapatkan token dari session menggunakan NextAuth
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Tentukan path yang dibatasi aksesnya
  const cmsPaths = [
    '/cms-actors',
    '/cms-awards',
    '/cms-comments',
    '/cms-countries',
    '/cms-genres',
    '/cms-global',
    '/cms-movies',
    '/cms-users',
  ];

  const { pathname } = req.nextUrl;

  // Cek apakah URL yang diakses adalah salah satu dari path yang dibatasi
  if (cmsPaths.some(path => pathname.startsWith(path))) {
    // Jika token tidak ada, user belum login, redirect ke halaman login
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Periksa apakah user memiliki role 'Admin'
    if (token.role !== "admin") {
      // Redirect ke halaman tidak berizin jika role bukan Admin
      return NextResponse.redirect(new URL("/not-authorized", req.url));
    }
  }

  // Jika semua validasi berhasil, lanjutkan ke halaman yang dituju
  return NextResponse.next();
}

// Konfigurasi matcher untuk menentukan path yang ingin dibatasi
export const config = {
  matcher: [
    '/cms-actors/:path*',
    '/cms-awards/:path*',
    '/cms-comments/:path*',
    '/cms-countries/:path*',
    '/cms-genres/:path*',
    '/cms-global/:path*',
    '/cms-movies/:path*',
    '/cms-users/:path*',
  ],
};
