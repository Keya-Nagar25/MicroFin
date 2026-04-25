import { fmtINR, fmtDate, emiStatus, statusColors } from '../utils/helpers'

export default function TransactionHistory({ loans }) {
  if (!loans.length) {
    return <p className="text-gray-500 text-sm py-6 text-center">No loans yet.</p>
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-700">
      <table className="w-full text-sm">
        <thead className="bg-gray-800 text-gray-400 text-xs uppercase">
          <tr>
            {['Business', 'Amount', 'EMI', 'Credit score', 'Status', 'Date'].map(h => (
              <th key={h} className="px-4 py-3 text-left font-medium">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {loans.map(loan => {
            const statusMap = {
              approved: { bg: 'bg-emerald-900', text: 'text-emerald-300', label: 'Approved' },
              review:   { bg: 'bg-amber-900',   text: 'text-amber-300',   label: 'Under review' },
              rejected: { bg: 'bg-red-900',     text: 'text-red-300',     label: 'Rejected' },
              repaid:   { bg: 'bg-blue-900',    text: 'text-blue-300',    label: 'Repaid' },
              pending:  { bg: 'bg-gray-700',    text: 'text-gray-300',    label: 'Pending' },
            }
            const s = statusMap[loan.status] || statusMap.pending
            return (
              <tr key={loan._id} className="hover:bg-gray-800/50 transition">
                <td className="px-4 py-3 font-medium">{loan.businessName}</td>
                <td className="px-4 py-3">{fmtINR(loan.amount)}</td>
                <td className="px-4 py-3 text-gray-400">{fmtINR(loan.emi)}/mo</td>
                <td className="px-4 py-3">
                  <span className={`font-bold ${loan.creditScore >= 70 ? 'text-emerald-400' : loan.creditScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>
                    {loan.creditScore}
                  </span>
                  <span className="text-gray-600 text-xs">/100</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`${s.bg} ${s.text} text-xs font-medium px-2.5 py-1 rounded-full`}>
                    {s.label}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400">{fmtDate(loan.createdAt)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
