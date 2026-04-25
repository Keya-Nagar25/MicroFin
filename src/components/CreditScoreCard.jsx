export default function CreditScoreCard({ score, breakdown, status }) {
  if (!score && score !== 0) return null

  const color = score >= 70 ? 'text-emerald-400' : score >= 50 ? 'text-amber-400' : 'text-red-400'
  const bgColor = score >= 70 ? 'bg-emerald-900' : score >= 50 ? 'bg-amber-900' : 'bg-red-900'
  const statusLabel = score >= 70 ? 'Approved' : score >= 50 ? 'Under Review' : 'High Risk'

  const factors = breakdown ? [
    { label: 'Debt-to-income',    val: breakdown.dti,      max: 30 },
    { label: 'Transactions',      val: breakdown.txScore,  max: 20 },
    { label: 'Business tenure',   val: breakdown.bizScore, max: 15 },
    { label: 'Digital payments',  val: breakdown.digScore, max: 15 },
    { label: 'Repayment history', val: breakdown.repScore, max: 10 },
    { label: 'GST compliance',    val: breakdown.gstScore, max: 10 },
  ] : []

  return (
    <div className="mt-6 bg-gray-800 rounded-xl p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">AI Credit Score</p>
          <p className={`text-5xl font-bold ${color}`}>{score}<span className="text-lg text-gray-500">/100</span></p>
        </div>
        <span className={`${bgColor} ${color} text-sm font-semibold px-4 py-2 rounded-full`}>
          {statusLabel}
        </span>
      </div>

      {breakdown && (
        <div className="space-y-2 pt-2 border-t border-gray-700">
          {factors.map(f => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="text-gray-400 text-xs w-36 shrink-0">{f.label}</span>
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.round((f.val / f.max) * 100)}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-12 text-right">{f.val}/{f.max}</span>
            </div>
          ))}
          {breakdown.penalty > 0 && (
            <p className="text-red-400 text-xs pt-1">− {breakdown.penalty} pts penalty (defaults)</p>
          )}
        </div>
      )}
    </div>
  )
}
