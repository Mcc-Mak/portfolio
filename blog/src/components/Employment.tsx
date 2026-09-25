import { employment } from '../data/projects'

export default function Employment() {
  return (
    <section className="section">
      <h2>Employment</h2>
      {employment.map((job, i) => (
        <div key={i} className="job">
          <div className="job-header">
            <h3>{job.title} · {job.company}</h3>
            <span className="period">{job.period}</span>
          </div>
          <ul className="bullets">
            {job.bullets.map((b, j) => (
              <li key={j}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
