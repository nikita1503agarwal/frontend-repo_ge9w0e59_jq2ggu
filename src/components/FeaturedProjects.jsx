import { useEffect, useState } from 'react'
import ProjectModal from './ProjectModal'

export default function FeaturedProjects() {
  const [items, setItems] = useState([])
  const [active, setActive] = useState(null)

  useEffect(() => { fetchProjects() }, [])

  const fetchProjects = async () => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/projects?featured=true`)
      const data = await res.json()
      setItems(data)
    } catch (e) { console.error(e) }
  }

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Featured Projects</h2>
          <a href="/projects" className="text-sky-600">View all</a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, idx) => (
            <article key={idx} className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
              {p.screenshots?.[0] && (
                <img src={p.screenshots[0]} className="h-40 w-full object-cover" />
              )}
              <div className="p-5">
                <h3 className="font-medium text-slate-900 dark:text-white">{p.name}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 line-clamp-2">{p.summary}</p>
                <div className="mt-4 flex gap-3">
                  {p.marketplace_url && <a href={p.marketplace_url} target="_blank" className="px-3 py-1.5 rounded-md bg-sky-600 text-white text-sm">Open</a>}
                  <button onClick={() => setActive(p)} className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-sm">View Details</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  )
}
