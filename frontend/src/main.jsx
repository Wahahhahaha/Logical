import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './auth.jsx'
import { I18nProvider } from './i18n.jsx'
import { ToastProvider } from './toast.jsx'

createRoot(document.getElementById('root')).render(<StrictMode><BrowserRouter><AuthProvider><I18nProvider><ToastProvider><App /></ToastProvider></I18nProvider></AuthProvider></BrowserRouter></StrictMode>)
