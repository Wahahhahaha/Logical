import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { useAuth } from './auth.jsx'
import { apiFetch } from './lib/api.js'
import { messages, backendMessageKey } from './i18n/messages.js'

const LANG_KEY = 'mathpath_lang'
const SUPPORTED = ['id-ID', 'en-US']
const I18nContext = createContext(null)

function readStoredLanguage() {
  const stored = localStorage.getItem(LANG_KEY)
  return SUPPORTED.includes(stored) ? stored : null
}

export function I18nProvider({ children }) {
  const { user, updateUser } = useAuth()
  const [stored, setStored] = useState(readStoredLanguage)
  const language = SUPPORTED.includes(user?.language) ? user.language : (stored || 'id-ID')
  const locale = language

  const translate = useCallback((key, vars) => {
    if (!key) return ''
    const table = messages[language] || messages['id-ID']
    let text = table[key] ?? messages['id-ID'][key] ?? key
    if (vars) for (const [name, value] of Object.entries(vars)) text = text.split(`{${name}}`).join(String(value))
    return text
  }, [language])

  const setLanguage = useCallback(async next => {
    if (!SUPPORTED.includes(next)) return
    localStorage.setItem(LANG_KEY, next)
    setStored(next)
    if (user) {
      const result = await apiFetch('/api/profile', { method: 'PUT', body: JSON.stringify({ language: next }) })
      if (result.user) updateUser(result.user)
    }
  }, [user, updateUser])

  const translateError = useCallback(error => {
    const message = typeof error === 'string' ? error : error?.message
    if (!message) return translate('err.generic')
    const key = backendMessageKey(message)
    return key ? translate(key) : message
  }, [translate])

  const value = useMemo(() => ({ language, locale, t: translate, setLanguage, translateError }), [language, locale, translate, setLanguage, translateError])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
