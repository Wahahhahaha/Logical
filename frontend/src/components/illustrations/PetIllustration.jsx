export function WelcomeIllustration() {
  return <svg className="illustration-svg" viewBox="0 0 140 100" role="img" aria-label="Welcome illustration"><path d="M22 65c16-24 33-31 49-23 10 5 15 15 17 25" fill="none" stroke="#6e85e5" strokeWidth="6" strokeLinecap="round"/><path d="M82 32c8-9 22-8 28 1" fill="none" stroke="#9eaff4" strokeWidth="5" strokeLinecap="round"/><circle cx="34" cy="31" r="5" fill="#f4b865"/><circle cx="114" cy="57" r="4" fill="#a982e8"/><path d="M53 75c10 8 25 9 35 0" fill="none" stroke="#f0a45b" strokeWidth="5" strokeLinecap="round"/></svg>
}

export function EggIllustration({ className = '' }) {
  return <svg className={`illustration-svg ${className}`} viewBox="0 0 120 140" role="img" aria-label="Pet egg"><path d="M60 12C32 12 17 51 17 79c0 30 18 49 43 49s43-19 43-49C103 51 88 12 60 12Z" fill="#fff4d8" stroke="#dba85d" strokeWidth="4"/><path d="M35 76c11-8 17 8 26 0s15-8 24 0" fill="none" stroke="#efb96d" strokeWidth="5" strokeLinecap="round"/><path d="M48 39c4-7 13-7 17-1M60 89c5 4 10 4 15 0" fill="none" stroke="#f4c985" strokeWidth="4" strokeLinecap="round"/></svg>
}

export function PetIllustration({ type = 'cat', className = '' }) {
  const colors = { cat: ['#f5bd73', '#d98b43'], dog: ['#dca978', '#a87549'], fox: ['#f18d5a', '#c95d3e'] }[type] || ['#f5bd73', '#d98b43']
  return <svg className={`illustration-svg ${className}`} viewBox="0 0 140 140" role="img" aria-label={`${type} pet`}><circle cx="70" cy="74" r="48" fill="#fff4df" opacity=".8"/><path d="M37 54 31 22l26 17M103 54l6-32-26 17" fill={colors[0]} stroke={colors[1]} strokeWidth="5" strokeLinejoin="round"/><circle cx="70" cy="73" r="39" fill={colors[0]} stroke={colors[1]} strokeWidth="5"/><circle cx="56" cy="70" r="4" fill="#4c5265"/><circle cx="84" cy="70" r="4" fill="#4c5265"/><path d="M64 84c4 4 8 4 12 0M70 77v6" fill="none" stroke="#4c5265" strokeWidth="3" strokeLinecap="round"/><path d="M40 78H25M100 78h15" stroke={colors[1]} strokeWidth="3" strokeLinecap="round"/></svg>
}
