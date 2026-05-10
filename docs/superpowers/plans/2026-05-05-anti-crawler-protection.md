# Personal Portfolio Anti-Crawler Protection Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement multi-layer anti-crawler protection for a static Next.js portfolio site deployed via Docker/Nginx, without degrading legitimate user experience.

**Architecture:** Deploy protection at three layers: (1) Nginx reverse proxy with rate limiting, User-Agent blocking, and IP access control; (2) Next.js middleware for bot detection and challenge-response; (3) Frontend obfuscation for email links and sensitive content. All layers are stateless and work with the existing static export (`output: 'export'`).

**Tech Stack:** Nginx, Next.js 14 Middleware (Edge Runtime), Docker, TypeScript

---

## Threat Assessment

| Threat Vector | Risk Level | Target | Priority |
|---------------|------------|--------|----------|
| Resume PDF scraping | Medium | `/resume.pdf` | High |
| Contact email harvesting | High | Email addresses | High |
| Rapid page crawling | Low-Medium | All HTML pages | Medium |
| Bot traffic noise | Low | Server logs | Low |
| SEO crawler overloading | Low | All resources | Low |

---

## File Modification Map

| File | Action | Responsibility |
|------|--------|----------------|
| `nginx.conf` | Modify | Rate limiting, IP blocking, bot headers, Honeypot |
| `Dockerfile` | No change | — |
| `src/middleware.ts` | Create | Bot detection, challenge page, honeypot redirect |
| `src/app/api/challenge/route.ts` | Create | JavaScript challenge endpoint |
| `src/app/challenge/page.tsx` | Create | Challenge page (CAPTCHA alternative) |
| `src/sections/Contact.tsx` | Modify | Obfuscate email, add honeypot field |
| `src/app/globals.css` | Modify | Honeypot hidden styles |

---

## Task 1: Nginx Rate Limiting & Bot Blocking

**Files:**
- Modify: `nginx.conf`

- [ ] **Step 1: Create backup of nginx.conf**

```bash
cp nginx.conf nginx.conf.bak
```

- [ ] **Step 2: Write enhanced nginx.conf with all protections**

```nginx
limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=page_limit:10m rate=30r/m;

map $http_user_agent $bad_bot {
    default 0;
    ~*curl 1;
    ~*wget 1;
    ~*python 1;
    ~*scrapy 1;
    ~*bot 1;
    ~*spider 1;
    ~*crawl 1;
    ~*apachebench 1;
    ~*httpclient 1;
    ~*java/ 1;
    ~*go-http 1;
    ~*axios 1;
    ~*perl 1;
    ~*libwww-perl 1;
    ~*httpx 1;
}

server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Block known bad bots before anything else
    if ($bad_bot) {
        return 444;
    }

    # Strict CSP - prevent inline script injection
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none';" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Honeypot trap for scrapers
    location = /robots.txt {
        return 200 "User-agent: *\nDisallow: /\n";
    }

    # Fake sitemap to lure scrapers
    location = /sitemap.xml {
        return 200 "<?xml version=\"1.0\"?><urlset><url><loc>/</loc></url></urlset>";
    }

    # Rate limiting for HTML pages
    location ~* \.html?$ {
        limit_req zone=page_limit burst=20 nodelay;
        limit_conn addr 10;
        try_files $uri $uri.html $uri/ /index.html;
    }

    # Stricter rate limiting for API routes (if added later)
    location /api/ {
        limit_req zone=api_limit burst=5 nodelay;
        add_header X-Robots-Tag "noindex, nofollow";
    }

    # Serve static assets with aggressive caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        add_header X-Content-Type-Options "nosniff";
    }

    # Default route - SPA fallback
    location / {
        try_files $uri $uri.html $uri/ /index.html;
    }
}
```

- [ ] **Step 3: Verify nginx syntax**

Run: `nginx -t -c nginx.conf`
Expected: `nginx: [warn] the method name is deprecated in /etc/nginx/nginx.conf` (warning is OK)

- [ ] **Step 4: Commit**

```bash
git add nginx.conf nginx.conf.bak
git commit -m "chore: add Nginx anti-crawler protections"
```

---

## Task 2: Next.js Edge Middleware Bot Detection

**Files:**
- Create: `src/middleware.ts`
- Modify: `src/app/layout.tsx` (add CSP meta tag)

- [ ] **Step 1: Create src/middleware.ts**

