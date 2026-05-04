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
      { name: 'OpenAI / Claude API', nameEn: 'OpenAI / Claude API', level: 'expert' },
      { name: 'LangChain / LlamaIndex', nameEn: 'LangChain / LlamaIndex', level: 'proficient' },
      { name: 'Agent 框架', nameEn: 'Agent Frameworks', level: 'proficient' },
      { name: 'RAG 检索增强生成', nameEn: 'RAG', level: 'proficient' },
      { name: 'Qwen-VL 多模态', nameEn: 'Qwen-VL Multi-modal', level: 'familiar' },
    ],
  },
  {
    icon: Server,
    label: 'backend',
    skills: [
      { name: 'Python / FastAPI', nameEn: 'Python / FastAPI', level: 'expert' },
      { name: 'RESTful API 设计', nameEn: 'RESTful API Design', level: 'expert' },
      { name: 'Celery 异步任务', nameEn: 'Celery Async Tasks', level: 'proficient' },
      { name: 'Node.js / Express', nameEn: 'Node.js / Express', level: 'proficient' },
      { name: 'PostgreSQL / MongoDB', nameEn: 'PostgreSQL / MongoDB', level: 'proficient' },
      { name: 'Redis / 消息队列', nameEn: 'Redis / Message Queue', level: 'familiar' },
      { name: 'Go 语言', nameEn: 'Go', level: 'familiar' },
    ],
  },
  {
    icon: Code2,
    label: 'frontend',
    skills: [
      { name: 'HTML / CSS', nameEn: 'HTML / CSS', level: 'expert' },
      { name: 'React / Next.js', nameEn: 'React / Next.js', level: 'proficient' },
      { name: 'TypeScript', nameEn: 'TypeScript', level: 'proficient' },
      { name: 'Tailwind CSS', nameEn: 'Tailwind CSS', level: 'proficient' },
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

const levelOrder: SkillLevel[] = ['expert', 'proficient', 'familiar']

const levelConfig: Record<SkillLevel, { label: string; labelEn: string; tagClass: string; rowLabelClass: string }> = {
  expert: {
    label: '精通',
    labelEn: 'Expert',
    tagClass: 'bg-primary-500/20 text-primary-300 border-primary-500/30',
    rowLabelClass: 'text-primary-400',
  },
  proficient: {
    label: '熟练',
    labelEn: 'Proficient',
    tagClass: 'bg-primary-500/10 text-primary-400/80 border-primary-500/15',
    rowLabelClass: 'text-primary-400/70',
  },
  familiar: {
    label: '了解',
    labelEn: 'Familiar',
    tagClass: 'bg-secondary text-muted-foreground border-border',
    rowLabelClass: 'text-muted-foreground',
  },
}

function SkillTag({ name, nameEn, tagClass }: { name: string; nameEn: string; tagClass: string }) {
  const { language } = useLanguage()

  return (
    <span className={`inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-md border text-sm sm:text-base ${tagClass}`}>
      {language === 'zh' ? name : nameEn}
    </span>
  )
}

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const { language } = useLanguage()
  const { t } = useLanguage()
  const Icon = category.icon

  const grouped = levelOrder.map((level) => ({
    level,
    skills: category.skills.filter((s) => s.level === level),
  })).filter((g) => g.skills.length > 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="p-5 sm:p-6 rounded-xl bg-secondary/50 border border-border hover:border-primary-500/50 transition-all"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-3 rounded-lg bg-primary-500/20">
          <Icon className="w-6 h-6 text-primary-400" />
        </div>
        <h3 className="text-xl font-semibold">
          {t(`skills.${category.label}`) as string}
        </h3>
      </div>

      <div className="space-y-3">
        {grouped.map((group) => {
          const config = levelConfig[group.level]
          return (
            <div key={group.level}>
              <span className={`text-xs font-medium mr-2 ${config.rowLabelClass}`}>
                {language === 'zh' ? config.label : config.labelEn}
              </span>
              <div className="inline-flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillTag
                    key={skill.name}
                    name={skill.name}
                    nameEn={skill.nameEn}
                    tagClass={config.tagClass}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const { t } = useLanguage()

  return (
    <section id="skills" className="py-16 md:py-32 bg-secondary/30">
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
