import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { user, isLoggedIn, logout } = useAuth()

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto p-8 text-center">
        <p className="text-gray-400 mb-4">Please log in to view your profile.</p>
        <Link to="/login" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg transition">
          Login
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-emerald-400 mb-8">My Profile</h2>
      <div className="bg-gray-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-4 pb-4 border-b border-gray-700">
          <div className="w-14 h-14 rounded-full bg-emerald-900 flex items-center justify-center text-emerald-400 text-xl font-bold">
            {user?.name?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <p className="text-white font-semibold text-lg">{user?.name}</p>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>
        {[
          { label: 'Account type', value: 'Borrower' },
          { label: 'Member since', value: new Date().getFullYear() },
        ].map(({ label, value }) => (
          <div key={label} className="flex justify-between text-sm">
            <span className="text-gray-400">{label}</span>
            <span className="text-white">{value}</span>
          </div>
        ))}
        <button onClick={logout}
          className="w-full mt-4 border border-red-700 hover:bg-red-900/30 text-red-400 py-2.5 rounded-xl text-sm transition">
          Logout
        </button>
      </div>
    </div>
  )
}
