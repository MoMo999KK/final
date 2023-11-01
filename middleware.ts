import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
   function middleware(req) {
    if (
        req.nextUrl.pathname.startsWith("/instructor") &&
        req.nextauth.token?.isInstructor ===false
      ) {
        return new NextResponse("You are not a teacher!");
      }


     if (
      req.nextUrl.pathname.startsWith("/adminstrator")   &&
      req.nextauth.token?.isAdmin ===false
    ) {
      return new NextResponse("You are not authorized!");
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = { matcher: ["/adminstrator/:path*", "/instructor/:path*"] };