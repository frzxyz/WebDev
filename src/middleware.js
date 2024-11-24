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
    '/api/cms'  // Tambahkan folder API CMS
  ];

  const { pathname } = req.nextUrl;

  // Sementara nonaktifkan pemeriksaan token untuk pengujian
  if (cmsPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  return NextResponse.next();
}


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
    '/api/cms/:path*',  // Tambahkan ini untuk folder API CMS
  ],
};