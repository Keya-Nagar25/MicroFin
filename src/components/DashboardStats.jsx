import { fmtINR } from '../utils/helpers'

export default function DashboardStats({ stats, loans }) {
  const totalBorrowed = loans.reduce((s, l) => s + (l.amount || 0), 0)
  const totalRepaid   = loans.reduce((s, l) => s + (l.repaid  || 0), 0)

  const cards = [
    { label: 'Active loans',    value: stats.active,          color: 'text-emerald-400' },
    { label: 'Under review',    value: stats.pending,         color: 'text-amber-400'   },
    { label: 'Fully repaid',    value: stats.repaid,          color: 'text-blue-400'    },
    { label: 'Total borrowed',  value: fmtINR(totalBorrowed), color: 'text-purple-400'  },
    { label: 'Total repaid',    value: fmtINR(totalRepaid),   color: 'text-emerald-400' },
    { label: 'Outstanding',     value: fmtINR(totalBorrowed - totalRepaid), color: 'text-red-400' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
      {cards.map(c => (
        <div key={c.label} className="bg-gray-800 rounded-xl p-5">
          <p className="text-gray-400 text-sm mb-1">{c.label}</p>
          <p className={`text-2xl font-bold ${c.color}`}>{c.value}</p>
        </div>
      ))}
    </div>
  )
}
