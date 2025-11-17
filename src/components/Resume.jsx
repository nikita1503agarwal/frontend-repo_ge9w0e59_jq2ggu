import { useEffect, useState } from 'react'

export default function Resume(){
  const [resume, setResume] = useState(null)

  useEffect(() => { fetchResume() }, [])

  const fetchResume = async () => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/resume`)
      if(res.ok){
        setResume(await res.json())
      }
    } catch(e){ console.error(e) }
  }

  return (
    <section className="py-16 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Resume</h2>
        {resume ? (
          <div className="space-y-4">
            <div className="aspect-[8.5/11] w-full bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
              <iframe src={resume.url} className="w-full h-full" />
            </div>
            <a href={resume.url} target="_blank" className="px-5 py-2.5 rounded-md bg-sky-600 text-white inline-block">Download PDF</a>
          </div>
        ) : (
          <p className="text-slate-500">Resume not available yet.</p>
        )}
      </div>
    </section>
  )
}
