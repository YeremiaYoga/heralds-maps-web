import { NextResponse } from 'next/server';

export function middleware(req) {
  const url = req.nextUrl.pathname;

  if (url.startsWith('/api/admin')) {
    const token = req.headers.get('authorization');
    if (!token || token !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*'],
};
