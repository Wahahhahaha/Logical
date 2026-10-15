import { useRef, useState } from 'react'
import { Camera, KeyRound, Trash2 } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
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
    image.onerror = () => { URL.revokeObjectURL(objectUrl); reject(new Error('err.invalidImage')) }
    image.src = objectUrl
  })
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const { t, translateError } = useI18n()
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
    if (file.size > MAX_FILE_BYTES) { toast.error(t('profile.imageTooBig')); return }
    try { setPhotoDraft(await compressImage(file)); setPhotoRemoved(false) }
    catch (imageError) { toast.error(imageError) }
  }

  const clearPhoto = () => { setPhotoDraft(null); setPhotoRemoved(true) }

  const save = async event => {
    event.preventDefault(); setSaving(true)
    try {
      const payload = { fullName }
      if (photoDraft) payload.photo = photoDraft
      else if (photoRemoved) payload.photo = null
      const result = await apiFetch('/api/profile', { method: 'PUT', body: JSON.stringify(payload) })
      updateUser(result.user); setPhotoDraft(null); setPhotoRemoved(false); toast.success(t('profile.saved'))
    } catch (requestError) { toast.error(requestError) } finally { setSaving(false) }
  }

  const changePassword = async event => {
    event.preventDefault()
    if (passwords.next !== passwords.confirm) { toast.error(t('profile.mismatch')); return }
    setChanging(true)
    try {
      const result = await apiFetch('/api/profile/password', { method: 'PUT', body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.next }) })
      setPasswords({ current: '', next: '', confirm: '' }); toast.success(translateError(result.message || 'err.passwordChanged'))
    } catch (requestError) { toast.error(requestError) } finally { setChanging(false) }
  }

  return <div className="page-stack">
    <section className="welcome-row">
      <div>
        <p className="eyebrow">{t('profile.accountSettings')}</p>
        <h1>{t('profile.edit')}</h1>
        <p className="page-subtitle">{t('profile.subtitle')}</p>
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
              <Camera size={13} /> {hasPhoto || photoDraft ? t('profile.changePhoto') : t('profile.addPhoto')}
            </button>
            {(photoDraft || hasPhoto) && <button type="button" className="secondary-button danger-button" onClick={clearPhoto}><Trash2 size={13} /> {t('common.remove')}</button>}
            <input ref={fileRef} className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={pickPhoto} />
          </div>
        </div>
      </div>
      {user.role === 'student' && <div className="info-strip"><div><span>{t('profile.grade')}</span><b>{user.profile?.grade || '-'}</b></div><div><span>{t('profile.class')}</span><b>{user.profile?.className || '-'}</b></div></div>}
      <form className="profile-form" onSubmit={save}>
        <label>{t('profile.fullName')}<input value={fullName} onChange={event => setFullName(event.target.value)} required /></label>
        <button className="primary-button" type="submit" disabled={saving}>{saving ? t('common.saving') : t('profile.save')}</button>
      </form>
      <p className="photo-hint">{t('profile.photoHint')}</p>
    </div>

    <div className="form-card card">
      <div className="card-head">
        <label>{t('profile.security')}</label>
        <h2>{t('profile.changePassword')}</h2>
      </div>
      <form className="profile-form" onSubmit={changePassword}>
        <label>{t('profile.currentPassword')}<input type="password" autoComplete="current-password" value={passwords.current} onChange={event => setPasswords({ ...passwords, current: event.target.value })} required /></label>
        <div className="form-two">
          <label>{t('profile.newPassword')}<input type="password" autoComplete="new-password" minLength={4} value={passwords.next} onChange={event => setPasswords({ ...passwords, next: event.target.value })} required /></label>
          <label>{t('profile.confirmPassword')}<input type="password" autoComplete="new-password" minLength={4} value={passwords.confirm} onChange={event => setPasswords({ ...passwords, confirm: event.target.value })} required /></label>
        </div>
        <div className="form-actions">
          <button className="primary-button" type="submit" disabled={changing}><KeyRound size={14} /> {changing ? t('profile.updating') : t('profile.updatePassword')}</button>
        </div>
      </form>
      <p className="photo-hint">{t('profile.passwordHint')}</p>
    </div>
  </div>
}
