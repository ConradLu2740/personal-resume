'use client'

import SectionTitle from '@/components/SectionTitle'
import { GitHubIcon } from '@/components/icons'
import { useLanguage } from '@/components/language-provider'
import { AnimatePresence, motion } from 'framer-motion'
import { Bot, ChevronRight, ExternalLink, Globe, Image as ImageIcon, Video, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

/** 项目图标映射 */
const projectIcons = [Bot, Video, ImageIcon, Globe]

// 项目数据配置
const projectsData = [
  {
    id: 1,
    title: '智能网络运维助手',
    titleEn: 'NetworkOps AI — Intelligent Network O&M Assistant',
    description:
      '面向通信行业运维场景的智能助手系统，融合 RAG 检索增强生成、Agent 工具调用、实时日志分析，实现从故障发现到自动化修复的全链路运维闭环。Python + Go + React 三层架构，17,653 行代码，92 个源文件。',
    descriptionEn:
      'An intelligent assistant system for telecom network O&M, integrating RAG, Agent tool invocation, and real-time log analysis for full-loop O&M from fault detection to automated remediation. Python + Go + React architecture, 17,653 lines of code, 92 source files.',
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
    description:
      '【实习项目】基于大模型的视频高光片段自动检测 Agent，44 个 Python 源文件 + 3 个微服务。独立设计并落地端到端智能体，通过大模型理解视频内容，自动识别精彩片段并输出结构化结果。',
    descriptionEn:
      '[Internship Project] A LLM-based video highlight auto-detection Agent, 44 Python source files + 3 microservices. Independently designed and deployed an end-to-end agent that understands video content via large models, automatically identifies highlight clips and outputs structured results.',
    tags: ['Python', 'FastAPI', 'Qwen-VL', 'FFmpeg', 'Agent'],
    emoji: '🎬',
    github: 'https://github.com/ConradLu2740/video-analyzer',
    demo: '#',
    features: [
      'Agent 流水线：场景分割 → 关键帧提取 → 大模型视觉评分 → 语音转写 → 语义去重合并 → 片段裁剪导出，实现无人值守闭环',
      'Prompt 工程：设计 8 维度评分 Prompt（视觉冲击、情绪强度、表情等），将主观判断显式化，引导模型输出可解释评分',
      '效率优化：引入 MD5 缓存与国产模型 API 成本优化，单视频分析从 2 小时压缩至 5 分钟，效率提升 80%',
      '工具封装：将 FFmpeg 封装为 Agent 可调用工具，实现视频片段自动裁剪与导出',
      '架构设计：抽象「感知 → 理解 → 决策 → 执行」Agent 架构，项目已开源至 GitHub',
    ],
    featuresEn: [
      'Agent Pipeline: Scene Segmentation → Keyframe Extraction → LLM Visual Scoring → Speech Transcription → Semantic Deduplication → Clip Export, achieving unattended closed-loop',
      'Prompt Engineering: Designed 8-dimension scoring Prompt (visual impact, emotional intensity, facial expressions, etc.), making subjective judgments explicit and interpretable',
      'Efficiency Optimization: Introduced MD5 caching and domestic model API cost optimization, compressing analysis from 2 hours to 5 minutes, 80% efficiency improvement',
      'Tool Encapsulation: Wrapped FFmpeg as Agent-callable tool for automatic clip cropping and export',
      'Architecture Design: Abstracted "Perception → Understanding → Decision → Execution" Agent architecture, project open-sourced on GitHub',
    ],
  },
  {
    id: 3,
    title: 'SteganoGAN-Transformer',
    titleEn: 'SteganoGAN-Transformer',
    description:
      '【本科毕设】针对图像隐写任务提出的端到端模型，利用自注意力机制提升隐写性能。PSNR 达 41.675dB，SSIM 达 0.957，显著优于 VGG、ResNet 等主流骨干网络。',
    descriptionEn:
      '[Bachelor Thesis] An end-to-end model for image steganography using self-attention mechanism. Achieved PSNR 41.675dB and SSIM 0.957, significantly outperforming VGG, ResNet and other mainstream backbones.',
    tags: ['Python', 'PyTorch', 'Deep Learning', 'Computer Vision'],
    emoji: '🖼️',
    github: 'https://github.com/ConradLu2740',
    demo: '#',
    features: [
      '提出 SteganoGAN-Transformer 端到端模型，利用自注意力机制捕获图像全局依赖关系，提升隐写容量与不可感知性',
      '应用混合精度训练（AMP）与数据加载优化，训练速度提升 15%',
      '引入混沌加密增强安全性，提升隐写内容抗检测能力',
      '最终模型 PSNR 达 41.675dB，SSIM 达 0.957，显著优于 VGG、ResNet 等主流骨干网络',
      '独立完成从文献调研、模型设计、实验验证到论文撰写的全流程',
    ],
    featuresEn: [
      'Proposed SteganoGAN-Transformer end-to-end model using self-attention mechanism to capture global image dependencies, improving steganography capacity and imperceptibility',
      'Applied mixed precision training (AMP) and data loading optimization, improving training speed by 15%',
      'Introduced chaotic encryption to enhance security and improve anti-detection capability of steganographic content',
      'Final model achieved PSNR 41.675dB and SSIM 0.957, significantly outperforming VGG, ResNet and other mainstream backbones',
      'Independently completed the entire process from literature research, model design, experimental validation to thesis writing',
    ],
  },
  {
    id: 4,
    title: '个人作品集网站',
    titleEn: 'Personal Portfolio Website',
    description:
      '【本项目即您当前浏览的网站】基于 Next.js 14 构建的个人作品集网站，18 个源文件，支持暗黑/亮色主题切换、中英文双语、Framer Motion 动画，部署在 Cloudflare Pages 全球 CDN。',
    descriptionEn:
      '[This is the website you are currently browsing] A personal portfolio website built with Next.js 14, 18 source files, featuring dark/light theme toggle, Chinese/English bilingual support, Framer Motion animations, deployed on Cloudflare Pages global CDN.',
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
function ProjectCard({ project, index }: { project: (typeof projectsData)[0]; index: number }) {
  const { language } = useLanguage()
  const [isHovered, setIsHovered] = useState(false)
  const IconComponent = projectIcons[index] || Bot

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
            <IconComponent size={48} className="text-primary-400/60" />
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
                <GitHubIcon className="w-6 h-6 text-white" />
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
function ProjectModal({
  project,
  onClose,
}: { project: (typeof projectsData)[0]; onClose: () => void }) {
  const { language } = useLanguage()
  const modalRef = useRef<HTMLDivElement>(null)

  /** 处理 Escape 键关闭弹窗与 body 滚动锁定 */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (project) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
      modalRef.current?.focus()
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [project, onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        ref={modalRef}
        tabIndex={-1}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-2xl w-full bg-background rounded-2xl p-5 sm:p-8 border border-border max-h-[85vh] overflow-y-auto outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary transition-colors"
          aria-label={language === 'zh' ? '关闭' : 'Close'}
        >
          <X className="w-5 h-5" />
        </button>

        <h2 id="modal-title" className="text-2xl font-bold mb-4">
          {language === 'zh' ? project.title : project.titleEn}
        </h2>

        <p className="text-muted-foreground mb-6">
          {language === 'zh' ? project.description : project.descriptionEn}
        </p>

        <h3 className="font-semibold mb-3">{language === 'zh' ? '核心功能' : 'Core Features'}</h3>
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
            <GitHubIcon className="w-4 h-4" />
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
  const [selectedProject, setSelectedProject] = useState<(typeof projectsData)[0] | null>(null)

  return (
    <section id="projects" className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('projects.title')} subtitle="" />

        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedProject(project)
                }
              }}
            >
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
