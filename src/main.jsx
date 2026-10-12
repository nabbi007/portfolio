import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// NOTE: StrictMode is intentionally omitted. In dev it double-invokes effects,
// which makes the GSAP intro timelines (loader, hero, nav) build → revert →
// rebuild — visible as a "blink" and a replay of the deploy loader on every
// load/reload. Removing it makes dev match production (single, clean intro).
createRoot(document.getElementById('root')).render(<App />)
