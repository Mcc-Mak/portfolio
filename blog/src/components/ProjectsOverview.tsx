import { Link } from 'react-router-dom'
import { projects, categoryLabels, domainLabels } from '../data/projects'
import type { ProjectType, ProjectDomain } from '../types'

const types: ProjectType[] = ['games', 'web-apps', 'templates', 'ai', 'devops', 'tools', 'notes', 'personal']
const domains: ProjectDomain[] = ['frontend', 'backend', 'devops', 'security', 'ai', 'creative']

export default function ProjectsOverview() {
  return (
    <section className="section">
      <h2>Projects — {projects.length} across {types.length} categories</h2>
      <div className="project-grid">
        {types.map((t) => {
          const count = projects.filter((p) => p.type === t).length
          return (
            <Link
              key={t}
              to={`/projects/${t}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="project-card">
                <h3>{categoryLabels[t]}</h3>
                <p className="description">{count} project{count !== 1 ? 's' : ''}</p>
              </div>
            </Link>
          )
        })}
      </div>

      <h3 style={{ marginTop: '2rem' }}>Knowledge domains</h3>
      <p style={{ color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
        Cross-cutting domains span multiple categories — a single project often demonstrates several.
      </p>
      <div className="project-grid">
        {domains.map((d) => {
          const count = projects.filter((p) => p.domains.includes(d)).length
          const span = new Set(
            projects.filter((p) => p.domains.includes(d)).map((p) => p.type)
          ).size
          return (
            <div key={d} className="project-card">
              <h3>{domainLabels[d]}</h3>
              <p className="description">{count} projects across {span} categor{span !== 1 ? 'ies' : 'y'}</p>
            </div>
          )
        })}
      </div>

      <p style={{ marginTop: '1rem' }}>
        <Link to="/projects">View all projects →</Link>
      </p>
    </section>
  )
}
