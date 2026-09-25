import { Link } from 'react-router-dom'
import type { Project } from '../types'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  return (
    <Link
      to={`/projects/${project.type}/${project.slug}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <div className="project-card">
        <h3>{project.name}</h3>
        <p className="description">{project.description}</p>
        <div className="tags">
          {project.stack.map((s) => (
            <span key={s} className="tag">{s}</span>
          ))}
        </div>
        <div className="meta">
          <span>in {project.year}</span>
          {project.pagesUrl && <span><a href={project.pagesUrl} onClick={(e) => e.stopPropagation()}>live</a></span>}
        </div>
      </div>
    </Link>
  )
}
