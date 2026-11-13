import { AnimatePresence, motion } from 'motion/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect } from 'react'
import { About } from './components/About'
import { CaseStudyPage } from './components/CaseStudyPage'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { GlassFilter } from './components/LiquidGlass'
import { Bento } from './components/Bento'
import { Services } from './components/Services'
import { Work } from './components/Work'
import { work } from './content'
import { takePendingHash, usePath } from './lib/router'
import { initSmoothScroll, resetScroll, scrollTo } from './lib/smooth'

export default function App() {
  useEffect(() => initSmoothScroll(), [])
  const path = usePath()
  const slug = path.match(/^\/work\/([^/]+)\/?$/)?.[1]
  const item = slug ? work.find((w) => w.slug === slug) : undefined
  const key = item ? item.slug : 'home'

  return (
    <>
      <GlassFilter />
      <Header />
      <AnimatePresence mode="wait">
        <motion.main
          key={key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6 } }}
          exit={{ opacity: 0, y: -24, transition: { duration: 0.45, ease: [0.65, 0, 0.35, 1] } }}
        >
          <Page>{item ? <CaseStudyPage item={item} /> : <Home />}</Page>
        </motion.main>
      </AnimatePresence>
    </>
  )
}

/** Resets scroll and re-measures ScrollTriggers whenever a page mounts. */
function Page({ children }: { children: React.ReactNode }) {
  useLayoutEffect(() => {
    const hash = takePendingHash()
    resetScroll()
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      if (hash) setTimeout(() => scrollTo(hash), 120)
    })
    return () => cancelAnimationFrame(id)
  }, [])
  return <>{children}</>
}

function Home() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Services />
      <Bento />
    </>
  )
}
