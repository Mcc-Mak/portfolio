import type { Project } from '../types'
import { categoryLabels } from '../data/projects'
import ProjectCard from './ProjectCard'

interface Props {
  type: string
  projects: Project[]
}

export default function CategorySection({ type, projects }: Props) {
  return (
    <section className="category-section">
      <div className="category-header">
        <h2>{categoryLabels[type] || type}</h2>
        <span className="count">{projects.length} projects</span>
      </div>
      <div className="project-grid">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  )
}
