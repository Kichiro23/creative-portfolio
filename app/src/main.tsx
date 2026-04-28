import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import './index.css'
import { ThemeProvider } from "@/providers/theme"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <HashRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </HashRouter>,
)
