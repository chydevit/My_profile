import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Only protect admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        const basicAuth = request.headers.get('authorization')

        if (basicAuth) {
            const authValue = basicAuth.split(' ')[1]
            const [user, pwd] = atob(authValue).split(':')

            // Simple credentials (should be in env vars in production)
            // Default to admin/admin for development if not set
            const validUser = process.env.ADMIN_USER || 'admin';
            const validPwd = process.env.ADMIN_PASSWORD || 'admin';

            if (user === validUser && pwd === validPwd) {
                return NextResponse.next()
            }
        }

        return new NextResponse('Authentication required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Admin Area"',
            },
        })
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
