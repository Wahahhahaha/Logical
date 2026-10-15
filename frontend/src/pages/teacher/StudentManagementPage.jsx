import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Eye, KeyRound, Pencil, Plus, Trash2, X } from 'lucide-react'
import { apiFetch } from '../../lib/api.js'
import { useI18n } from '../../i18n.jsx'
import Avatar from '../../components/Avatar.jsx'
import { useToast } from '../../toast.jsx'
import { TableSkeleton } from '../../components/Skeleton.jsx'

const PAGE_SIZE = 5
const emptyForm = { fullName: '', nis: '', grade: '', className: '' }

export default function StudentManagementPage() {
  const { t } = useI18n()
  const toast = useToast(); const closeTimer = useRef(null); const resetTimer = useRef(null); const deleteTimer = useRef(null)
  const [students, setStudents] = useState([]); const [loading, setLoading] = useState(true); const [editing, setEditing] = useState(null); const [modalOpen, setModalOpen] = useState(false); const [modalClosing, setModalClosing] = useState(false);   const [resetOpen, setResetOpen] = useState(false); const [resetClosing, setResetClosing] = useState(false); const [resetStudent, setResetStudent] = useState(null); const [deleteOpen, setDeleteOpen] = useState(false); const [deleteClosing, setDeleteClosing] = useState(false); const [deleteStudent, setDeleteStudent] = useState(null); const [page, setPage] = useState(1); const [form, setForm] = useState(emptyForm)
  const load = async () => { setLoading(true); try { const studentResult = await apiFetch('/api/students'); setStudents(studentResult.students) } catch (requestError) { toast.error(requestError) } finally { setLoading(false) } }
  useEffect(() => { let active = true; const fetchData = async () => { try { const studentResult = await apiFetch('/api/students'); if (!active) return; setStudents(studentResult.students) } catch (requestError) { if (active) toast.error(requestError) } finally { if (active) setLoading(false) } }; void fetchData(); return () => { active = false } }, [toast])

  const cancelCloseTimer = () => { if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null } }
  const openCreate = () => { cancelCloseTimer(); setModalClosing(false); setEditing(null); setForm({ ...emptyForm }); setModalOpen(true) }
  const closeModal = () => { if (!modalOpen || modalClosing) return; setModalClosing(true); cancelReset(); cancelCloseTimer(); closeTimer.current = window.setTimeout(() => { setModalOpen(false); setModalClosing(false); setEditing(null); setForm(emptyForm); closeTimer.current = null }, 220) }
  const editStudent = studentItem => { cancelCloseTimer(); setModalClosing(false); setForm({ fullName: studentItem.fullName, nis: studentItem.profile?.nis || studentItem.username, grade: studentItem.profile?.grade || '', className: studentItem.profile?.className || '' }); setEditing(studentItem); setModalOpen(true) }
  const submit = async event => { event.preventDefault(); try { const path = editing ? `/api/students/${editing.id}` : '/api/students'; const method = editing ? 'PUT' : 'POST'; await apiFetch(path, { method, body: JSON.stringify(form) }); closeModal(); await load(); toast.success(editing ? t('teacher.studentUpdated') : t('teacher.studentCreated')) } catch (requestError) { toast.error(requestError) } }
  const cancelResetTimer = () => { if (resetTimer.current) { window.clearTimeout(resetTimer.current); resetTimer.current = null } }
  const cancelReset = () => { cancelResetTimer(); setResetOpen(false); setResetClosing(false); setResetStudent(null) }
  const openReset = studentItem => { cancelResetTimer(); setResetClosing(false); setResetStudent(studentItem); setResetOpen(true) }
  const closeReset = () => { if (!resetOpen || resetClosing) return; setResetClosing(true); cancelResetTimer(); resetTimer.current = window.setTimeout(() => { setResetOpen(false); setResetClosing(false); setResetStudent(null); resetTimer.current = null }, 220) }
  const confirmReset = async () => { if (!resetStudent) return; try { await apiFetch(`/api/students/${resetStudent.id}/reset-password`, { method: 'POST' }); closeReset(); toast.success(t('teacher.resetTo12345')) } catch (requestError) { toast.error(requestError) } }
  const cancelDeleteTimer = () => { if (deleteTimer.current) { window.clearTimeout(deleteTimer.current); deleteTimer.current = null } }
  const openDelete = studentItem => { cancelDeleteTimer(); setDeleteClosing(false); setDeleteStudent(studentItem); setDeleteOpen(true) }
  const closeDelete = () => { if (!deleteOpen || deleteClosing) return; setDeleteClosing(true); cancelDeleteTimer(); deleteTimer.current = window.setTimeout(() => { setDeleteOpen(false); setDeleteClosing(false); setDeleteStudent(null); deleteTimer.current = null }, 220) }
  const confirmDelete = async () => { if (!deleteStudent) return; try { await apiFetch(`/api/students/${deleteStudent.id}`, { method: 'DELETE' }); closeDelete(); await load(); toast.success(t('teacher.studentDeactivated')) } catch (requestError) { toast.error(requestError) } }
  const [search, setSearch] = useState('')
  const filtered = students.filter(s => {
    if (search.trim() === '') return true
    const query = search.toLowerCase()
    return s.fullName?.toLowerCase().includes(query) || (s.profile?.nis || s.username)?.toLowerCase().includes(query)
  })
  const visibleStudents = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  return <div className="page-stack">
    <section className="welcome-row">
      <div><p className="eyebrow">{t('teacher.workspace')}</p><h1>{t('teacher.studentMgmt')}</h1><p className="page-subtitle">{t('teacher.mgmtSubtitle')}</p></div>
      <button className="primary-button" onClick={openCreate}><Plus size={16} /> {t('teacher.newStudent')}</button>
    </section>
    <div className="card table-card">
      <div className="student-filters">
        <input className="search-input" placeholder={t('teacher.searchPlaceholder')} value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} />
      </div>
      {loading ? <TableSkeleton count={5} /> : filtered.length === 0 ? <div className="empty-state">{t('teacher.noStudentsCreate')}</div> : <>
        <table className="student-table">
          <thead><tr><th>{t('teacher.thStudent')}</th><th>{t('teacher.thNis')}</th><th>{t('teacher.thClass')}</th><th className="actions-cell">{t('teacher.thActions')}</th></tr></thead>
          <tbody>{visibleStudents.map(studentItem => <tr key={studentItem.id}>
            <td><div className="table-student"><div className="student-avatar blue"><Avatar user={studentItem} /></div><b>{studentItem.fullName}</b></div></td>
            <td>{studentItem.profile?.nis || studentItem.username}</td>
            <td>{studentItem.profile?.grade ? `${studentItem.profile.grade}${studentItem.profile?.className ? ` ${studentItem.profile.className}` : ''}` : (studentItem.profile?.className || t('teacher.noClass'))}</td>
            <td className="actions-cell">
              <Link className="icon-button" to={`/teacher/students/${studentItem.id}`} aria-label={t('teacher.viewDetailsAria', { name: studentItem.fullName })} title={t('teacher.viewDetails')}><Eye size={15} /></Link>
              <button className="icon-button" onClick={() => editStudent(studentItem)} aria-label={t('teacher.editAria', { name: studentItem.fullName })} title={t('teacher.edit')}><Pencil size={15} /></button>
              <button className="icon-button" onClick={() => openReset(studentItem)} aria-label={t('teacher.resetAria', { name: studentItem.fullName })} title={t('teacher.passwordReset')}><KeyRound size={15} /></button>
              <button className="icon-button danger-button" onClick={() => openDelete(studentItem)} aria-label={t('teacher.deleteAria', { name: studentItem.fullName })} title={t('teacher.deleteAria', { name: studentItem.fullName })}><Trash2 size={15} /></button>
            </td>
          </tr>)}</tbody>
        </table>
        <div className="pagination">
          <button className="secondary-button" disabled={safePage === 1} onClick={() => setPage(value => value - 1)}>{t('teacher.previous')}</button>
          <span>{t('teacher.page', { a: safePage, b: pageCount })}</span>
          <button className="secondary-button" disabled={safePage === pageCount} onClick={() => setPage(value => value + 1)}>{t('common.next')}</button>
        </div>
      </>}
    </div>
    {modalOpen && createPortal(<div className={`modal-backdrop${modalClosing ? ' is-closing' : ''}`} role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) closeModal() }}><div className={`card modal-card student-modal${modalClosing ? ' is-closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby="student-modal-title"><div className="section-title-row"><div><label>{editing ? t('teacher.editAccount') : t('teacher.createAccount')}</label><h2 id="student-modal-title">{editing ? t('teacher.updateStudent') : t('teacher.newStudent')}</h2></div><button className="icon-button" onClick={closeModal} aria-label={t('teacher.closeForm')}><X size={17} /></button></div><form className="profile-form" onSubmit={submit}><label>{t('teacher.studentName')}<input value={form.fullName} onChange={event => setForm({ ...form, fullName: event.target.value })} required /></label><label>{t('teacher.studentNis')}<input value={form.nis} onChange={event => setForm({ ...form, nis: event.target.value })} required disabled={Boolean(editing)} /></label><div className="form-two"><label>{t('profile.grade')}<select value={form.grade} onChange={event => setForm({ ...form, grade: event.target.value })} required><option value="">{t('teacher.selectGrade')}</option>{[1, 2, 3, 4, 5, 6].map(number => <option value={number} key={number}>{t('teacher.gradeN', { n: number })}</option>)}</select></label><label>{t('teacher.classLabel')}<input value={form.className} onChange={event => setForm({ ...form, className: event.target.value })} placeholder={t('teacher.classPlaceholder')} required /></label></div><div className="form-actions"><button className="primary-button" type="submit">{editing ? t('teacher.saveChanges') : t('teacher.createStudent')}</button></div>{!editing && <p className="muted-text">{t('teacher.initialPasswordNote')}</p>}</form></div></div>, document.body)}
    {resetOpen && createPortal(<div className={`modal-backdrop modal-backdrop-confirm${resetClosing ? ' is-closing' : ''}`} role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) closeReset() }}><div className={`card modal-card modal-card-confirm${resetClosing ? ' is-closing' : ''}`} role="alertdialog" aria-modal="true" aria-labelledby="reset-modal-title"><div className="section-title-row"><div><label>{t('teacher.passwordReset')}</label><h2 id="reset-modal-title">{t('teacher.resetPasswordQ')}</h2></div><button className="icon-button" onClick={closeReset} aria-label={t('teacher.cancelReset')}><X size={17} /></button></div><p className="muted-text">{t('teacher.resetBody', { name: resetStudent?.fullName })}</p><div className="form-actions"><button className="primary-button" type="button" onClick={confirmReset}>{t('teacher.passwordReset')}</button><button className="secondary-button" type="button" onClick={closeReset}>{t('common.cancel')}</button></div></div></div>, document.body)}
    {deleteOpen && createPortal(<div className={`modal-backdrop modal-backdrop-confirm${deleteClosing ? ' is-closing' : ''}`} role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) closeDelete() }}><div className={`card modal-card modal-card-confirm${deleteClosing ? ' is-closing' : ''}`} role="alertdialog" aria-modal="true" aria-labelledby="delete-modal-title"><div className="section-title-row"><div><label>{t('teacher.deleteTitle')}</label><h2 id="delete-modal-title">{t('teacher.deleteQ')}</h2></div><button className="icon-button" onClick={closeDelete} aria-label={t('teacher.cancelDelete')}><X size={17} /></button></div><p className="muted-text">{t('teacher.deleteBody', { name: deleteStudent?.fullName })}</p><div className="form-actions"><button className="primary-button danger-button" type="button" onClick={confirmDelete}>{t('teacher.deleteConfirm')}</button><button className="secondary-button" type="button" onClick={closeDelete}>{t('common.cancel')}</button></div></div></div>, document.body)}
  </div>
}
