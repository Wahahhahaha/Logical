const SLOTS = [
  [5, 'Good morning'],
  [12, 'Good afternoon'],
  [18, 'Good evening'],
  [21, 'Good night'],
]

export function greetingFor(date = new Date()) {
  const hour = date.getHours()
  let message = SLOTS[SLOTS.length - 1][1]
  for (const [start, text] of SLOTS) if (hour >= start) message = text
  return message
}

export function formatToday(locale = 'en-US', date = new Date()) {
  return date.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}
