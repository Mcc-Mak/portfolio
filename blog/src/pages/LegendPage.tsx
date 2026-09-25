import { abbreviations, fieldLabels, industryLabels, roleLabels } from '../data/projects'

export default function LegendPage() {
  return (
    <>
      <section className="section">
        <h2>Abbreviations</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Abbreviation</th>
                <th>Full Form</th>
              </tr>
            </thead>
            <tbody>
              {abbreviations.map((a) => (
                <tr key={a.abbr}>
                  <td><code>{a.abbr}</code></td>
                  <td>{a.full}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <h2>Field Tags</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(fieldLabels).map(([tag, meaning]) => (
                <tr key={tag}>
                  <td><code>{tag}</code></td>
                  <td>{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <h2>Industry Tags</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(industryLabels).map(([tag, meaning]) => (
                <tr key={tag}>
                  <td><code>{tag}</code></td>
                  <td>{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section">
        <h2>Role Tags</h2>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Tag</th>
                <th>Meaning</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(roleLabels).map(([tag, meaning]) => (
                <tr key={tag}>
                  <td><code>{tag}</code></td>
                  <td>{meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}
