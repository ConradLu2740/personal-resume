'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Star } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import SectionTitle from '@/components/SectionTitle'

// 关于我模块 - 包含个人简介和教育背景
export default function About() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('about.title') as string}
          subtitle=""
        />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Profile Image */}
          <div
            className="relative animate-in-left"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm mx-auto aspect-square">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl transform rotate-6" />
              
              {/* SVG Avatar */}
              <div className="relative w-full h-full bg-secondary rounded-2xl overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-4/5 h-4/5" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="hsl(201, 96%, 32%)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="hsl(201, 96%, 42%)" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="75" r="38" fill="url(#avatarGrad)" stroke="hsl(201, 96%, 32%)" strokeWidth="2" strokeOpacity="0.4" />
                  <ellipse cx="100" cy="160" rx="55" ry="40" fill="url(#avatarGrad)" stroke="hsl(201, 96%, 32%)" strokeWidth="2" strokeOpacity="0.4" />
                  <circle cx="88" cy="70" r="3" fill="hsl(201, 96%, 32%)" fillOpacity="0.6" />
                  <circle cx="112" cy="70" r="3" fill="hsl(201, 96%, 32%)" fillOpacity="0.6" />
                  <path d="M92 82 Q100 90 108 82" stroke="hsl(201, 96%, 32%)" strokeWidth="2" fill="none" strokeOpacity="0.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div
            className="animate-in-right"
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              {t('about.description') as string}
            </p>

            {/* Education */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary-400" />
                {t('about.education') as string}
              </h3>
              
              <motion.div
                className="p-6 rounded-xl bg-secondary/50 border border-border"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h4 className="font-semibold text-lg">{t('about.university') as string}</h4>
                <p className="text-primary-400">{t('about.major') as string}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {t('about.period') as string}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {t('about.degree') as string}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Self Evaluation */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Star className="w-5 h-5 text-primary-400" />
                {t('about.selfEvalTitle') as string}
              </h3>
              
              <div className="space-y-3">
                {(t('about.selfEval') as string[]).map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-xl bg-secondary/50 border border-border"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
