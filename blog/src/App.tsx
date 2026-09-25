import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import CategoryPage from './pages/CategoryPage'
import ProjectDetail from './pages/ProjectDetail'
import LegendPage from './pages/LegendPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:type" element={<CategoryPage />} />
        <Route path="projects/:type/:slug" element={<ProjectDetail />} />
        <Route path="legend" element={<LegendPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
