import { useState } from 'react'
import { projects, domainLabels } from '../data/projects'
import CategorySection from '../components/CategorySection'
import type { ProjectType, ProjectDomain } from '../types'

const types: ProjectType[] = ['games', 'web-apps', 'templates', 'ai', 'devops', 'tools', 'notes', 'personal']
const domains: ProjectDomain[] = ['frontend', 'backend', 'devops', 'security', 'ai', 'creative']

type LiveFilter = 'all' | 'live' | 'non-live'
type VisibilityFilter = 'all' | 'public' | 'private'

export default function Projects() {
  const [activeDomain, setActiveDomain] = useState<ProjectDomain | null>(null)
  const [liveFilter, setLiveFilter] = useState<LiveFilter>('all')
  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>('all')

  const filtered = projects.filter((p) => {
    if (activeDomain && !p.domains.includes(activeDomain)) return false
    if (liveFilter === 'live' && !p.pagesUrl) return false
    if (liveFilter === 'non-live' && p.pagesUrl) return false
    if (visibilityFilter === 'public' && p.repoVisibility !== 'public') return false
    if (visibilityFilter === 'private' && p.repoVisibility !== 'private') return false
    return true
  })

  const liveCount = projects.filter((p) => p.pagesUrl).length
  const publicCount = projects.filter((p) => p.repoVisibility === 'public').length
  const privateCount = projects.filter((p) => p.repoVisibility === 'private').length

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
        <div className="domain-filters">
          <span className="filter-label">Live:</span>
          <button
            className={`domain-btn ${liveFilter === 'all' ? 'active' : ''}`}
            onClick={() => setLiveFilter('all')}
          >
            All ({projects.length})
          </button>
          <button
            className={`domain-btn ${liveFilter === 'live' ? 'active' : ''}`}
            onClick={() => setLiveFilter('live')}
          >
            Live ({liveCount})
          </button>
          <button
            className={`domain-btn ${liveFilter === 'non-live' ? 'active' : ''}`}
            onClick={() => setLiveFilter('non-live')}
          >
            Non-live ({projects.length - liveCount})
          </button>
        </div>
        <div className="domain-filters">
          <span className="filter-label">Repo:</span>
          <button
            className={`domain-btn ${visibilityFilter === 'all' ? 'active' : ''}`}
            onClick={() => setVisibilityFilter('all')}
          >
            All ({projects.length})
          </button>
          <button
            className={`domain-btn ${visibilityFilter === 'public' ? 'active' : ''}`}
            onClick={() => setVisibilityFilter('public')}
          >
            Public ({publicCount})
          </button>
          <button
            className={`domain-btn ${visibilityFilter === 'private' ? 'active' : ''}`}
            onClick={() => setVisibilityFilter('private')}
          >
            Private ({privateCount})
          </button>
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
