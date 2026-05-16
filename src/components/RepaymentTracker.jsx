import { useState, useEffect } from 'react'
import { getSchedule, markEmiPaid } from '../services/creditScore'
import { fmtINR, fmtDate, emiStatus, statusColors } from '../utils/helpers'

export default function RepaymentTracker({ loanId, emi, amount }) {
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    if (!loanId) return
    getSchedule(loanId)
      .then(r => setSchedule(r.data))
      .catch(() => setError('Could not load schedule'))
      .finally(() => setLoading(false))
  }, [loanId])

  const handlePay = async (idx) => {
    try {
      const res = await markEmiPaid(loanId, idx)
      setSchedule(res.data.schedule)
    } catch {
      alert('Could not mark as paid')
    }
  }

  if (loading) return <p className="text-gray-400 text-sm py-4">Loading schedule…</p>
  if (error)   return <p className="text-red-400 text-sm py-4">{error}</p>
  if (!schedule.length) return <p className="text-gray-400 text-sm py-4">No schedule found.</p>

  const paidCount = schedule.filter(e => e.status === 'paid').length
  const pct = Math.round((paidCount / schedule.length) * 100)
  const totalInterest = schedule.reduce((s, e) => s + e.interest, 0)

  return (
    <div className="space-y-5">
      <div className="bg-gray-800 rounded-xl p-5">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>{paidCount} of {schedule.length} EMIs paid</span>
          <span>{pct}% complete</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div className="bg-emerald-500 h-2.5 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between mt-3 text-xs text-gray-500">
          <span>{fmtINR(paidCount * emi)} repaid</span>
          <span>{fmtINR(totalInterest)} total interest</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {schedule.map((e, i) => {
          const st = emiStatus(e)
          const dotColor = {
            paid: 'bg-emerald-500', overdue: 'bg-red-500',
            'due-soon': 'bg-amber-400', upcoming: 'bg-gray-600'
          }[st]
          return (
            <div key={i} title={`EMI ${e.num} — ${fmtDate(e.dueDate)}`}
              className={`w-4 h-4 rounded-sm ${dotColor} cursor-pointer hover:opacity-80 transition`}
              onClick={() => st !== 'paid' && handlePay(i)} />
          )
        })}
      </div>
      <div className="flex gap-4 text-xs text-gray-500">
        {[['bg-emerald-500','Paid'],['bg-red-500','Overdue'],['bg-amber-400','Due soon'],['bg-gray-600','Upcoming']].map(([c,l]) => (
          <span key={l} className="flex items-center gap-1">
            <span className={`w-3 h-3 rounded-sm ${c} inline-block`}/>
            {l}
          </span>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-gray-700">
        <table className="w-full text-sm">
          <thead className="bg-gray-800 text-gray-400 text-xs uppercase">
            <tr>
              {['#','Due date','EMI','Principal','Interest','Balance','Status',''].map(h => (
                <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {schedule.map((e, i) => {
              const st  = emiStatus(e)
              const col = statusColors[st]
              return (
                <tr key={i} className={`${e.status === 'paid' ? 'opacity-50' : ''} hover:bg-gray-800/50 transition`}>
                  <td className="px-4 py-3 text-gray-400">{e.num}</td>
                  <td className="px-4 py-3">{fmtDate(e.dueDate)}</td>
                  <td className="px-4 py-3 font-medium">{fmtINR(e.emi)}</td>
                  <td className="px-4 py-3 text-gray-300">{fmtINR(e.principal)}</td>
                  <td className="px-4 py-3 text-red-400">{fmtINR(e.interest)}</td>
                  <td className="px-4 py-3 text-gray-300">{fmtINR(e.balance)}</td>
                  <td className="px-4 py-3">
                    <span className={`${col.bg} ${col.text} text-xs font-medium px-2.5 py-1 rounded-full`}>
                      {col.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {e.status !== 'paid' && (
                      <button onClick={() => handlePay(i)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 underline">
                        Mark paid
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
