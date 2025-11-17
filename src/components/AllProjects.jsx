import { useEffect, useMemo, useState } from 'react'

export default function AllProjects() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [tech, setTech] = useState('')

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/projects`)
      const data = await res.json()
      setItems(data)
    } catch (e) { console.error(e) }
  }

  const filtered = useMemo(() => {
    return items.filter(p => (
      (!q || p.name.toLowerCase().includes(q.toLowerCase()) || p.summary.toLowerCase().includes(q.toLowerCase())) &&
      (!tech || p.technologies?.some(t => t.toLowerCase().includes(tech.toLowerCase())))
    ))
  }, [items, q, tech])

  const techs = useMemo(() => {
    const s = new Set()
    items.forEach(p => p.technologies?.forEach(t => s.add(t)))
    return Array.from(s)
  }, [items])

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">All Projects</h2>
            <p className="text-slate-500 text-sm">Search and filter by tech</p>
          </div>
          <div className="flex gap-3">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." className="px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white" />
            <select value={tech} onChange={e => setTech(e.target.value)} className="px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
              <option value="">All tech</option>
              {techs.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, idx) => (
            <article key={idx} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              {p.screenshots?.[0] && (
                <img src={p.screenshots[0]} className="h-40 w-full object-cover" />
              )}
              <div className="p-5">
                <h3 className="font-medium text-slate-900 dark:text-white">{p.name}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{p.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.technologies?.slice(0,4).map((t,i) => <span key={i} className="px-2 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">{t}</span>)}
                </div>
                <div className="mt-4 flex gap-3">
                  {p.marketplace_url && <a href={p.marketplace_url} target="_blank" className="px-3 py-1.5 rounded-md bg-sky-600 text-white text-sm">Open</a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
