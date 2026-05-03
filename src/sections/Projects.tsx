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
    title: '电商平台',
    titleEn: 'E-commerce Platform',
    description: '一个功能完善的电商平台，支持商品管理、购物车、订单系统和支付集成。',
    descriptionEn: 'A full-featured e-commerce platform with product management, shopping cart, order system, and payment integration.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: '/images/project1.jpg',
    github: 'https://github.com',
    demo: 'https://demo.com',
    features: ['用户认证与授权', '商品搜索与筛选', '购物车与结算', '订单管理与追踪'],
    featuresEn: ['User Authentication', 'Product Search & Filter', 'Shopping Cart & Checkout', 'Order Management'],
  },
  {
    id: 2,
    title: '任务管理系统',
    titleEn: 'Task Management System',
    description: '团队协作任务管理工具，支持看板视图、甘特图和实时通知。',
    descriptionEn: 'Team collaboration task management tool with kanban view, Gantt chart, and real-time notifications.',
    tags: ['Vue.js', 'Express', 'PostgreSQL', 'Socket.io'],
    image: '/images/project2.jpg',
    github: 'https://github.com',
    demo: 'https://demo.com',
    features: ['看板与列表视图', '任务分配与追踪', '实时协作', '数据可视化'],
    featuresEn: ['Kanban & List View', 'Task Assignment', 'Real-time Collaboration', 'Data Visualization'],
  },
  {
    id: 3,
    title: '个人博客系统',
    titleEn: 'Personal Blog System',
    description: '支持 Markdown 的博客系统，包含文章管理、评论系统和 SEO 优化。',
    descriptionEn: 'Markdown-supported blog system with article management, comment system, and SEO optimization.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
    image: '/images/project3.jpg',
    github: 'https://github.com',
    demo: 'https://demo.com',
    features: ['Markdown 编辑器', '代码高亮', '评论系统', 'SEO 优化'],
    featuresEn: ['Markdown Editor', 'Code Highlighting', 'Comment System', 'SEO Optimization'],
  },
  {
    id: 4,
    title: '数据分析仪表盘',
    titleEn: 'Data Analytics Dashboard',
    description: '实时数据可视化仪表盘，支持多种图表类型和数据导出功能。',
    descriptionEn: 'Real-time data visualization dashboard with multiple chart types and data export features.',
    tags: ['React', 'D3.js', 'Python', 'FastAPI'],
    image: '/images/project4.jpg',
    github: 'https://github.com',
    demo: 'https://demo.com',
    features: ['实时数据更新', '交互式图表', '自定义报表', '数据导出'],
    featuresEn: ['Real-time Updates', 'Interactive Charts', 'Custom Reports', 'Data Export'],
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
            <div className="text-6xl">📦</div>
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
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                <ExternalLink className="w-6 h-6 text-white" />
              </a>
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
        className="relative max-w-2xl w-full bg-background rounded-2xl p-8 border border-border"
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

        <h3 className="font-semibold mb-3">核心功能</h3>
        <ul className="space-y-2 mb-6">
          {(language === 'zh' ? project.features : project.featuresEn).map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-primary-400" />
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
            源代码
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            在线演示
          </a>
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

        <div className="grid md:grid-cols-2 gap-8">
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
