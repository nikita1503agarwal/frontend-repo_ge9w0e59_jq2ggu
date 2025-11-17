import { useEffect, useState } from 'react'
import { Menu, Sun, Moon, Github, Linkedin, Mail, FileText, NotebookPen, ListChecks, SquareKanban, LogIn, LogOut, PenSquare } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const navLinkClass = ({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900' : 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}`

export default function Header() {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    setDark(isDark)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  const isAuthed = !!localStorage.getItem('token')

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="sm:hidden" onClick={() => setOpen(v => !v)} aria-label="Open Menu">
              <Menu className="h-6 w-6 text-slate-700 dark:text-slate-200" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-300" />
              <span className="font-semibold text-slate-900 dark:text-white">Developer Portfolio</span>
            </Link>
          </div>

          <nav className="hidden sm:flex items-center gap-1">
            <NavLink to="/certifications" className={navLinkClass}>
              <ListChecks className="h-4 w-4 inline mr-2" /> Certifications
            </NavLink>
            <NavLink to="/projects" className={navLinkClass}>
              <SquareKanban className="h-4 w-4 inline mr-2" /> Projects
            </NavLink>
            <NavLink to="/blog" className={navLinkClass}>
              <NotebookPen className="h-4 w-4 inline mr-2" /> Blog
            </NavLink>
            <NavLink to="/resume" className={navLinkClass}>
              <FileText className="h-4 w-4 inline mr-2" /> Resume
            </NavLink>
            <a href="#contact" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">Contact</a>
          </nav>

          <div className="flex items-center gap-2">
            <a href="https://github.com" target="_blank" className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"><Github className="h-5 w-5 text-slate-700 dark:text-slate-200"/></a>
            <a href="https://linkedin.com" target="_blank" className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"><Linkedin className="h-5 w-5 text-slate-700 dark:text-slate-200"/></a>
            <a href="mailto:email@example.com" className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"><Mail className="h-5 w-5 text-slate-700 dark:text-slate-200"/></a>
            <button onClick={() => setDark(d => !d)} className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800" aria-label="Toggle theme">
              {dark ? <Sun className="h-5 w-5 text-amber-400"/> : <Moon className="h-5 w-5 text-slate-700"/>}
            </button>
            {!isAuthed ? (
              <Link to="/admin" className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-sky-600 text-white hover:bg-sky-700">
                <LogIn className="h-4 w-4"/> Login
              </Link>
            ) : (
              <>
                <Link to="/dashboard" className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700">
                  <PenSquare className="h-4 w-4"/> Dashboard
                </Link>
                <button onClick={logout} className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900">
                  <LogOut className="h-4 w-4"/> Logout
                </button>
              </>
            )}
          </div>
        </div>

        {open && (
          <div className="sm:hidden pb-4 space-y-2">
            <div className="grid gap-2">
              <NavLink to="/certifications" className={navLinkClass} onClick={() => setOpen(false)}>Certifications</NavLink>
              <NavLink to="/projects" className={navLinkClass} onClick={() => setOpen(false)}>Projects</NavLink>
              <NavLink to="/blog" className={navLinkClass} onClick={() => setOpen(false)}>Blog</NavLink>
              <NavLink to="/resume" className={navLinkClass} onClick={() => setOpen(false)}>Resume</NavLink>
              <a href="#contact" className="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" onClick={() => setOpen(false)}>Contact</a>
              {!isAuthed ? (
                <Link to="/admin" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium bg-sky-600 text-white text-center">Login</Link>
              ) : (
                <>
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="px-3 py-2 rounded-md text-sm font-medium bg-emerald-600 text-white text-center">Dashboard</Link>
                  <button onClick={() => { logout(); setOpen(false) }} className="px-3 py-2 rounded-md text-sm font-medium bg-slate-900 text-white text-center">Logout</button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
