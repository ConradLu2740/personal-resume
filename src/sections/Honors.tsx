'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Award, Heart } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import SectionTitle from '@/components/SectionTitle'

// 荣誉数据配置
const honorsData = [
  {
    id: 1,
    icon: Award,
    title: '东北大学计算机科学与工程学院优秀学生奖学金',
    titleEn: 'Outstanding Student Scholarship, School of Computer Science and Engineering, Northeastern University',
    period: '2020 - 2024',
  },
  {
    id: 2,
    icon: Heart,
    title: '第五届"云支教"志愿活动，累计 86 小时科普宣讲',
    titleEn: '5th "Cloud Teaching" Volunteer Activity, 86 hours of science popularization',
    period: '2023',
  },
]

// 荣誉卡片组件
function HonorCard({ honor, index }: { honor: typeof honorsData[0]; index: number }) {
  const { language } = useLanguage()
  const Icon = honor.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="flex items-start gap-4 p-5 rounded-xl bg-secondary/50 border border-border hover:border-primary-500/50 transition-all"
    >
      <div className="p-3 rounded-lg bg-primary-500/20 flex-shrink-0">
        <Icon className="w-5 h-5 text-primary-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm sm:text-base font-medium leading-relaxed">
          {language === 'zh' ? honor.title : honor.titleEn}
        </p>
        <p className="text-xs text-muted-foreground mt-1">{honor.period}</p>
      </div>
    </motion.div>
  )
}

// 荣誉区域主组件
export default function Honors() {
  const { t } = useLanguage()

  return (
    <section id="honors" className="py-16 md:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('honors.title') as string}
          subtitle=""
        />

        <div className="max-w-3xl mx-auto space-y-4">
          {honorsData.map((honor, index) => (
            <HonorCard key={honor.id} honor={honor} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
