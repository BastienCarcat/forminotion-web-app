import { useCallback, useState } from 'react'

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : initialValue
  })

  const setStoredValue = useCallback(
    (newValue) => {
      localStorage.setItem(key, JSON.stringify(newValue))
      setValue(newValue)
    },
    [key]
  )

  return [value, setStoredValue]
}

export default useLocalStorage
