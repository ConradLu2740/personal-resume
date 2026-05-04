import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: '卢锡远 - Agent 应用开发实习生',
  description: '专注于 LLM 应用开发与 Agent 系统构建，擅长 RAG、Agent 框架、多模态大模型应用。查看项目经历与技术栈。',
  keywords: ['卢锡远', 'Agent开发', 'LLM', 'RAG', 'FastAPI', 'Python', '前端开发'],
  authors: [{ name: '卢锡远', url: 'https://luxiyuan-portfolio.pages.dev' }],
  openGraph: {
    title: '卢锡远 - Agent 应用开发实习生',
    description: '专注于 LLM 应用开发与 Agent 系统构建，擅长 RAG、Agent 框架、多模态大模型应用。',
    url: 'https://luxiyuan-portfolio.pages.dev',
    siteName: '卢锡远个人网站',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '卢锡远 - Agent 应用开发实习生',
    description: '专注于 LLM 应用开发与 Agent 系统构建',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
