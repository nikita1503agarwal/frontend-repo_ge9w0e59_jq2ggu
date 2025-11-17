import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-sky-100 dark:bg-sky-900 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -right-40 w-[28rem] h-[28rem] bg-indigo-100 dark:bg-indigo-900 rounded-full blur-3xl opacity-60" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-900/60 backdrop-blur">
              Building mobile & web experiences
            </div>
            <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Hi, I’m <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">Your Name</span> — a developer crafting sleek, performant apps.
            </h1>
            <p className="mt-5 text-slate-600 dark:text-slate-300 max-w-xl">
              Polytechnic diploma graduate focusing on modern mobile and web development. I design, build, and ship products with a clean, scalable approach.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="px-5 py-2.5 rounded-md bg-sky-600 text-white hover:bg-sky-700">Explore Projects</Link>
              <Link to="/resume" className="px-5 py-2.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">View Resume</Link>
            </div>
            <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">Featured: Fintech wallet • E-commerce PWA • AI Chat companion</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-50 dark:from-slate-800 dark:to-slate-900 p-2 shadow-inner">
              <div className="w-full h-full rounded-xl bg-center bg-cover" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop)' }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
