import { useParams, Link } from 'react-router-dom'
import { projects, categoryLabels } from '../data/projects'
import ProjectTable from '../components/ProjectTable'

export default function ProjectDetail() {
  const { type, slug } = useParams<{ type: string; slug: string }>()
  const project = projects.find((p) => p.type === type && p.slug === slug)

  if (!project) {
    return (
      <section className="section">
        <h2>Project not found</h2>
        <p>No project found for "{slug}" in "{type}".</p>
        <Link to="/projects" className="back-link">← Back to all projects</Link>
      </section>
    )
  }

  return (
    <>
      <Link to={`/projects/${project.type}`} className="back-link">
        ← {categoryLabels[project.type] || project.type}
      </Link>
      <div className="detail-header">
        <h1>{project.name}</h1>
        <p style={{ color: 'var(--text-dim)' }}>{project.description}</p>
      </div>
      <ProjectTable project={project} />
      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
        <a href={project.repo} target="_blank" rel="noopener noreferrer">GitHub Repository →</a>
        {project.pagesUrl && (
          <a href={project.pagesUrl} target="_blank" rel="noopener noreferrer">Live Demo →</a>
        )}
      </div>
    </>
  )
}
