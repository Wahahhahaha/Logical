import { Sparkles } from 'lucide-react'
import { useI18n } from '../../i18n.jsx'

export default function Placeholder({ title, description }) {
  const { t } = useI18n()
  return <div className="placeholder card"><div className="placeholder-icon"><Sparkles size={22} /></div><label>{t('placeholder.nextSlice')}</label><h1>{title}</h1><p>{description}</p><div className="placeholder-note">{t('placeholder.note')}</div></div>
}
