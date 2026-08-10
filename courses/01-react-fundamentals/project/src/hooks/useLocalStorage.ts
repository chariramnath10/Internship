import { useEffect, useState } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [
  T,
  React.Dispatch<React.SetStateAction<T>>,
] {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue =
        localStorage.getItem(key)

      if (storedValue === null) {
        return initialValue
      }

      return JSON.parse(storedValue) as T
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(
        key,
        JSON.stringify(value)
      )
    } catch {
      // Ignore localStorage write errors
    }
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage