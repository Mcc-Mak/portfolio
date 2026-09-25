import Hero from '../components/Hero'
import Competencies from '../components/Competencies'
import Education from '../components/Education'
import Employment from '../components/Employment'
import Achievements from '../components/Achievements'
import ProjectsOverview from '../components/ProjectsOverview'

export default function Home() {
  return (
    <>
      <Hero />
      <Competencies />
      <Education />
      <Employment />
      <Achievements />
      <ProjectsOverview />
    </>
  )
}
