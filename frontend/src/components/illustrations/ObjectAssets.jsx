export function AppleIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="apple"><path d="M12 7.2c-1.2-2.5-3.3-2.7-4.4-1.6-1.9 1.9-1.1 5.2.6 7.8.9 1.5 2.3 2.4 3.8 2.4s2.9-.9 3.8-2.4c1.7-2.6 2.5-5.9.6-7.8-1.1-1.1-3.2-.9-4.4 1.6Z" fill="#e5484d" /><path d="M12 7.2c0-1.7.8-2.7 2-3.2" fill="none" stroke="#7a5230" strokeWidth="1.3" strokeLinecap="round" /><path d="M12 7.2c1.8-.7 2.7.2 3 1.4" fill="none" stroke="#3f7d3a" strokeWidth="1.1" strokeLinecap="round" /></svg>
}

export function BallIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="ball"><circle cx="12" cy="12" r="9" fill="#ef476f" /><path d="M4.2 9.3A8.9 8.9 0 0 0 19.8 9.3C18 7 15.2 5.6 12 5.6S6 7 4.2 9.3Z" fill="#fff" opacity="0.92" /><circle cx="8.6" cy="7" r="2.1" fill="#fff" opacity="0.5" /></svg>
}

export function BookIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="book"><rect x="4" y="3.5" width="16" height="17" rx="2.2" fill="#e76f51" /><rect x="10.6" y="3.5" width="2.8" height="17" fill="#c14e33" /><rect x="5.5" y="10" width="4.4" height="1.1" rx="0.55" fill="#f4e285" /><rect x="5.5" y="12.4" width="5.6" height="1.1" rx="0.55" fill="#f4e285" /><rect x="14.2" y="10" width="4.3" height="1.1" rx="0.55" fill="#f4e285" /><rect x="14.2" y="12.4" width="3.2" height="1.1" rx="0.55" fill="#f4e285" /></svg>
}

export function BananaIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="banana"><path d="M16 3.2C9.5 2.6 5.2 5.5 4 10.8c-.6 2.7-.4 5.2.6 7.4 1.9 1.7 4.8 1.7 6.4-.1 1.2-1.3 2-3.1 2.4-5.3 1.8-.1 3.6.5 5 1.8 1.9-2.6 1.6-8.3-2.4-11.4Z" fill="#ffd166" stroke="#c98a1b" strokeWidth="1" /><path d="M4.6 14.8C6.2 14 7.6 12.8 8.8 11.2" fill="none" stroke="#8a6d3b" strokeWidth="1" strokeLinecap="round" /></svg>
}

export function PencilIcon({ size = 22 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" role="img" aria-label="pencil"><path d="M11 2 12 0l1 2a1 1 0 0 0-1-.5A1 1 0 0 0 11 2Z" fill="#3d3029" /><path d="M9.5 3.5 12 0l2.5 3.5a1 1 0 0 0-.7-.5h-3.6a1 1 0 0 0-.7.5Z" fill="#8a5a3b" /><path d="M9.5 3.5h5L15 5H9Z" fill="#e2a63c" /><rect x="8.5" y="5" width="7" height="13" rx="1.2" fill="#ffd166" /><rect x="9.2" y="18.5" width="5.6" height="1.6" rx="0.8" fill="#d3d3d3" /><rect x="10" y="20" width="4" height="4" rx="1" fill="#f28482" /></svg>
}

const ICONS = { apple: AppleIcon, ball: BallIcon, book: BookIcon, banana: BananaIcon, pencil: PencilIcon }

export function ObjectIcon({ kind, size = 22 }) {
  const Icon = ICONS[kind] || AppleIcon
  return <span className="fruit-icon"><Icon size={size} /></span>
}

export function ObjectRow({ count, kind, faded = false }) {
  const columns = count >= 5 ? 5 : Math.max(1, count)
  return <div className={`apple-row${faded ? ' faded' : ''}`} style={{ '--object-columns': columns }}>{Array.from({ length: count }, (_, key) => <ObjectIcon key={key} kind={kind} />)}</div>
}

export function ObjectPhrase({ a, op, b, answer, showAnswer, kind }) {
  return <div className="fruit-phrase"><div className="fruit-group fruit-group-a"><ObjectRow count={a} kind={kind} /></div><span className="fruit-operator fruit-operator-main">{op}</span><div className="fruit-group fruit-group-b"><ObjectRow count={b} kind={kind} faded={op === '-'} /></div><span className="fruit-operator fruit-operator-equals">=</span><div className="fruit-group fruit-group-answer">{showAnswer ? <ObjectRow count={answer} kind={kind} /> : <span className="fruit-blank">?</span>}</div></div>
}
