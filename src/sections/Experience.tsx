'use client'

import React from 'react'
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
    description: '参与视频名场面智能检测系统开发（44 个 Python 源文件 + 3 个微服务），主要负责 VLM 评分模块与异步任务流水线的设计实现，以及生产级特性的落地。',
    descriptionEn: 'Participated in the development of the video highlight detection system (44 Python source files + 3 microservices), primarily responsible for designing and implementing the VLM scoring module, async task pipeline, and production-grade features.',
    achievements: [
      '设计 VLM 评分模块（Qwen-VL + FFmpeg），将"名场面"量化为 0-100 分，替代人工筛选，处理效率提升约 3 倍',
      '构建 Celery + Redis 异步流水线，串联场景检测→评分→转录 3 个阶段，支持并发处理 10+ 视频',
      '实现多租户认证、配额管理与熔断限流，支撑多客户并发，实习期间零宕机交付',
      '完成 Docker Compose 3 微服务编排 + Prometheus 监控部署，推动项目从本地开发到可交付上线',
    ],
    achievementsEn: [
      'Designed VLM scoring module (Qwen-VL + FFmpeg), quantifying "highlights" into 0-100 scores, replacing manual filtering with ~3x efficiency improvement',
      'Built Celery + Redis async pipeline, chaining 3 stages: detection → scoring → transcription, supporting 10+ concurrent videos',
      'Implemented multi-tenant auth, quota management, and circuit breaker, supporting concurrent clients with zero downtime during internship',
      'Completed Docker Compose 3-microservice orchestration + Prometheus monitoring deployment, driving the project from local dev to deliverable production state',
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
    <div className="animate-in-up">
      <div
        className="p-5 sm:p-8 rounded-xl bg-secondary/50 border border-border hover:border-primary-500/50 transition-all hover:scale-[1.02]"
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
      </div>
    </div>
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
