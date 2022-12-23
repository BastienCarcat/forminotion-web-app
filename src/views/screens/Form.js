import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import Loader from '../ui/Globals/Loader'
import FormLayout from '../components/Form/Layout'

const FormScreen = () => {
  return (
    <div className="w-full">
      <FormLayout />
    </div>
  )
}

FormScreen.propTypes = {}

export default withAuthenticationRequired(FormScreen, {
  onRedirecting: () => <Loader />
})
