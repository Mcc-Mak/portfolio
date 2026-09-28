import { Link } from 'react-router-dom'
import type { Project } from '../types'
import { domainLabels } from '../data/projects'

interface Props {
  project: Project
}

export default function ProjectCard({ project }: Props) {
  const visibility = project.repoVisibility ?? 'private'
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
        <div className="tags domain-tags">
          {project.domains.map((d) => (
            <span key={d} className="tag domain-tag">{domainLabels[d]}</span>
          ))}
        </div>
        <div className="meta">
          <span className="meta-left">
            <span>in {project.year}</span>
            <span className={`visibility-badge ${visibility}`}>{visibility}</span>
          </span>
          {project.pagesUrl && <span><a href={project.pagesUrl} onClick={(e) => e.stopPropagation()}>live</a></span>}
        </div>
      </div>
    </Link>
  )
}
