import { useState } from 'react'
import { ArrowRight, UserRound } from 'lucide-react'
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
  return <div className="auth-page"><div className="auth-sky-art" aria-hidden="true"><span>☁</span><span>✦</span><span>☁</span></div><div className="auth-brand"><span className="brand-mark">✦</span> Logical</div><div className="auth-card card"><div className="auth-icon"><UserRound size={22} /></div><p className="eyebrow">SELAMAT DATANG, PETUALANG!</p><h1>Siap belajar hari ini?</h1><p className="auth-subtitle">Masuk untuk melanjutkan petualangan Matematika bersama teman kecilmu.</p><div className="demo-login"><span>COBA AKUN DEMO</span><div><button type="button" onClick={() => fillDemo('STU-001', 'student123')}>🎒 Murid</button><button type="button" onClick={() => fillDemo('teacher.demo', 'teacher123')}>📚 Guru</button></div></div><form onSubmit={submit} className="auth-form"><label>Nama pengguna atau ID murid<input autoComplete="username" value={form.username} onChange={event => setForm({ ...form, username: event.target.value })} placeholder="contoh: STU-001" required /></label><label>Kata sandi atau PIN<input type="password" autoComplete="current-password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} placeholder="Masukkan kata sandi" required /></label><button className="primary-button auth-submit" disabled={loading}>{loading ? 'Membuka dunia...' : 'Mulai petualangan'} <ArrowRight size={16} /></button></form><p className="auth-note">Akun murid dibuat oleh guru.</p></div><div className="auth-footer">Belajar sedikit · tumbuh banyak <span>✦</span></div></div>
}
