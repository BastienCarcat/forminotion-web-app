import React from 'react'
import FormLayout from '../components/Form/Layout'

const FormScreen = () => {
  return (
    <div className="h-full w-full bg-white">
      <FormLayout />
    </div>
  )
}

FormScreen.propTypes = {}

export default FormScreen
// export default withAuthenticationRequired(FormScreen, {
//   onRedirecting: () => <Loader />
// })
