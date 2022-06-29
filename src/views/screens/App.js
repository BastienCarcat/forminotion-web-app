import { useAuth0 } from '@auth0/auth0-react'
import { CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavigationBar from '../components/AppBar/AppBar'
import { config } from './../../config/index'
import FormScreen from './Form'
import _ from 'lodash'
import HomeScreen from './Home'
import FormsListScreen from './Forms'
import FormEditionScreen from "./FormEdition";

const useStyles = makeStyles({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

const App = () => {
  const classes = useStyles()
  const { baseUrl } = config || {}
  const { isAuthenticated, getAccessTokenSilently, isLoading, user } =
    useAuth0()

  useEffect(() => {
    async function getToken() {
      try {
        const accessToken = await getAccessTokenSilently()

        if (accessToken) {
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`
          axios.defaults.headers.common['sub'] = user.sub || null
          console.log('resetToken', accessToken)
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
    console.log('isAuthenticated', isAuthenticated)
  }, [isAuthenticated])

  useEffect(() => {
    console.log('user', user)
  }, [user])

  useEffect(() => {
    axios.defaults.baseURL = baseUrl
  }, [baseUrl])

  if (isLoading) return <CircularProgress />

  return (
    <div className={classes.main}>
      <NavigationBar />
      <Routes>
        <Route index path="/" element={<HomeScreen />} />
        <Route path="/forms" element={<FormsListScreen />} />
        <Route path="/forms/:idForm" element={<FormScreen />} />
        <Route path="/edition" element={<FormEditionScreen />} />
      </Routes>
    </div>
  )
}

App.propTypes = {}

export default App
