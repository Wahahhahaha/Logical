export function WelcomeIllustration() {
  return <svg className="illustration-svg" viewBox="0 0 140 100" role="img" aria-label="Welcome illustration"><path d="M22 65c16-24 33-31 49-23 10 5 15 15 17 25" fill="none" stroke="#6e85e5" strokeWidth="6" strokeLinecap="round"/><path d="M82 32c8-9 22-8 28 1" fill="none" stroke="#9eaff4" strokeWidth="5" strokeLinecap="round"/><circle cx="34" cy="31" r="5" fill="#f4b865"/><circle cx="114" cy="57" r="4" fill="#a982e8"/><path d="M53 75c10 8 25 9 35 0" fill="none" stroke="#f0a45b" strokeWidth="5" strokeLinecap="round"/></svg>
}

export function EggIllustration({ className = '' }) {
  return <svg className={`illustration-svg ${className}`} viewBox="0 0 120 140" role="img" aria-label="Pet egg"><path d="M60 12C32 12 17 51 17 79c0 30 18 49 43 49s43-19 43-49C103 51 88 12 60 12Z" fill="#fff4d8" stroke="#dba85d" strokeWidth="4"/><path d="M35 76c11-8 17 8 26 0s15-8 24 0" fill="none" stroke="#efb96d" strokeWidth="5" strokeLinecap="round"/><path d="M48 39c4-7 13-7 17-1M60 89c5 4 10 4 15 0" fill="none" stroke="#f4c985" strokeWidth="4" strokeLinecap="round"/></svg>
}

export function PetEggIllustration({ type = 'cat', className = '' }) {
  const colors = { cat: ['#f5bd73', '#d98b43'], dog: ['#dca978', '#a87549'], fox: ['#f18d5a', '#c95d3e'] }[type] || ['#f5bd73', '#d98b43']
  return <svg className={`illustration-svg ${className}`} viewBox="0 0 120 140" role="img" aria-label={`${type} pet egg`}><path d="M60 12C32 12 17 51 17 79c0 30 18 49 43 49s43-19 43-49C103 51 88 12 60 12Z" fill="#fff4d8" stroke={colors[1]} strokeWidth="4"/><path d="M35 76c11-8 17 8 26 0s15-8 24 0" fill="none" stroke={colors[0]} strokeWidth="7" strokeLinecap="round"/><g className="pet-eyes"><circle cx="47" cy="54" r="4" fill={colors[1]}/></g><g className="pet-eyes"><circle cx="73" cy="54" r="4" fill={colors[1]}/></g><path d="M48 97c8-5 16-5 24 0" fill="none" stroke={colors[0]} strokeWidth="4" strokeLinecap="round"/></svg>
}

const face = '#fff6e8'

