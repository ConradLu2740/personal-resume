'use client'

import { useEffect, useState } from 'react'

export default function ChallengePage() {
  const [verified, setVerified] = useState(false)

  useEffect(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    const hasWebGL = !!gl
    const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const hasScreenInfo = screen.width > 0 && screen.height > 0
    const hasNavigatorInfo = !!navigator.language && !!navigator.platform

    if (hasWebGL || (hasScreenInfo && hasNavigatorInfo)) {
      setVerified(true)
      setTimeout(() => {
        window.location.href = '/'
      }, 1500)
    }
  }, [])

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#f3f4f6',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '2rem',
        background: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid #e5e7eb',
          borderTopColor: '#0ea5e9',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 1rem'
        }} />
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#111827' }}>
          {verified ? 'Verified!' : 'Verifying your browser...'}
        </h1>
        <p style={{ color: '#6b7280' }}>
          {verified ? 'Redirecting...' : 'Please wait a moment.'}
        </p>
      </div>
    </div>
  )
}
