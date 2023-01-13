import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { config } from './../../config/index'
import FormScreen from './Form'
import _ from 'lodash'
import HomeScreen from './Home'
import FormsListScreen from './Forms'
import FormEditionScreen from './FormEdition'
import Loader from '../ui/Globals/Loader'
import PricingScreen from './Pricing'
import LogoutScreen from './Logout'
import FormDetailsScreen from './Details'
import TermsAndConditions from '../components/Global/Footer/TermsAndConditions'
import PrivcyLegacy from '../components/Global/Footer/PrivcyLegacy'

const App = () => {
  const { baseUrl } = config || {}
  const { isAuthenticated, isLoading } = useAuth0()

  const location = useLocation()

  useEffect(() => {
    axios.defaults.baseURL = baseUrl
  }, [baseUrl])

  if (isLoading)
    return (
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <Loader />
      </div>
    )

  return (
    <>
      {_.startsWith(_.get(location, 'pathname'), '/form/') ? (
        <Routes>
          <Route path="/form/:idForm" element={<FormScreen />} />
        </Routes>
      ) : (
        <Routes>
          {isAuthenticated && (
            <>
              <Route path="/forms" element={<FormsListScreen />} />
              <Route path="/edition" element={<FormEditionScreen />} />
              <Route path="/details/:idForm" element={<FormDetailsScreen />} />
            </>
          )}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/pricing" element={<PricingScreen />} />
          <Route path="/logout" element={<LogoutScreen />} />
          <Route
            path="/terms-and-conditions"
            element={<TermsAndConditions />}
          />
          <Route path="/privacy-policy" element={<PrivcyLegacy />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  )
}

App.propTypes = {}

export default App
