import { createContext, useContext, useMemo, useState } from 'react'
import { apiFetch } from './lib/api'

const AuthContext = createContext(null)

function readStoredUser() {
  try {
    const parsed = JSON.parse(localStorage.getItem('mathpath_user') || 'null')
    return parsed && typeof parsed === 'object' ? parsed : null
  } catch { return null }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)
  const [loading, setLoading] = useState(false)

  const value = useMemo(() => ({
    user,
    loading,
    async login(username, password) {
      setLoading(true)
      try {
        const result = await apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) })
        if (result.user) {
          localStorage.setItem('mathpath_token', result.token)
          localStorage.setItem('mathpath_user', JSON.stringify(result.user))
        }
        setUser(result.user || null)
        return result.user
      } finally { setLoading(false) }
    },
    async logout() {
      try { if (localStorage.getItem('mathpath_token')) await apiFetch('/api/auth/logout', { method: 'POST' }) } catch { /* local logout still clears the session */ }
      localStorage.removeItem('mathpath_token'); localStorage.removeItem('mathpath_user'); setUser(null)
    },
    clearSession() { localStorage.removeItem('mathpath_token'); localStorage.removeItem('mathpath_user'); setUser(null) },
    updateUser(nextUser) { if (!nextUser) return; localStorage.setItem('mathpath_user', JSON.stringify(nextUser)); setUser(nextUser) },
  }), [loading, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() { return useContext(AuthContext) }
