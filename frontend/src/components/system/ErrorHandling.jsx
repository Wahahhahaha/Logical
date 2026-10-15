import { Component, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth.jsx'
import { APP_ERROR_EVENT } from '../../lib/api.js'
import ErrorPage from '../../pages/common/ErrorPage.jsx'

const HANDLED = ['404', '419', '500']

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() { return { hasError: true } }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) console.error('Unhandled UI error:', error, info)
  }

  render() {
    if (this.state.hasError) return <ErrorPage code="500" />
    return this.props.children
  }
}

export function AppErrorWatcher() {
  const navigate = useNavigate()
  const location = useLocation()
  const { clearSession } = useAuth()

  useEffect(() => {
    const handle = event => {
      const code = String(event.detail?.code || '')
      if (!HANDLED.includes(code)) return
      if (code === '419') clearSession()
      const target = `/${code}`
      if (location.pathname === target) return
      navigate(target, { replace: true })
    }
    window.addEventListener(APP_ERROR_EVENT, handle)
    return () => window.removeEventListener(APP_ERROR_EVENT, handle)
  }, [navigate, location, clearSession])

  return null
}
