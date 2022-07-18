import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavigationBar from '../components/AppBar/AppBar'
import { config } from './../../config/index'
import FormScreen from './Form'
import _ from 'lodash'
import HomeScreen from './Home'
import FormsListScreen from './Forms'
import FormEditionScreen from './FormEdition'
import Loader from '../ui/Globals/Loader'

const App = () => {
  const { baseUrl } = config || {}
  const {
    isAuthenticated,
    getAccessTokenSilently,
    isLoading,
    user
  } = useAuth0()

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
    <div className="flex flex-col items-center">
      <NavigationBar />
      <Routes>
        <Route index path="/" element={<HomeScreen />} />
        <Route path="/forms" element={<FormsListScreen />} />
        <Route path="/forms/:idForm" element={<FormScreen />} />
        <Route path="/edition" element={<FormEditionScreen />} />
        <Route path="/pricing" element={<HomeScreen />} />
      </Routes>
    </div>
  )
}

App.propTypes = {}

export default App
