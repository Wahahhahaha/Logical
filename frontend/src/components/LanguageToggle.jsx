import { useState } from 'react'
import { useI18n } from '../i18n.jsx'
import { useToast } from '../toast.jsx'

const OPTIONS = [['id-ID', 'ID'], ['en-US', 'EN']]

export default function LanguageToggle({ className = '' }) {
  const { language, setLanguage } = useI18n()
  const toast = useToast()
  const [busy, setBusy] = useState(false)

  const change = async next => {
    if (busy || next === language) return
    setBusy(true)
    try { await setLanguage(next) }
    catch (requestError) { toast.error(requestError) }
    finally { setBusy(false) }
  }

  return <div className={`language-pill ${className}`.trim()} role="group" aria-label="Language">
    {OPTIONS.map(([value, label]) => <button key={value} type="button" className={language === value ? 'active' : ''} disabled={busy} onClick={() => change(value)} aria-pressed={language === value}>{label}</button>)}
  </div>
}
