export const fmtINR = (n) =>
  '₹' + Number(n).toLocaleString('en-IN', { maximumFractionDigits: 0 })

export const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

export const emiStatus = (entry) => {
  if (entry.status === 'paid') return 'paid'
  if (new Date(entry.dueDate) < new Date()) return 'overdue'
  const soon = new Date(); soon.setDate(soon.getDate() + 7)
  if (new Date(entry.dueDate) <= soon) return 'due-soon'
  return 'upcoming'
}

export const statusColors = {
  paid:     { bg: 'bg-emerald-900', text: 'text-emerald-300', label: 'Paid' },
  overdue:  { bg: 'bg-red-900',     text: 'text-red-300',     label: 'Overdue' },
  'due-soon':{ bg: 'bg-amber-900',  text: 'text-amber-300',   label: 'Due soon' },
  upcoming: { bg: 'bg-gray-700',    text: 'text-gray-300',    label: 'Upcoming' },
}
