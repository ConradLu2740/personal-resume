'use client'

import SectionTitle from '@/components/SectionTitle'
import { GitHubIcon } from '@/components/icons'
import { useLanguage } from '@/components/language-provider'
import { createMailtoLink, obfuscateEmail } from '@/lib/obfuscate'
import { motion } from 'framer-motion'
import { Check, Copy, Mail, MapPin, Phone, Send } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

function ContactForm() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailto = createMailtoLink(
      'luxiyuan2020@163.com',
      `来自 ${formData.name} 的消息`,
      `发件人: ${formData.name}\n邮箱: ${formData.email}\n\n${formData.message}`
    )
    window.open(mailto, '_blank')
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium mb-2">{t('contact.name')}</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary-500 focus:outline-none transition-colors"
          placeholder="Your name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t('contact.email')}</label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary-500 focus:outline-none transition-colors"
          placeholder="your@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">{t('contact.message')}</label>
        <textarea
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary-500 focus:outline-none transition-colors resize-none"
          placeholder="Your message..."
        />
      </div>

      <div className="hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        {t('contact.submit') as string}
      </button>

      <p className="text-xs text-muted-foreground text-center">
        点击后将打开您的邮箱客户端发送邮件
      </p>
    </motion.form>
  )
}

export default function Contact() {
  const { t } = useLanguage()
  const [copiedEmail, setCopiedEmail] = useState(false)
  const [showPhone, setShowPhone] = useState(false)

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText('luxiyuan2020@163.com')
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'email',
      value: 'luxiyuan2020@163.com',
      href: 'mailto:luxiyuan2020@163.com',
      displayValue: obfuscateEmail('luxiyuan2020@163.com'),
    },
    {
      icon: Phone,
      label: 'phone',
      value: '13906573716',
      href: 'tel:13906573716',
      displayValue: showPhone ? '139-0657-3716' : '139****3716',
    },
    {
      icon: MapPin,
      label: 'location',
      value: '杭州市',
      href: '#',
      displayValue: '杭州市',
    },
  ]

  return (
    <section id="contact" className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('contact.title') as string}
          subtitle={t('contact.description') as string}
        />

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    if (item.label === 'phone' && !showPhone) {
                      setShowPhone(true)
                    }
                  }}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
                >
                  <div className="p-3 rounded-lg bg-primary-500/20">
                    <item.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">{t(`contact.${item.label}`)}</p>
                    {item.label === 'email' ? (
                      <p
                        className="font-medium"
                        dangerouslySetInnerHTML={{ __html: item.displayValue as string }}
                      />
                    ) : (
                      <p className="font-medium">{item.displayValue}</p>
                    )}
                  </div>
                  {item.label === 'email' && (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        handleCopyEmail()
                      }}
                      className="p-2 rounded-lg hover:bg-primary-500/20 transition-colors opacity-0 group-hover:opacity-100"
                      title={copiedEmail ? '已复制' : '复制邮箱'}
                    >
                      {copiedEmail ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-primary-400" />
                      )}
                    </button>
                  )}
                </a>
              ))}
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">GitHub</h3>
              <div className="flex gap-4">
                <a
                  href="https://github.com/ConradLu2740"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-secondary hover:bg-primary-500/20 hover:text-primary-400 transition-all hover:scale-110 active:scale-95"
                  title="GitHub"
                >
                  <GitHubIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
