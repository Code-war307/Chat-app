import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/dashboard/conversation", "/profile"];
const publicRoutes = ["/","/sign-in", "/sign-up"];

export async function middleware(request) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // User is authenticated
  if (token) {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard/conversation", request.url));
    }
    return NextResponse.next();
  }

  // User is not authenticated
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/sign-in", "/sign-up", "/"],
};
