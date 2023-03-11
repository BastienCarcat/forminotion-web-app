import React, { useCallback, useEffect, useState } from 'react'
import FormLayout from '../components/Form/Layout'

const FormScreen = () => {
  // const [darkMode, setDarkMode] = useState(true)
  // useEffect(() => {
  //   window
  //     .matchMedia('(prefers-color-scheme: dark)')
  //     .addEventListener('change', (e) => setDarkMode(e.matches))
  //
  //   setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches)
  //
  //   return () => {
  //     window
  //       .matchMedia('(prefers-color-scheme: dark)')
  //       .removeEventListener('change', () => {})
  //   }
  // }, [])

  const [storage, setStorage] = useState(null)

  const setLocal = useCallback(() => {
    localStorage.setItem('test_notion', 'test')
  }, [])

  useEffect(() => {
    const data = localStorage.getItem('test_notion')
    setStorage(data)
  }, [])

  return (
    <div
      // className={clsx(
      //   'h-full w-full',
      //   darkMode ? 'bg-notion-dark-bg' : ' bg-white'
      // )}
      className="h-full w-full bg-white"
    >
      <FormLayout />
      <button onClick={setLocal}>CLICK ME</button>
      {storage && <div>{storage}</div>}
    </div>
  )
}

FormScreen.propTypes = {}

export default FormScreen
// export default withAuthenticationRequired(FormScreen, {
//   onRedirecting: () => <Loader />
// })
