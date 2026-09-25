import { Link } from 'react-router-dom'
import { projects, categoryLabels } from '../data/projects'
import type { ProjectType } from '../types'

const types: ProjectType[] = ['games', 'web_apps', 'templates', 'ai', 'devops', 'notes', 'personal']

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
      <p style={{ marginTop: '1rem' }}>
        <Link to="/projects">View all projects →</Link>
      </p>
    </section>
  )
}
