import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Placeholder from '../common/Placeholder.jsx'

export default function TeacherWorkspace() {
  const path = useLocation().pathname
  const title = useMemo(() => ({ '/teacher/progress': 'Learning progress' }[path] || 'Teacher workspace'), [path])
  return <Placeholder title={title} description="This workspace is ready for student data, monitoring, and analytics to be connected in the next phase." />
}
