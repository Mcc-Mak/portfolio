import type { Project } from '../types'
import { fieldLabels, industryLabels, roleLabels } from '../data/projects'

interface Props {
  project: Project
}

export default function ProjectTable({ project }: Props) {
  return (
    <div className="table-wrapper">
      <table>
        <tbody>
        <tr>
          <th>Stack</th>
          <td>
            <div className="tags">
              {project.stack.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </td>
        </tr>
        <tr>
          <th>Field</th>
          <td>{fieldLabels[project.field] || project.field}</td>
        </tr>
        <tr>
          <th>Industry</th>
          <td>{industryLabels[project.industry] || project.industry}</td>
        </tr>
        <tr>
          <th>Role</th>
          <td>{roleLabels[project.role] || project.role}</td>
        </tr>
        <tr>
          <th>Year</th>
          <td>in {project.year}</td>
        </tr>
        <tr>
          <th>GitHub</th>
          <td><a href={project.repo} target="_blank" rel="noopener noreferrer">{project.repo}</a></td>
        </tr>
        {project.pagesUrl && (
          <tr>
            <th>Live</th>
            <td><a href={project.pagesUrl} target="_blank" rel="noopener noreferrer">{project.pagesUrl}</a></td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
}
