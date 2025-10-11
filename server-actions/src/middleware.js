import { NextResponse } from "next/server";

export function middleware(request) {
  const isPublic =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";

  if (request.cookies.get("user")) {
    if (isPublic) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    if (!isPublic) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/", "/login", "/register"],
};
