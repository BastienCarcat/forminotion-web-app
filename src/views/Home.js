import { makeStyles } from '@mui/styles'
import React, { useEffect } from 'react'
import Form from '../components/Form/Form'
import axios from 'axios'
import app from '../app.json'

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
      <Form />
    </div>
  )
}

Home.propTypes = {}

export default Home
