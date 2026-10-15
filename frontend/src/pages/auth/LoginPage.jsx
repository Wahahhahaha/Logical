import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, HelpCircle, X } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
import { useToast } from '../../toast.jsx'
import AuthScenery from '../../components/auth/AuthScenery.jsx'

const demoAccounts = [
  { username: 'teacher.demo', password: '12345', role: 'teacher' },
  { username: 'STU-001', password: '12345', role: 'student' },
  { username: 'STU-002', password: '12345', role: 'student' },
  { username: 'STU-003', password: '12345', role: 'student' },
  { username: 'STU-004', password: '12345', role: 'student' },
  { username: 'STU-005', password: '12345', role: 'student' },
]

export default function LoginPage() {
  const { login, loading } = useAuth()
  const { t } = useI18n()
  const toast = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showDemo, setShowDemo] = useState(false)
  const fillDemo = (username, password) => { setForm({ username, password }); setShowDemo(false) }
  const submit = async event => {
    event.preventDefault()
    try {
      const loggedIn = await login(form.username, form.password)
      const target = loggedIn?.role === 'student' && !loggedIn?.profile?.onboardingCompleted ? '/onboarding' : '/dashboard'
      navigate(target, { replace: true })
    } catch (requestError) { toast.error(requestError) }
  }
  return <div className="auth-page">
    <AuthScenery />
    <div className="auth-brand"><img src="/logo.png" alt={t('auth.logoAlt')} className="auth-brand-logo" /><span>{t('shell.brand')}</span></div>
    <div className="auth-card card"><p className="eyebrow">{t('auth.welcome')}</p><h1>{t('auth.ready')}</h1><p className="auth-subtitle">{t('auth.subtitle')}</p><div className="demo-login"><span>{t('auth.demo')}</span><button type="button" className="demo-info-button" onClick={() => setShowDemo(true)} aria-label={t('auth.demoInfoOpen')} aria-haspopup="dialog"><HelpCircle size={16} /></button><div><button type="button" onClick={() => fillDemo('STU-001', '12345')}>{t('auth.student')}</button><button type="button" onClick={() => fillDemo('teacher.demo', '12345')}>{t('auth.teacher')}</button></div></div><form onSubmit={submit} className="auth-form"><label>{t('auth.id')}<input autoComplete="username" value={form.username} onChange={event => setForm({ ...form, username: event.target.value })} placeholder={t('auth.idPlaceholder')} required /></label><label>{t('auth.password')}<div style={{ position: 'relative' }}><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} placeholder={t('auth.passwordPlaceholder')} required style={{ width: '100%', paddingRight: 42 }} /><button type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')} style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', color: '#7c98a4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6 }}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label><button className="primary-button auth-submit" disabled={loading}>{loading ? t('auth.opening') : t('auth.start')} <ArrowRight size={16} /></button></form><p className="auth-note">{t('auth.note')}</p></div>
    {showDemo && createPortal(<div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setShowDemo(false) }}><div className="card modal-card demo-accounts-modal" role="dialog" aria-modal="true" aria-labelledby="demo-accounts-title"><div className="section-title-row"><h2 id="demo-accounts-title">{t('auth.demoInfoTitle')}</h2><button className="icon-button demo-modal-close" onClick={() => setShowDemo(false)} aria-label={t('common.close')}><X size={17} /></button></div><p className="muted-text">{t('auth.demoHint')}</p><ul className="demo-account-list">{demoAccounts.map(account => <li className="demo-account-row" key={account.username}><div className="demo-account-info"><b>{account.username}</b><span>{t('auth.demoPassword')}: {account.password}</span></div><span className={`demo-account-role ${account.role}`}>{account.role === 'teacher' ? t('auth.teacher') : t('auth.student')}</span><button type="button" className="secondary-button small" onClick={() => fillDemo(account.username, account.password)}>{t('auth.demoUse')}</button></li>)}</ul></div></div>, document.body)}
  </div>
}
