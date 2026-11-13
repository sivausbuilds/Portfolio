import { useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { GlassFilter } from './components/LiquidGlass'
import { Statement } from './components/Statement'
import { initSmoothScroll } from './lib/smooth'

export default function App() {
  useEffect(() => initSmoothScroll(), [])
  return (
    <>
      <GlassFilter />
      <Header />
      <main>
        <Hero />
        <Statement />
      </main>
    </>
  )
}
