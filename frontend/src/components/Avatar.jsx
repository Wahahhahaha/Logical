import { apiUrl } from '../lib/api.js'

export default function Avatar({ user, alt }) {
  const photoUrl = apiUrl(user?.photoUrl)
  if (!photoUrl) return <span className="avatar-initial">{user?.fullName?.slice(0, 1) || '?'}</span>
  return <img className="avatar-image" src={photoUrl} alt={alt || user?.fullName || 'Profile photo'} />
}
