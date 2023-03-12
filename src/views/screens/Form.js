import React from 'react'
import FormLayout from '../components/Form/Layout'
import { ProviderBehaviourForm } from '../components/Form/Contexts/behaviour'

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

  return (
    <ProviderBehaviourForm>
      <div
        // className={clsx(
        //   'h-full w-full',
        //   darkMode ? 'bg-notion-dark-bg' : ' bg-white'
        // )}
        className="h-full w-full bg-white"
      >
        <FormLayout />
      </div>
    </ProviderBehaviourForm>
  )
}

FormScreen.propTypes = {}

export default FormScreen
// export default withAuthenticationRequired(FormScreen, {
//   onRedirecting: () => <Loader />
// })
