import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section">
      <h2>404 — Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="back-link">← Back to home</Link>
    </section>
  )
}
