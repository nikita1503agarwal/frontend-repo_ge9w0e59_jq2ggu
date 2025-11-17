export default function Footer(){
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-4 gap-8">
        <div>
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 mb-3" />
          <p className="text-sm text-slate-600 dark:text-slate-300">Minimal, professional portfolio showcasing projects, certifications, and writing.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li><a href="/projects" className="hover:text-slate-900 dark:hover:text-white">Projects</a></li>
            <li><a href="/certifications" className="hover:text-slate-900 dark:hover:text-white">Certifications</a></li>
            <li><a href="/blog" className="hover:text-slate-900 dark:hover:text-white">Blog</a></li>
            <li><a href="/resume" className="hover:text-slate-900 dark:hover:text-white">Resume</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Newsletter</h4>
          <form className="flex gap-2">
            <input placeholder="Your email" className="px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-full" />
            <button className="px-4 py-2 rounded-md bg-sky-600 text-white">Subscribe</button>
          </form>
        </div>
        <div id="contact">
          <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Contact</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300">Open to collaborations and opportunities. Reach out via email or LinkedIn.</p>
        </div>
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} Developer Portfolio. All rights reserved.</div>
    </footer>
  )
}
