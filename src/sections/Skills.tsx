'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  Server,
  Code2,
  Wrench,
} from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import SectionTitle from '@/components/SectionTitle'

type SkillLevel = 'expert' | 'proficient' | 'familiar'

interface Skill {
  name: string
  nameEn: string
  level: SkillLevel
}

interface SkillCategory {
  icon: typeof Brain
  label: string
  skills: Skill[]
}

const skillsData: SkillCategory[] = [
  {
    icon: Brain,
    label: 'ai',
    skills: [
      { name: 'LLM 应用开发', nameEn: 'LLM Application Dev', level: 'expert' },
      { name: 'Prompt Engineering', nameEn: 'Prompt Engineering', level: 'expert' },
      { name: 'LangChain / LlamaIndex', nameEn: 'LangChain / LlamaIndex', level: 'proficient' },
      { name: 'Agent 框架', nameEn: 'Agent Frameworks', level: 'proficient' },
      { name: 'RAG 检索增强生成', nameEn: 'RAG', level: 'proficient' },
      { name: 'OpenAI / Claude API', nameEn: 'OpenAI / Claude API', level: 'expert' },
      { name: 'Qwen-VL 多模态', nameEn: 'Qwen-VL Multi-modal', level: 'familiar' },
    ],
  },
  {
    icon: Server,
    label: 'backend',
    skills: [
      { name: 'Python / FastAPI', nameEn: 'Python / FastAPI', level: 'expert' },
      { name: 'Celery 异步任务', nameEn: 'Celery Async Tasks', level: 'proficient' },
      { name: 'Node.js / Express', nameEn: 'Node.js / Express', level: 'proficient' },
      { name: 'PostgreSQL / MongoDB', nameEn: 'PostgreSQL / MongoDB', level: 'proficient' },
      { name: 'Redis / 消息队列', nameEn: 'Redis / Message Queue', level: 'familiar' },
      { name: 'RESTful API 设计', nameEn: 'RESTful API Design', level: 'expert' },
      { name: 'Go 语言', nameEn: 'Go', level: 'familiar' },
    ],
  },
  {
    icon: Code2,
    label: 'frontend',
    skills: [
      { name: 'React / Next.js', nameEn: 'React / Next.js', level: 'proficient' },
      { name: 'TypeScript', nameEn: 'TypeScript', level: 'proficient' },
      { name: 'Tailwind CSS', nameEn: 'Tailwind CSS', level: 'proficient' },
      { name: 'HTML / CSS', nameEn: 'HTML / CSS', level: 'expert' },
      { name: 'Vue.js', nameEn: 'Vue.js', level: 'familiar' },
    ],
  },
  {
    icon: Wrench,
    label: 'tools',
    skills: [
      { name: 'Git / GitHub', nameEn: 'Git / GitHub', level: 'expert' },
      { name: 'Docker / Compose', nameEn: 'Docker / Compose', level: 'proficient' },
      { name: 'Linux', nameEn: 'Linux', level: 'proficient' },
      { name: '向量数据库', nameEn: 'Vector Database', level: 'proficient' },
      { name: 'Prometheus 监控', nameEn: 'Prometheus', level: 'familiar' },
      { name: 'CI/CD', nameEn: 'CI/CD', level: 'familiar' },
    ],
  },
]

const levelConfig: Record<SkillLevel, { label: string; labelEn: string; className: string }> = {
  expert: {
    label: '精通',
    labelEn: 'Expert',
    className: 'bg-primary-500/25 text-primary-300 border-primary-500/40 ring-1 ring-primary-500/20',
  },
  proficient: {
    label: '熟练',
    labelEn: 'Proficient',
    className: 'bg-primary-500/15 text-primary-400/90 border-primary-500/25',
  },
  familiar: {
    label: '了解',
    labelEn: 'Familiar',
    className: 'bg-secondary text-muted-foreground border-border',
  },
}

function SkillTag({ skill, index }: { skill: Skill; index: number }) {
  const { language } = useLanguage()
  const config = levelConfig[skill.level]

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-sm transition-transform hover:scale-105 ${config.className}`}
    >
      <span>{language === 'zh' ? skill.name : skill.nameEn}</span>
      <span className="text-[10px] opacity-60">
        {language === 'zh' ? config.label : config.labelEn}
      </span>
    </motion.div>
  )
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const { t } = useLanguage()
  const Icon = category.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="p-6 rounded-xl bg-secondary/50 border border-border hover:border-primary-500/50 transition-all"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3 rounded-lg bg-primary-500/20">
          <Icon className="w-6 h-6 text-primary-400" />
        </div>
        <h3 className="text-xl font-semibold">
          {t(`skills.${category.label}`) as string}
        </h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <SkillTag key={skill.name} skill={skill} index={skillIndex} />
        ))}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('skills.title') as string}
          subtitle=""
        />

        <div className="grid md:grid-cols-2 gap-8">
          {skillsData.map((category, index) => (
            <SkillCard key={category.label} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
