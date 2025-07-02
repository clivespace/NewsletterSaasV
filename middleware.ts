import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simplified middleware that allows all requests through
// This removes the authentication requirement entirely
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
