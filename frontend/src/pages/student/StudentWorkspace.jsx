import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import Placeholder from '../common/Placeholder.jsx'

export default function StudentWorkspace() {
  const path = useLocation().pathname
  const title = useMemo(() => ({ '/student/learn': 'Learning path', '/student/practice': 'Practice space', '/student/quests': 'Quests', '/student/pet': 'Mochi’s space', '/student/progress': 'Your progress' }[path] || 'Student workspace'), [path])
  return <Placeholder title={title} description="This area is connected to the product shell and is ready for the next implementation slice." />
}
