'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Code2, 
  Server, 
  Wrench, 
  Languages,
  Star
} from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import SectionTitle from '@/components/SectionTitle'

// 技能数据配置
const skillsData = {
  frontend: {
    icon: Code2,
    label: 'frontend',
    skills: [
      { name: 'React / Next.js', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'Vue.js', level: 75 },
      { name: 'HTML / CSS', level: 95 },
    ],
  },
  backend: {
    icon: Server,
    label: 'backend',
    skills: [
      { name: 'Node.js / Express', level: 85 },
      { name: 'Python / Django', level: 80 },
      { name: 'Go / Gin', level: 75 },
      { name: 'PostgreSQL / MongoDB', level: 80 },
      { name: 'Redis', level: 70 },
    ],
  },
  tools: {
    icon: Wrench,
    label: 'tools',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Docker', level: 80 },
      { name: 'AWS / Vercel', level: 75 },
      { name: 'Linux', level: 85 },
      { name: 'CI/CD', level: 70 },
    ],
  },
  languages: {
    icon: Languages,
    label: 'languages',
    skills: [
      { name: 'JavaScript / TypeScript', level: 95 },
      { name: 'Python', level: 85 },
      { name: 'Go', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'SQL', level: 80 },
    ],
  },
}

// 技能进度条组件
function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

// 技能卡片组件
function SkillCard({ 
  category, 
  index 
}: { 
  category: typeof skillsData.frontend; 
  index: number 
}) {
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
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-primary-500/20">
          <Icon className="w-6 h-6 text-primary-400" />
        </div>
        <h3 className="text-xl font-semibold">
          {t(`skills.${category.label}`) as string}
        </h3>
      </div>
      
      {category.skills.map((skill, skillIndex) => (
        <SkillBar
          key={skill.name}
          name={skill.name}
          level={skill.level}
          index={skillIndex}
        />
      ))}
    </motion.div>
  )
}

// 技能栈主组件
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
          {Object.values(skillsData).map((category, index) => (
            <SkillCard key={category.label} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
