import { useState } from 'react'
import { useAuth } from '../auth.jsx'
import { useToast } from '../toast.jsx'
import { apiFetch } from '../lib/api.js'

const OPTIONS = [['id-ID', 'ID'], ['en-US', 'EN']]

export default function LanguageToggle() {
  const { user, updateUser } = useAuth()
  const toast = useToast()
  const [busy, setBusy] = useState(false)

  const change = async language => {
    if (busy || language === user.language) return
    setBusy(true)
    try {
      const result = await apiFetch('/api/profile', { method: 'PUT', body: JSON.stringify({ language }) })
      updateUser(result.user)
    } catch (requestError) {
      toast.error(requestError.message)
    } finally { setBusy(false) }
  }

  return <div className="language-pill" role="group" aria-label="Language">
    {OPTIONS.map(([value, label]) => <button key={value} type="button" className={user.language === value ? 'active' : ''} disabled={busy} onClick={() => change(value)} aria-pressed={user.language === value}>{label}</button>)}
  </div>
}
