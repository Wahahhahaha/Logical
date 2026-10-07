import { useState } from 'react'
import { useAuth } from '../../auth.jsx'
import { apiFetch } from '../../lib/api.js'

export default function ProfilePage() {
  const { user, updateUser } = useAuth(); const [form, setForm] = useState({ fullName: user.fullName, language: user.language }); const [status, setStatus] = useState(''); const [error, setError] = useState('')
  const save = async event => { event.preventDefault(); setStatus(''); setError(''); try { const result = await apiFetch('/api/profile', { method: 'PUT', body: JSON.stringify(form) }); updateUser(result.user); setStatus('Profile saved successfully') } catch (requestError) { setError(requestError.message) } }
  return <div className="page-stack"><section className="welcome-row"><div><p className="eyebrow">Account settings</p><h1>Edit profile</h1><p className="page-subtitle">Keep your account details up to date.</p></div></section><div className="form-card card"><div className="profile-heading"><div className="large-avatar">{user.fullName?.slice(0, 1) || '?'}</div><div><h2>{user.fullName}</h2><p>{user.role} · {user.username}</p></div></div><form className="profile-form" onSubmit={save}><label>Full name<input value={form.fullName} onChange={event => setForm({ ...form, fullName: event.target.value })} required /></label><label>Language<select value={form.language} onChange={event => setForm({ ...form, language: event.target.value })}><option value="id-ID">Bahasa Indonesia</option><option value="en-US">English</option></select></label>{error && <div className="form-error">{error}</div>}{status && <div className="form-success">{status}</div>}<button className="primary-button" type="submit">Save profile</button></form></div></div>
}
