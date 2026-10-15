import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '../../i18n.jsx'
import Placeholder from '../common/Placeholder.jsx'

export default function StudentWorkspace() {
  const path = useLocation().pathname
  const { t } = useI18n()
  const title = useMemo(() => ({ '/student/learn': t('workspace.learningPath'), '/student/quests': t('workspace.quests'), '/student/pet': t('nav.pet'), '/student/progress': t('workspace.yourProgress') }[path] || t('workspace.student')), [path, t])
  return <Placeholder title={title} description={t('placeholder.studentDesc')} />
}
