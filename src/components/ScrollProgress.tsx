'use client'

import { useEffect, useState } from 'react'

/**
 * 页面滚动进度条组件
 * 在页面顶部显示一个细条状的滚动进度指示器
 * z-index 高于 Navbar（z-50），确保始终可见
 */
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setProgress(Math.min((scrollTop / docHeight) * 100, 100))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (progress === 0) return null

  return (
    <div
      className="fixed top-0 left-0 h-[3px] z-[60] bg-gradient-to-r from-primary-400 to-primary-600 transition-[width] duration-150"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="页面滚动进度"
    />
  )
}
