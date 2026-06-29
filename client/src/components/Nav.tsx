import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Work', path: '/work' },
  { label: 'Services', path: '/services' },
  { label: 'About', path: '/about' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const { isLight, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? 'bg-[rgba(11,12,16,0.75)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.08)] shadow-lg'
          : 'bg-transparent'
      }`}
      style={{ padding: scrolled ? '1.1rem 9%' : '1.5rem 9%' }}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="text-2xl font-extrabold tracking-wider text-carbon-vellum">
            Aditya<span className="text-iris-glow">.</span>
          </Link>
          <button
            onClick={toggle}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.15)] text-carbon-vellum/60 transition-all duration-300 hover:border-iris-glow hover:text-iris-glow hover:shadow-[0_0_10px_rgba(255,51,75,0.25)]"
            aria-label="Toggle theme"
          >
            {isLight ? <i className="fas fa-moon text-sm" /> : <i className="fas fa-sun text-sm" />}
          </button>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-lg font-medium text-carbon-vellum transition-colors duration-300 after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:bg-iris-glow after:transition-all after:duration-300 hover:text-iris-glow ${
                pathname === item.path
                  ? 'text-iris-glow after:w-full'
                  : 'after:w-0 hover:after:w-full'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block h-0.5 w-6 bg-carbon-vellum transition-all ${mobileOpen ? 'rotate-45 translate-y-2 bg-iris-glow' : ''}`} />
          <span className={`block h-0.5 w-6 bg-carbon-vellum transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-carbon-vellum transition-all ${mobileOpen ? '-rotate-45 -translate-y-2 bg-iris-glow' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="fixed top-0 right-0 z-50 flex h-screen w-[300px] flex-col items-center justify-center gap-10 border-l border-[rgba(255,255,255,0.08)] bg-[rgba(11,12,16,0.98)] backdrop-blur-[15px] transition-all duration-400 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-xl font-medium transition-colors ${
                  pathname === item.path ? 'text-iris-glow' : 'text-carbon-vellum'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </header>
  )
}
