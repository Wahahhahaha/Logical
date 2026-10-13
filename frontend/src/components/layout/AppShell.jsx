import { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { BarChart3, BookOpen, ChevronRight, Home, LayoutDashboard, LogOut, Menu, PawPrint, Sparkles, Target, Users, X } from 'lucide-react'
import { useAuth } from '../../auth.jsx'
import Avatar from '../Avatar.jsx'
import LanguageToggle from '../LanguageToggle.jsx'

const studentNav = [['Home', '/dashboard', Home], ['Learn', '/student/learn', BookOpen], ['Quests', '/student/quests', Target], ['Pet', '/student/pet', PawPrint], ['Progress', '/student/progress', BarChart3]]
const teacherNav = [['Dashboard', '/dashboard', LayoutDashboard], ['Students', '/teacher/students', Users], ['Learning progress', '/teacher/progress', BarChart3]]

export default function AppShell({ children }) {
  const { user, logout } = useAuth(); const role = user.role; const [mobileOpen, setMobileOpen] = useState(false); const location = useLocation(); const nav = role === 'student' ? studentNav : teacherNav
  return <div className="app-shell"><aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}><div className="brand-row"><Link className="brand" to="/dashboard" onClick={() => setMobileOpen(false)}><span className="brand-mark"><Sparkles size={17} /></span>Logical</Link><button className="icon-button sidebar-close" onClick={() => setMobileOpen(false)} aria-label="Close navigation"><X size={18} /></button></div><nav className="main-nav">{nav.map(([label, to, Icon]) => <Link key={to} className={`nav-item ${location.pathname === to ? 'active' : ''}`} to={to} onClick={() => setMobileOpen(false)}><Icon size={17} /><span>{label}</span>{location.pathname === to && <i />}</Link>)}</nav></aside>{mobileOpen && <button className="mobile-overlay" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}<main className="main-content"><header className="topbar"><button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><div className="breadcrumb"><span>{role} workspace</span><ChevronRight size={14} /><b>{location.pathname === '/profile' ? 'Profile' : location.pathname === '/dashboard' ? 'Dashboard' : role === 'student' ? 'Student' : 'Teacher'}</b></div><div className="topbar-actions"><LanguageToggle /><div className="profile-mini"><Link to="/profile" className="profile-mini-main" aria-label="Open profile"><div className="avatar"><Avatar user={user} /></div><div className="profile-mini-copy"><b>{user.fullName}</b><span>{role} account</span></div></Link><button className="logout-button" onClick={logout} aria-label="Logout"><LogOut size={14} /></button></div></div></header><div key={location.pathname} className="page-content page-transition">{children || <Outlet />}</div></main></div>
}
