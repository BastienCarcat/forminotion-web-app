import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import MainForm from '../components/Form/Form'
import Loader from '../ui/Globals/Loader'

const FormScreen = props => {
  return (
    <div className="pt-16">
      <MainForm />
    </div>
  )
}

FormScreen.propTypes = {}

export default withAuthenticationRequired(FormScreen, {
  onRedirecting: () => <Loader />
})
