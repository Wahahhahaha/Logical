import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { useI18n } from './i18n.jsx'

const ToastContext = createContext(null)
const TOAST_DURATION = 3000

export function ToastProvider({ children }) {
  const { translateError } = useI18n()
  const [toasts, setToasts] = useState([])
  const counter = useRef(0)

  const dismiss = useCallback((id) => setToasts((list) => list.filter((toast) => toast.id !== id)), [])

  const push = useCallback((message, tone) => {
    counter.current += 1
    const id = counter.current
    setToasts((list) => [...list, { id, message, tone }])
    window.setTimeout(() => dismiss(id), TOAST_DURATION)
    return id
  }, [dismiss])

  const value = useMemo(() => ({
    success: (message) => push(translateError(message), 'success'),
    error: (message) => push(translateError(message), 'error'),
    dismiss,
  }), [push, dismiss, translateError])

  return <ToastContext.Provider value={value}>
    {children}
    <div className="toast-stack">
      {toasts.map((toast) => <div key={toast.id} className={`toast toast-${toast.tone}`} role="status" onClick={() => dismiss(toast.id)}>
        {toast.tone === 'success' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
        <span>{toast.message}</span>
        <i className="toast-progress"><b style={{ animationDuration: `${TOAST_DURATION}ms` }} /></i>
      </div>)}
    </div>
  </ToastContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() { return useContext(ToastContext) }
