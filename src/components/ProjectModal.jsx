import { useState } from 'react'

export default function ProjectModal({ project, onClose }) {
  const [index, setIndex] = useState(0)
  const shots = project.screenshots || []

  const prev = () => setIndex(i => (i - 1 + shots.length) % shots.length)
  const next = () => setIndex(i => (i + 1) % shots.length)

  return (
    <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="max-w-3xl w-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{project.name}</h3>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-900">Close</button>
        </div>
        <div className="p-5 grid lg:grid-cols-2 gap-6">
          <div>
            {shots.length > 0 ? (
              <div className="relative">
                <img src={shots[index]} className="w-full h-64 object-cover rounded-lg" />
                {shots.length > 1 && (
                  <div className="absolute inset-0 flex items-center justify-between p-2">
                    <button onClick={prev} className="px-3 py-1.5 rounded bg-white/80 dark:bg-slate-800/80">Prev</button>
                    <button onClick={next} className="px-3 py-1.5 rounded bg-white/80 dark:bg-slate-800/80">Next</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-64 rounded-lg bg-slate-100 dark:bg-slate-800" />
            )}
          </div>
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-3">{project.summary}</p>
            {project.skills?.length > 0 && (
              <div className="mb-3">
                <h4 className="font-medium text-slate-900 dark:text-white">Skills</h4>
                <ul className="mt-1 list-disc list-inside text-sm text-slate-600 dark:text-slate-300">
                  {project.skills.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
            {project.technologies?.length > 0 && (
              <div className="mb-3">
                <h4 className="font-medium text-slate-900 dark:text-white">Technologies</h4>
                <div className="mt-1 flex flex-wrap gap-2">
                  {project.technologies.map((t, i) => <span key={i} className="px-2 py-1 rounded-md text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">{t}</span>)}
                </div>
              </div>
            )}
            {project.features?.length > 0 && (
              <div className="mb-3">
                <h4 className="font-medium text-slate-900 dark:text-white">Features</h4>
                <ul className="mt-1 list-disc list-inside text-sm text-slate-600 dark:text-slate-300">
                  {project.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>
            )}
            <div className="mt-4 flex gap-3">
              {project.marketplace_url && <a href={project.marketplace_url} target="_blank" className="px-4 py-2 rounded-md bg-sky-600 text-white">Open App</a>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