function CatCharacterIllustration({ className = '' }) {
  return <svg className={`illustration-svg ${className}`} viewBox="0 0 240 240" role="img" aria-label="Cat pet character">
    <path d="M160 174c28 10 43-7 42-28-1-13 8-18 14-10 9 12 4 34-9 46-14 13-31 13-48 5Z" fill="#e9a366" stroke="#bd8056" strokeWidth="2.2"/><path d="M196 145c10-10 17-4 17 4 0 8-4 15-10 19" fill="none" stroke="#fff0da" strokeWidth="7" strokeLinecap="round"/>
    <path d="M77 144c-10 17-10 43-1 57 7 10 20 7 30-4l13-14 12 14c10 11 24 14 31 4 9-14 8-40-2-57Z" fill="#e9a366" stroke="#bd8056" strokeWidth="2.2"/><path d="M94 156c-4 13-3 26 2 37m48-37c4 13 3 26-2 37" fill="none" stroke="#f6d9b5" strokeWidth="2.2" strokeLinecap="round"/><path d="M81 183c7 2 14 0 20-6l10 12v12H84c-5-5-6-11-3-18Zm77 0c-7 2-14 0-20-6l-10 12v12h27c5-5 6-11 3-18Z" fill="#a86e4e"/>
    <path d="M71 69c-4-17-3-31 5-44l33 30c9-3 20-3 29 0l33-30c8 13 9 27 5 44" fill="#e9a366" stroke="#bd8056" strokeWidth="2.2" strokeLinejoin="round"/><path d="m83 48 22 18-26-8m78-10-22 18 26-8" fill="#e99891"/>
    <path d="M67 101c0-37 21-61 52-61s53 24 53 61c0 37-21 57-53 57s-52-20-52-57Z" fill="#e9a366" stroke="#bd8056" strokeWidth="2.2"/><path d="M76 117c7 22 22 33 43 33s36-11 43-33c-12-9-26-13-43-13s-31 4-43 13Z" fill={face}/><g className="pet-eyes"><ellipse cx="106" cy="99" rx="12" ry="15" fill="#fff"/><ellipse cx="110" cy="100" rx="5" ry="9" fill="#517f79"/><circle cx="112" cy="95" r="3" fill="#fff"/></g><g className="pet-eyes"><ellipse cx="135" cy="99" rx="12" ry="15" fill="#fff"/><ellipse cx="139" cy="100" rx="5" ry="9" fill="#517f79"/><circle cx="141" cy="95" r="3" fill="#fff"/></g><path d="m116 124 5-4 5 4-5 4Z" fill="#bd7779"/><path d="M121 128v5m0 0c-4 5-9 5-12 1m12-1c4 5 9 5 12 1" fill="none" stroke="#946c5d" strokeWidth="2" strokeLinecap="round"/><circle cx="91" cy="119" r="6" fill="#edaaa0" opacity=".65"/><circle cx="151" cy="119" r="6" fill="#edaaa0" opacity=".65"/><path d="M76 77c7-15 20-25 36-29" fill="none" stroke="#f9d6a7" strokeWidth="3" strokeLinecap="round"/>
  </svg>
}

function DogCharacterIllustration({ className = '' }) {
  return <svg className={`illustration-svg ${className}`} viewBox="0 0 240 240" role="img" aria-label="Dog pet character">
    <path d="M158 176c27-4 35-20 46-15 8 4 5 13-7 20-12 7-25 8-40 4Z" fill="#a87654" stroke="#8c654e" strokeWidth="2"/><path d="M79 143c-10 18-10 43-1 58 7 10 21 7 31-4l11-13 12 13c10 11 24 14 31 4 9-15 8-40-2-58Z" fill="#d6ad78" stroke="#b9845f" strokeWidth="2.2"/><path d="M96 159c-4 12-3 25 2 35m46-35c4 12 3 25-2 35" fill="none" stroke="#f5dfc0" strokeWidth="2.2" strokeLinecap="round"/><path d="M83 184c8 2 15 0 21-6l10 11v12H87c-5-5-7-11-4-17Zm73 0c-8 2-15 0-21-6l-10 11v12h27c5-5 7-11 4-17Z" fill="#815842"/>
    <path d="M75 67C57 52 42 60 45 83c2 21 16 38 34 34l9-29Zm91 0c18-15 33-7 30 16-2 21-16 38-34 34l-9-29Z" fill="#ad7855" stroke="#8c654e" strokeWidth="2.2"/><path d="M56 82c6-10 13-14 21-11m107 11c-6-10-13-14-21-11" fill="none" stroke="#c18d67" strokeWidth="3" strokeLinecap="round"/>
    <path d="M66 101c0-36 22-60 54-60s54 24 54 60c0 37-22 56-54 56s-54-19-54-56Z" fill="#d6ad78" stroke="#b9845f" strokeWidth="2.2"/><path d="M77 118c6 22 21 33 43 33s37-11 43-33c-10-15-23-21-43-21s-33 6-43 21Z" fill={face}/><g className="pet-eyes"><ellipse cx="103" cy="97" rx="12" ry="15" fill="#fff"/><ellipse cx="107" cy="98" rx="5" ry="9" fill="#554940"/><circle cx="109" cy="93" r="3" fill="#fff"/></g><g className="pet-eyes"><ellipse cx="137" cy="97" rx="12" ry="15" fill="#fff"/><ellipse cx="141" cy="98" rx="5" ry="9" fill="#554940"/><circle cx="143" cy="93" r="3" fill="#fff"/></g><ellipse cx="120" cy="121" rx="8" ry="6" fill="#5d493f"/><path d="M120 126v5m0 0c-4 5-9 5-12 1m12-1c4 5 9 5 12 1" fill="none" stroke="#8e6857" strokeWidth="2" strokeLinecap="round"/><path d="M74 79c8-17 23-28 40-31" fill="none" stroke="#f8dfb7" strokeWidth="3" strokeLinecap="round"/><path d="M165 65c-8 5-14 12-17 22" fill="none" stroke="#d9a978" strokeWidth="4" strokeLinecap="round"/>
  </svg>
}

