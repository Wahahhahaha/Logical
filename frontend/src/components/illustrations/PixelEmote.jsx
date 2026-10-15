const patterns = {
  love: { color: '#e9a0a8', rows: ['.P.P.', 'PPPPP', 'PPPPP', '.PPP.', '..P..'] },
  sparkle: { color: '#e9b45e', rows: ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '..Y..'] },
  sweat: { color: '#91b9de', rows: ['..B..', '.BBB.', '.BBB.', '..B..', '.B...'] },
  thought: { color: '#a9c9e5', rows: ['.CCC.', 'C...C', 'C...C', '.CCC.', '...C.', '..C..'] },
  surprise: { color: '#e9b45e', rows: ['..Y..', '..Y..', '..Y..', '.....', '..Y..'] },
  star: { color: '#f1c56e', rows: ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '..Y..'] },
}

export default function PixelEmote({ kind = 'love' }) {
  const emote = patterns[kind] || patterns.love
  return <svg className={`pixel-emote emote-${kind}`} viewBox="0 0 5 5" aria-hidden="true" shapeRendering="crispEdges">
    {emote.rows.flatMap((row, y) => Array.from(row).map((pixel, x) => pixel !== '.' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={emote.color} /> : null))}
  </svg>
}
