import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import ServiceProvider from './provider/ServiceProvider.tsx'
import { Toaster } from '@/components/ui/toaster'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/">
      <ServiceProvider>
        <App />
        <Toaster />
      </ServiceProvider>
    </BrowserRouter>
  </StrictMode>,
)
