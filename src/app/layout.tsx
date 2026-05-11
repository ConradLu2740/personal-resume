import type { Metadata } from 'next'
import './globals.css'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { LanguageProvider } from '@/components/language-provider'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: '卢锡远 - LLM应用开发工程师 | AI Agent Engineer',
  description:
    '东北大学本科，专注 LLM 应用开发与 Agent 系统构建。实习期间独立设计并落地视频高光片段自动检测 Agent，本科毕设提出 SteganoGAN-Transformer 模型。',
  keywords: [
    '卢锡远',
    'Luxiyuan Lu',
    'LLM',
    'AI Agent',
    'LangChain',
    'Prompt Engineering',
    '大模型应用开发',
    '东北大学',
  ],
  authors: [{ name: '卢锡远', url: 'https://github.com/ConradLu2740' }],
  metadataBase: new URL('https://luxiyuan-portfolio.pages.dev'),
  openGraph: {
    title: '卢锡远 - LLM应用开发工程师 | AI Agent Engineer',
    description: '专注 LLM 应用开发与 Agent 系统构建，东北大学本科，雅思7.0',
    url: 'https://luxiyuan-portfolio.pages.dev',
    siteName: '卢锡远的个人简历',
    locale: 'zh_CN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '卢锡远 - LLM应用开发工程师',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '卢锡远 - LLM应用开发工程师 | AI Agent Engineer',
    description: '专注 LLM 应用开发与 Agent 系统构建',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://luxiyuan-portfolio.pages.dev',
  },
}

/** JSON-LD 结构化数据 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: '卢锡远',
  alternateName: 'Luxiyuan Lu',
  jobTitle: 'LLM Application Development Engineer / AI Agent Engineer',
  url: 'https://luxiyuan-portfolio.pages.dev',
  sameAs: ['https://github.com/ConradLu2740'],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: '东北大学',
    alternateName: 'Northeastern University',
  },
  knowsAbout: [
    'LLM',
    'AI Agent',
    'LangChain',
    'Prompt Engineering',
    'Function Calling',
    'RAG',
    'Qwen-VL',
    'Python',
    'FastAPI',
    'Computer Vision',
    'Deep Learning',
    'PyTorch',
  ],
  email: 'luxiyuan2020@163.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: '杭州市',
    addressCountry: 'CN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
