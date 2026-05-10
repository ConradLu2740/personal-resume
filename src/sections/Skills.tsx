'use client'

import React from 'react'
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
      { name: 'Prompt Engineering', nameEn: 'Prompt Engineering', level: 'expert' },
      { name: 'Function Calling / Tool Use', nameEn: 'Function Calling / Tool Use', level: 'expert' },
      { name: 'LangChain', nameEn: 'LangChain', level: 'proficient' },
      { name: 'Qwen-VL 多模态', nameEn: 'Qwen-VL Multi-modal', level: 'proficient' },
      { name: 'RAG 检索增强生成', nameEn: 'RAG', level: 'proficient' },
      { name: 'Agent 流水线设计', nameEn: 'Agent Pipeline Design', level: 'proficient' },
      { name: 'PyTorch / 混合精度训练', nameEn: 'PyTorch / Mixed Precision', level: 'familiar' },
    ],
  },
  {
    icon: Server,
    label: 'backend',
    skills: [
      { name: 'Python', nameEn: 'Python', level: 'expert' },
      { name: 'OpenCV / FFmpeg', nameEn: 'OpenCV / FFmpeg', level: 'proficient' },
      { name: 'PySceneDetect / Faster-Whisper', nameEn: 'PySceneDetect / Faster-Whisper', level: 'proficient' },
      { name: 'FastAPI / RESTful API', nameEn: 'FastAPI / RESTful API', level: 'proficient' },
      { name: 'C/C++', nameEn: 'C/C++', level: 'familiar' },
      { name: 'Go', nameEn: 'Go', level: 'familiar' },
    ],
  },
  {
    icon: Code2,
    label: 'frontend',
    skills: [
      { name: 'React / Next.js', nameEn: 'React / Next.js', level: 'proficient' },
      { name: 'TypeScript', nameEn: 'TypeScript', level: 'proficient' },
      { name: 'Tailwind CSS', nameEn: 'Tailwind CSS', level: 'proficient' },
      { name: 'HTML / CSS', nameEn: 'HTML / CSS', level: 'proficient' },
    ],
  },
  {
    icon: Wrench,
    label: 'tools',
    skills: [
      { name: 'Git / GitHub', nameEn: 'Git / GitHub', level: 'expert' },
      { name: 'Docker / Compose', nameEn: 'Docker / Compose', level: 'proficient' },
      { name: 'Gradio 快速原型', nameEn: 'Gradio Prototyping', level: 'proficient' },
      { name: 'LaTeX 文档撰写', nameEn: 'LaTeX Documentation', level: 'familiar' },
      { name: 'Prometheus 监控', nameEn: 'Prometheus Monitoring', level: 'familiar' },
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

function SkillTag({ name, nameEn, tagClass, index }: { name: string; nameEn: string; tagClass: string; index: number }) {
  const { language } = useLanguage()

  return (
    <span
      className={`inline-flex items-center px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-md border text-sm sm:text-base ${tagClass}`}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
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
    <div
      className={`p-5 sm:p-6 rounded-xl bg-secondary/50 border border-border hover:border-primary-500/50 transition-all animate-in-up`}
      style={{ animationDelay: `${index * 0.15}s` }}
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
                {group.skills.map((skill, skillIndex) => (
                  <SkillTag
                    key={skill.name}
                    name={skill.name}
                    nameEn={skill.nameEn}
                    tagClass={config.tagClass}
                    index={skillIndex}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
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
