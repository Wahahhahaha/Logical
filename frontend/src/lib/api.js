export const API_BASE = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:4000`

export const APP_ERROR_EVENT = 'mathpath:app-error'

export function reportAppError(code) {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(APP_ERROR_EVENT, { detail: { code: String(code) } }))
}

export function apiUrl(path) {
  if (!path) return null
  return /^https?:\/\//i.test(path) ? path : `${API_BASE}${path}`
}

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('mathpath_token')
  const isAuthPath = path === '/api/auth/login' || path === '/api/auth/logout'
  let response
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    })
  } catch {
    if (path !== '/api/auth/logout') reportAppError(500)
    throw new Error('err.network')
  }
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    if (response.status === 401 && token && !isAuthPath) reportAppError(419)
    else if (response.status >= 500 && path !== '/api/auth/logout') reportAppError(500)
    throw new Error(body.message || 'err.requestFailed')
  }
  return body
}
