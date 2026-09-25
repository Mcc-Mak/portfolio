import { achievements, academicProjects } from '../data/projects'

export default function Achievements() {
  return (
    <>
      <section className="section">
        <h2>Key Achievements</h2>
        <ul className="bullets">
          {achievements.map((a, i) => (
            <li key={i}>
              <strong>{a.title}</strong> — {a.description}
            </li>
          ))}
        </ul>
      </section>
      <section className="section">
        <h2>Academic Projects</h2>
        <ul className="bullets">
          {academicProjects.map((a, i) => (
            <li key={i}>
              <strong>{a.title}</strong> — {a.description}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
