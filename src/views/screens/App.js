import { useAuth0 } from '@auth0/auth0-react'
import { CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import _ from 'lodash'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import NavigationBar from '../components/AppBar/AppBar'
import { config } from './../../config/index'
import FormScreen from './Form'
import HomeScreen from './Home'
import FormsListScreen from './Forms'

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
        }
      } catch (e) {
        console.error('getAccessTokenSilently', e)
      }
    }
    if (isAuthenticated) {
      getToken()
      axios.defaults.headers.common['sub'] = _.get(user, 'sub', null)
    } else {
      axios.defaults.headers.common['Authorization'] = null
      axios.defaults.headers.common['sub'] = null
    }
  }, [isAuthenticated, getAccessTokenSilently, user])

  useEffect(() => {
    axios.defaults.baseURL = baseUrl
  }, [baseUrl])

  if (isLoading) return <CircularProgress />

  return (
    <div className={classes.main}>
      <NavigationBar />
      <Routes>
        <Route index path="/" element={<HomeScreen />} />
        <Route path="/form" element={<FormScreen />} />
        <Route path="/forms" element={<FormsListScreen />} />
      </Routes>
    </div>
  )
}

App.propTypes = {}

export default App
