import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const body = new URLSearchParams()
      body.append('username', username)
      body.append('password', password)
      const res = await fetch(`${base}/auth/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body
      })
      if(!res.ok){
        setError('Invalid credentials')
        return
      }
      const data = await res.json()
      localStorage.setItem('token', data.access_token)
      navigate('/dashboard')
    } catch(e){
      setError('Login failed')
    }
  }

  return (
    <div className="pt-24 max-w-sm mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
      <form onSubmit={submit} className="space-y-3">
        <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="Username" className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900" />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button className="w-full px-4 py-2 rounded-md bg-sky-600 text-white">Login</button>
      </form>
    </div>
  )
}
