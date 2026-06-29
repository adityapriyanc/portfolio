import { useState } from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import InkCursorTrail from './components/InkCursorTrail'
import GridShader from './components/GridShader'
import RippleEffect from './components/RippleEffect'
import { PortfolioProvider } from './context/PortfolioContext'
import { ThemeProvider } from './context/ThemeContext'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import WorkPage from './pages/WorkPage'
import ServicesPage from './pages/ServicesPage'
import SkillsPage from './pages/SkillsPage'
import ContactPage from './pages/ContactPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { isAuthenticated } from './data/api'

function SiteLayout() {
  return (
    <div className="min-h-screen cosmic-bg relative">
      <div className="grid-overlay" />
      <GridShader />
      <div className="glow-circle glow-circle-1" />
      <div className="glow-circle glow-circle-2" />
      <Nav />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
      <InkCursorTrail />
      <RippleEffect />
    </div>
  )
}

function AdminRoute() {
  const [key, setKey] = useState(0)
  if (isAuthenticated()) return <AdminDashboard key={key} />
  return <AdminLogin onLogin={() => setKey((k) => k + 1)} />
}

function App() {
  return (
    <ThemeProvider>
    <PortfolioProvider>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>
    </PortfolioProvider>
    </ThemeProvider>
  )
}

export default App
