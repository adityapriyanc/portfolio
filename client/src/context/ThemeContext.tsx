import { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
  isLight: boolean
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  isLight: false,
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isLight, setIsLight] = useState(() => {
    const stored = localStorage.getItem('theme')
    return stored === 'light'
  })

  const toggle = () => setIsLight((prev) => {
    const next = !prev
    localStorage.setItem('theme', next ? 'light' : 'dark')
    return next
  })

  useEffect(() => {
    document.documentElement.classList.toggle('light', isLight)
  }, [isLight])

  return (
    <ThemeContext.Provider value={{ isLight, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
