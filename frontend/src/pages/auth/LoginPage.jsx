import { useState } from 'react'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
import { useToast } from '../../toast.jsx'
import LanguageToggle from '../../components/LanguageToggle.jsx'
import '../../components/auth/CloudAnimation.css'
import '../../components/auth/GroundDecor.css'

export default function LoginPage() {
  const { login, loading } = useAuth()
  const { t } = useI18n()
  const toast = useToast()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const fillDemo = (username, password) => setForm({ username, password })
  const submit = async event => {
    event.preventDefault()
    try { await login(form.username, form.password); window.location.assign('/dashboard') }
    catch (requestError) { toast.error(requestError) }
  }
  return <div className="auth-page">
    <div className="auth-clouds" aria-hidden="true"><div className="cloud cloud-1"></div><div className="cloud cloud-2"></div><div className="cloud cloud-3"></div></div>
    <svg className="auth-landscape" viewBox="0 0 1000 360" preserveAspectRatio="none" aria-hidden="true"><path className="landscape-back" d="M0 142C120 72 228 154 354 106C492 54 604 158 738 101C842 57 927 91 1000 66V360H0Z" /><path className="landscape-middle" d="M0 198C132 133 246 202 382 166C526 128 632 211 764 158C866 117 941 164 1000 134V360H0Z" /><path className="landscape-front" d="M0 257C108 213 222 253 346 229C493 201 612 276 742 224C851 181 930 239 1000 207V360H0Z" /></svg>
    <div className="auth-nature" aria-hidden="true"><span className="grass grass-1" /><span className="grass grass-2" /><span className="grass grass-3" /><span className="grass grass-4" /><span className="grass grass-5" /><span className="grass grass-6" /><span className="grass grass-7" /><span className="grass grass-8" /><span className="flower flower-1 flower-yellow" /><span className="flower flower-2 flower-pink" /><span className="flower flower-3 flower-white" /><span className="flower flower-4 flower-yellow" /><span className="flower flower-5 flower-pink" /><span className="flower flower-6 flower-white" /></div>
    <div className="auth-brand"><img src="/logo.png" alt={t('auth.logoAlt')} className="auth-brand-logo" /><span>{t('shell.brand')}</span></div>
    <div className="auth-lang"><LanguageToggle /></div>
    <div className="auth-card card"><p className="eyebrow">{t('auth.welcome')}</p><h1>{t('auth.ready')}</h1><p className="auth-subtitle">{t('auth.subtitle')}</p><div className="demo-login"><span>{t('auth.demo')}</span><div><button type="button" onClick={() => fillDemo('STU-001', 'student123')}>{t('auth.student')}</button><button type="button" onClick={() => fillDemo('teacher.demo', 'teacher123')}>{t('auth.teacher')}</button></div></div><form onSubmit={submit} className="auth-form"><label>{t('auth.id')}<input autoComplete="username" value={form.username} onChange={event => setForm({ ...form, username: event.target.value })} placeholder={t('auth.idPlaceholder')} required /></label><label>{t('auth.password')}<div style={{ position: 'relative' }}><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} placeholder={t('auth.passwordPlaceholder')} required style={{ width: '100%', paddingRight: 42 }} /><button type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? t('auth.hidePassword') : t('auth.showPassword')} style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', color: '#7c98a4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6 }}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label><button className="primary-button auth-submit" disabled={loading}>{loading ? t('auth.opening') : t('auth.start')} <ArrowRight size={16} /></button></form><p className="auth-note">{t('auth.note')}</p></div>
  </div>
}
