import { withAuthenticationRequired } from '@auth0/auth0-react'
import Loader from '../ui/Globals/Loader'
import React from 'react'
import AppBar from '../components/Global/AppBar'
import SettingsProfileLayout from '../components/Settings/Profile/Layout'

const ProfileScreen = () => {
  return (
    <AppBar>
      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="mx-auto w-full px-4 py-4 sm:max-w-4xl sm:px-6 lg:max-w-6xl lg:px-8 lg:py-8">
          <SettingsProfileLayout />
        </div>
      </div>
    </AppBar>
  )
}

ProfileScreen.propTypes = {}

export default withAuthenticationRequired(ProfileScreen, {
  onRedirecting: () => <Loader />
})
