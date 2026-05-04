'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import SectionTitle from '@/components/SectionTitle'

// 项目数据配置
const projectsData = [
  {
    id: 1,
    title: '智能网络运维助手',
    titleEn: 'NetworkOps AI — Intelligent Network O&M Assistant',
    description: '面向通信行业运维场景的智能助手系统，融合 RAG 检索增强生成、Agent 工具调用、实时日志分析，实现从故障发现到自动化修复的全链路运维闭环。Python + Go + React 三层架构，17,653 行代码，92 个源文件。',
    descriptionEn: 'An intelligent assistant system for telecom network O&M, integrating RAG, Agent tool invocation, and real-time log analysis for full-loop O&M from fault detection to automated remediation. Python + Go + React architecture, 17,653 lines of code, 92 source files.',
    tags: ['Python', 'FastAPI', 'React', 'RAG', 'Agent', 'Go'],
    emoji: '🤖',
    github: 'https://github.com/ConradLu2740/networkops-ai',
    demo: '#',
    features: [
      'RAG 三阶段检索（BM25+向量双路召回 → RRF 融合 → Cross-Encoder 精排），971 向量覆盖 13 个知识领域，检索准确率较单路召回提升 40%',
      'Agent 工具框架：10 个工具（日志查询/拓扑发现/SNMP/Ping/Ansible 等），Function Calling 自动编排，每个工具配备速率限制与 TTL 缓存',
      '后端 38 个 API 端点 + 6 页面 25 组件前端，Go 日志采集器 + Syslog UDP 接收 + WebSocket 实时推送',
      'LLDP/CDP 拓扑自动发现 + 可视化，ITSM 工单系统 + Ansible Playbook 白名单执行',
      'JWT 认证 + PBKDF2 密码哈希 + 前端路由守卫，238 个测试用例全部通过',
      '通信领域知识库 2,631 行专业文档，覆盖 5G 核心网/传输网/接入网/光通信/卫星微波',
    ],
    featuresEn: [
      '3-stage RAG retrieval (BM25+vector dual recall → RRF fusion → Cross-Encoder re-ranking), 971 vectors across 13 domains, 40% accuracy improvement over single-path recall',
      'Agent tool framework: 10 tools (log query/topology/SNMP/Ping/Ansible etc.), Function Calling auto-orchestration, each with rate limiting and TTL cache',
      'Backend 38 API endpoints + frontend 6 pages 25 components, Go log collector + Syslog UDP + WebSocket real-time push',
      'LLDP/CDP auto topology discovery + visualization, ITSM ticketing + Ansible Playbook whitelist execution',
      'JWT auth + PBKDF2 password hashing + frontend route guard, 238 test cases all passing',
      'Telecom knowledge base: 2,631 lines of professional docs covering 5G core/transport/access/optical/satellite',
    ],
  },
  {
    id: 2,
    title: '视频名场面智能检测系统',
    titleEn: 'Video Highlight Intelligent Detection System',
    description: '【实习项目】基于多模态大模型的视频名场面智能检测系统，44 个 Python 源文件 + 3 个微服务。本人主要负责 VLM 评分模块与异步任务流水线。',
    descriptionEn: '[Internship Project] A multi-modal LLM-based video highlight detection system, 44 Python source files + 3 microservices. Primarily responsible for the VLM scoring module and async task pipeline.',
    tags: ['Python', 'FastAPI', 'Qwen-VL', 'Celery', 'Docker'],
    emoji: '🎬',
    github: 'https://github.com/ConradLu2740/video-analyzer',
    demo: '#',
    features: [
      'PySceneDetect 场景切割，自动识别视频转场点，替代人工分段，单视频处理耗时 < 30s',
      'FFmpeg 关键帧提取 + Qwen-VL 评分，将"名场面"量化为 0-100 分，筛选效率较人工提升约 3 倍',
      'Faster-Whisper 语音转录，为评分提供文本维度补充，中文识别准确率 > 90%',
      'Celery + Redis 异步流水线，场景检测→评分→转录全流程自动化，支持并发处理 10+ 视频',
      '多租户认证与熔断限流，支撑多客户并发，零宕机运行',
      'Docker Compose 编排 3 个微服务（场景检测/VLM/Whisper）+ Prometheus 监控，一键部署可观测',
    ],
    featuresEn: [
      'PySceneDetect scene segmentation, auto-detecting transitions, replacing manual splitting, <30s per video',
      'FFmpeg keyframe extraction + Qwen-VL scoring, quantifying "highlights" into 0-100 scores, ~3x filtering efficiency over manual',
      'Faster-Whisper speech transcription, adding text dimension to scoring, >90% Chinese recognition accuracy',
      'Celery + Redis async pipeline, automating detection → scoring → transcription, supporting 10+ concurrent videos',
      'Multi-tenant auth and circuit breaker, supporting concurrent clients with zero downtime',
      'Docker Compose orchestrating 3 microservices (Scene/VLM/Whisper) + Prometheus monitoring, one-click observable deployment',
    ],
  },
  {
    id: 3,
    title: '个人作品集网站',
    titleEn: 'Personal Portfolio Website',
    description: '【本项目即您当前浏览的网站】基于 Next.js 14 构建的个人作品集网站，18 个源文件，支持暗黑/亮色主题切换、中英文双语、Framer Motion 动画，部署在 Cloudflare Pages 全球 CDN。',
    descriptionEn: '[This is the website you are currently browsing] A personal portfolio website built with Next.js 14, 18 source files, featuring dark/light theme toggle, Chinese/English bilingual support, Framer Motion animations, deployed on Cloudflare Pages global CDN.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    emoji: '🌐',
    github: 'https://github.com/ConradLu2740/personal-resume',
    demo: 'https://luxiyuan-portfolio.pages.dev',
    features: [
      'Next.js 14 App Router + TypeScript，静态导出零服务器成本，首屏加载 136 KB',
      'CSS Variables + class 策略实现暗黑模式，切换零闪烁',
      '自研轻量 i18n 方案（Context + 嵌套 key 查找），50 行代码搞定中英双语',
      'Framer Motion 入场/交互/循环动画，viewport once 避免重复渲染',
      '响应式设计，移动端基础字号 17px，三级断点适配',
      'Cloudflare Pages 全球 CDN 部署，国内可访问',
    ],
    featuresEn: [
      'Next.js 14 App Router + TypeScript, static export with zero server cost, 136 KB first load',
      'CSS Variables + class strategy for dark mode, zero-flash switching',
      'Custom lightweight i18n (Context + nested key lookup), 50 lines for bilingual support',
      'Framer Motion entrance/interaction/loop animations, viewport once to avoid re-rendering',
      'Responsive design, 17px base font on mobile, 3-level breakpoint adaptation',
      'Cloudflare Pages global CDN deployment, accessible from China',
    ],
  },
]

