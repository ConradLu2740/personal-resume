import { NextResponse } from 'next/server'

export async function GET() {
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
