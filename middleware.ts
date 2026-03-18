import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const res = await fetch(new URL("/api/auth/get-session", request.url), {
    headers: request.headers,
  });
  const session = res.ok ? await res.json() : null;

  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
    "/verify-email",
    "/reset-password",
    "/platforms",
  ];
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // Auth-related routes (used to redirect authenticated users away from auth pages)
  const authRoutes = ["/sign-in", "/sign-up", "/verify-email", "/reset-password"];
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/"),
  );

  // API routes are always allowed
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access protected route
  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // If user is authenticated but email not verified (except on verify-email page)
  if (
    session &&
    !session.user.emailVerified &&
    !pathname.startsWith("/verify-email")
  ) {
    return NextResponse.redirect(new URL("/verify-email", request.url));
  }

  // If user is authenticated and verified but hasn't completed onboarding (except on onboarding page)
  if (
    session &&
    session.user.emailVerified &&
    !session.user.onboardingCompleted &&
    !pathname.startsWith("/onboarding")
  ) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  // If authenticated user tries to access auth pages, redirect to dashboard
  if (
    session &&
    session.user.emailVerified &&
    isAuthRoute &&
    pathname !== "/"
  ) {
    const redirectUrl = session.user.onboardingCompleted
      ? "/dashboard"
      : "/onboarding";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public|sitemap.xml|robots.txt).*)",
  ],
};
