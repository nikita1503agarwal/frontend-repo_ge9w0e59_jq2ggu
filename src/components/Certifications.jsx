import { useEffect, useState } from 'react'

export default function Certifications() {
  const [items, setItems] = useState([])

  useEffect(() => { fetchCerts() }, [])

  const fetchCerts = async () => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/certifications`)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Certifications</h2>
          <p className="text-slate-500 text-sm">Selected credentials and achievements</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c, idx) => (
            <article key={idx} className="group rounded-xl border border-slate-200 dark:border-slate-800 p-5 bg-white dark:bg-slate-950 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                {c.logo_url ? (
                  <img src={c.logo_url} className="h-10 w-10 rounded object-cover" />
                ) : (
                  <div className="h-10 w-10 rounded bg-slate-200 dark:bg-slate-800" />
                )}
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white">{c.title}</h3>
                  <p className="text-sm text-slate-500">{c.issuer}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">Issued {new Date(c.issued_at).toLocaleDateString()}</p>
              {c.credential_url && (
                <a href={c.credential_url} target="_blank" className="mt-4 inline-block text-sky-600 hover:underline">View Credential</a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
