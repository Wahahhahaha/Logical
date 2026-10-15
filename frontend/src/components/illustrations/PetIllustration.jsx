export function WelcomeIllustration() {
  return <svg className="illustration-svg" viewBox="0 0 140 100" role="img" aria-label="Welcome illustration"><path d="M22 65c16-24 33-31 49-23 10 5 15 15 17 25" fill="none" stroke="#6e85e5" strokeWidth="6" strokeLinecap="round"/><path d="M82 32c8-9 22-8 28 1" fill="none" stroke="#9eaff4" strokeWidth="5" strokeLinecap="round"/><circle cx="34" cy="31" r="5" fill="#f4b865"/><circle cx="114" cy="57" r="4" fill="#a982e8"/><path d="M53 75c10 8 25 9 35 0" fill="none" stroke="#f0a45b" strokeWidth="5" strokeLinecap="round"/></svg>
}

const eggAccents = { cat: '#e89a54', dog: '#bb8156', fox: '#e56b3d', bird: '#65afd0' }

function PixelEggSvg({ type = 'cat', className = '', parts = 'whole', decorative = false }) {
  const accent = eggAccents[type] || eggAccents.cat
  const outline = '#9c624c'
  const shell = '#fff0c9'
  const shadow = '#f2c887'
  const highlight = '#fff9e9'
  const top = <g className="egg-top-piece">
    <path d="M13 2h6v2h4v3h3v8h2v3H4v-3h2V7h3V4h4z" fill={outline} />
    <path d="M13 4h5v2h4v3h2v7H8v-7h2V6h3z" fill={shell} />
    <path d="M12 6h3v2h-3zM10 9h2v5h-2z" fill={highlight} />
    <path d="M8 16h16v2H8z" fill={accent} />
  </g>
  const bottom = <g className="egg-bottom-piece">
    <path d="M5 16h22v8h-2v5h-3v4H10v-4H7v-5H5z" fill={outline} />
    <path d="M7 18h18v6h-2v4h-3v3H12v-3H9v-4H7z" fill={shell} />
    <path d="M9 19h16v3H9z" fill={accent} />
    <path d="M11 24h3v3h-3zM20 27h3v2h-3z" fill={shadow} />
  </g>
  return <svg className={`illustration-svg pixel-egg ${className}`} viewBox="0 0 32 36" role={decorative ? undefined : 'img'} aria-label={decorative ? undefined : 'Pet egg'} aria-hidden={decorative ? 'true' : undefined} shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>{parts === 'bottom' ? bottom : parts === 'top' ? top : <>{bottom}{top}</>}</svg>
}

export function EggIllustration({ className = '', type = 'cat' }) {
  return <PixelEggSvg className={className} type={type} />
}

export function EggShellTop({ className = '', type = 'cat' }) {
  return <PixelEggSvg className={className} type={type} parts="top" decorative />
}

export function EggShellBottom({ className = '', type = 'cat' }) {
  return <PixelEggSvg className={className} type={type} parts="bottom" decorative />
}

export function PetEggIllustration({ type = 'cat', className = '' }) {
  const colors = { cat: ['#f5bd73', '#d98b43'], dog: ['#dca978', '#a87549'], fox: ['#f18d5a', '#c95d3e'] }[type] || ['#f5bd73', '#d98b43']
  return <svg className={`illustration-svg ${className}`} viewBox="0 0 120 140" role="img" aria-label={`${type} pet egg`}><path d="M60 12C32 12 17 51 17 79c0 30 18 49 43 49s43-19 43-49C103 51 88 12 60 12Z" fill="#fff4d8" stroke={colors[1]} strokeWidth="4"/><path d="M35 76c11-8 17 8 26 0s15-8 24 0" fill="none" stroke={colors[0]} strokeWidth="7" strokeLinecap="round"/><g className="pet-eyes"><circle cx="47" cy="54" r="4" fill={colors[1]}/></g><g className="pet-eyes"><circle cx="73" cy="54" r="4" fill={colors[1]}/></g><path d="M48 97c8-5 16-5 24 0" fill="none" stroke={colors[0]} strokeWidth="4" strokeLinecap="round"/></svg>
}

