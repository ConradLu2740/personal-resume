'use client'

import React from 'react'
import { Briefcase, Calendar, MapPin } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import SectionTitle from '@/components/SectionTitle'

// 实习经历数据配置
const experienceData = [
  {
    id: 1,
    company: '当虹科技',
    companyEn: 'ArcVideo',
    position: 'AI应用开发实习生',
    positionEn: 'AI Application Development Intern',
    location: '杭州',
    locationEn: 'Hangzhou',
    startDate: '2026-04',
    endDate: '至今',
    description: '独立设计并落地一套端到端智能体「基于大模型的视频高光片段自动检测 Agent」，通过大模型理解视频内容，自动识别精彩片段并输出结构化结果，解决人工筛选效率低的问题。',
    descriptionEn: 'Independently designed and deployed an end-to-end intelligent agent "Video Highlight Auto-Detection Agent based on Large Models", using LLMs to understand video content, automatically identify highlight clips, and output structured results, solving the inefficiency of manual screening.',
    achievements: [
      'Agent 流水线设计：构建「场景分割 → 关键帧提取 → 大模型视觉评分 → 语音转写 → 语义去重合并 → 片段裁剪导出」全自动链路，实现从视频上传到 JSON 输出的无人值守闭环',
      '大模型应用与 Prompt 工程：集成通义千问VL API，设计 8 维度评分 Prompt（视觉冲击、情绪强度、表情等），将人类对「名场面」的主观判断显式化，引导模型输出可解释的评分',
      '工具调用与工程优化：封装 FFmpeg 为 Agent 可调用工具，实现视频片段自动裁剪与导出；引入 MD5 缓存与国产模型 API 成本优化，将单视频分析耗时从 2 小时压缩至 5 分钟，效率提升 80%',
      '抽象「感知 → 理解 → 决策 → 执行」Agent 架构，项目已开源至 GitHub',
    ],
    achievementsEn: [
      'Agent Pipeline Design: Built a fully automated pipeline "Scene Segmentation → Keyframe Extraction → LLM Visual Scoring → Speech Transcription → Semantic Deduplication → Clip Export", achieving unattended closed-loop from video upload to JSON output',
      'LLM Application & Prompt Engineering: Integrated Qwen-VL API, designed 8-dimension scoring Prompt (visual impact, emotional intensity, facial expressions, etc.), making subjective human judgments on "highlights" explicit and interpretable',
      'Tool Invocation & Engineering Optimization: Encapsulated FFmpeg as an Agent-callable tool for automatic clip cropping; introduced MD5 caching and domestic model API cost optimization, compressing single-video analysis from 2 hours to 5 minutes, 80% efficiency improvement',
      'Abstracted "Perception → Understanding → Decision → Execution" Agent architecture, project open-sourced on GitHub',
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
        <ul className="space-y-2 mb-4">
          {(language === 'zh' ? experience.achievements : experience.achievementsEn).map((achievement, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary-400 mt-1">•</span>
              {achievement}
            </li>
          ))}
        </ul>

        {/* Internship Summary */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-primary-400/80 italic">
            {language === 'zh'
              ? '通过本次实习，深入理解了生产级 AI 应用的工程实践，从模块设计到部署运维的全链路经验。'
              : 'Through this internship, gained deep understanding of production-grade AI application engineering practices, from module design to deployment and operations.'}
          </p>
        </div>
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
