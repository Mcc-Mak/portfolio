import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import CategorySection from '../components/CategorySection'

export default function CategoryPage() {
  const { type } = useParams<{ type: string }>()
  const list = projects.filter((p) => p.type === type)

  if (list.length === 0) {
    return (
      <section className="section">
        <h2>Category not found</h2>
        <p>No projects found for "{type}".</p>
        <Link to="/projects" className="back-link">← Back to all projects</Link>
      </section>
    )
  }

  return (
    <>
      <Link to="/projects" className="back-link">← All projects</Link>
      <CategorySection type={type!} projects={list} />
    </>
  )
}
