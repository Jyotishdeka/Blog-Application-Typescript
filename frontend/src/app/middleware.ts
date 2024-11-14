import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken'); // Adjust the token name based on your app's authentication
   console.log("authToken", authToken);
   
  if (!authToken) {
    return NextResponse.redirect(new URL('/auth/signin', request.url));
  }

  return NextResponse.next();
}

// Specify which routes to protect
export const config = {
  matcher: ['/create/:path*'],
};
