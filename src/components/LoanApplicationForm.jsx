import { useState } from 'react'
import { applyLoan } from '../services/creditScore'
import CreditScoreCard from './CreditScoreCard'

const FIELDS = [
  { id: 'businessName',   label: 'Business name',         type: 'text',   placeholder: 'e.g. Ravi Textiles' },
  { id: 'loanAmount',     label: 'Loan amount (₹)',       type: 'number', placeholder: '200000' },
  { id: 'monthlyRevenue', label: 'Monthly revenue (₹)',   type: 'number', placeholder: '85000' },
  { id: 'phone',          label: 'Phone number',          type: 'tel',    placeholder: '9876543210' },
  { id: 'bizAgeMonths',   label: 'Business age (months)', type: 'number', placeholder: '24' },
  { id: 'monthlyTxns',    label: 'Monthly transactions',  type: 'number', placeholder: '120' },
]

export default function LoanApplicationForm() {
  const [form, setForm] = useState({
    businessName: '', loanAmount: '', monthlyRevenue: '',
    phone: '', bizAgeMonths: '', monthlyTxns: '',
    purpose: '', defaults: '0', digitalUsage: '3',
    gstFiling: '2', repaymentHistory: '3',
    annualRate: '18', tenureMonths: '12'
  })
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(null); setResult(null)
    try {
      const res = await applyLoan(form)
      setResult(res.data)
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FIELDS.map(f => (
            <div key={f.id}>
              <label className="block text-sm text-gray-400 mb-1">{f.label}</label>
              <input type={f.type} placeholder={f.placeholder}
                value={form[f.id]}
                onChange={e => set(f.id, e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Loan purpose</label>
            <select value={form.purpose} onChange={e => set('purpose', e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-500 focus:outline-none">
              <option value="">Select purpose</option>
              <option>Inventory Purchase</option>
              <option>Equipment</option>
              <option>Working Capital</option>
              <option>Expansion</option>
              <option>Emergency</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Prior defaults</label>
            <select value={form.defaults} onChange={e => set('defaults', e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-500 focus:outline-none">
              <option value="0">None</option>
              <option value="1">1 default</option>
              <option value="2">2 or more</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Digital payment usage</label>
            <select value={form.digitalUsage} onChange={e => set('digitalUsage', e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-500 focus:outline-none">
              <option value="3">High — UPI/cards daily</option>
              <option value="2">Medium — weekly</option>
              <option value="1">Low — mostly cash</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">GST filing status</label>
            <select value={form.gstFiling} onChange={e => set('gstFiling', e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-500 focus:outline-none">
              <option value="2">Regular filer</option>
              <option value="1">Occasional</option>
              <option value="0">No GST</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Repayment history</label>
            <select value={form.repaymentHistory} onChange={e => set('repaymentHistory', e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-500 focus:outline-none">
              <option value="3">Excellent</option>
              <option value="2">Good</option>
              <option value="1">Fair</option>
              <option value="0">Poor / No history</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tenure (months)</label>
            <select value={form.tenureMonths} onChange={e => set('tenureMonths', e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:border-emerald-500 focus:outline-none">
              {[6,12,18,24,36].map(m => <option key={m} value={m}>{m} months</option>)}
            </select>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button type="submit" disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold p-3 rounded-xl transition">
          {loading ? 'Submitting…' : 'Submit Application'}
        </button>
      </form>

      {result && (
        <CreditScoreCard
          score={result.creditScore}
          breakdown={result.breakdown}
          status={result.loan?.status}
        />
      )}
    </div>
  )
}
