import { profile } from '../data/projects'

export default function Hero() {
  const telPhone = profile.phone.replace(/\s+/g, '')
  return (
    <section className="hero">
      <h1>{profile.name}</h1>
      <p className="subtitle">{profile.title} · {profile.subtitle}</p>
      <p className="summary">{profile.summary}</p>
      <div className="contact">
        <span>Phone: <a href={`tel:${telPhone}`}>{profile.phone} (Tel)</a> · <a href={`sms:${telPhone}`}>{profile.phone} (SMS)</a></span>
        <span>Email: <a href={`mailto:${profile.email}`}>{profile.email}</a></span>
        <span>CV: <a href={profile.cvOnline}>Online</a> · <a href={profile.cvPdf}>PDF</a></span>
      </div>
    </section>
  )
}
