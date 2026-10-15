export const API_BASE = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:4000`

export function apiUrl(path) {
  if (!path) return null
  return /^https?:\/\//i.test(path) ? path : `${API_BASE}${path}`
}

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('mathpath_token')
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
    throw new Error('err.network')
  }
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.message || 'err.requestFailed')
  return body
}