// 项目卡片组件
function ProjectCard({ project, index }: { project: typeof projectsData[0]; index: number }) {
  const { language } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-xl bg-secondary/50 border border-border hover:border-primary-500/50 transition-all">
        {/* Project Image */}
        <div className="relative h-36 sm:h-48 bg-secondary overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl">{project.emoji}</div>
          </div>
          
          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-primary-500/80 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex gap-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              {project.demo !== '#' && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                >
                  <ExternalLink className="w-6 h-6 text-white" />
                </a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-2">
            {language === 'zh' ? project.title : project.titleEn}
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base mb-4 line-clamp-2">
            {language === 'zh' ? project.description : project.descriptionEn}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-primary-500/20 text-primary-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// 项目详情弹窗
function ProjectModal({ project, onClose }: { project: typeof projectsData[0]; onClose: () => void }) {
  const { language } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-2xl w-full bg-background rounded-2xl p-5 sm:p-8 border border-border max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-4">
          {language === 'zh' ? project.title : project.titleEn}
        </h2>
        
        <p className="text-muted-foreground mb-6">
          {language === 'zh' ? project.description : project.descriptionEn}
        </p>

        <h3 className="font-semibold mb-3">
          {language === 'zh' ? '核心功能' : 'Core Features'}
        </h3>
        <ul className="space-y-2 mb-6">
          {(language === 'zh' ? project.features : project.featuresEn).map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-primary-400 mt-0.5 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            {language === 'zh' ? '源代码' : 'Source Code'}
          </a>
          {project.demo !== '#' && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {language === 'zh' ? '在线演示' : 'Live Demo'}
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// 项目经历主组件
export default function Projects() {
  const { t } = useLanguage()
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null)

  return (
    <section id="projects" className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('projects.title') as string}
          subtitle=""
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <div key={project.id} onClick={() => setSelectedProject(project)}>
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
