'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

// 定义支持的语言类型
type Language = 'zh' | 'en'

// 定义翻译内容的类型接口
interface Translations {
  [key: string]: string | Translations
}

// 中文翻译内容
const zhTranslations = {
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
    subtitle: '用 AI 解决真实问题',
    viewProjects: '查看项目',
    contactMe: '联系我',
  },
  about: {
    title: '关于我',
    description: '东北大学电子信息工程本科，专注于 LLM 应用开发与 Agent 系统构建。善于将大模型能力与工程实践结合，落地可用的智能应用。持续学习，追求简洁高效的工程方案。',
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
    description: '欢迎联系我，交流合作或技术讨论均可。',
    email: '邮箱',
    phone: '电话',
    location: '地点',
    sendMessage: '发送消息',
    name: '姓名',
    message: '消息内容',
    submit: '提交',
    success: '消息已发送，感谢您的联系！',
    error: '发送失败，请稍后重试或直接发送邮件。',
  },
  footer: {
    rights: '保留所有权利',
    madeWith: '用',
    and: '和',
    built: '构建',
  },
} satisfies Translations

// 英文翻译内容
const enTranslations = {
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
    subtitle: 'Solving real problems with AI',
    viewProjects: 'View Projects',
    contactMe: 'Contact Me',
  },
  about: {
    title: 'About Me',
    description: 'B.S. in Electronic Information Engineering from Northeastern University. Focused on LLM application development and Agent system building. Skilled at combining large model capabilities with engineering practices to deliver practical AI applications. Continuous learner, pursuing clean and efficient engineering solutions.',
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
    description: "Feel free to reach out for collaboration or tech discussions.",
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    sendMessage: 'Send Message',
    name: 'Name',
    message: 'Message',
    submit: 'Submit',
    success: 'Message sent! Thank you for reaching out.',
    error: 'Failed to send. Please try again later or email directly.',
  },
  footer: {
    rights: 'All rights reserved',
    madeWith: 'Made with',
    and: 'and',
    built: 'built',
  },
} satisfies Translations

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
