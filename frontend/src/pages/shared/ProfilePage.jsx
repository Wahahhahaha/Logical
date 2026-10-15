import { useRef, useState } from 'react'
import { Camera, Eye, EyeOff, KeyRound, Trash2 } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
import { useToast } from '../../toast.jsx'
import { apiFetch, apiUrl } from '../../lib/api.js'
import ImageCropModal from '../../components/ImageCropModal.jsx'

const MAX_FILE_BYTES = 8 * 1024 * 1024

function PasswordInput({ label, autoComplete, minLength, value, onChange, visible, onToggle }) {
  const { t } = useI18n()
  return <label>{label}
    <span className="password-field">
      <input type={visible ? 'text' : 'password'} autoComplete={autoComplete} minLength={minLength} value={value} onChange={onChange} required />
      <button type="button" className="password-toggle" onClick={onToggle} aria-label={visible ? t('profile.hidePassword') : t('profile.showPassword')} aria-pressed={visible}>{visible ? <EyeOff size={16} /> : <Eye size={16} />}</button>
    </span>
  </label>
}

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const { t, translateError } = useI18n()
  const toast = useToast()
  const fileRef = useRef(null)
  const [fullName, setFullName] = useState(user.fullName)
  const [photoDraft, setPhotoDraft] = useState(null)
  const [photoRemoved, setPhotoRemoved] = useState(false)
  const [cropSrc, setCropSrc] = useState(null)
  const [saving, setSaving] = useState(false)
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [visible, setVisible] = useState({ current: false, next: false, confirm: false })
  const [changing, setChanging] = useState(false)

  const toggleVisible = field => setVisible(state => ({ ...state, [field]: !state[field] }))

  const previewPhoto = photoDraft || (photoRemoved ? null : apiUrl(user.photoUrl))
  const hasPhoto = Boolean(user.photoUrl) && !photoRemoved

  const pickPhoto = event => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (file.size > MAX_FILE_BYTES) { toast.error(t('profile.imageTooBig')); return }
    setCropSrc(current => { if (current) URL.revokeObjectURL(current); return URL.createObjectURL(file) })
  }

  const closeCrop = () => setCropSrc(current => { if (current) URL.revokeObjectURL(current); return null })
  const applyCrop = dataUrl => { setPhotoDraft(dataUrl); setPhotoRemoved(false); closeCrop() }
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

  return <><div className="page-stack">
    <section className="welcome-row">
      <div>
        <p className="eyebrow">{t('profile.accountSettings')}</p>
        <h1>{t('profile.edit')}</h1>
        <p className="page-subtitle">{t('profile.subtitle')}</p>
      </div>
    </section>

    <div className="profile-grid">
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
        <label>{t('profile.fullName')}<input value={fullName} maxLength={30} onChange={event => setFullName(event.target.value)} required /></label>
        <button className="primary-button" type="submit" disabled={saving}>{saving ? t('common.saving') : t('profile.save')}</button>
      </form>
    </div>

    <div className="form-card card">
      <div className="card-head">
        <label>{t('profile.security')}</label>
        <h2>{t('profile.changePassword')}</h2>
      </div>
      <form className="profile-form" onSubmit={changePassword}>
        <PasswordInput label={t('profile.currentPassword')} autoComplete="current-password" value={passwords.current} onChange={event => setPasswords({ ...passwords, current: event.target.value })} visible={visible.current} onToggle={() => toggleVisible('current')} />
        <div className="form-two">
          <PasswordInput label={t('profile.newPassword')} autoComplete="new-password" minLength={4} value={passwords.next} onChange={event => setPasswords({ ...passwords, next: event.target.value })} visible={visible.next} onToggle={() => toggleVisible('next')} />
          <PasswordInput label={t('profile.confirmPassword')} autoComplete="new-password" minLength={4} value={passwords.confirm} onChange={event => setPasswords({ ...passwords, confirm: event.target.value })} visible={visible.confirm} onToggle={() => toggleVisible('confirm')} />
        </div>
        <div className="form-actions">
          <button className="primary-button" type="submit" disabled={changing}><KeyRound size={14} /> {changing ? t('profile.updating') : t('profile.updatePassword')}</button>
        </div>
      </form>
      <p className="photo-hint">{t('profile.passwordHint')}</p>
    </div>
    </div>
  </div>
  {cropSrc && <ImageCropModal src={cropSrc} onCancel={closeCrop} onConfirm={applyCrop} />}
  </>}
