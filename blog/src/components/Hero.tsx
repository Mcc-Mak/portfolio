import { profile } from '../data/projects'

export default function Hero() {
  return (
    <section className="hero">
      <h1>{profile.name}</h1>
      <p className="subtitle">{profile.title} · {profile.subtitle}</p>
      <p className="summary">{profile.summary}</p>
      <div className="contact">
        <span>Phone: {profile.phone}</span>
        <span>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a></span>
        <span>CV: <a href={profile.cvOnline}>Online</a> · <a href={profile.cvPdf}>PDF</a></span>
      </div>
    </section>
  )
}
