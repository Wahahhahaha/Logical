import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { BarChart3, BookOpen, ChevronRight, Home, LayoutDashboard, LogOut, Menu, PawPrint, PanelLeft, Target, Users, X } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import { useI18n } from '../../i18n.jsx'
import Avatar from '../Avatar.jsx'
import LanguageToggle from '../LanguageToggle.jsx'

const studentNav = [['nav.dashboard', '/dashboard', Home], ['nav.learn', '/student/learn', BookOpen], ['nav.quests', '/student/quests', Target], ['nav.pet', '/student/pet', PawPrint], ['nav.progress', '/student/progress', BarChart3]]
const teacherNav = [['nav.dashboard', '/dashboard', LayoutDashboard], ['nav.students', '/teacher/students', Users], ['nav.teacherProgress', '/teacher/progress', BarChart3]]

export default function AppShell({ children }) {
  const { user, logout } = useAuth()
  const { t } = useI18n()
  const role = user.role
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const nav = role === 'student' ? studentNav : teacherNav
  const crumb = location.pathname === '/profile' ? t('shell.profile') : location.pathname === '/dashboard' ? t('nav.dashboard') : role === 'student' ? t('nav.learn') : role === 'teacher' ? t('shell.teacherWorkspace') : t('shell.class')
  return <div className="app-shell"><aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''} ${collapsed ? 'sidebar-collapsed' : ''}`}><div className="brand-row"><Link className="brand" to="/dashboard" onClick={() => setMobileOpen(false)}><img src="/favicon.png" alt="logo" width="24" height="24" style={{ borderRadius: 6 }} /><span className="brand-text">{t('shell.brand')}</span></Link><div style={{ display: 'flex', gap: 6 }}><button className="icon-button" onClick={() => setCollapsed(c => !c)} aria-label={t('aria.toggleSidebar')}><PanelLeft size={18} /></button><button className="icon-button sidebar-close" onClick={() => setMobileOpen(false)} aria-label={t('aria.closeNav')}><X size={18} /></button></div></div><nav className="main-nav">{nav.map(([key, to, Icon]) => <Link key={to} className={`nav-item ${location.pathname === to ? 'active' : ''}`} to={to} onClick={() => setMobileOpen(false)} title={collapsed ? t(key) : undefined}><Icon size={17} /><span className="nav-label-text">{t(key)}</span>{location.pathname === to && <i />}</Link>)}</nav></aside>{mobileOpen && <button className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-label={t('aria.closeNav')} />}<main className="main-content"><header className="topbar"><button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label={t('aria.openNav')}><Menu size={20} /></button><div className="breadcrumb"><span>{role === 'student' ? t('shell.studentWorld') : t('shell.teacherRoom')}</span><ChevronRight size={14} /><b>{crumb}</b></div><div className="topbar-actions"><LanguageToggle /><div className="profile-mini"><Link to="/profile" className="profile-mini-main" aria-label={t('aria.openProfile')}><div className="avatar"><Avatar user={user} /></div><div className="profile-mini-copy"><b>{user.fullName}</b><span>{role === 'student' ? t('shell.studentRole') : t('shell.teacherRole')} · {t('shell.profile')}</span></div></Link><button className="logout-button" onClick={logout} aria-label={t('aria.logout')}><LogOut size={14} /></button></div></div></header><div key={location.pathname} className="page-content page-transition">{children || <Outlet />}</div></main></div>
}
