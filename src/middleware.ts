
import { type NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    // Create client for middleware
    // Note: we can't use the helper from lib/supabase/server here directly 
    // because middleware has a slightly different cookie API requirement 
    // (updating response cookies vs just reading).
    // Standard pattern:
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: You *must* return the supabaseResponse object as it contains the refreshed session cookies
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Admin Protection Logic
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user) {
            // Redirect to login if not authenticated
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }
    }

    return supabaseResponse
}

export const config = {
    matcher: [
        // Match all request paths except for:
        // - _next/static (static files)
        // - _next/image (image optimization files)
        // - favicon.ico (favicon file)
        // - public files
        // But specifically we want to run this mainly for /admin
        // Next.js middleware best practice is to match generally and filter inside, or match specific paths.
        // Let's match almost everything to keep session alive, but logic only triggers on /admin
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
