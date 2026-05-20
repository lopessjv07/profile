import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Native Web Crypto SHA-256 helper (Edge Runtime compatible)
async function getSessionHash(password: string) {
  const msgBuffer = new TextEncoder().encode(password + "lopes_profile_salt_2026");
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Paths to protect
  const protectedPages = ["/payments/creationpay", "/payments/clients"];
  const protectedApis = ["/api/payments/create-link", "/api/payments/clients"];

  const isProtectedPage = protectedPages.some((page) => pathname.startsWith(page));
  const isProtectedApi = protectedApis.some((api) => pathname.startsWith(api));

  if (isProtectedPage || isProtectedApi) {
    const sessionCookie = request.cookies.get("admin_session")?.value;
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
    const expectedHash = await getSessionHash(adminPassword);

    const isAuthorized = sessionCookie === expectedHash;

    if (!isAuthorized) {
      if (isProtectedApi) {
        return new NextResponse(
          JSON.stringify({ success: false, message: "Não autorizado" }),
          {
            status: 401,
            headers: { "content-type": "application/json" },
          }
        );
      }

      // Redirect pages to login
      const loginUrl = new URL("/payments/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Configure which paths middleware runs on
export const config = {
  matcher: [
    "/payments/creationpay/:path*",
    "/payments/clients/:path*",
    "/api/payments/create-link/:path*",
    "/api/payments/clients/:path*",
  ],
};
