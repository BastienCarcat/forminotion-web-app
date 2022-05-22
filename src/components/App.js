import { useAuth0 } from '@auth0/auth0-react'
import { CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import _ from 'lodash'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthenticationButton from '../components/Authentication/Button'
import Form from '../components/Form/Form'
import { config } from '../config'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'column'
  }
})

const App = () => {
  const { baseUrl } = config || {}
  const classes = useStyles()
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
    <div className={classes.root}>
      <AuthenticationButton />
      <Routes>
        <Route path="/" element={<Form />} />
      </Routes>
    </div>
  )
}

App.propTypes = {}

export default App
