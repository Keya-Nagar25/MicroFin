import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { getMyLoans, getLoanStats } from '../services/creditScore'
import DashboardStats from '../components/DashboardStats'
import TransactionHistory from '../components/TransactionHistory'
import RepaymentTracker from '../components/RepaymentTracker'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { isLoggedIn } = useAuth()
  const [loans, setLoans]           = useState([])
  const [stats, setStats]           = useState({ active: 0, repaid: 0, pending: 0 })
  const [selectedLoan, setSelected] = useState(null)
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    if (!isLoggedIn) return
    Promise.all([getMyLoans(), getLoanStats()])
      .then(([l, s]) => { setLoans(l.data); setStats(s.data) })
      .finally(() => setLoading(false))
  }, [isLoggedIn])
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <p className="text-gray-400 mb-4">Please log in to view your dashboard.</p>
        <Link to="/login" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg transition">
          Login
        </Link>
      </div>
    )
  }
  const chartData = loans.map(l => ({
    name: l.businessName?.slice(0, 10) || 'Loan',
    amount: l.amount,
    repaid: l.repaid
  }))

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-emerald-400">My Dashboard</h2>
        <Link to="/apply"
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold px-5 py-2 rounded-xl transition">
          + New loan
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : (
        <>
          <DashboardStats stats={stats} loans={loans} />
          {chartData.length > 0 && (
            <div className="bg-gray-800 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Loan vs repayment</h3>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }}
                    labelStyle={{ color: '#e5e7eb' }}
                  />
                  <Bar dataKey="amount" name="Loan amount" fill="#10b981" radius={[4,4,0,0]} />
                  <Bar dataKey="repaid"  name="Repaid"       fill="#6ee7b7" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">All loans</h3>
            <TransactionHistory loans={loans} />
          </div>
          {loans.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold text-white">Repayment tracker</h3>
                <select
                  className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none"
                  value={selectedLoan || ''}
                  onChange={e => setSelected(e.target.value)}>
                  <option value="">Select a loan</option>
                  {loans.map(l => (
                    <option key={l._id} value={l._id}>
                      {l.businessName} — ₹{Number(l.amount).toLocaleString('en-IN')}
                    </option>
                  ))}
                </select>
              </div>
              {selectedLoan ? (
                <RepaymentTracker
                  loanId={selectedLoan}
                  emi={loans.find(l => l._id === selectedLoan)?.emi || 0}
                  amount={loans.find(l => l._id === selectedLoan)?.amount || 0}
                />
              ) : (
                <p className="text-gray-500 text-sm">Select a loan above to view its repayment schedule.</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
