import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { useI18n } from '../../i18n.jsx'
import Placeholder from '../common/Placeholder.jsx'

export default function TeacherWorkspace() {
  const path = useLocation().pathname
  const { t } = useI18n()
  const title = useMemo(() => ({ '/teacher/progress': t('workspace.teacherProgress') }[path] || t('workspace.teacher')), [path, t])
  return <Placeholder title={title} description={t('placeholder.teacherDesc')} />
}
