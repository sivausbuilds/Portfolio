import { AnimatePresence, motion } from 'motion/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect } from 'react'
import { About } from './components/About'
import { CaseStudyPage } from './components/CaseStudyPage'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { GlassFilter } from './components/LiquidGlass'
import { Bento } from './components/Bento'
import { Websites } from './components/Websites'
import { Services } from './components/Services'
import { Work } from './components/Work'
import { Footer } from './components/Footer'
import { Contact } from './components/Contact'
import { Resume } from './components/Resume'
import { work } from './content'
import { takePendingHash, usePath } from './lib/router'
import { initSmoothScroll, resetScroll, scrollTo } from './lib/smooth'

export default function App() {
  useEffect(() => initSmoothScroll(), [])
  const path = usePath()
  const slug = path.match(/^\/work\/([^/]+)\/?$/)?.[1]
  const item = slug ? work.find((w) => w.slug === slug) : undefined
  const isResume = /^\/resume\/?$/.test(path)
  const key = isResume ? 'resume' : item ? item.slug : 'home'

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
          <Page>{isResume ? <Resume /> : item ? <CaseStudyPage item={item} /> : <Home />}</Page>
          <Footer />
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
    // key-phrase underlines draw in when they scroll into view
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && (e.target.classList.add('is-drawn'), io.unobserve(e.target))),
      { rootMargin: '0px 0px -12% 0px' },
    )
    const scan = () => document.querySelectorAll('.hl:not(.is-drawn)').forEach((el) => io.observe(el))
    const mo = new MutationObserver(scan)
    mo.observe(document.body, { childList: true, subtree: true })
    scan()
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      if (hash) setTimeout(() => scrollTo(hash), 120)
    })
    return () => {
      cancelAnimationFrame(id)
      io.disconnect()
      mo.disconnect()
    }
  }, [])
  return <>{children}</>
}

function Home() {
  return (
    <>
      <Hero />
      <Work />
      <Websites />
      <About />
      <Bento />
      <Services />
      <Contact />
    </>
  )
}
