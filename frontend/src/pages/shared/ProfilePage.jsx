import { useRef, useState } from 'react'
import { Camera, KeyRound, Trash2 } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useToast } from '../../toast.jsx'
import { apiFetch, apiUrl } from '../../lib/api.js'

const MAX_EDGE = 640
const JPEG_QUALITY = 0.82
const MAX_FILE_BYTES = 8 * 1024 * 1024

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      URL.revokeObjectURL(objectUrl)
      const scale = Math.min(1, MAX_EDGE / Math.max(image.width, image.height))
      const width = Math.max(1, Math.round(image.width * scale))
      const height = Math.max(1, Math.round(image.height * scale))
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(image, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY))
    }
    image.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('Selected file is not a valid image')) }
    image.src = objectUrl
  })
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const toast = useToast()
  const fileRef = useRef(null)
  const [fullName, setFullName] = useState(user.fullName)
  const [photoDraft, setPhotoDraft] = useState(null)
  const [photoRemoved, setPhotoRemoved] = useState(false)
  const [saving, setSaving] = useState(false)
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [changing, setChanging] = useState(false)

  const previewPhoto = photoDraft || (photoRemoved ? null : apiUrl(user.photoUrl))
  const hasPhoto = Boolean(user.photoUrl) && !photoRemoved

  const pickPhoto = async event => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (file.size > MAX_FILE_BYTES) { toast.error('Image must be smaller than 8MB'); return }
    try { setPhotoDraft(await compressImage(file)); setPhotoRemoved(false) }
    catch (imageError) { toast.error(imageError.message) }
  }

  const clearPhoto = () => { setPhotoDraft(null); setPhotoRemoved(true) }

  const save = async event => {
    event.preventDefault(); setSaving(true)
    try {
      const payload = { fullName }
      if (photoDraft) payload.photo = photoDraft
      else if (photoRemoved) payload.photo = null
      const result = await apiFetch('/api/profile', { method: 'PUT', body: JSON.stringify(payload) })
      updateUser(result.user); setPhotoDraft(null); setPhotoRemoved(false); toast.success('Profile saved successfully')
    } catch (requestError) { toast.error(requestError.message) } finally { setSaving(false) }
  }

  const changePassword = async event => {
    event.preventDefault()
    if (passwords.next !== passwords.confirm) { toast.error('New password and confirmation do not match'); return }
    setChanging(true)
    try {
      const result = await apiFetch('/api/profile/password', { method: 'PUT', body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.next }) })
      setPasswords({ current: '', next: '', confirm: '' }); toast.success(result.message || 'Password changed successfully')
    } catch (requestError) { toast.error(requestError.message) } finally { setChanging(false) }
  }

  return <div className="page-stack">
    <section className="welcome-row">
      <div>
        <p className="eyebrow">Account settings</p>
        <h1>Edit profile</h1>
        <p className="page-subtitle">Keep your account details up to date.</p>
      </div>
    </section>

    <div className="form-card card">
      <div className="profile-heading">
        <div className="large-avatar">{previewPhoto ? <img src={previewPhoto} alt="" /> : (user.fullName?.slice(0, 1) || '?')}</div>
        <div>
          <h2>{user.fullName}</h2>
          <p>{user.role} · {user.username}</p>
          <div className="photo-actions">
            <button type="button" className="secondary-button" onClick={() => fileRef.current?.click()}>
              <Camera size={13} /> {hasPhoto || photoDraft ? 'Change photo' : 'Add photo'}
            </button>
            {(photoDraft || hasPhoto) && <button type="button" className="secondary-button danger-button" onClick={clearPhoto}><Trash2 size={13} /> Remove</button>}
            <input ref={fileRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={pickPhoto} />
          </div>
        </div>
      </div>
      {user.role === 'student' && <div className="info-strip"><div><span>Grade</span><b>{user.profile?.grade || '-'}</b></div><div><span>Class</span><b>{user.profile?.className || '-'}</b></div></div>}
      <form className="profile-form" onSubmit={save}>
        <label>Full name<input value={fullName} onChange={event => setFullName(event.target.value)} required /></label>
        <button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save profile'}</button>
      </form>
      <p className="photo-hint">JPG or PNG. The image is resized and compressed automatically before it is uploaded.</p>
    </div>

    <div className="form-card card">
      <div className="card-head">
        <label>Security</label>
        <h2>Change password</h2>
      </div>
      <form className="profile-form" onSubmit={changePassword}>
        <label>Current password<input type="password" autoComplete="current-password" value={passwords.current} onChange={event => setPasswords({ ...passwords, current: event.target.value })} required /></label>
        <div className="form-two">
          <label>New password<input type="password" autoComplete="new-password" minLength={4} value={passwords.next} onChange={event => setPasswords({ ...passwords, next: event.target.value })} required /></label>
          <label>Confirm new password<input type="password" autoComplete="new-password" minLength={4} value={passwords.confirm} onChange={event => setPasswords({ ...passwords, confirm: event.target.value })} required /></label>
        </div>
        <div className="form-actions">
          <button className="primary-button" type="submit" disabled={changing}><KeyRound size={14} /> {changing ? 'Updating...' : 'Update password'}</button>
        </div>
      </form>
      <p className="photo-hint">You need your current password to confirm the change.</p>
    </div>
  </div>
}
