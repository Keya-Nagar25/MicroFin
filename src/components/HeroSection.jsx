import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="text-center py-24 px-6 max-w-3xl mx-auto">
      <span className="inline-block bg-emerald-900 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide uppercase">
        FinTech Microfinance
      </span>
      <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
        Fast loans for small<br />businesses that grow
      </h1>
      <p className="text-gray-400 text-lg mb-10 leading-relaxed">
        AI-powered credit scoring using alternative data — no collateral, no lengthy paperwork.
        Get approved in minutes, not months.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Link to="/apply"
          className="bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-8 py-3 rounded-xl transition text-base">
          Apply Now
        </Link>
        <Link to="/dashboard"
          className="border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-semibold px-8 py-3 rounded-xl transition text-base">
          View Dashboard
        </Link>
      </div>
      <div className="mt-16 grid grid-cols-3 gap-8 text-center">
        {[
          { val: '₹50K–10L', label: 'Loan range' },
          { val: '< 5 min', label: 'Approval time' },
          { val: 'AI-based', label: 'Credit scoring' },
        ].map(({ val, label }) => (
          <div key={label}>
            <p className="text-2xl font-bold text-emerald-400">{val}</p>
            <p className="text-gray-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
