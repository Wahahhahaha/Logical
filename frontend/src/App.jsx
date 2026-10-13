import { Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { useAuth } from './auth.jsx'
import AppShell from './components/layout/AppShell.jsx'
import LoginPage from './pages/auth/LoginPage.jsx'
import Placeholder from './pages/common/Placeholder.jsx'
import ProfilePage from './pages/shared/ProfilePage.jsx'
import StudentDashboard from './pages/student/StudentDashboard.jsx'
import StudentLearningPage from './pages/student/StudentLearningPage.jsx'
import StudentLessonPage from './pages/student/StudentLessonPage.jsx'
import StudentOnboardingPage from './pages/student/StudentOnboardingPage.jsx'
import StudentPetPage from './pages/student/StudentPetPage.jsx'
import StudentQuestsPage from './pages/student/StudentQuestsPage.jsx'
import StudentProgressPage from './pages/student/StudentProgressPage.jsx'
import StudentManagementPage from './pages/teacher/StudentManagementPage.jsx'
import TeacherDashboard from './pages/teacher/TeacherDashboard.jsx'
import TeacherProgressPage from './pages/teacher/TeacherProgressPage.jsx'
import './App.css'

export default function App() {
  const { user } = useAuth()
  return <Routes>
    <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
    <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
    <Route element={<RequireAuth />}>
      <Route path="/dashboard" element={<DashboardEntry />} />
      <Route path="/onboarding" element={<StudentOnboardingGate />} />
      <Route path="/student/learn/:lessonKey" element={<StudentLessonPage />} />
      <Route element={<AppShell />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/learn" element={<StudentLearningPage />} />
        <Route path="/student/quests" element={<StudentQuestsPage />} />
        <Route path="/student/pet" element={<StudentPetPage />} />
        <Route path="/student/progress" element={<StudentProgressPage />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/students" element={<StudentManagementPage />} />
        <Route path="/teacher/progress" element={<TeacherProgressPage />} />
        <Route path="*" element={<Placeholder title="Page not found" description="The requested workspace page does not exist." />} />
      </Route>
    </Route>
  </Routes>
}

function RequireAuth() {
  const { user } = useAuth()
  return user ? <Outlet /> : <Navigate to="/login" replace />
}

function RoleDashboard() {
  const { user } = useAuth()
  return user?.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />
}

function DashboardEntry() {
  const { user } = useAuth()
  return user?.role === 'student' && !user.profile?.onboardingCompleted ? <Navigate to="/onboarding" replace /> : <AppShell><RoleDashboard /></AppShell>
}

function StudentOnboardingGate() {
  const { user } = useAuth()
  if (user?.role !== 'student') return <Navigate to="/dashboard" replace />
  return user.profile?.onboardingCompleted ? <Navigate to="/dashboard" replace /> : <StudentOnboardingPage />
}
