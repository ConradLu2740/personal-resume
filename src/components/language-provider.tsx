'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

// 定义支持的语言类型
type Language = 'zh' | 'en'

// 定义翻译内容的类型接口
interface Translations {
  [key: string]: string | Translations
}

// 中文翻译内容
const zhTranslations: Translations = {
  nav: {
    home: '首页',
    about: '关于我',
    skills: '技能栈',
    projects: '项目经历',
    experience: '实习经历',
    contact: '联系方式',
  },
  hero: {
    greeting: '你好，我是',
    title: 'Agent 应用开发实习生',
    subtitle: '热爱 LLM 与 Agent 应用开发，专注于构建智能、高效的 AI 应用与后端服务',
    viewProjects: '查看项目',
    contactMe: '联系我',
  },
  about: {
    title: '关于我',
    description: '我是一名充满热情的 Agent 应用开发实习生，对 LLM 大模型、Agent 框架和 AI 应用开发有深入理解。我专注于使用现代技术栈构建智能、高效的 AI 应用与后端服务，持续关注前沿技术发展。',
    education: '教育背景',
    university: '东北大学',
    major: '电子信息工程',
    degree: '本科',
    period: '2020 - 2024',
  },
  skills: {
    title: '技能栈',
    ai: 'AI / 大模型',
    backend: '后端开发',
    frontend: '前端开发',
    tools: '工具与平台',
  },
  projects: {
    title: '项目经历',
    viewDetails: '查看详情',
    sourceCode: '源代码',
    liveDemo: '在线演示',
  },
  experience: {
    title: '实习经历',
    present: '至今',
  },
  contact: {
    title: '联系方式',
    description: '如果你对我的工作感兴趣，或者想讨论 AI、Agent 相关技术问题，欢迎随时联系我！',
    email: '邮箱',
    phone: '电话',
    location: '地点',
    sendMessage: '发送消息',
    name: '姓名',
    message: '消息内容',
    submit: '提交',
  },
  footer: {
    rights: '保留所有权利',
    madeWith: '用',
    and: '和',
    built: '构建',
  },
}

// 英文翻译内容
const enTranslations: Translations = {
  nav: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    projects: 'Projects',
    experience: 'Internship',
    contact: 'Contact',
  },
  hero: {
    greeting: "Hi, I'm",
    title: 'Agent Application Development Intern',
    subtitle: 'Passionate about LLM and Agent application development, focused on building intelligent and efficient AI applications and backend services',
    viewProjects: 'View Projects',
    contactMe: 'Contact Me',
  },
  about: {
    title: 'About Me',
    description: 'I am a passionate Agent application development intern with deep understanding of LLM, Agent frameworks, and AI application development. I focus on building intelligent and efficient AI applications and backend services using modern technology stacks.',
    education: 'Education',
    university: 'Northeastern University',
    major: 'Electronic Information Engineering',
    degree: 'Bachelor',
    period: '2020 - 2024',
  },
  skills: {
    title: 'Skills',
    ai: 'AI / LLM',
    backend: 'Backend',
    frontend: 'Frontend',
    tools: 'Tools & Platforms',
  },
  projects: {
    title: 'Projects',
    viewDetails: 'View Details',
    sourceCode: 'Source Code',
    liveDemo: 'Live Demo',
  },
  experience: {
    title: 'Internship',
    present: 'Present',
  },
  contact: {
    title: 'Contact',
    description: "If you're interested in my work or want to discuss AI and Agent related topics, feel free to reach out!",
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    sendMessage: 'Send Message',
    name: 'Name',
    message: 'Message',
    submit: 'Submit',
  },
  footer: {
    rights: 'All rights reserved',
    madeWith: 'Made with',
    and: 'and',
    built: 'built',
  },
}

// 翻译对象映射
const translations: Record<Language, Translations> = {
  zh: zhTranslations,
  en: enTranslations,
}

// 语言上下文接口
interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string | Translations
}

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType>({
  language: 'zh',
  setLanguage: () => {},
  t: (key: string) => key,
})

// 获取嵌套对象的值
function getNestedValue(obj: Translations, key: string): string | Translations {
  const keys = key.split('.')
  let result: string | Translations = obj
  
  for (const k of keys) {
    if (typeof result === 'object' && result !== null && k in result) {
      result = result[k]
    } else {
      return key
    }
  }
  
  return result
}

// 语言提供者组件
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
    }
  }, [])

  const t = useCallback(
    (key: string): string | Translations => {
      const value = getNestedValue(translations[language], key)
      return value
    },
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// 使用语言的自定义 Hook
export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
