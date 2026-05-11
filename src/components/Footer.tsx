'use client'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Logo from './Logo'
import { GitHubIcon } from './icons'
import { useLanguage } from './language-provider'

// 页脚组件 - 包含社交媒体链接和版权信息
export default function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              {t('footer.madeWith')} <Heart className="inline w-4 h-4 text-red-500" />{' '}
              {t('footer.and')} Next.js
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-4"
          >
            <a
              href="https://github.com/ConradLu2740"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-secondary hover:bg-primary-500/20 hover:text-primary-400 transition-all"
              aria-label="GitHub"
            >
              <GitHubIcon className="w-5 h-5" />
            </a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right text-sm text-muted-foreground"
          >
            <p>
              © {currentYear} Portfolio. {t('footer.rights')}
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
