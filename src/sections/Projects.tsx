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
    description: '面向通信行业运维场景的智能助手系统，融合 RAG 检索增强生成、Agent 工具调用、实时日志分析，实现从故障发现、智能诊断到自动化修复的全链路运维闭环。Python + Go + React 三层架构，17,653 行代码。',
    descriptionEn: 'An intelligent assistant system for telecom network O&M, integrating RAG retrieval-augmented generation, Agent tool invocation, and real-time log analysis to achieve full-loop O&M from fault detection to automated remediation. Python + Go + React architecture, 17,653 lines of code.',
    tags: ['Python', 'FastAPI', 'React', 'RAG', 'Agent', 'Go'],
    emoji: '🤖',
    github: 'https://github.com/ConradLu2740/networkops-ai',
    demo: '#',
    features: [
      'RAG 三阶段检索：BM25+向量双路召回 → RRF 融合 → Cross-Encoder 精排，971 向量覆盖 13 个知识领域',
      'Agent 工具框架：10 个工具（日志查询/拓扑发现/SNMP/Ping/Ansible 等），Function Calling 自动编排',
      'Go 日志采集器 + Syslog UDP 接收 + WebSocket 实时推送，RFC3164/5424 协议解析',
      'LLDP/CDP 拓扑自动发现 + 可视化，ITSM 工单系统 + Ansible Playbook 自动化执行',
      'JWT 认证 + 前端路由守卫，238 个测试用例全部通过',
      '通信领域知识库：5G 核心网/传输网/接入网/光通信/卫星微波等 2,631 行专业文档',
    ],
    featuresEn: [
      '3-stage RAG retrieval: BM25+vector dual recall → RRF fusion → Cross-Encoder re-ranking, 971 vectors across 13 knowledge domains',
      'Agent tool framework: 10 tools (log query/topology discovery/SNMP/Ping/Ansible etc.), Function Calling auto-orchestration',
      'Go log collector + Syslog UDP receiver + WebSocket real-time push, RFC3164/5424 protocol parsing',
      'LLDP/CDP auto topology discovery + visualization, ITSM ticketing + Ansible Playbook automation',
      'JWT auth + frontend route guard, 238 test cases all passing',
      'Telecom knowledge base: 5G core/transport/access/optical/satellite etc., 2,631 lines of professional docs',
    ],
  },
  {
    id: 2,
    title: '视频名场面智能检测系统',
    titleEn: 'Video Highlight Intelligent Detection System',
    description: '基于多模态大模型的视频名场面智能检测系统，自动完成场景切割、关键帧提取、VLM 智能评分、语音转写，输出名场面判定结果与视频片段导出。',
    descriptionEn: 'A multi-modal LLM-based video highlight intelligent detection system that automatically performs scene segmentation, keyframe extraction, VLM scoring, and speech transcription to output highlight detection results and video clips.',
    tags: ['Python', 'FastAPI', 'Qwen-VL', 'Celery', 'Docker'],
    emoji: '🎬',
    github: 'https://github.com/ConradLu2740/video-analyzer',
    demo: '#',
    features: [
      '基于 PySceneDetect 的场景自动切割',
      'FFmpeg 关键帧提取 + Qwen-VL 视觉语言模型评分',
      'Faster-Whisper 语音转录与后处理',
      'Celery 异步任务队列 + Redis 消息代理',
      '多租户认证、配额管理、熔断限流',
      'Docker Compose 微服务编排 + Prometheus 监控',
    ],
    featuresEn: [
      'Automatic scene segmentation with PySceneDetect',
      'FFmpeg keyframe extraction + Qwen-VL scoring',
      'Faster-Whisper speech transcription & post-processing',
      'Celery async task queue + Redis message broker',
      'Multi-tenant auth, quota management, circuit breaker & rate limiting',
      'Docker Compose microservice orchestration + Prometheus monitoring',
    ],
  },
  {
    id: 3,
    title: '个人作品集网站',
    titleEn: 'Personal Portfolio Website',
    description: '基于 Next.js 14 构建的个人作品集网站，支持暗黑/亮色主题切换、中英文双语、Framer Motion 动画，部署在 Cloudflare Pages。',
    descriptionEn: 'A personal portfolio website built with Next.js 14, featuring dark/light theme toggle, Chinese/English bilingual support, Framer Motion animations, deployed on Cloudflare Pages.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    emoji: '🌐',
    github: 'https://github.com/ConradLu2740/personal-resume',
    demo: 'https://luxiyuan-portfolio.pages.dev',
    features: [
      'Next.js 14 App Router + TypeScript',
      '暗黑/亮色主题切换 (next-themes)',
      '中英文双语国际化 (i18n)',
      'Framer Motion 滚动动画与交互',
      '响应式设计，适配移动端',
      'Cloudflare Pages 全球 CDN 部署',
    ],
    featuresEn: [
      'Next.js 14 App Router + TypeScript',
      'Dark/Light theme toggle (next-themes)',
      'Chinese/English bilingual i18n',
      'Framer Motion scroll animations & interactions',
      'Responsive design for mobile devices',
      'Cloudflare Pages global CDN deployment',
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
        <div className="relative h-48 bg-secondary overflow-hidden">
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
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">
            {language === 'zh' ? project.title : project.titleEn}
          </h3>
          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
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
        className="relative max-w-2xl w-full bg-background rounded-2xl p-8 border border-border max-h-[80vh] overflow-y-auto"
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
    <section id="projects" className="py-20 md:py-32">
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
