'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

// 定义支持的语言类型
type Language = 'zh' | 'en'

// 定义翻译内容的类型接口
interface Translations {
  [key: string]: string | string[] | Translations
}

// 中文翻译内容
const zhTranslations = {
  nav: {
    home: '首页',
    about: '关于我',
    skills: '技能栈',
    projects: '项目经历',
    experience: '实习经历',
    honors: '荣誉',
    contact: '联系方式',
  },
  hero: {
    greeting: '你好，我是',
    title: '大模型应用开发工程师 / AI Agent开发工程师',
    subtitle: '专注于 LLM 应用开发与 Agent 系统构建',
    metaInfo: '24岁 · 可立即到岗',
    viewProjects: '查看项目',
    contactMe: '联系我',
  },
  about: {
    title: '关于我',
    description: '东北大学电子信息工程本科，24岁，可立即到岗。英语雅思7.0（阅读9.0），无障碍阅读英文技术文档与论文。专注于 LLM 应用开发与 Agent 系统构建。在当虹科技实习期间独立设计并落地视频高光片段自动检测 Agent，将单视频分析耗时从 2 小时压缩至 5 分钟；本科毕设提出 SteganoGAN-Transformer 模型，PSNR 达 41.675dB。善于将大模型能力与工程实践结合，持续追求简洁高效的工程方案。',
    education: '教育背景',
    university: '东北大学',
    major: '电子信息工程',
    degree: '本科',
    period: '2020 - 2024',
    selfEvalTitle: '核心优势',
    selfEval: [
      '大模型应用落地能力强：具备从场景分析、Prompt 设计到 Agent 系统搭建的完整经验',
      'Agent 开发核心技术栈：熟练使用 LangChain、Prompt Engineering、Tool Call 等构造智能体',
      '工程化思维：注重代码模块化、可复用性与成本控制，乐于通过开源协作沉淀技术积累',
      '自主学习与快速上手：能够快速掌握新框架、新模型 API，面对陌生业务场景时能独立拆解、设计并完成技术落地',
    ],
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
  honors: {
    title: '荣誉与奖项',
  },
  contact: {
    title: '联系方式',
    description: '正在寻找大模型应用开发 / AI Agent 开发实习或全职机会，期待与您交流！',
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
    honors: 'Honors',
    contact: 'Contact',
  },
  hero: {
    greeting: "Hi, I'm",
    title: 'LLM Application Development Engineer / AI Agent Engineer',
    subtitle: 'Focused on LLM application development and Agent system building',
    metaInfo: '24 years old · Available immediately',
    viewProjects: 'View Projects',
    contactMe: 'Contact Me',
  },
  about: {
    title: 'About Me',
    description: 'B.S. in Electronic Information Engineering from Northeastern University, 24 years old, available immediately. IELTS 7.0 (Reading 9.0), proficient in reading English technical documentation and papers. Focused on LLM application development and Agent system building. During internship at ArcVideo, independently designed and deployed a video highlight detection Agent, compressing single-video analysis from 2 hours to 5 minutes. Bachelor thesis: SteganoGAN-Transformer model achieving PSNR 41.675dB. Skilled at combining large model capabilities with engineering practices.',
    education: 'Education',
    university: 'Northeastern University',
    major: 'Electronic Information Engineering',
    degree: 'Bachelor',
    period: '2020 - 2024',
    selfEvalTitle: 'Core Strengths',
    selfEval: [
      'Strong LLM application delivery: Complete experience from scenario analysis, Prompt design to Agent system construction',
      'Core Agent development stack: Proficient in LangChain, Prompt Engineering, Tool Call for building intelligent agents',
      'Engineering mindset: Focus on code modularity, reusability and cost control, committed to open source collaboration',
      'Self-driven learner: Rapidly master new frameworks and model APIs, independently decompose and deliver in unfamiliar domains',
    ],
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
  honors: {
    title: 'Honors & Awards',
  },
  contact: {
    title: 'Contact',
    description: "Looking for LLM Application Development / AI Agent Engineering internship or full-time opportunities. Excited to connect with you!",
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
  t: (key: string) => string | string[] | Translations
}

// 创建语言上下文
const LanguageContext = createContext<LanguageContextType>({
  language: 'zh',
  setLanguage: () => {},
  t: (key: string) => key,
})

// 获取嵌套对象的值
function getNestedValue(obj: Translations, key: string): string | string[] | Translations {
  const keys = key.split('.')
  let result: string | string[] | Translations = obj

  for (const k of keys) {
    if (typeof result === 'object' && result !== null && !Array.isArray(result) && k in result) {
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
    (key: string): string | string[] | Translations => {
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
