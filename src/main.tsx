import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@gjensidige/builders-fonts/dist/fonts.css'
import '@gjensidige/builders-tokens/dist/tokens.css'
import '@gjensidige/builders-components/dist/style.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