function CatCharacterIllustration({ className = '', emotion = 'idle', effect = '' }) {
  const expression = ['blink', 'happy', 'thinking', 'sad'].includes(emotion) ? `/cat-pixel-${emotion}.png` : '/cat-pixel-body.png'
  return <span className={`illustration-svg pet-cat emotion-${emotion} ${className}`} role="img" aria-label="Cat pixel art character" data-effect={effect}>
    <img className="cat-body-layer" src={expression} alt="" draggable="false" />
    <img className="cat-tail-layer" src="/cat-pixel-tail.png" alt="" draggable="false" />
  </span>
  /* Legacy vector pixel construction removed from the active renderer. */
  /*
  const tail = ['                          DD', '                         DGGD', '                         DGGGD', '                          DGGGD', '                           DGGD', '                            DD']
  const tailFill = ['                           G', '                           GG', '                            G', '                            G']
  const body = ['           DDDDDDDDDDD', '          DGGGGGGGGGGGD', '          DGGGGGGGGGGGD', '          DGGGGGGGGGGGD', '           DGGGGGGGGGD', '           DGGGGGGGGGD', '           DGGGGGGGGGD', '           DGGGGGGGGGD', '           DGGGGGGGGGD']
  const belly = ['             CCCCC', '            CCCCCCC', '            CCCCCCC', '            CCCCCCC', '             CCCCC', '              CCC']
  const paws = ['        DD   DD   DD   DD', '        DC   DC   DC   DC', '        DCC  DCC  DCC  DCC']
  const ears = ['        DD        DD', '       DGGD      DGGD', '      DGGGGD    DGGGGD', '      DGGGGD    DGGGGD', '       DGGGGDDGGGGGD']
  const earInner = ['        PP        PP', '       PPPP      PPPP', '       PPPP      PPPP', '        PPPP    PPPP']
  const head = ['        DDDDDDDDDDDD', '      DDGGGGGGGGGGGGDD', '     DGGGGGGGGGGGGGGGGD', '    DGGGGGGGGGGGGGGGGGGD', '   DGGGGGGGGGGGGGGGGGGGGD', '   DGGGGGGGGGGGGGGGGGGGGD', '    DGGGGGGGGGGGGGGGGGGD', '     DGGGGGGGGGGGGGGGGD', '      DGGGGGGGGGGGGGGD', '        DGGGGGGGGGGGD']
  const mask = ['      CCCC        CCCC', '     CCCCCC      CCCCCC', '      CCCCCCCCCCCCCCCC', '       CCCCCCCCCCCCCC', '        CCCCCCCCCCCC']
  const headPatches = ['          TTT', '         TTTT', '          TTT']
  const bodyPatches = ['                  TTT', '                 TTTT', '                  TTT']
  const whiskers = ['       C      C      C', '      C       C       C']
  const eyes = emotion === 'blink' || emotion === 'happy' || emotion === 'celebrating' || emotion === 'excited'
    ? ['          EE    EE']
    : ['         EEE  EEE', '         EEE  EEE', '          EE  EE']
  const mouths = emotion === 'happy' || emotion === 'celebrating' || emotion === 'excited'
    ? ['              E E', '               E']
    : ['               E']
  const emotes = {
    love: { rows: ['.P.P.', 'PPPPP', 'PPPPP', '.PPP.', '..P..'], palette: { P: palette.P }, x: 25, y: 2 },
    sparkle: { rows: ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '..Y..'], palette: { Y: '#ffd45b' }, x: 2, y: 6 },
    confetti: { rows: ['P...Y....C', '.Y....P...', '...C.....Y'], palette: { P: palette.P, Y: '#ffd45b', C: '#8ac7e7' }, x: 3, y: 1 },
  }
  const activeEmote = emotes[effect]
  return <svg className={`illustration-svg pet-cat emotion-${emotion} ${className}`} viewBox="0 0 32 32" role="img" aria-label="Cat pixel art character" shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
    <g className="cat-tail"><PixelLayer rows={tail} palette={{ D: palette.D, G: palette.G }} offsetY={17} /><PixelLayer rows={tailFill} palette={{ G: palette.G }} offsetY={18} /></g>
    <g className="cat-body"><PixelLayer rows={body} palette={{ D: palette.D, G: palette.G }} offsetY={18} centered /><PixelLayer rows={bodyPatches} palette={{ T: palette.T }} offsetY={19} centered /><PixelLayer rows={belly} palette={{ C: palette.C }} offsetY={20} centered /><PixelLayer rows={paws} palette={{ D: palette.D, C: palette.C }} offsetY={27} centered /></g>
    <g className="cat-ears"><PixelLayer rows={ears} palette={{ D: palette.D, G: palette.G }} offsetY={1} centered /><PixelLayer rows={earInner} palette={{ P: palette.P }} offsetY={2} centered /></g>
    <g className="cat-head"><PixelLayer rows={head} palette={{ D: palette.D, G: palette.G }} offsetY={7} centered /><PixelLayer rows={headPatches} palette={{ T: palette.T }} offsetY={8} centered /><PixelLayer rows={mask} palette={{ C: palette.C }} offsetY={11} centered /><g className="pet-eyes"><PixelLayer rows={eyes} palette={{ E: palette.E }} offsetY={12} centered /><PixelLayer rows={['          C     C']} palette={{ C: palette.C }} offsetY={12} centered /></g><PixelLayer rows={whiskers} palette={{ D: palette.D }} offsetY={15} centered /><PixelLayer rows={['               PP']} palette={{ P: palette.P }} offsetY={15} centered /><PixelLayer rows={mouths} palette={{ E: palette.E }} offsetY={16} centered /><PixelLayer rows={['      PP              PP']} palette={{ P: palette.P }} offsetY={15} centered /></g>
    {activeEmote && <g className="cat-emote"><PixelLayer rows={activeEmote.rows} palette={activeEmote.palette} offsetX={activeEmote.x} offsetY={activeEmote.y} /></g>}
  </svg> */
}

