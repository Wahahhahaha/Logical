import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useI18n } from '../i18n.jsx'

const MAX_EDGE = 640
const JPEG_QUALITY = 0.85
const STAGE_MAX = 440
const MIN_CROP = 48

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const CORNERS = [
  ['nw', 0, 0],
  ['ne', 1, 0],
  ['sw', 0, 1],
  ['se', 1, 1]
]

export default function ImageCropModal({ src, onCancel, onConfirm }) {
  const { t } = useI18n()
  const imageRef = useRef(null)
  const dragRef = useRef(null)
  const [meta, setMeta] = useState(null)
  const [crop, setCrop] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState(false)

  const initFromImage = () => {
    const image = imageRef.current
    if (!image) return
    const nw = image.naturalWidth
    const nh = image.naturalHeight
    if (!nw || !nh) return
    const maxStage = Math.min(STAGE_MAX, (typeof window !== 'undefined' ? window.innerWidth : STAGE_MAX) - 96)
    const scale = Math.min(maxStage / nw, maxStage / nh)
    const dw = Math.round(nw * scale)
    const dh = Math.round(nh * scale)
    const size = Math.round(Math.min(dw, dh) * 0.8)
    setMeta({ dw, dh })
    setCrop({ x: Math.round((dw - size) / 2), y: Math.round((dh - size) / 2), w: size, h: size })
  }

  useEffect(() => {
    if (!dragging || !meta) return undefined
    const move = event => {
      const drag = dragRef.current
      if (!drag) return
      const dx = event.clientX - drag.startX
      const dy = event.clientY - drag.startY
      const start = drag.crop
      if (drag.mode === 'move') {
        setCrop({ x: clamp(start.x + dx, 0, meta.dw - start.w), y: clamp(start.y + dy, 0, meta.dh - start.h), w: start.w, h: start.h })
        return
      }
      let left = start.x
      let top = start.y
      let right = start.x + start.w
      let bottom = start.y + start.h
      if (drag.corner.includes('w')) left = start.x + dx
      if (drag.corner.includes('e')) right = start.x + start.w + dx
      if (drag.corner.includes('n')) top = start.y + dy
      if (drag.corner.includes('s')) bottom = start.y + start.h + dy
      left = clamp(left, 0, meta.dw - MIN_CROP)
      top = clamp(top, 0, meta.dh - MIN_CROP)
      right = clamp(right, left + MIN_CROP, meta.dw)
      bottom = clamp(bottom, top + MIN_CROP, meta.dh)
      setCrop({ x: left, y: top, w: right - left, h: bottom - top })
    }
    const up = () => setDragging(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    window.addEventListener('pointercancel', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
      window.removeEventListener('pointercancel', up)
    }
  }, [dragging, meta])

  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape') onCancel() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onCancel])

  const startDrag = (mode, corner) => event => {
    if (!meta || !crop || error) return
    event.preventDefault()
    event.stopPropagation()
    dragRef.current = { mode, corner, startX: event.clientX, startY: event.clientY, crop: { ...crop } }
    setDragging(true)
  }

  const handleConfirm = () => {
    const image = imageRef.current
    if (!image || !meta || !crop || error) return
    const scaleX = image.naturalWidth / meta.dw
    const scaleY = image.naturalHeight / meta.dh
    const sx = crop.x * scaleX
    const sy = crop.y * scaleY
    const sw = crop.w * scaleX
    const sh = crop.h * scaleY
    const outScale = Math.min(1, MAX_EDGE / Math.max(sw, sh))
    const width = Math.max(1, Math.round(sw * outScale))
    const height = Math.max(1, Math.round(sh * outScale))
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const context = canvas.getContext('2d')
    context.fillStyle = '#fff'
    context.fillRect(0, 0, width, height)
    context.drawImage(image, sx, sy, sw, sh, 0, 0, width, height)
    onConfirm(canvas.toDataURL('image/jpeg', JPEG_QUALITY))
  }

  return createPortal(
    <div className="modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onCancel() }}>
      <div className="card modal-card crop-modal-card" role="dialog" aria-modal="true" aria-labelledby="crop-modal-title">
        <div className="section-title-row">
          <div>
            <label>{t('profile.changePhoto')}</label>
            <h2 id="crop-modal-title">{t('profile.cropTitle')}</h2>
          </div>
          <button className="icon-button" type="button" onClick={onCancel} aria-label={t('common.cancel')}><X size={17} /></button>
        </div>
        {error
          ? <p className="muted-text">{t('profile.cropError')}</p>
          : <div className="crop-stage" style={meta ? { width: meta.dw, height: meta.dh } : undefined}>
            <img ref={imageRef} className="crop-image" src={src} alt="" draggable={false} onLoad={initFromImage} onError={() => setError(true)} />
            {meta && crop && <div className="crop-box" style={{ left: crop.x, top: crop.y, width: crop.w, height: crop.h }} onPointerDown={startDrag('move')}>
              {CORNERS.map(([corner, cx, cy]) => <span key={corner} className={`crop-handle ${corner}`} role="presentation" style={{ left: cx ? '100%' : '0%', top: cy ? '100%' : '0%' }} onPointerDown={startDrag('corner', corner)} />)}
            </div>}
          </div>}
        <div className="form-actions">
          <button className="primary-button" type="button" onClick={handleConfirm} disabled={!meta || error}>{t('profile.cropApply')}</button>
          <button className="secondary-button" type="button" onClick={onCancel}>{t('common.cancel')}</button>
        </div>
      </div>
    </div>,
    document.body
  )
}
