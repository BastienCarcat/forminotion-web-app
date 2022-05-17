import { useAuth0 } from '@auth0/auth0-react'
import { makeStyles } from '@mui/styles'
import axios from 'axios'
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import LogIn from '../components/Authentication/LogIn'
import Form from '../components/Form/Form'
import { config } from '../config'
import _ from 'lodash'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
})

const Home = (props) => {
  const { baseUrl, auth0 } = config || {}
  const classes = useStyles()
  const { isAuthenticated, getAccessTokenSilently } = useAuth0()

  useEffect(() => {
    async function getToken() {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: _.get(auth0, 'audience')
        })

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
    } else {
      axios.defaults.headers.common['Authorization'] = null
    }
  }, [isAuthenticated, getAccessTokenSilently, auth0])

  useEffect(() => {
    axios.defaults.baseURL = baseUrl
  }, [baseUrl])

  return (
    <div className={classes.root}>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="form" element={<Form />} />
      </Routes>
    </div>
  )
}

Home.propTypes = {}

export default Home
