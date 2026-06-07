import { NextResponse } from "next/server";

export function proxy(request) {
  const cookieNames = request.cookies.getAll().map((cookie) => cookie.name.toLowerCase());
  const hasSessionCookie = cookieNames.some(
    (name) => name.includes("better-auth") || name.includes("session")
  );

  if (!hasSessionCookie) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/my-tutors",
    "/add-tutor",
    "/booked-sessions",
    "/profile",
    "/tutors/:id",
  ],
};