function FoxCharacterIllustration({ className = '' }) {
  return <svg className={`illustration-svg ${className}`} viewBox="0 0 260 260" role="img" aria-label="Fox pet character">
    {/* Large brush-shaped tail sits behind the compact seated body. */}
    <path d="M158 182c26 4 48-11 56-39 5-20 12-36 24-38 12-1 18 13 16 31-4 38-29 67-63 74-18 4-33-3-45-17Z" fill="#ed5815"/>
    <path d="M237 108c9 4 10 18 5 32-5 19-17 37-32 49 3-11 2-20-2-28l10-8-4-8 11-7-3-9 10-5-3-8Z" fill="#ffe0bb"/>
    <path d="M101 140c-20 9-30 33-30 62 0 26 10 42 28 42 14 0 22-10 25-27h12c3 17 11 27 25 27 18 0 28-16 28-42 0-29-10-53-30-62Z" fill="#f36a16"/>
    <path d="M109 149c-11 18-12 42-8 63 8-3 18-2 29 3 11-5 21-6 29-3 4-21 3-45-8-63-12 5-30 5-42 0Z" fill="#ffe0bb"/>
    <path d="M81 211c9 4 18 4 28 0 5 3 9 7 11 12l-1 11c-2 7-8 11-16 11-13 0-21-10-22-23 0-4-1-8 0-11Zm98 0c-9 4-18 4-28 0-5 3-9 7-11 12l1 11c2 7 8 11 16 11 13 0 21-10 22-23 0-4 1-8 0-11Z" fill="#63210f"/>
    <path d="M94 88 75 28c-2-7 3-10 8-6l47 36 47-36c5-4 10-1 8 6l-19 60-36-10c-9-3-19-3-28 0Z" fill="#f36a16"/>
    <path d="m81 31 1-9c0-4 3-5 6-2l32 26c-14-8-25-12-39-15Zm98 0-1-9c0-4-3-5-6-2l-32 26c14-8 25-12 39-15Z" fill="#63210f"/>
    <path d="m85 39 31 20-24-5Zm90 0-31 20 24-5Z" fill="#ffd0a0"/>
    {/* Broad, angular cheeks and tapered muzzle define the fox silhouette. */}
    <path d="M65 91c11-23 31-36 65-36s54 13 65 36l27 23-37 15c-17 7-36 12-55 12s-38-5-55-12l-37-15Z" fill="#f36a16"/>
    <path d="M65 91c12 7 26 9 40 4 8-3 16-2 25 4v42c-19 0-38-5-55-12l-37-15Zm130 0c-12 7-26 9-40 4-8-3-16-2-25 4v42c19 0 38-5 55-12l37-15Z" fill="#ffe0bb"/>
    <path d="M130 59c18 0 35 5 48 15-15 2-25 8-35 18-4 4-8 7-13 8-5-1-9-4-13-8-10-10-20-16-35-18 13-10 30-15 48-15Z" fill="#ef5810"/>
    <g className="pet-eyes"><circle cx="100" cy="105" r="5.5" fill="#512018"/></g><g className="pet-eyes"><circle cx="160" cy="105" r="5.5" fill="#512018"/></g>
    <path d="m122 124 8-5 8 5-8 7Z" fill="#542018"/>
    <path d="M119 130c3 4 7 6 11 6s8-2 11-6" fill="none" stroke="#a34c23" strokeWidth="2" strokeLinecap="round"/>
  </svg>
}

function PetCharacter({ type, className }) {
  if (type === 'dog') return <DogCharacterIllustration className={className} />
  if (type === 'fox') return <FoxCharacterIllustration className={className} />
  return <CatCharacterIllustration className={className} />
}

export function PetCharacterIllustration({ type = 'cat', className = '' }) {
  return <PetCharacter type={type} className={className} />
}

export function PetIllustration({ type = 'cat', className = '' }) {
  return <PetCharacter type={type} className={className} />
}
