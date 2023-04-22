import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { config } from './../../config/index'
import FormScreen from './Form'
import FormsListScreen from './Forms'
import FormEditionScreen from './Edition'
import Loader from '../ui/Globals/Loader'
import LogoutScreen from './Logout'
import FormDetailsScreen from './Details'
import TermsAndConditions from '../components/Global/Footer/TermsAndConditions'
import PrivcyLegacy from '../components/Global/Footer/PrivcyLegacy'
import FormCreationScreen from './Creation'
import LoginRedirect from '../redirections/login'

const App = () => {
  const { apiUrl } = config || {}
  const { isLoading } = useAuth0()

  useEffect(() => {
    axios.defaults.baseURL = apiUrl
  }, [apiUrl])

  if (isLoading)
    return (
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <Loader />
      </div>
    )

  return (
    <>
      <Routes>
        {/*Authentication required*/}
        <Route path="/creation" element={<FormCreationScreen />} />
        <Route path="/edition/:idForm" element={<FormEditionScreen />} />
        <Route path="/details/:idForm" element={<FormDetailsScreen />} />
        <Route path="/" element={<FormsListScreen />} />

        {/*Public*/}
        <Route path="/form/:idForm" element={<FormScreen />} />

        <Route path="/logout" element={<LogoutScreen />} />
        <Route path="/login-redirect" element={<LoginRedirect />} />

        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivcyLegacy />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

App.propTypes = {}

export default App
