import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './styles/fonts.css'
import './styles/global.css'
import App from './App'

// Refraction (SVG displacement on the backdrop) renders correctly in Chromium/Firefox.
// WebKit gets the frosted + specular layers only, which still reads as glass.
const ua = navigator.userAgent
const isWebKitOnly =
  /iPhone|iPad|iPod/.test(ua) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1) ||
  (/AppleWebKit/.test(ua) && !/Chrome|Chromium|Edg|OPR/.test(ua))
if (!isWebKitOnly) document.documentElement.classList.add('lg-refract')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
