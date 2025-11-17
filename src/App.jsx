import Header from './components/Header'
import Hero from './components/Hero'
import Certifications from './components/Certifications'
import FeaturedProjects from './components/FeaturedProjects'
import Blog from './components/Blog'
import Footer from './components/Footer'
import ProjectsPage from './components/ProjectsPage'
import Resume from './components/Resume'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/AdminDashboard'
import BlogPostPage from './components/BlogPostPage'
import { Routes, Route } from 'react-router-dom'

function Home(){
  return (
    <>
      <Hero />
      <Certifications />
      <FeaturedProjects />
      <Blog />
    </>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
