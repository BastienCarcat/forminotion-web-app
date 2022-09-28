import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import Forms from '../components/Forms/List'
import Loader from '../ui/Globals/Loader'

const FormsListScreen = () => {
  return (
    <div className="mx-auto sm:px-6 lg:px-8 w-full lg:max-w-6xl sm:max-w-4xl">
      <Forms />
    </div>
  )
}

FormsListScreen.propTypes = {}

export default withAuthenticationRequired(FormsListScreen, {
  onRedirecting: () => <Loader />
})
