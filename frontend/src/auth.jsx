import { createContext, useContext, useMemo, useState } from 'react'
import { apiFetch } from './lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('mathpath_user') || 'null'))
  const [loading, setLoading] = useState(false)

  const value = useMemo(() => ({
    user,
    loading,
    async login(username, password) {
      setLoading(true)
      try {
        const result = await apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) })
        localStorage.setItem('mathpath_token', result.token)
        localStorage.setItem('mathpath_user', JSON.stringify(result.user))
        setUser(result.user)
        return result.user
      } finally { setLoading(false) }
    },
    async logout() {
      try { if (localStorage.getItem('mathpath_token')) await apiFetch('/api/auth/logout', { method: 'POST' }) } catch { /* local logout still clears the session */ }
      localStorage.removeItem('mathpath_token'); localStorage.removeItem('mathpath_user'); setUser(null)
    },
    updateUser(nextUser) { localStorage.setItem('mathpath_user', JSON.stringify(nextUser)); setUser(nextUser) },
  }), [loading, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() { return useContext(AuthContext) }
