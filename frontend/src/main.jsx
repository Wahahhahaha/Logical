import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './auth.jsx'
import { I18nProvider } from './i18n.jsx'
import { ToastProvider } from './toast.jsx'
import { ErrorBoundary } from './components/system/ErrorHandling.jsx'

createRoot(document.getElementById('root')).render(<StrictMode><BrowserRouter><AuthProvider><I18nProvider><ToastProvider><ErrorBoundary><App /></ErrorBoundary></ToastProvider></I18nProvider></AuthProvider></BrowserRouter></StrictMode>)
