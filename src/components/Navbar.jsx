import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="text-xl font-bold text-emerald-400 tracking-tight">
        MicroFin
      </Link>
      <div className="flex items-center gap-6 text-sm">
        <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
        {isLoggedIn && (
          <>
            <Link to="/apply"     className="text-gray-300 hover:text-white transition">Apply</Link>
            <Link to="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>
            <Link to="/profile"   className="text-gray-300 hover:text-white transition">Profile</Link>
          </>
        )}
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-xs">{user?.name}</span>
            <button onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-lg text-xs transition">
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-lg transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
