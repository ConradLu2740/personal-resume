'use client'

import { useCallback } from 'react'

interface LogoProps {
  className?: string
}

/**
 * 个性化 SVG Logo 组件
 * 基于「LXY」字母组合的简约几何设计
 * 使用 primary 色渐变，适配亮/暗主题
 */
export default function Logo({ className = '' }: LogoProps) {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <button
      onClick={scrollToTop}
      className={`flex items-center ${className}`}
      aria-label="返回顶部"
    >
      <svg
        width="110"
        height="32"
        viewBox="0 0 110 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>
        <text
          x="2"
          y="25"
          fontFamily="Inter, -apple-system, sans-serif"
          fontSize="26"
          fontWeight="800"
          fill="url(#logo-gradient)"
          letterSpacing="-1"
        >
          LXY
        </text>
        <line
          x1="68"
          y1="6"
          x2="68"
          y2="24"
          stroke="url(#logo-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <circle cx="78" cy="15" r="2.5" fill="url(#logo-gradient)" opacity="0.4" />
        <text
          x="86"
          y="23"
          fontFamily="Inter, -apple-system, sans-serif"
          fontSize="11"
          fontWeight="400"
          className="fill-foreground"
        >
          dev
        </text>
      </svg>
    </button>
  )
}
