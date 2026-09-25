import { education } from '../data/projects'

export default function Education() {
  return (
    <section className="section">
      <h2>Education &amp; Certifications</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Qualification</th>
              <th>Institution</th>
              <th>Period</th>
              <th>Certificate</th>
            </tr>
          </thead>
          <tbody>
            {education.map((e, i) => (
              <tr key={i}>
                <td>{e.qualification}</td>
                <td>{e.institution}</td>
                <td>{e.period}</td>
                <td>{e.certificate ? <a href={e.certificate}>PDF</a> : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
