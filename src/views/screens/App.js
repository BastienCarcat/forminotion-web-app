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

const App = () => {
  const { baseUrl } = config || {}
  const { isAuthenticated, getAccessTokenSilently, isLoading, user } =
    useAuth0()

  const location = useLocation()

  useEffect(() => {
    async function getToken() {
      try {
        const accessToken = await getAccessTokenSilently()

        if (accessToken) {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`
          axios.defaults.headers.common['sub'] = user.sub || null
        }
      } catch (e) {
        console.error('getAccessTokenSilently', e)
      }
    }
    const body = localStorage.getItem('body')

    if (isAuthenticated && !_.get(body, 'access_token')) {
      getToken()
    }
    // console.log('token')

    // }
    // else {
    //   console.log('here')
    //   axios.defaults.headers.common['Authorization'] = null
    //   axios.defaults.headers.common['sub'] = null
    // }
  }, [getAccessTokenSilently, user?.sub, isAuthenticated])

  useEffect(() => {
    axios.defaults.baseURL = baseUrl
  }, [baseUrl])

  if (isLoading) return <Loader />

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
            </>
          )}
          <Route index path="/" element={<HomeScreen />} />
          <Route path="/pricing" element={<PricingScreen />} />
          <Route path="/logout" element={<LogoutScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </>
  )
}

App.propTypes = {}

export default App
