import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

export type Theme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const ThemeContext =
  createContext<ThemeContextValue | null>(null)

export function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme =
      localStorage.getItem('task-app-theme')

    if (savedTheme === 'dark') {
      return 'dark'
    }

    return 'light'
  })

  useEffect(() => {
    localStorage.setItem(
      'task-app-theme',
      theme
    )

    document.documentElement.setAttribute(
      'data-theme',
      theme
    )
  }, [theme])

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme === 'light'
        ? 'dark'
        : 'light'
    )
  }

  const value: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)

  if (!ctx) {
    throw new Error(
      'useTheme must be used within ThemeProvider'
    )
  }

  return ctx
}