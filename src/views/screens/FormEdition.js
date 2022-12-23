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
      <div className="bg-gray-100 flex-1 overflow-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full lg:max-w-6xl sm:max-w-4xl lg:py-8 py-4">
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
