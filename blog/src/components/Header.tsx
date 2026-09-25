import { NavLink, Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <Link to="/">Mak Chun Chi — Portfolio</Link>
        </div>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/legend">Legend</NavLink>
        </nav>
      </div>
    </header>
  )
}
