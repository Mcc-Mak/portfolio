import { useState } from 'react'
import { projects, domainLabels } from '../data/projects'
import CategorySection from '../components/CategorySection'
import type { ProjectType, ProjectDomain } from '../types'

const types: ProjectType[] = ['games', 'web_apps', 'templates', 'ai', 'devops', 'tools', 'notes', 'personal']
const domains: ProjectDomain[] = ['frontend', 'backend', 'devops', 'security', 'ai', 'creative']

export default function Projects() {
  const [activeDomain, setActiveDomain] = useState<ProjectDomain | null>(null)

  const filtered = activeDomain
    ? projects.filter((p) => p.domains.includes(activeDomain))
    : projects

  return (
    <>
      <section className="section">
        <h2>Projects — {projects.length} independent projects across {types.length} categories</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
          Each project links to its internal README and GitHub repository. Filter by knowledge domain to see breadth across categories.
        </p>
        <div className="domain-filters">
          <button
            className={`domain-btn ${!activeDomain ? 'active' : ''}`}
            onClick={() => setActiveDomain(null)}
          >
            All domains ({projects.length})
          </button>
          {domains.map((d) => {
            const count = projects.filter((p) => p.domains.includes(d)).length
            return (
              <button
                key={d}
                className={`domain-btn ${activeDomain === d ? 'active' : ''}`}
                onClick={() => setActiveDomain(d)}
              >
                {domainLabels[d]} ({count})
              </button>
            )
          })}
        </div>
      </section>
      {types.map((t) => {
        const list = filtered.filter((p) => p.type === t)
        if (list.length === 0) return null
        return <CategorySection key={t} type={t} projects={list} />
      })}
    </>
  )
}
