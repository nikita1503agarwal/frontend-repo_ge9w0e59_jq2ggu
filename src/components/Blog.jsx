import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Blog() {
  const [items, setItems] = useState([])

  useEffect(() => { fetchBlog() }, [])

  const fetchBlog = async () => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/blog`)
      const data = await res.json()
      setItems(data)
    } catch (e) { console.error(e) }
  }

  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Blog</h2>
          <p className="text-slate-500 text-sm">Technical notes and tutorials</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((a, idx) => (
            <article key={idx} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
              <time className="text-xs text-slate-500">{new Date(a.published_at).toLocaleDateString()}</time>
              <h3 className="mt-2 text-lg font-medium text-slate-900 dark:text-white">{a.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{a.excerpt}</p>
              <Link to={`/blog/${a.slug}`} className="mt-4 inline-block text-sky-600">Read more</Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
