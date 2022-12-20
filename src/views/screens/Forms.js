import { withAuthenticationRequired } from '@auth0/auth0-react'
import React from 'react'
import Forms from '../components/Forms/List'
import Loader from '../ui/Globals/Loader'
import PageHeader from '../ui/Page/Header'
import { PlusSmIcon } from '@heroicons/react/solid'
import { useNavigate } from 'react-router-dom'
import AppBar from '../components/Global/AppBar'

const FormsListScreen = () => {
  const navigate = useNavigate()
  return (
    <AppBar>
      <PageHeader
        title="Forms"
        actions={[
          <button
            key={0}
            type="button"
            onClick={() => navigate('/edition')}
            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-600"
          >
            <PlusSmIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            <span>Create</span>
          </button>
        ]}
      />

      <div className="bg-gray-100 flex-1 overflow-auto">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full lg:py-8 py-4">
          <Forms />
        </div>
      </div>

      {/*<div className="bg-gray-100 flex-1">*/}
      {/*  <div className="mx-auto sm:px-6 lg:px-8 w-full lg:max-w-6xl sm:max-w-4xl h-full">*/}
      {/*    <Forms />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </AppBar>
  )
}

FormsListScreen.propTypes = {}

export default withAuthenticationRequired(FormsListScreen, {
  onRedirecting: () => <Loader />
})
