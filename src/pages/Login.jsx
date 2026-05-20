import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as loginApi, register as registerApi } from '../services/auth'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [mode, setMode]   = useState('login')   
  const [form, setForm]   = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      const fn = mode === 'login' ? loginApi : registerApi
      const res = await fn(form)
      login(res.data.user, res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-emerald-400 mb-2">
        {mode === 'login' ? 'Welcome back' : 'Create account'}
      </h2>
      <p className="text-gray-400 text-sm mb-8">
        {mode === 'login' ? 'Log in to manage your loans.' : 'Sign up to apply for microfinance.'}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div>
            <label className="block text-sm text-gray-400 mb-1">Full name</label>
            <input type="text" placeholder="Ravi Kumar" value={form.name}
              onChange={e => set('name', e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none" />
          </div>
        )}
        <div>
          <label className="block text-sm text-gray-400 mb-1">Email</label>
          <input type="email" placeholder="you@example.com" value={form.email}
            onChange={e => set('email', e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-1">Password</label>
          <input type="password" placeholder="••••••••" value={form.password}
            onChange={e => set('password', e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-600 focus:border-emerald-500 focus:outline-none" />
        </div>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button type="submit" disabled={loading}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold p-3 rounded-xl transition">
          {loading ? 'Please wait…' : mode === 'login' ? 'Login' : 'Create account'}
        </button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-6">
        {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
        <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null) }}
          className="text-emerald-400 hover:underline">
          {mode === 'login' ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  )
}