function DogCharacterIllustration({ className = '', emotion = 'idle' }) {
  const expressive = ['happy', 'celebrating', 'excited', 'confused', 'thinking'].includes(emotion)
  return <span className={`illustration-svg pet-dog pixel-pet-wrapper emotion-${emotion} ${className}`} role="img" aria-label="Dog pixel art character">
    <img className="pixel-pet-image" src="/dog-pixel.png" alt="" draggable="false" />
    {expressive && <svg className="pixel-pet-expression" viewBox="0 0 64 64" aria-hidden="true" shapeRendering="crispEdges">
      {(emotion === 'confused' || emotion === 'thinking') && <>
        <path d="M19 25h6M40 24h5" stroke="#493530" strokeWidth="2" />
        <path d="M27 38h3m4 0h3m-7 0 2-2m2 2-2-2" stroke="#493530" strokeWidth="1.5" />
      </>}
      {(emotion === 'happy' || emotion === 'celebrating' || emotion === 'excited') && <>
        <path d="M20 29h4m17 0h4" stroke="#fff1dc" strokeWidth="2" />
        <path d="M27 36c2 3 7 3 10 0" stroke="#493530" strokeWidth="2" />
      </>}
    </svg>}
  </span>
  /*
    <path d="M158 176c27-4 35-20 46-15 8 4 5 13-7 20-12 7-25 8-40 4Z" fill="#a87654" stroke="#8c654e" strokeWidth="2"/><path d="M79 143c-10 18-10 43-1 58 7 10 21 7 31-4l11-13 12 13c10 11 24 14 31 4 9-15 8-40-2-58Z" fill="#d6ad78" stroke="#b9845f" strokeWidth="2.2"/><path d="M96 159c-4 12-3 25 2 35m46-35c4 12 3 25-2 35" fill="none" stroke="#f5dfc0" strokeWidth="2.2" strokeLinecap="round"/><path d="M83 184c8 2 15 0 21-6l10 11v12H87c-5-5-7-11-4-17Zm73 0c-8 2-15 0-21-6l-10 11v12h27c5-5 7-11 4-17Z" fill="#815842"/>
    <path d="M75 67C57 52 42 60 45 83c2 21 16 38 34 34l9-29Zm91 0c18-15 33-7 30 16-2 21-16 38-34 34l-9-29Z" fill="#ad7855" stroke="#8c654e" strokeWidth="2.2"/><path d="M56 82c6-10 13-14 21-11m107 11c-6-10-13-14-21-11" fill="none" stroke="#c18d67" strokeWidth="3" strokeLinecap="round"/>
    <path d="M66 101c0-36 22-60 54-60s54 24 54 60c0 37-22 56-54 56s-54-19-54-56Z" fill="#d6ad78" stroke="#b9845f" strokeWidth="2.2"/><path d="M77 118c6 22 21 33 43 33s37-11 43-33c-10-15-23-21-43-21s-33 6-43 21Z" fill={face}/><g className="pet-eyes"><ellipse cx="103" cy="97" rx="12" ry="15" fill="#fff"/><ellipse cx="107" cy="98" rx="5" ry="9" fill="#554940"/><circle cx="109" cy="93" r="3" fill="#fff"/></g><g className="pet-eyes"><ellipse cx="137" cy="97" rx="12" ry="15" fill="#fff"/><ellipse cx="141" cy="98" rx="5" ry="9" fill="#554940"/><circle cx="143" cy="93" r="3" fill="#fff"/></g><ellipse cx="120" cy="121" rx="8" ry="6" fill="#5d493f"/><path d="M120 126v5m0 0c-4 5-9 5-12 1m12-1c4 5 9 5 12 1" fill="none" stroke="#8e6857" strokeWidth="2" strokeLinecap="round"/><path d="M74 79c8-17 23-28 40-31" fill="none" stroke="#f8dfb7" strokeWidth="3" strokeLinecap="round"/><path d="M165 65c-8 5-14 12-17 22" fill="none" stroke="#d9a978" strokeWidth="4" strokeLinecap="round"/>
  </svg> */
}

