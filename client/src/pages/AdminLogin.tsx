import { useState } from 'react'
import { login } from '../data/api'

export default function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(username, password)
      onLogin()
    } catch (err: any) {
      setError(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center cosmic-bg px-4">
      <div className="w-full max-w-md rounded-[20px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-10 shadow-lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-carbon-vellum">
            Admin <span className="text-iris-glow">Login</span>
          </h1>
          <p className="mt-2 text-sm text-ash">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.2)] px-5 py-4 text-base text-carbon-vellum placeholder-ash outline-none transition-all duration-300 focus:border-iris-glow focus:shadow-[0_0_10px_rgba(255,51,75,0.15)]"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-[10px] border border-[rgba(255,255,255,0.08)] bg-[rgba(0,0,0,0.2)] px-5 py-4 text-base text-carbon-vellum placeholder-ash outline-none transition-all duration-300 focus:border-iris-glow focus:shadow-[0_0_10px_rgba(255,51,75,0.15)]"
            />
          </div>

          {error && (
            <p className="text-sm text-iris-glow text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-iris-glow px-7 py-4 text-lg font-semibold text-obsidian shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,51,75,0.35)] hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-ash hover:text-iris-glow transition-colors">
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  )
}
