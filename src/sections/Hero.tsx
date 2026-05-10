'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, Mail } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

// 首页 Hero 区域组件 - 包含个人介绍、CTA 按钮和滚动提示
export default function Hero() {
  const { t } = useLanguage()

  // 滚动到项目区域
  const scrollToProjects = () => {
    const element = document.querySelector('#projects')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // 滚动到联系区域
  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary-500/10" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {t('hero.greeting') as string}
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600 bg-clip-text text-transparent">
              卢锡远
            </span>
          </motion.h1>

          {/* Title */}
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {t('hero.title') as string}
          </motion.h2>

          {/* Meta Info */}
          <motion.p
            className="text-sm sm:text-base text-primary-400/80 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {t('hero.metaInfo') as string}
          </motion.p>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 px-4 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {t('hero.subtitle') as string}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <button
              onClick={scrollToProjects}
              className="px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white rounded-full font-medium transition-all hover:scale-105 flex items-center gap-2"
            >
              {t('hero.viewProjects') as string}
              <ArrowDown className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToContact}
              className="px-8 py-4 border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 rounded-full font-medium transition-all hover:scale-105 flex items-center gap-2"
            >
              {t('hero.contactMe') as string}
              <Mail className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Download Resume */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary-400 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>下载简历</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ArrowDown className="w-6 h-6 text-muted-foreground" />
      </motion.div>
    </section>
  )
}
