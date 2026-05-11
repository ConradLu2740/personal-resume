'use client'
import SectionTitle from '@/components/SectionTitle'
import { useLanguage } from '@/components/language-provider'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { motion } from 'framer-motion'
import { Calendar, GraduationCap, MapPin, Star } from 'lucide-react'

// 关于我模块 - 包含个人简介和教育背景
export default function About() {
  const { t, tArr } = useLanguage()
  const prefersReducedMotion = useReducedMotion()

  return (
    <section id="about" className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={t('about.title')} subtitle="" />

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative w-full max-w-xs sm:max-w-sm mx-auto aspect-square">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl transform rotate-6" />

              {/* Avatar */}
              <div className="relative w-full h-full bg-secondary rounded-2xl overflow-hidden flex items-center justify-center">
                <img
                  src="/avatar.png"
                  alt="头像"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
              {t('about.description')}
            </p>

            {/* Education */}
            <div className="space-y-4 mb-8">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary-400" />
                {t('about.education')}
              </h3>

              <motion.div
                className="p-6 rounded-xl bg-secondary/50 border border-border"
                whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <h4 className="font-semibold text-lg">{t('about.university')}</h4>
                <p className="text-primary-400">{t('about.major')}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {t('about.period')}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {t('about.degree')}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Self Evaluation */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Star className="w-5 h-5 text-primary-400" />
                {t('about.selfEvalTitle')}
              </h3>

              <div className="space-y-3">
                {tArr('about.selfEval').map((item, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-xl bg-secondary/50 border border-border"
                    whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <p className="text-sm text-muted-foreground leading-relaxed">{item}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