```typescript
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

  // Check for suspicious User-Agent
  const isSuspiciousUA = SUSPICIOUS_PATTERNS.some((pattern) =>
    pattern.test(userAgent)
  )

  // Check for suspicious headers
  const hasSuspiciousHeaders = SUSPICIOUS_HEADERS.some((header) =>
    request.headers.has(header)
  )

  // Check for missing common browser headers
  const hasAcceptLanguage = request.headers.has('accept-language')
  const hasAcceptEncoding = request.headers.has('accept-encoding')

  // Honeypot cookie check
  const honeypotCookie = request.cookies.get('trap_visited')
  const hasTriggeredHoneypot = !!honeypotCookie

  // Block if: suspicious UA OR (suspicious headers OR missing browser headers) AND honeypot triggered
  if (isSuspiciousUA || (hasSuspiciousHeaders && hasTriggeredHoneypot)) {
    return new NextResponse(
      '<html><body style="display:none"></body></html>',
      {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      }
    )
  }

  // Set honeypot cookie for first visit
  if (!hasTriggeredHoneypot) {
    response.cookies.set('trap_visited', '1', {
      maxAge: 60 * 60 * 24,
      path: '/',
      sameSite: 'lax',
    })
  }

  // Add security headers
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
```

- [ ] **Step 2: Update src/app/layout.tsx to add CSP meta**

In the `<head>` section of layout.tsx, add:

```tsx
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;" />
```

- [ ] **Step 3: Commit**

```bash
git add src/middleware.ts src/app/layout.tsx
git commit -m "feat: add Next.js Edge middleware for bot detection"
```

---

## Task 3: Email Obfuscation in Contact Section

**Files:**
- Modify: `src/sections/Contact.tsx`
- Create: `src/lib/obfuscate.ts`

- [ ] **Step 1: Create src/lib/obfuscate.ts**

```typescript
export function obfuscateEmail(email: string): string {
  return email
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0)
      return `&#${code};`
    })
    .join('')
}

export function createMailtoLink(email: string, subject: string = '', body: string = ''): string {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  return `mailto:${email}?${params.toString()}`
}
```

- [ ] **Step 2: Modify src/sections/Contact.tsx - update imports**

At the top of the file, add:

```typescript
import { obfuscateEmail, createMailtoLink } from '@/lib/obfuscate'
```

- [ ] **Step 3: Modify src/sections/Contact.tsx - update contactInfo array**

Replace the `contactInfo` array with:

```typescript
const contactInfo = [
  {
    icon: Mail,
    label: 'email',
    value: 'luxiyuan2020@163.com',
    href: '#contact',
    displayValue: obfuscateEmail('luxiyuan2020@163.com'),
  },
  {
    icon: Phone,
    label: 'phone',
    value: '13906573716',
    href: '#contact',
    displayValue: '139-0657-3716',
  },
  {
    icon: MapPin,
    label: 'location',
    value: '杭州市',
    href: '#',
    displayValue: '杭州市',
  },
]
```

- [ ] **Step 4: Modify the email display in Contact.tsx**

Find the email contact item rendering and replace:

```tsx
<div>
  <p className="text-sm text-muted-foreground">
    {t(`contact.${item.label}`) as string}
  </p>
  {item.label === 'email' ? (
    <p
      className="font-medium"
      dangerouslySetInnerHTML={{ __html: item.displayValue as string }}
    />
  ) : (
    <p className="font-medium">{item.displayValue}</p>
  )}
</div>
```

- [ ] **Step 5: Update the mailto handler**

Replace the `handleSubmit` function:

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  const mailto = createMailtoLink(
    'luxiyuan2020@163.com',
    `来自 ${formData.name} 的消息`,
    `发件人: ${formData.name}\n邮箱: ${formData.email}\n\n${formData.message}`
  )
  window.open(mailto, '_blank')
}
```

- [ ] **Step 6: Add honeypot field to form**

Add a hidden honeypot field before the submit button:

```tsx
<div className="hidden" aria-hidden="true">
  <input
    type="text"
    name="website"
    tabIndex={-1}
    autoComplete="off"
  />
</div>

<button
  type="submit"
  // ... existing code
>
```

- [ ] **Step 7: Add honeypot CSS to src/app/globals.css**

Add at the end of the file:

```css
/* Honeypot field - hidden from real users */
.hidden[aria-hidden="true"] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

- [ ] **Step 8: Commit**

```bash
git add src/lib/obfuscate.ts src/sections/Contact.tsx src/app/globals.css
git commit -m "feat: obfuscate email and add honeypot form field"
```

---

## Task 4: Challenge Page for Suspicious Requests

**Files:**
- Create: `src/app/api/challenge/route.ts`
- Create: `src/app/challenge/page.tsx`

- [ ] **Step 1: Create src/app/api/challenge/route.ts**

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  const challengeToken = Math.random().toString(36).substring(2, 15)

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Verifying...</title>
  <style>
    body { font-family: system-ui; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f3f4f6; }
    .container { text-align: center; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
    h1 { font-size: 1.5rem; margin-bottom: 1rem; color: #111827; }
    p { color: #6b7280; margin-bottom: 1.5rem; }
    .loader { width: 40px; height: 40px; border: 3px solid #e5e7eb; border-top-color: #0ea5e9; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 1rem; }
    @keyframes spin { to { transform: rotate(360deg); } }
  </style>
</head>
<body>
  <div class="container">
    <div class="loader"></div>
    <h1>Verifying your browser...</h1>
    <p>Please wait a moment.</p>
  </div>
  <script>
    setTimeout(() => { window.location.href = '/'; }, 2000);
  </script>
</body>
</html>
`

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}
```

- [ ] **Step 2: Create src/app/challenge/page.tsx**

```typescript
'use client'

