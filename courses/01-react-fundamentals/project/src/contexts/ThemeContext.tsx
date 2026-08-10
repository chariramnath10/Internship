import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

export type AppTheme = 'light' | 'dark'

export interface ThemeContextValue {
  theme: AppTheme
  setTheme: (
    theme: AppTheme
  ) => void
  toggleTheme: () => void
}

export const ThemeContext =
  createContext<ThemeContextValue | null>(
    null
  )

export function ThemeProvider({
  children,
}: {
  children: ReactNode
}) {
  const [theme, setTheme] =
    useLocalStorage<AppTheme>(
      'task-app-theme',
      'light'
    )

  useEffect(() => {
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
  const context =
    useContext(ThemeContext)

  if (!context) {
    throw new Error(
      'useTheme must be used within ThemeProvider'
    )
  }

  return context
}