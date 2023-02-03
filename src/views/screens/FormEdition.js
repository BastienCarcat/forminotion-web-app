import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import Loader from '../ui/Globals/Loader'
import FormCreationLayout from '../components/Edition/Creation/Layout'
import PageHeader from '../ui/Page/Header'
import AppBar from '../components/Global/AppBar'

const FormEditionScreen = () => {
  return (
    <AppBar>
      <PageHeader title="New form" />
      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="mx-auto w-full px-4 py-4 sm:max-w-4xl sm:px-6 lg:max-w-6xl lg:px-8 lg:py-8">
          <FormCreationLayout />
        </div>
      </div>
    </AppBar>
  )
}

FormEditionScreen.propTypes = {}

export default withAuthenticationRequired(FormEditionScreen, {
  onRedirecting: () => <Loader />
})
