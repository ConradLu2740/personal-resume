'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import SectionTitle from '@/components/SectionTitle'

// 实习经历数据配置
const experienceData = [
  {
    id: 1,
    company: '杭州云映科技',
    companyEn: 'Hangzhou Yunying Technology',
    position: 'Agent 应用开发实习生',
    positionEn: 'Agent Application Development Intern',
    location: '杭州',
    locationEn: 'Hangzhou',
    startDate: '2026-04',
    endDate: '2026-07',
    description: '参与公司视频名场面智能检测系统的开发，负责多模态大模型（VLM）应用相关功能的设计与实现，包括场景检测、智能评分、语音转录等核心流水线。',
    descriptionEn: 'Participated in the development of the video highlight intelligent detection system, responsible for the design and implementation of multi-modal LLM (VLM) application features, including scene detection, intelligent scoring, and speech transcription pipelines.',
    achievements: [
      '基于 FastAPI + Celery 构建异步任务处理流水线，实现场景检测→关键帧提取→VLM 评分→语音转写的全流程自动化',
      '集成 Qwen-VL 视觉语言模型进行视频名场面智能评分，将"名场面"从主观感受转化为可量化评分体系',
      '实现多租户认证、配额管理、熔断限流等生产级特性，保障系统稳定性',
      '使用 Docker Compose 编排微服务架构（场景检测/VLM/Whisper），配合 Prometheus 实现监控告警',
    ],
    achievementsEn: [
      'Built async task processing pipeline with FastAPI + Celery, automating the full workflow: scene detection → keyframe extraction → VLM scoring → speech transcription',
      'Integrated Qwen-VL vision-language model for intelligent video highlight scoring, converting subjective "highlight" perception into a quantifiable scoring system',
      'Implemented production-grade features including multi-tenant auth, quota management, circuit breaker, and rate limiting',
      'Orchestrated microservice architecture (Scene/VLM/Whisper) with Docker Compose, integrated Prometheus for monitoring and alerting',
    ],
  },
]

// 实习经历卡片组件
function ExperienceCard({ 
  experience, 
  index 
}: { 
  experience: typeof experienceData[0]; 
  index: number 
}) {
  const { language, t } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-5 sm:p-8 rounded-xl bg-secondary/50 border border-border hover:border-primary-500/50 transition-all"
      >
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-5 h-5 text-primary-400" />
          <h3 className="text-lg font-semibold">
            {language === 'zh' ? experience.position : experience.positionEn}
          </h3>
        </div>

        <h4 className="text-primary-400 font-medium mb-2">
          {language === 'zh' ? experience.company : experience.companyEn}
        </h4>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {experience.startDate} - {experience.endDate}
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
        <ul className="space-y-2">
          {(language === 'zh' ? experience.achievements : experience.achievementsEn).map((achievement, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary-400 mt-1">•</span>
              {achievement}
            </li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}

// 实习经历主组件
export default function Experience() {
  const { t } = useLanguage()

  return (
    <section id="experience" className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('experience.title') as string}
          subtitle=""
        />

        <div className="max-w-3xl mx-auto space-y-8">
          {experienceData.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
