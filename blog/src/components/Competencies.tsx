import { competencies } from '../data/projects'

export default function Competencies() {
  return (
    <section className="section">
      <h2>Core Competencies</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {competencies.map((c) => (
              <tr key={c.category}>
                <td>{c.category}</td>
                <td>
                  <div className="tags">
                    {c.skills.map((s) => (
                      <span key={s} className="tag">{s}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