function PixelLayer({ rows, palette, offsetY = 0, offsetX = 0, centered = false }) {
  return <g shapeRendering="crispEdges">{rows.flatMap((row, y) => {
    const pixels = centered ? row.trim() : row
    const centeredOffset = centered ? Math.floor((32 - pixels.length) / 2) : 0
    return Array.from(pixels.padEnd(32, '.').slice(0, 32).replaceAll(' ', '.'), (pixel, x) => palette[pixel] ? <rect key={`${y}-${x}`} x={x + centeredOffset + offsetX} y={y + offsetY} width="1" height="1" fill={palette[pixel]} /> : null)
  })}</g>
}

function FoxCharacterIllustration({ className = '', emotion = 'idle', effect = '' }) {
  const tail = [
    '                           DD',
    '                         DDDDD',
    '                        DDDDDDD',
    '                       DDDDDDDDD',
    '                      DDDDDDDDDD',
    '                     DDDDDDDDDDD',
    '                    DDDDDDDDDDDD',
    '                   DDDDDDDDDDDDD',
    '                  DDDDDDDDDDDDDD',
    '                  DDDDDDDDDDDDDD',
    '                   DDDDDDDDDDDDD',
    '                    DDDDDDDDDDDD',
    '                     DDDDDDDDDDD',
    '                      DDDDDDDDD',
    '                       DDDD',
    '                        D',
  ]
  const tailFill = [
    '                           OO',
    '                          OOO',
    '                         OOOOO',
    '                        OOOOOOO',
    '                       OOOOOOOO',
    '                      OOOOOOOOO',
    '                     OOOOOOOOOO',
    '                    OOOOOOOOOOO',
    '                    OOOOOOOOOOO',
    '                     OOOOOOOOOO',
    '                      OOOOOOOOO',
    '                       OOOOOOOO',
    '                        OOOOOO',
    '                         OO',
  ]
  const tailTipOutline = [
    '                            DD',
    '                           DDDD',
    '                           DDDD',
    '                           DDDD',
    '                          DDDDD',
    '                         DDDDD',
    '                        DDDDD',
    '                       DDDDD',
  ]
  const tailTip = [
    '                             C',
    '                            CC',
    '                            CC',
    '                            CC',
    '                           CCC',
    '                          CCC',
    '                         CCC',
    '                        CCC',
  ]
  const tailZigzag = [
    '                           O',
    '                          O',
    '                           O',
    '                        O',
  ]
  const body = [
    '           DDDDDDDDDD',
    '          DOOOOOOOOOOD',
    '         DOOOOOOOOOOOOD',
    '         DOOOOOOOOOOOOD',
    '         DOOOOOOOOOOOOD',
    '         DOOOOOOOOOOOOD',
    '         DOOOOOOOOOOOOD',
    '          DOOOOOOOOOOD',
    '          DOOOOOOOOOOD',
    '           DOOOOOOOOD',
    '           DOOOOOOOOD',
    '           DOOOOOOOOD',
  ]
  const belly = [
    '            CCCCCCCC',
    '           CCCCCCCCCC',
    '           CCCCCCCCCC',
    '           CCCCCCCCCC',
    '            CCCCCCCC',
    '            CCCCCCCC',
    '             CCCCCC',
    '             CCCCCC',
  ]
  const paws = [
    '           BBBB  BBBB',
    '           BBBB  BBBB',
    '           BBBB  BBBB',
    '            BBB  BBB',
  ]
  const ears = [
    '         DD          DD',
    '        DOO          OOD',
    '        DOOO        OOOD',
    '       DOOOO        OOOOD',
    '       DOOOO        OOOOD',
    '      DOOOOO        OOOOOD',
    '      DOOOOO        OOOOOD',
    '       OOOOOO      OOOOOO',
  ]
  const head = [
    '          DDDDDDDDDD',
    '        DDOOOOOOOOODD',
    '       DOOOOOOOOOOOOOD',
    '      DOOOOOOOOOOOOOOOD',
    '     DOOOOOOOOOOOOOOOOOD',
    '     DOOOOOOOOOOOOOOOOOD',
    '     DOOOOOOOOOOOOOOOOOD',
    '     DOOOOOOOOOOOOOOOOOD',
    '      DOOOOOOOOOOOOOOOD',
    '       DOOOOOOOOOOOOOD',
    '         DOOOOOOOOOD',
    '           DOOOOOD',
  ]
  const mask = [
    '      CC                  CC',
    '      CCCC              CCCC',
    '       CCCCC          CCCCC',
    '        CCCCC        CCCCC',
    '          CCCC      CCCC',
    '            CCCCCCCC',
    '             CCCCCC',
    '              CCCC',
  ]
  const markings = [
    '              DD',
    '             DDDD',
    '              DD',
  ]
  const eyes = emotion === 'blink' || emotion === 'happy' || emotion === 'celebrating' || emotion === 'excited'
    ? ['          EEE    EEE']
    : emotion === 'sleepy'
      ? ['          EEE    EEE', '           E       E']
      : emotion === 'thinking' || emotion === 'curious' || emotion === 'confused'
        ? ['            EE      EE']
        : ['           EE      EE']
  const mouths = emotion === 'happy' || emotion === 'celebrating' || emotion === 'excited'
    ? ['              B  B', '               BB']
    : emotion === 'sad'
      ? ['               BB', '              B  B']
      : ['              B B']
  const emotes = {
    love: { rows: ['.P.P.', 'PPPPP', 'PPPPP', '.PPP.', '..P..'], palette: { P: '#f27da4' }, x: 25, y: 1 },
    sweat: { rows: ['..B..', '.BBB.', 'BBBBB', '.BBB.', '..B..'], palette: { B: '#71c5ed' }, x: 25, y: 7 },
    anger: { rows: ['R.R', '.R.', 'R.R'], palette: { R: '#d8463e' }, x: 27, y: 1 },
    sparkle: { rows: ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '..Y..'], palette: { Y: '#ffd45b' }, x: 2, y: 6 },
    confetti: { rows: ['P...Y....B', '.Y....P...', '...B.....Y'], palette: { P: '#f27da4', Y: '#ffd45b', B: '#71c5ed' }, x: 4, y: 1 },
    thought: { rows: ['..CCC..', '.C...C.', '.C...C.', '..CCC..', '...C...', '....C..', '.....C.', '..C.C.C'], palette: { C: '#fff6e8' }, x: 24, y: 1 },
    z: { rows: ['ZZZZ', '..Z.', '.Z..', 'ZZZZ'], palette: { Z: '#b4a2dc' }, x: 25, y: 2 },
  }
  const activeEmote = emotes[effect]

  return <svg className={`illustration-svg ${className}`} viewBox="0 0 32 32" role="img" aria-label="Fox pixel art character" shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}>
    <g className="fox-tail" data-fox-part="tail"><PixelLayer rows={tail} palette={{ D: '#63210f' }} offsetY={15} /><PixelLayer rows={tailFill} palette={{ O: '#ed5815' }} offsetY={16} /><PixelLayer rows={tailTipOutline} palette={{ D: '#63210f' }} offsetY={17} /><PixelLayer rows={tailTip} palette={{ C: '#ffe0bb' }} offsetY={18} /><PixelLayer rows={tailZigzag} palette={{ O: '#ed5815' }} offsetY={20} /></g>
    <g className="fox-body"><PixelLayer rows={body} palette={{ O: '#f36a16', D: '#d94b0d' }} offsetY={16} centered /><PixelLayer rows={belly} palette={{ C: '#ffe0bb' }} offsetY={19} centered /><PixelLayer rows={paws} palette={{ B: '#63210f' }} offsetY={27} centered /></g>
    <g className="fox-ears"><PixelLayer rows={ears} palette={{ O: '#f36a16', D: '#63210f' }} offsetY={1} centered /></g>
    <g className="fox-head" data-fox-part="head">
      <PixelLayer rows={head} palette={{ O: '#f36a16', D: '#d94b0d' }} offsetY={7} centered />
      <PixelLayer rows={mask} palette={{ C: '#ffe0bb' }} offsetY={11} centered />
      <PixelLayer rows={markings} palette={{ D: '#ef5810' }} offsetY={8} centered />
      <g className="pet-eyes"><PixelLayer rows={eyes} palette={{ E: '#32140e' }} offsetY={12} centered /></g>
      <PixelLayer rows={['               BB']} palette={{ B: '#63210f' }} offsetY={14} centered />
      <PixelLayer rows={mouths} palette={{ B: '#63210f' }} offsetY={16} centered />
    </g>
    {activeEmote && <g className="fox-emote"><PixelLayer rows={activeEmote.rows} palette={activeEmote.palette} offsetX={activeEmote.x} offsetY={activeEmote.y} /></g>}
  </svg>
}

