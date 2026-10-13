import { useState } from 'react'
import { ArrowRight, Sparkles, UserRound } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useToast } from '../../toast.jsx'

export default function LoginPage() {
  const { login, loading } = useAuth()
  const toast = useToast()
  const [form, setForm] = useState({ username: '', password: '' })
  const fillDemo = (username, password) => setForm({ username, password })
  const submit = async event => {
    event.preventDefault()
    try { await login(form.username, form.password); window.location.assign('/dashboard') }
    catch (requestError) { toast.error(requestError.message) }
  }
  return <div className="auth-page"><div className="auth-brand"><span className="brand-mark"><Sparkles size={17} /></span>Logical</div><div className="auth-card card"><div className="auth-icon"><UserRound size={22} /></div><p className="eyebrow">Welcome back</p><h1>Learn with purpose.</h1><p className="auth-subtitle">Sign in to continue your Mathematics journey.</p><div className="demo-login"><span>Quick fill demo account</span><div><button type="button" onClick={() => fillDemo('STU-001', 'student123')}>Student</button><button type="button" onClick={() => fillDemo('teacher.demo', 'teacher123')}>Teacher</button></div></div><form onSubmit={submit} className="auth-form"><label>Username or Student ID<input autoComplete="username" value={form.username} onChange={event => setForm({ ...form, username: event.target.value })} placeholder="e.g. teacher.demo or STU-001" required /></label><label>Password or PIN<input type="password" autoComplete="current-password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} placeholder="Enter your password" required /></label><button className="primary-button auth-submit" disabled={loading}>{loading ? 'Signing in...' : 'Sign in'} <ArrowRight size={16} /></button></form><p className="auth-note">Student accounts are created by a Teacher.</p></div></div>
}