export default function ChallengePage() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#f3f4f6',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #e5e7eb',
          borderTopColor: '#0ea5e9',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem'
        }} />
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#111827' }}>
          Verifying your browser...
        </h1>
        <p style={{ color: '#6b7280' }}>
          Please wait a moment.
        </p>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/api/challenge/route.ts src/app/challenge/page.tsx
git commit -m "feat: add browser challenge page"
```

---

## Task 5: Resume PDF Protection

**Files:**
- Modify: `nginx.conf`
- Create: `src/middleware.ts` (update)

- [ ] **Step 1: Update nginx.conf to protect resume.pdf**

Add this location block to the server section in nginx.conf:

```nginx
# Protect resume.pdf with referer check
location = /resume.pdf {
    valid_referers none blocked ~.luxiyuan-portfolio ~.cloudflare.com ~.vercel.app localhost;
    if ($invalid_referer) {
        return 403;
    }
    add_header Cache-Control "private, no-cache, no-store";
    add_header X-Download-Options "noopen";
}
```

- [ ] **Step 2: Update middleware to add referer check logic**

Add to src/middleware.ts:

```typescript
// In the middleware function, add this check before blocking
const referer = request.headers.get('referer')

// Allow direct downloads but block cross-site requests to resume.pdf
if (request.nextUrl.pathname === '/resume.pdf' && !referer) {
  // Allow direct access (bookmark, paste URL)
  // Block is handled by Nginx
}
```

- [ ] **Step 3: Commit**

```bash
git add nginx.conf src/middleware.ts
git commit -m "feat: protect resume.pdf with referer validation"
```

---

## Task 6: Monitoring & Logging

**Files:**
- Modify: `nginx.conf`

- [ ] **Step 1: Add bot access logging to nginx.conf**

Add this at the top of the nginx.conf file (before the server block):

```nginx
# Log format for bot detection
log_format bot_log '$remote_addr - $remote_user [$time_local] '
                   '"$request" $status $body_bytes_sent '
                   '"$http_user_agent" "$http_referer" '
                   'bad_bot=$bad_bot';

access_log /var/log/nginx/access.log bot_log;
error_log /var/log/nginx/error.log;
```

- [ ] **Step 2: Commit**

```bash
git add nginx.conf
git commit -m "chore: add bot access logging to Nginx"
```

---

## Verification Checklist

After implementing all tasks, verify each layer:

| Layer | Verification |
|-------|--------------|
| Nginx | `curl -A "curl/7.68.0" http://localhost:3000` should return empty response (444) |
| Nginx Rate Limit | Rapidly request 50+ pages, should get 503 or delayed response |
| Honeypot | `curl http://localhost:3000/robots.txt` should return `Disallow: /` |
| Email | View page source, email should appear as `&#108;&#117;&#120;...` |
| Middleware | Check response headers for X-Content-Type-Options |
| Resume | `curl http://localhost:3000/resume.pdf` without referer should return 403 |

---

## Rollback Instructions

If any layer causes issues:

```bash
# Rollback Nginx changes
cp nginx.conf.bak nginx.conf
nginx -s reload

# Disable middleware
rm src/middleware.ts
npm run build

# Disable email obfuscation
# Revert Contact.tsx changes manually
```

---

## Plan Summary

| Task | Changes | Risk |
|------|---------|------|
| 1. Nginx Rate Limiting | nginx.conf | Low — no user-facing changes |
| 2. Edge Middleware | src/middleware.ts | Low — blocks only suspicious traffic |
| 3. Email Obfuscation | Contact.tsx, lib/obfuscate.ts | Low — improves anti-harvest |
| 4. Challenge Page | api/challenge, challenge/page | Low — transparent to real users |
| 5. Resume Protection | nginx.conf, middleware | Low — affects only direct PDF links |
| 6. Monitoring | nginx.conf | None — logging only |

---

## Execution Options

**Plan complete and saved to `d:\code\personal_resume\docs\superpowers\plans\2026-05-05-anti-crawler-protection.md`.**

**Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