function BirdCharacterIllustration({ className = '' }) {
  return <img className={`illustration-svg pet-bird ${className}`} src="/bird-pixel.png" alt="Bird pixel art character" draggable="false" />
  /*
    <g className="bird-body"><path d="M8 11h14v12H8zM11 8h9v3h-9z" fill="#69b9da"/><path d="M10 18h12v7H10z" fill="#fff0cf"/><path d="M6 14h5v7H6z" fill="#4e9fc4"/><path d="M22 13h5v4h-5z" fill="#f6a943"/><path d="M12 25h2v3h-2zm8 0h2v3h-2z" fill="#e78537"/><path d="M11 12h2v2h-2zm8 0h2v2h-2z" fill="#24354a"/><path d="M10 8h3v3h-3z" fill="#9de0ea"/></g>
  </svg> */
}

// Small shared pixel canvas for the non-Cat onboarding pets. Cat uses the
// rebuilt CatCharacterIllustration above so every Cat state has one source.
const pixelPetData = {
  dog: {
    label: 'Dog pixel art character',
    palette: { O: '#b8784f', D: '#70453a', C: '#fff0d8', P: '#e58c91', E: '#382622' },
    layers: [
      ['   DDD             DDD   ','  DDDOOOO       OOOODDD  ',' DDDOOOOOOOOOOOOOOOODDD ',' DDOOOOOOOOOOOOOOOOODD  ','  DOOOOOOOOOOOOOOOOOD   '],
      ['    DOOOOOOOOOOOOOD     ','   DOOOOOOOOOOOOOOOOD    ','   DOOOOCCCCCCOOOOOOD    ','   DOOOCCCCCCCCCCOOOOD   ','   DOOOCCCCCCCCCCOOOOD   ','    DOOCCCCCCCCCCOOD     '],
      ['      OOOO  OOOO        ','      OOOO  OOOO        ','       O  EE  O         ','       O   E  O         ','      O  EEEE O         '],
      ['       OOOOOOOO         ','      OCCCCCCCCO        ','      OCCCCCCCCO        ','       OOOOOOOO         '],
      ['     DDOOOOOOOODD       ','    DOOOOOOOOOOOOOD      ','    DOOOOCCCCOOOOOOD     ','     OOOCCCCCCOOO       ','      OOOO  OOOO        '],
    ],
  },
  bird: {
    label: 'Bird pixel art character',
    palette: { B: '#4f91c4', L: '#79c7e6', C: '#fff0d8', Y: '#f3ad3d', D: '#263b59' },
    layers: [
      ['          LLLLL         ','        LLLLLLLLL       ','       LLLLLLLLLLL      ','      LLLLLLLLLLLLL     ','     LLLLLLLLLLLLLLL    ','     LLLLLLLLLLLLLLL    ','      LLLLLLLLLLLLL     '],
      ['     BBBB      BBBB    ','    BBBB        BBBB   ','    BB   CCCCCCC  BB   ','    BB  CCCCCCCCC BB   ','    BB  CCCCCCCCC BB   ','     BBBCCCCCCCCBB     ','      BBBBBBBBBBBB     '],
      ['        D   D          ','         YYY           ','          Y            '],
      ['       CCCCCCCC        ','      CCCCCCCCCC       ','      CCCCCCCCCC       ','       CCCCCCCC        '],
      ['     BB          BB    ','    BBB          BBB    ','      Y          Y      ','      Y          Y      '],
    ],
  },
}

