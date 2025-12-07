import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

// Set to true to bypass admin auth check for local UI testing
const BYPASS_ADMIN_AUTH = process.env.NODE_ENV === "development";

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Check if this is an admin route
  if (pathname.startsWith("/admin")) {
    // Bypass auth check in development for UI testing
    if (BYPASS_ADMIN_AUTH) {
      return NextResponse.next();
    }

    const user = req.auth?.user;

    // If not authenticated, redirect to sign in
    if (!user) {
      const signInUrl = new URL("/auth/signin", req.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    // If authenticated but not admin, redirect to home
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const role = (user as any).role;
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
