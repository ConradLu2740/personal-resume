import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUSPICIOUS_PATTERNS = [
  /curl/i,
  /wget/i,
  /python/i,
  /scrapy/i,
  /java\//i,
  /go-http/i,
  /httpx/i,
  /libwww/i,
  /apachebench/i,
  /httpclient/i,
  /postman/i,
  /insomnia/i,
]

const SUSPICIOUS_HEADERS = [
  'x-bot',
  'x-crawler',
  'x-ahc',
  'x-do-nottrack',
]

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const userAgent = request.headers.get('user-agent') || ''

  const isSuspiciousUA = SUSPICIOUS_PATTERNS.some((pattern) =>
    pattern.test(userAgent)
  )

  const hasSuspiciousHeaders = SUSPICIOUS_HEADERS.some((header) =>
    request.headers.has(header)
  )

  const hasAcceptLanguage = request.headers.has('accept-language')
  const hasAcceptEncoding = request.headers.has('accept-encoding')

  const honeypotCookie = request.cookies.get('trap_visited')
  const hasTriggeredHoneypot = !!honeypotCookie

  if (isSuspiciousUA || (hasSuspiciousHeaders && hasTriggeredHoneypot)) {
    return new NextResponse(
      '<html><body style="display:none"></body></html>',
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      }
    )
  }

  if (!hasTriggeredHoneypot) {
    response.cookies.set('trap_visited', '1', {
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'lax',
    })
  }

  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|resume.pdf).*)',
  ],
}
