import { useEffect, useState } from 'react'

const useApi = () => {
  const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const token = localStorage.getItem('token')
  const headers = token ? { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' }
  const post = async (path, payload) => {
    const res = await fetch(`${base}${path}`, { method: 'POST', headers, body: JSON.stringify(payload) })
    if(!res.ok) throw new Error('Request failed')
    return res.json()
  }
  return { post }
}

export default function AdminDashboard(){
  const { post } = useApi()
  const [tab, setTab] = useState('projects')
  const [message, setMessage] = useState('')

  const handleProject = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      name: form.get('name'),
      slug: form.get('slug'),
      summary: form.get('summary'),
      marketplace_url: form.get('marketplace_url') || null,
      featured: form.get('featured') === 'on',
      skills: form.get('skills') ? form.get('skills').split(',').map(s=>s.trim()) : [],
      technologies: form.get('technologies') ? form.get('technologies').split(',').map(s=>s.trim()) : [],
      features: form.get('features') ? form.get('features').split('\n').map(s=>s.trim()).filter(Boolean) : [],
      screenshots: form.get('screenshots') ? form.get('screenshots').split('\n').map(s=>s.trim()).filter(Boolean) : [],
    }
    try{
      await post('/admin/projects', payload)
      setMessage('Project saved')
      e.currentTarget.reset()
    }catch(e){ setMessage('Failed to save project') }
  }

  const handleCert = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      title: form.get('title'),
      issuer: form.get('issuer'),
      issued_at: new Date(form.get('issued_at')).toISOString(),
      logo_url: form.get('logo_url') || null,
      credential_id: form.get('credential_id') || null,
      credential_url: form.get('credential_url') || null,
    }
    try{
      await post('/admin/certifications', payload)
      setMessage('Certification saved')
      e.currentTarget.reset()
    }catch(e){ setMessage('Failed to save certification') }
  }

  const handleResume = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      url: form.get('url'),
      updated_at: new Date().toISOString()
    }
    try{ await post('/admin/resume', payload); setMessage('Resume updated') }catch(e){ setMessage('Failed to update resume') }
  }

  const handleSocial = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      linkedin: form.get('linkedin') || null,
      github: form.get('github') || null,
      medium: form.get('medium') || null,
      google_dev: form.get('google_dev') || null,
      email: form.get('email') || null,
    }
    try{ await post('/admin/social', payload); setMessage('Social links updated') }catch(e){ setMessage('Failed to update social links') }
  }

  const handleBlog = async (e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const payload = {
      title: form.get('title'),
      slug: form.get('slug'),
      excerpt: form.get('excerpt'),
      content: form.get('content'),
      published_at: new Date(form.get('published_at')).toISOString(),
    }
    try{ await post('/admin/blog', payload); setMessage('Blog saved') }catch(e){ setMessage('Failed to save blog') }
  }

  return (
    <div className="pt-24 max-w-5xl mx-auto px-4">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
      {message && <div className="mb-4 text-sm text-sky-700 bg-sky-50 border border-sky-200 rounded p-3">{message}</div>}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['projects','certifications','resume','social','blog'].map(t => (
          <button key={t} onClick={()=>setTab(t)} className={`px-3 py-1.5 rounded-md border ${tab===t ? 'bg-sky-600 text-white border-sky-600' : 'border-slate-300 dark:border-slate-700'}`}>{t}</button>
        ))}
      </div>

      {tab==='projects' && (
        <form onSubmit={handleProject} className="grid sm:grid-cols-2 gap-4">
          <input name="name" placeholder="Project name" className="input" required />
          <input name="slug" placeholder="Slug" className="input" required />
          <input name="marketplace_url" placeholder="Marketplace URL" className="input sm:col-span-2" />
          <textarea name="summary" placeholder="Summary" className="input sm:col-span-2" rows="3" required />
          <input name="skills" placeholder="Skills (comma separated)" className="input sm:col-span-2" />
          <input name="technologies" placeholder="Technologies (comma separated)" className="input sm:col-span-2" />
          <textarea name="features" placeholder="Features (one per line)" className="input sm:col-span-2" rows="4" />
          <textarea name="screenshots" placeholder="Screenshot URLs (one per line)" className="input sm:col-span-2" rows="4" />
          <label className="flex items-center gap-2"><input type="checkbox" name="featured" /> Featured</label>
          <button className="px-4 py-2 rounded-md bg-emerald-600 text-white sm:col-span-2">Save Project</button>
        </form>
      )}

      {tab==='certifications' && (
        <form onSubmit={handleCert} className="grid sm:grid-cols-2 gap-4">
          <input name="title" placeholder="Title" className="input" required />
          <input name="issuer" placeholder="Issuer" className="input" required />
          <input type="date" name="issued_at" className="input" required />
          <input name="logo_url" placeholder="Logo URL" className="input sm:col-span-2" />
          <input name="credential_id" placeholder="Credential ID" className="input" />
          <input name="credential_url" placeholder="Credential URL" className="input" />
          <button className="px-4 py-2 rounded-md bg-emerald-600 text-white sm:col-span-2">Save Certification</button>
        </form>
      )}

      {tab==='resume' && (
        <form onSubmit={handleResume} className="grid gap-4">
          <input name="url" placeholder="Resume PDF URL" className="input" required />
          <button className="px-4 py-2 rounded-md bg-emerald-600 text-white">Update Resume</button>
        </form>
      )}

      {tab==='social' && (
        <form onSubmit={handleSocial} className="grid sm:grid-cols-2 gap-4">
          <input name="linkedin" placeholder="LinkedIn URL" className="input" />
          <input name="github" placeholder="GitHub URL" className="input" />
          <input name="medium" placeholder="Medium URL" className="input" />
          <input name="google_dev" placeholder="Google Dev Profile URL" className="input" />
          <input name="email" placeholder="Email" className="input sm:col-span-2" />
          <button className="px-4 py-2 rounded-md bg-emerald-600 text-white sm:col-span-2">Update Social</button>
        </form>
      )}

      {tab==='blog' && (
        <form onSubmit={handleBlog} className="grid sm:grid-cols-2 gap-4">
          <input name="title" placeholder="Title" className="input" required />
          <input name="slug" placeholder="Slug" className="input" required />
          <input type="date" name="published_at" className="input" required />
          <textarea name="excerpt" placeholder="Excerpt" className="input sm:col-span-2" rows="3" required />
          <textarea name="content" placeholder="Content" className="input sm:col-span-2" rows="6" required />
          <button className="px-4 py-2 rounded-md bg-emerald-600 text-white sm:col-span-2">Save Article</button>
        </form>
      )}

      <style>{`
        .input { @apply px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white } 
      `}</style>
    </div>
  )
}
