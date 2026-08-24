import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Toggle by setting MAINTENANCE_MODE=true in the deployment's environment
// variables and redeploying — every route except /maintenance itself
// (and Next's internals/API routes, excluded via the matcher) rewrites
// to the maintenance page while it's on.
export function proxy(request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "true") {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL("/maintenance", request.url));
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|maintenance).*)"],
};
