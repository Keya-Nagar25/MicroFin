import LoanApplicationForm from '../components/LoanApplicationForm'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Apply() {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <p className="text-gray-400 mb-4">Please log in to apply for a loan.</p>
        <Link to="/login" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg transition">
          Login
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-emerald-400 mb-2">Apply for a Loan</h2>
      <p className="text-gray-400 text-sm mb-8">
        Fill in your business details. Our AI will score your application instantly.
      </p>
      <LoanApplicationForm />
    </div>
  )
}
