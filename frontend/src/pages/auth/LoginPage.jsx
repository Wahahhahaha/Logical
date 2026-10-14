import { useState } from 'react'
import { ArrowRight, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useToast } from '../../toast.jsx'
import '../../components/auth/CloudAnimation.css'
import '../../components/auth/GroundDecor.css'

export default function LoginPage() {
  const { login, loading } = useAuth()
  const toast = useToast()
  const [form, setForm] = useState({ username: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const fillDemo = (username, password) => setForm({ username, password })
  const submit = async event => {
    event.preventDefault()
    try { await login(form.username, form.password); window.location.assign('/dashboard') }
    catch (requestError) { toast.error(requestError.message) }
  }
  return <div className="auth-page"><div className="auth-clouds" aria-hidden="true"><div className="cloud cloud-1"></div><div className="cloud cloud-2"></div><div className="cloud cloud-3"></div></div><div className="auth-brand">Logical</div><div className="auth-card card"><p className="eyebrow">SELAMAT DATANG!</p><h1>Siap belajar hari ini?</h1><p className="auth-subtitle">Masuk untuk melanjutkan petualangan Matematika bersama teman kecilmu.</p><div className="demo-login"><span>COBA AKUN DEMO</span><div><button type="button" onClick={() => fillDemo('STU-001', 'student123')}>Murid</button><button type="button" onClick={() => fillDemo('teacher.demo', 'teacher123')}>Guru</button></div></div><form onSubmit={submit} className="auth-form"><label>ID<input autoComplete="username" value={form.username} onChange={event => setForm({ ...form, username: event.target.value })} placeholder="contoh: STU-001 atau teacher.demo" required /></label><label>Kata sandi<div style={{ position: 'relative' }}><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} placeholder="Masukkan kata sandi" required style={{ width: '100%', paddingRight: 42 }} /><button type="button" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'} style={{ position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'transparent', color: '#7c98a4', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 6 }}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div></label><button className="primary-button auth-submit" disabled={loading}>{loading ? 'Membuka dunia...' : 'Mulai petualangan'} <ArrowRight size={16} /></button></form><p className="auth-note">Akun murid dibuat oleh guru.</p></div></div>
}
