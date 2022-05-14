import { makeStyles } from '@mui/styles'
import React, { useEffect } from 'react'
import Form from '../components/Form/Form'
import axios from 'axios'
import app from '../app.json'
import { Routes, Route } from 'react-router-dom'
import LogIn from '../components/Authentication/LogIn'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
})

const Home = (props) => {
  const classes = useStyles()

  useEffect(() => {
    axios.defaults.baseURL = app.baseURL
  }, [])

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
