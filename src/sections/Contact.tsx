'use client'

import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'
import SectionTitle from '@/components/SectionTitle'
import { obfuscateEmail, createMailtoLink } from '@/lib/obfuscate'

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
    displayValue: '139-0657-3716',
  },
  {
    icon: MapPin,
    label: 'location',
    value: '杭州市',
    href: '#',
    displayValue: '杭州市',
  },
]

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
    <form onSubmit={handleSubmit} className="space-y-6 animate-in-right">
      <div>
        <label className="block text-sm font-medium mb-2">
          {t('contact.name') as string}
        </label>
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
        <label className="block text-sm font-medium mb-2">
          {t('contact.email') as string}
        </label>
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
        <label className="block text-sm font-medium mb-2">
          {t('contact.message') as string}
        </label>
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
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
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
    </form>
  )
}

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title={t('contact.title') as string}
          subtitle={t('contact.description') as string}
        />

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8 animate-in-left">
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <div className="p-3 rounded-lg bg-primary-500/20">
                    <item.icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t(`contact.${item.label}`) as string}
                    </p>
                    {item.label === 'email' ? (
                      <p
                        className="font-medium"
                        dangerouslySetInnerHTML={{ __html: item.displayValue as string }}
                      />
                    ) : (
                      <p className="font-medium">{item.displayValue}</p>
                    )}
                  </div>
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  )
}
