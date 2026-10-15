const SLOTS = [
  [5, 'greeting.morning'],
  [12, 'greeting.afternoon'],
  [18, 'greeting.evening'],
  [21, 'greeting.night'],
]

export function greetingKey(date = new Date()) {
  const hour = date.getHours()
  let key = SLOTS[SLOTS.length - 1][1]
  for (const [start, slotKey] of SLOTS) if (hour >= start) key = slotKey
  return key
}

export function greetingFor(date = new Date()) {
  const FALLBACK = ['Good morning', 'Good afternoon', 'Good evening', 'Good night']
  const index = ['greeting.morning', 'greeting.afternoon', 'greeting.evening', 'greeting.night'].indexOf(greetingKey(date))
  return FALLBACK[index] || FALLBACK[0]
}

export function formatToday(locale = 'en-US', date = new Date()) {
  return date.toLocaleDateString(locale, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}
