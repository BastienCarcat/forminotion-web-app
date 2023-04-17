import React from 'react'
import { ProviderBehaviourForm } from '../components/FormOld/Contexts/behaviour'
import FormOldLayout from '../components/FormOld/Layout'

const FormOldScreen = () => {
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

  return (
    <ProviderBehaviourForm>
      <div
        // className={clsx(
        //   'h-full w-full',
        //   darkMode ? 'bg-notion-dark-bg' : ' bg-white'
        // )}
        className="h-full w-full bg-white"
      >
        <FormOldLayout />
      </div>
    </ProviderBehaviourForm>
  )
}

FormOldScreen.propTypes = {}

export default FormOldScreen
// export default withAuthenticationRequired(FormScreen, {
//   onRedirecting: () => <Loader />
// })
