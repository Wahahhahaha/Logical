import { Clock, Home, LogIn, RotateCcw, SearchX, ServerCrash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
import AuthScenery from '../../components/auth/AuthScenery.jsx'

const VARIANTS = {
  '404': { Icon: SearchX, tone: 'sky' },
  '500': { Icon: ServerCrash, tone: 'peach' },
  '419': { Icon: Clock, tone: 'yellow' },
}

export default function ErrorPage({ code = '404' }) {
  const { t } = useI18n()
  const { user } = useAuth()
  const navigate = useNavigate()
  const key = VARIANTS[code] ? code : '404'
  const { Icon, tone } = VARIANTS[key]
  const goHome = () => navigate(user ? '/dashboard' : '/login', { replace: true })
  return <main className={`error-page error-tone-${tone}`}>
    <AuthScenery />
    <section className="error-card card" role="alert">
      <div className="error-badge"><Icon size={28} /></div>
      <span className="error-code">{key}</span>
      <h1>{t(`error.${key}.title`)}</h1>
      <p className="error-copy">{t(`error.${key}.desc`)}</p>
      <div className="error-actions">
        <button type="button" className="primary-button" onClick={goHome}>
          {user ? <><Home size={16} /> {t('error.backHome')}</> : <><LogIn size={16} /> {t('error.backLogin')}</>}
        </button>
        <button type="button" className="ghost-button" onClick={() => window.location.reload()}>
          <RotateCcw size={15} /> {t('error.retry')}
        </button>
      </div>
      <p className="error-meta">{t('error.code')}: {key}</p>
    </section>
  </main>
}
