'use client'

import ScrollProgress from '@/components/ScrollProgress'
import About from '@/sections/About'
import Hero from '@/sections/Hero'
import dynamic from 'next/dynamic'

const Skills = dynamic(() => import('@/sections/Skills'), {
  loading: () => <div className="min-h-[50vh]" />,
  ssr: false,
})
const Projects = dynamic(() => import('@/sections/Projects'), {
  loading: () => <div className="min-h-[50vh]" />,
  ssr: false,
})
const Experience = dynamic(() => import('@/sections/Experience'), {
  loading: () => <div className="min-h-[50vh]" />,
  ssr: false,
})
const Honors = dynamic(() => import('@/sections/Honors'), {
  loading: () => <div className="min-h-[50vh]" />,
  ssr: false,
})
const Contact = dynamic(() => import('@/sections/Contact'), {
  loading: () => <div className="min-h-[50vh]" />,
  ssr: false,
})

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Honors />
      <Contact />
    </>
  )
}
