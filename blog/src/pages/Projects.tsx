import { projects } from '../data/projects'
import CategorySection from '../components/CategorySection'
import type { ProjectType } from '../types'

const types: ProjectType[] = ['games', 'web_apps', 'templates', 'ai', 'devops', 'notes', 'personal']

export default function Projects() {
  return (
    <>
      <section className="section">
        <h2>Projects — {projects.length} independent projects across {types.length} categories</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>
          Each project links to its internal README and GitHub repository. Some projects have live deployments.
        </p>
      </section>
      {types.map((t) => {
        const list = projects.filter((p) => p.type === t)
        if (list.length === 0) return null
        return <CategorySection key={t} type={t} projects={list} />
      })}
    </>
  )
}
