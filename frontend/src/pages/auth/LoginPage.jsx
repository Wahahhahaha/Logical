import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
import { useToast } from '../../toast.jsx'
import AuthScenery from '../../components/auth/AuthScenery.jsx'

export default function LoginPage() {
  const { login, loading } = useAuth()
  const { t } = useI18n()
  const toast = useToast()
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const fillDemo = (username, password) => setForm({ username, password })
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
    <div className="auth-card card"><p className="eyebrow">{t('auth.welcome')}</p><h1>{t('auth.ready')}</h1><p className="auth-subtitle">{t('auth.subtitle')}</p><div className="demo-login"><span>{t('auth.demo')}</span><div><button type="button" onClick={() => fillDemo('STU-001', 'student123')}>{t('auth.student')}</button><button type="button" onClick={() => fillDemo('teacher.demo', 'teacher123')}>{t('auth.teacher')}</button></div></div><form onSubmit={submit} className="auth-form"><label>{t('auth.id')}<input autoComplete="username" value={form.username} onChange={event => setForm({ ...form, username: event.target.value })} placeholder={t('auth.idPlaceholder')} required /></label><label>{t('auth.password')}<div style={{ position: 'relative' }}><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} placeholder={t('auth.passwordPlaceholder')} required style={{ width: '100%', paddingRight: 42 }} /><button type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')} style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', color: '#7c98a4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6 }}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label><button className="primary-button auth-submit" disabled={loading}>{loading ? t('auth.opening') : t('auth.start')} <ArrowRight size={16} /></button></form><p className="auth-note">{t('auth.note')}</p></div>
  </div>
}
