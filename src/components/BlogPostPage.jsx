import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BlogPostPage(){
  const { slug } = useParams()
  const [post, setPost] = useState(null)

  useEffect(() => { fetchPost() }, [slug])

  const fetchPost = async () => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${base}/blog`)
      const data = await res.json()
      setPost(data.find(p => p.slug === slug))
    } catch(e){ console.error(e) }
  }

  if(!post){
    return <div className="pt-24 max-w-3xl mx-auto px-4"><p className="text-slate-500">Loading...</p></div>
  }

  return (
    <div className="pt-24 max-w-3xl mx-auto px-4">
      <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">{post.title}</h1>
      <time className="text-xs text-slate-500">{new Date(post.published_at).toLocaleDateString()}</time>
      <p className="mt-4 text-slate-700 dark:text-slate-300">{post.content}</p>
    </div>
  )
}
