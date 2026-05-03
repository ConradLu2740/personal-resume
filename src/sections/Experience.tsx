'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import SectionTitle from '@/components/SectionTitle'

// 工作经历数据配置
const experienceData = [
  {
    id: 1,
    company: '科技有限公司',
    companyEn: 'Tech Company Ltd.',
    position: '高级前端工程师',
    positionEn: 'Senior Frontend Engineer',
    location: '北京',
    locationEn: 'Beijing',
    startDate: '2023-06',
    endDate: null,
    description: '负责公司核心产品的前端架构设计与开发，带领团队完成多个重要项目。',
    descriptionEn: 'Responsible for frontend architecture design and development of core products, leading the team to complete multiple important projects.',
    achievements: [
      '重构前端架构，提升页面加载速度 40%',
      '设计并实现组件库，提高开发效率 30%',
      '指导初级工程师，组织技术分享会',
    ],
    achievementsEn: [
      'Refactored frontend architecture, improving page load speed by 40%',
      'Designed and implemented component library, improving development efficiency by 30%',
      'Mentored junior engineers and organized tech sharing sessions',
    ],
  },
  {
    id: 2,
    company: '互联网公司',
    companyEn: 'Internet Company',
    position: '全栈开发工程师',
    positionEn: 'Full Stack Developer',
    location: '上海',
    locationEn: 'Shanghai',
    startDate: '2022-03',
    endDate: '2023-05',
    description: '参与电商平台的全栈开发，负责前后端功能实现和数据库设计。',
    descriptionEn: 'Participated in full-stack development of e-commerce platform, responsible for frontend and backend implementation and database design.',
    achievements: [
      '开发并维护 10+ 核心 API 接口',
      '实现支付系统集成，支持多种支付方式',
      '优化数据库查询，减少响应时间 50%',
    ],
    achievementsEn: [
      'Developed and maintained 10+ core API endpoints',
      'Implemented payment system integration supporting multiple payment methods',
      'Optimized database queries, reducing response time by 50%',
    ],
  },
  {
    id: 3,
    company: '创业公司',
    companyEn: 'Startup Company',
    position: '前端开发实习生',
    positionEn: 'Frontend Developer Intern',
    location: '深圳',
    locationEn: 'Shenzhen',
    startDate: '2021-07',
    endDate: '2022-02',
    description: '参与公司官网和管理后台的开发，学习并实践现代前端技术。',
    descriptionEn: 'Participated in development of company website and admin dashboard, learning and practicing modern frontend technologies.',
    achievements: [
      '独立完成官网响应式 redesign',
      '学习 React 和 TypeScript，提升代码质量',
      '参与代码审查，学习团队协作流程',
    ],
    achievementsEn: [
      'Independently completed responsive redesign of company website',
      'Learned React and TypeScript, improving code quality',
      'Participated in code reviews, learning team collaboration processes',
    ],
  },
]

// 工作经历卡片组件
function ExperienceCard({ 
  experience, 
  index 
}: { 
  experience: typeof experienceData[0]; 
  index: number 
}) {
  const { language, t } = useLanguage()
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-8`}
    >
      {/* Timeline dot */}
      <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-background z-10" />

      {/* Content */}
      <div className={`w-1/2 ${isEven ? 'text-right pr-12' : 'text-left pl-12'}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="p-6 rounded-xl bg-secondary/50 border border-border hover:border-primary-500/50 transition-all"
        >
          {/* Header */}
          <div className={`flex items-center gap-2 mb-2 ${isEven ? 'justify-end' : 'justify-start'}`}>
            <Briefcase className="w-5 h-5 text-primary-400" />
            <h3 className="text-lg font-semibold">
              {language === 'zh' ? experience.position : experience.positionEn}
            </h3>
          </div>

          <h4 className="text-primary-400 font-medium mb-2">
            {language === 'zh' ? experience.company : experience.companyEn}
          </h4>

          <div className={`flex items-center gap-4 text-sm text-muted-foreground mb-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {experience.startDate} - {experience.endDate ?? (t('experience.present') as string)}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {language === 'zh' ? experience.location : experience.locationEn}
            </span>
          </div>

          <p className="text-muted-foreground text-sm mb-4">
            {language === 'zh' ? experience.description : experience.descriptionEn}
          </p>

          {/* Achievements */}
          <ul className={`space-y-1 ${isEven ? 'text-right' : 'text-left'}`}>
            {(language === 'zh' ? experience.achievements : experience.achievementsEn).map((achievement, i) => (
              <li key={i} className="text-sm text-muted-foreground">
                • {achievement}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Spacer for the other side */}
      <div className="w-1/2" />
    </motion.div>
  )
}

// 工作经历主组件
export default function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="py-20 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('experience.title') as string}
          subtitle=""
        />

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-border" />

          {/* Experience items */}
          <div className="space-y-12">
            {experienceData.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