function PixelPetIllustration({ type, className = '' }) {
  const data = pixelPetData[type]
  if (!data) return <FoxCharacterIllustration className={className} />
  const rects = []
  let y = 0
  data.layers.forEach(rows => {
    rows.forEach(row => {
      const trimmed = row.trim()
      const start = Math.floor((32 - trimmed.length) / 2)
      Array.from(trimmed).forEach((pixel, x) => {
        if (data.palette[pixel]) rects.push(<rect key={`${y}-${x}-${pixel}`} x={start + x} y={y} width="1" height="1" fill={data.palette[pixel]} />)
      })
      y += 1
    })
    y += 1
  })
  return <svg className={`illustration-svg ${className}`} viewBox="0 0 32 32" role="img" aria-label={data.label} shapeRendering="crispEdges" style={{ imageRendering: 'pixelated' }}><g>{rects}</g></svg>
}

function PetCharacter({ type, className, emotion, effect }) {
  if (type === 'dog') return <DogCharacterIllustration className={className} emotion={emotion} />
  if (type === 'fox') return <FoxCharacterIllustration className={className} emotion={emotion} effect={effect} />
  if (type === 'bird') return <BirdCharacterIllustration className={className} />
  return <CatCharacterIllustration className={className} />
}

export function PetCharacterIllustration({ type = 'cat', className = '', emotion, effect }) {
  return <PetCharacter type={type} className={className} emotion={emotion} effect={effect} />
}

export function PetIllustration({ type = 'cat', className = '', emotion, effect }) {
  return <PetCharacter type={type} className={className} emotion={emotion} effect={effect} />
}

export function OnboardingPixelPet({ type = 'cat', className = '' }) {
  if (type === 'dog') return <DogCharacterIllustration className={className} />
  if (type === 'cat') return <CatCharacterIllustration className={className} />
  if (type === 'bird') return <BirdCharacterIllustration className={className} />
  return type === 'fox' ? <FoxCharacterIllustration className={className} /> : <PixelPetIllustration type={type} className={className} />
}
